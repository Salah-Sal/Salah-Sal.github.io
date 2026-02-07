---
layout: post
title: "Sandboxing Claude Code with Docker: Running an AI Agent on 580 Datasets Without Risk"
date: 2026-02-07 10:00:00 +0300
lang: en
categories: [Artificial Intelligence, Developer Tools]
tags: [Claude Code, Docker, Sandboxing, Security, AI Agent, Batch Processing, Arabic NLP]
---

I needed Claude Code to autonomously assess 580 Arabic NLP datasets. For each one, it would read metadata, run Python to load real data samples from HuggingFace, fetch paper links, and write a quality assessment JSON file. That's thousands of tool calls — file reads, bash commands, web fetches — running with `--dangerously-skip-permissions`.

The assessments were excellent. But I had no way to guarantee Claude wouldn't accidentally `rm -rf` something, install a rogue package, or exfiltrate data through an unexpected URL. I needed full isolation.

This article covers two approaches: **Docker Sandboxes** (the official microVM solution from Docker + Anthropic) and **custom Docker containers** (what I actually used, since Docker Sandboxes requires Docker Desktop 4.58+ with the sandbox plugin enabled). Both achieve the same goal — running Claude Code in a locked-down environment where it can't touch your real system.

---

## Two Approaches to Isolation

### Option A: Docker Sandboxes (Official MicroVM Solution)

Docker Sandboxes are **lightweight microVMs** purpose-built by Docker and Anthropic for AI agents. Each sandbox gets its own kernel, filesystem, Docker daemon, and configurable network policies. They're the ideal solution if your Docker Desktop version supports them (4.58+).

### Option B: Custom Docker Containers (What I Actually Used)

If `docker sandbox` isn't available on your system, you can build a custom Docker image with Claude Code, Python, and the datasets library. You get the same filesystem and network isolation using standard Docker security flags. This is the approach I validated end-to-end and will detail first.

---

## The Problem: What Does "Unsupervised" Actually Mean?

Here's what a single dataset assessment looks like when Claude Code runs it. These are the **actual tool calls** I extracted from Claude Code's session transcripts (stored at `~/.claude/projects/`):

| Step | Tool | What Claude Did |
|------|------|----------------|
| 1 | **Read** | Read the JSON metadata file |
| 2 | **Bash** | `python3: load_dataset("komari6/ajgt_twitter_ar", streaming=True)` |
| 3 | **WebFetch** | Fetched the Springer paper page |
| 4 | **WebFetch** | Fetched the GitHub repository |
| 5 | **Bash** | `python3: load_dataset(... trust_remote_code=True)` — retry with fix |
| 6 | **WebFetch** | Fetched the GitHub README |
| 7 | **WebFetch** | Fetched the HuggingFace dataset page |
| 8 | **Bash** | `python3: load_dataset(...)` — full statistical analysis of all 1,800 rows |
| 9 | **Write** | Wrote the assessment JSON |

That's **9 tool calls** for one dataset. Multiply by 580 datasets and you're looking at ~5,000+ autonomous actions: bash commands, file writes, web requests, Python execution with `trust_remote_code=True`.

Without sandboxing, `--dangerously-skip-permissions` means Claude can do anything your user account can do. With sandboxing, Claude can do anything — but only inside an isolated container that can't touch your real system.

---

## Custom Docker Container Approach (Tested & Validated)

This is the approach I actually built and validated. It works with any Docker installation and any Claude Code authentication method.

### Prerequisites

- **Docker Desktop** (any recent version — I used 28.4.0)
- **Claude Code subscription** (Max/Pro plan) or an API key
- Your dataset files on disk

### Step 1: Build the Docker Image

You need two files — a `Dockerfile` and an `entrypoint.sh` that handles credentials securely.

**entrypoint.sh** — writes credentials from env var to in-container tmpfs, then clears the env var before starting Claude:

```bash
#!/bin/bash
CREDS_DIR="/home/assessor/.claude"
mkdir -p "$CREDS_DIR"

if [ -n "$CLAUDE_CREDS_JSON" ]; then
    printf '%s' "$CLAUDE_CREDS_JSON" > "$CREDS_DIR/.credentials.json"
    chmod 600 "$CREDS_DIR/.credentials.json"
fi

# Clear secrets from environment before exec — prevents leaking to child processes
unset CLAUDE_CREDS_JSON
unset ANTHROPIC_API_KEY
exec "$@"
```

**Dockerfile:**

```dockerfile
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# System deps
RUN apt-get update && apt-get install -y \
    curl git python3 python3-pip jq ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20 (needed for Claude Code)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Claude Code
RUN npm install -g @anthropic-ai/claude-code

# Install Python data tools
RUN pip3 install --no-cache-dir datasets huggingface-hub

# Create non-root user
RUN useradd -m -s /bin/bash assessor
RUN mkdir -p /input /output /home/assessor/.claude \
    && chown -R assessor:assessor /input /output /home/assessor/.claude

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER assessor
WORKDIR /home/assessor

ENTRYPOINT ["entrypoint.sh", "claude"]
CMD ["-p"]
```

Build it:

```bash
docker build -t claude-assessor .
```

The image is ~1.5GB and includes Ubuntu, Node.js, Claude Code, Python 3, and the HuggingFace datasets library.

### Step 2: Authentication — The Key Discovery

This was the trickiest part. Claude Code on a Max/Pro plan authenticates via **OAuth tokens stored in the macOS Keychain**, not an API key. You can't just pass `ANTHROPIC_API_KEY` — it doesn't exist.

**What didn't work:** Setting `CLAUDE_CODE_OAUTH_TOKEN` as an environment variable. The container started but Claude printed "Execution error" with no output.

**What works:** Extracting the full credentials JSON from the macOS Keychain and passing it into the container via an environment variable. The entrypoint script writes it to the container's tmpfs filesystem (in-memory, never touches your host disk), then clears the env var before Claude starts.

The credentials live in the macOS Keychain under the service name `Claude Code-credentials`:

```bash
security find-generic-password -s "Claude Code-credentials" -w
```

This outputs a JSON object containing your access token, refresh token, and subscription info. The entrypoint script handles writing this to the right location inside the container.

### Step 3: Prepare Input and Output Directories

```bash
mkdir -p ~/sandbox-workspace/input ~/sandbox-workspace/output

# Copy your dataset files
cp /path/to/masader/datasets/*.json ~/sandbox-workspace/input/
```

### Step 4: Run the Container

Here's the full command with all security flags:

```bash
docker run --rm \
  --cap-drop=ALL \
  --security-opt=no-new-privileges \
  -v ~/sandbox-workspace/input:/input:ro \
  -v ~/sandbox-workspace/output:/output \
  -e CLAUDE_CREDS_JSON="$(security find-generic-password -s 'Claude Code-credentials' -w)" \
  claude-assessor -p --dangerously-skip-permissions \
  "Read /input/ajgt.json, load data samples via Python datasets library, \
   then write assessment JSON to /output/ajgt_assessment.json"
```

What each security flag does:

| Flag | Protection |
|------|-----------|
| `--cap-drop=ALL` | Drops all Linux capabilities (no privilege escalation) |
| `--security-opt=no-new-privileges` | Prevents gaining new privileges via setuid/setgid |
| `-v .../input:/input:ro` | Dataset files are read-only — Claude can't modify them |
| `-v .../output:/output` | Only place Claude can write persistent files |
| `--rm` | Container is destroyed after exit — no leftover state |

**How credentials flow — no file ever touches your host disk:**

```
macOS Keychain
    → shell subcommand $(...) captures output in memory
        → Docker passes it as env var CLAUDE_CREDS_JSON
            → entrypoint.sh writes to container tmpfs (in-memory)
                → unset CLAUDE_CREDS_JSON (cleared from environment)
                    → exec claude (starts with clean environment)
                        → container exits → tmpfs destroyed → credentials gone
```

### Step 5: Verify It Works

Check the output:

```bash
cat ~/sandbox-workspace/output/ajgt_assessment.json | python3 -m json.tool
```

From my actual test run, Claude:
1. Read the metadata JSON
2. Ran `python3` to load all 1,800 samples via the `datasets` library
3. Computed statistics (duplicates, distribution, text lengths)
4. Fetched the HuggingFace page and GitHub repo
5. Wrote a structured Arabic assessment JSON

All inside an isolated container where the worst it could do is clutter its own filesystem.

---

## Batch Processing Script

For running all 580 datasets:

```bash
#!/bin/bash
# assess_all.sh

INPUT_DIR="$HOME/sandbox-workspace/input"
OUTPUT_DIR="$HOME/sandbox-workspace/output"

TOTAL=$(ls "$INPUT_DIR"/*.json 2>/dev/null | wc -l | tr -d ' ')
CURRENT=0

echo "Starting assessment of $TOTAL datasets"

for DATASET_FILE in "$INPUT_DIR"/*.json; do
    DATASET_NAME=$(basename "$DATASET_FILE" .json)
    OUTPUT_FILE="$OUTPUT_DIR/${DATASET_NAME}_assessment.json"
    CURRENT=$((CURRENT + 1))

    # Skip if already assessed (resume support)
    if [ -f "$OUTPUT_FILE" ]; then
        echo "[$CURRENT/$TOTAL] Skipping (exists): $DATASET_NAME"
        continue
    fi

    echo "[$CURRENT/$TOTAL] Assessing: $DATASET_NAME"

    docker run --rm \
      --cap-drop=ALL \
      --security-opt=no-new-privileges \
      -v "$INPUT_DIR":/input:ro \
      -v "$OUTPUT_DIR":/output \
      -e CLAUDE_CREDS_JSON="$(security find-generic-password -s 'Claude Code-credentials' -w)" \
      claude-assessor -p --dangerously-skip-permissions \
      "اقرأ /input/${DATASET_NAME}.json ثم حمّل عينات من البيانات عبر بايثون ثم اكتب تقييم JSON إلى /output/${DATASET_NAME}_assessment.json. اكتب بالعربية. الهيكل: {الاسم, الاسم_الأصلي, درجة_الجودة (0-100), تقدير_الجودة (ممتاز|جيد|مقبول|ضعيف), الملخص, فحص_البيانات: {الطريقة_المستخدمة, عدد_العينات_المفحوصة, معاينة_العينات, مشاكل_مكتشفة}, نقاط_القوة, نقاط_الضعف, تفصيل_الجودة: {سهولة_الوصول, التوثيق, السلامة_الأخلاقية, الترخيص, قابلية_إعادة_الإنتاج, المراجعة_العلمية, جودة_البيانات}, تم_تحميل_البيانات}"

    sleep 2  # Rate limit pause
done

echo "Done. $CURRENT datasets processed. Results in $OUTPUT_DIR"
```

### Resume Support

The `if [ -f "$OUTPUT_FILE" ]` check is critical. If the process crashes at dataset 247, restart the script and it picks up at 248. Each dataset runs in its own container — no shared state to corrupt.

### Monitoring Progress

```bash
# Count completed assessments
ls ~/sandbox-workspace/output/*_assessment.json | wc -l

# Watch in real-time
watch -n 5 'ls ~/sandbox-workspace/output/*_assessment.json | wc -l'

# Check the latest assessment
ls -t ~/sandbox-workspace/output/*.json | head -1 | xargs cat | python3 -m json.tool
```

---

## What the Container Actually Prevents

| Scenario | Without Container | With Container |
|----------|------------------|---------------|
| Claude runs `rm -rf ~/Documents` | Your documents are deleted | Only container files affected; host untouched |
| Claude runs `pip install malicious-pkg` | Installed on your system | Gone when container exits (`--rm`) |
| Claude reads `~/.ssh/id_rsa` | Returns your private key | File doesn't exist in container |
| Claude runs `curl evil-site.com` | Request goes through | Goes through (use network policies to block) |
| Process crashes | Orphaned processes on your system | Container exits cleanly; `--rm` removes it |

### Adding Network Restrictions

For tighter control, restrict outbound network access:

```bash
# Create a custom network with no internet
docker network create --internal isolated-net

# Run with restricted network
docker run --rm --network isolated-net \
  ... \
  claude-assessor -p "..."
```

Or for selective access, use a proxy container that only allows specific domains (HuggingFace, GitHub, ArXiv, Anthropic API).

---

## Security Review: What We Found

After building and testing this approach, I did a security audit. Here are the real risks and how they're mitigated.

### Credential Handling

**The naive approach is dangerous.** Writing credentials to a temp file:

```bash
# DON'T DO THIS
security find-generic-password -s "Claude Code-credentials" -w > /tmp/creds.json
docker run ... -v /tmp/creds.json:/home/assessor/.claude/.credentials.json:ro ...
rm /tmp/creds.json
```

Problems with this:
- Any process on your machine can read `/tmp/creds.json` while it exists
- If the script crashes before `rm`, the file stays forever
- macOS Spotlight may index it
- Time Machine may back it up
- The file contains your **refresh token** — anyone who copies it can impersonate your Max account

**The entrypoint approach solves this.** Credentials flow through an env var (in-memory) into the container's tmpfs (in-memory). Nothing ever hits your host disk. The entrypoint clears the env var before starting Claude, so even `docker inspect` on the running container won't show it.

### `trust_remote_code=True`

The prompt tells Claude to load HuggingFace datasets with `trust_remote_code=True`. This downloads and **executes arbitrary Python code** from dataset repositories. A malicious dataset author could put anything in their loading script.

Inside the container, this code can:
- Access the network (could exfiltrate data)
- Read the credentials file from tmpfs
- Write to `/output`

**Mitigation:** The container is disposable (`--rm`), has no capabilities (`--cap-drop=ALL`), and can't escalate privileges. Adding network restrictions (see above) would close the exfiltration vector.

### Session Transcripts

Claude Code writes session transcripts to `~/.claude/projects/`. If you run `security find-generic-password` in a Claude Code session (like I did while developing this), **your OAuth tokens get logged in the transcript file on disk**.

The transcript files are only readable by your user (`-rw-------`), but they persist on disk indefinitely.

**Mitigation:** After working with credentials in a Claude Code session, rotate your tokens:

```bash
claude /logout
claude /login
```

This invalidates the old tokens that may be logged in session transcripts. In the batch processing script, credentials are only handled in bash (not inside a Claude Code session), so this risk doesn't apply to the production workflow.

### What's Not Protected

| Risk | Status |
|------|--------|
| Network exfiltration | **Open** unless you add network restrictions |
| Malicious dataset loading scripts | **Partially mitigated** — sandboxed but has network access |
| Output directory manipulation | **Open** — Claude can write anything to `/output` |
| API rate limit exhaustion | **Open** — `sleep 2` helps but doesn't guarantee |

### Overall Assessment

The Docker container approach is **significantly safer** than running bare `claude -p --dangerously-skip-permissions` on the host. The main remaining gap is unrestricted network access — adding a domain allowlist would close the last meaningful attack vector.

---

## Docker Sandboxes Approach (Official MicroVM Solution)

If your Docker Desktop supports `docker sandbox` (version 4.58+ with the plugin enabled), you get an even stronger isolation boundary — a full microVM instead of a container.

### Quick Setup

```bash
# Set API key or ensure OAuth credentials are available
docker sandbox run claude ~/sandbox-workspace
```

This spins up a microVM with Claude Code pre-installed and `--dangerously-skip-permissions` enabled by default.

### Network Policies

Docker Sandboxes have built-in network policy management:

```bash
docker sandbox network proxy my-sandbox \
  --policy deny \
  --allow-host api.anthropic.com \
  --allow-host "*.anthropic.com" \
  --allow-host huggingface.co \
  --allow-host "*.huggingface.co" \
  --allow-host "*.hf.co" \
  --allow-host github.com \
  --allow-host "*.github.com" \
  --allow-host "*.githubusercontent.com" \
  --allow-host pypi.org \
  --allow-host "*.pypi.org" \
  --allow-host files.pythonhosted.org \
  --allow-host arxiv.org \
  --allow-host "*.arxiv.org"
```

**Domain matching rules:**
- `example.com` matches only `example.com`, **not** `sub.example.com`
- `*.example.com` matches subdomains, **not** the root domain
- To allow both, specify both patterns

**Default blocked CIDRs** (always active): private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), localhost (`127.0.0.0/8`), link-local (`169.254.0.0/16`).

### Sandbox Lifecycle

```bash
docker sandbox ls                     # List all sandboxes
docker sandbox run my-sandbox         # Reconnect to existing
docker sandbox exec -it my-sandbox bash  # Open shell inside
docker sandbox network log            # Watch network activity
docker sandbox rm my-sandbox          # Remove when done
```

Sandboxes persist until removed — installed packages, downloaded files, and configs survive restarts.

### Docker Sandboxes vs Custom Containers

| Aspect | Docker Sandboxes | Custom Container |
|--------|-----------------|-----------------|
| **Isolation** | MicroVM (own kernel) | Container (shared kernel) |
| **Setup** | One command | Build Dockerfile + entrypoint |
| **Network policies** | Built-in CLI | Manual proxy/iptables |
| **Auth** | Auto-inherits from host | Env var + entrypoint to tmpfs |
| **Requires** | Docker Desktop 4.58+ | Any Docker version |
| **Claude Code** | Pre-installed | Installed in image |
| **Persistence** | Survives restarts | Destroyed on exit (`--rm`) |

---

## Tips and Gotchas

### 1. Max Plan Auth Needs the Full Credentials JSON

The `CLAUDE_CODE_OAUTH_TOKEN` environment variable alone is not sufficient. You need the full JSON object from the macOS Keychain, passed through the entrypoint:

```bash
-e CLAUDE_CREDS_JSON="$(security find-generic-password -s 'Claude Code-credentials' -w)"
```

If you have an API key instead, it's simpler:
```bash
-e ANTHROPIC_API_KEY="sk-ant-api03-..."
```

### 2. `ANTHROPIC_API_KEY` Overrides Your Subscription

If `ANTHROPIC_API_KEY` is set in your environment, Claude Code uses pay-as-you-go API billing instead of your Max plan. Make sure it's unset:

```bash
echo $ANTHROPIC_API_KEY  # Should be empty
```

### 3. `--read-only` Breaks Claude Code

During testing, I found that `--read-only` (read-only root filesystem) prevents Claude Code from functioning even with extensive `--tmpfs` mounts. Claude Code needs writable paths beyond what I could identify. Drop `--read-only` — the container is already disposable and isolated.

### 4. Each Container Is Fully Independent

Unlike Docker Sandboxes which persist, containers with `--rm` are destroyed after each run. This is actually a feature for batch processing — each dataset assessment starts clean with no leftover state from previous runs.

### 5. Rate Limits on Max Plan

When processing 580 datasets sequentially, Claude makes ~5,000+ API calls. The `sleep 2` between datasets prevents hitting rate limits. For Max plan users, the rate limit tier is generous, but continuous heavy usage may still trigger throttling.

### 6. Rotate Tokens After Development

If you ran `security find-generic-password` inside a Claude Code session while testing, your tokens are logged in the session transcript at `~/.claude/projects/`. Rotate them:

```bash
claude /logout
claude /login
```

This doesn't affect the batch script (which runs credentials through bash, not a Claude session).

### 7. Verify Claude Actually Loaded Data

The assessment JSON includes `"تم_تحميل_البيانات": true/false` to indicate whether real data was loaded. Cross-check by looking at `"عدد_العينات_المفحوصة"` — if it matches the actual dataset size, Claude loaded the data. If it says `0` or `metadata_only`, the HuggingFace link was broken or the library couldn't load it.

---

## The Result

From my validated test run inside a Docker container, here's what Claude produced for the AJGT Arabic sentiment dataset:

```json
{
  "الاسم": "مجموعة تغريدات عربية أردنية لتحليل المشاعر",
  "الاسم_الأصلي": "AJGT - Arabic Jordanian General Tweets",
  "درجة_الجودة": 62,
  "تقدير_الجودة": "جيد",
  "الملخص": "مجموعة بيانات عربية تتكون من 1,800 تغريدة من تويتر مصنفة إلى إيجابية وسلبية بالتساوي...",
  "فحص_البيانات": {
    "الطريقة_المستخدمة": "datasets_lib",
    "عدد_العينات_المفحوصة": 1800,
    "معاينة_العينات": [
      "اربد فيها جامعات اكثر من عمان ... [إيجابي]",
      "لسانك قذر يا قمامه [سلبي]",
      "اتحزن فان الله يدافع عنك والملائكه تستغفر لك [إيجابي]"
    ],
    "مشاكل_مكتشفة": [
      "الترخيص غير محدد مما يخلق غموضاً قانونياً لإعادة الاستخدام",
      "حجم البيانات صغير جداً (1,800 عينة فقط)",
      "لا يوجد تقسيم للبيانات إلى تدريب واختبار وتحقق",
      "بعض العينات تحتوي على محتوى حساس بدون تحذيرات"
    ]
  },
  "تفصيل_الجودة": {
    "سهولة_الوصول": 85,
    "التوثيق": 55,
    "السلامة_الأخلاقية": 50,
    "الترخيص": 20,
    "قابلية_إعادة_الإنتاج": 55,
    "المراجعة_العلمية": 75,
    "جودة_البيانات": 65
  },
  "تم_تحميل_البيانات": true
}
```

Claude loaded all 1,800 samples via the Python `datasets` library, computed statistics, identified quality issues with specific examples, and wrote the assessment — all from inside an isolated container where it couldn't access my home directory, SSH keys, or any other system resources.

---

## Resources

- [Docker Sandboxes Documentation](https://docs.docker.com/ai/sandboxes/)
- [Docker Sandboxes: Get Started](https://docs.docker.com/ai/sandboxes/get-started/)
- [Configure Claude Code in Docker Sandboxes](https://docs.docker.com/ai/sandboxes/claude-code/)
- [Network Policies Reference](https://docs.docker.com/ai/sandboxes/network-policies/)
- [Claude Code Sandboxing Docs](https://code.claude.com/docs/en/sandboxing)
- [Docker Sandboxes Blog Post](https://www.docker.com/blog/docker-sandboxes-run-claude-code-and-other-coding-agents-unsupervised-but-safely/)
- [Claude Code Authentication](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
