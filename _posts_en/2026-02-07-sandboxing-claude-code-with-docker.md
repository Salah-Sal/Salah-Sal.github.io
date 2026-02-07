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

Docker Sandboxes solve this. They're purpose-built by Docker and Anthropic to run Claude Code unsupervised in a microVM. Here's exactly how I set it up.

---

## What Are Docker Sandboxes?

Docker Sandboxes are **lightweight microVMs** — not containers. Each sandbox gets:

- Its own **isolated filesystem** (can't touch your host files)
- A **private Docker daemon** (can't access your host's containers)
- **Configurable network policies** (allowlist/denylist specific domains)
- **Bidirectional file sync** only for the workspace directory you mount
- Claude Code runs with `--dangerously-skip-permissions` **by default** because the sandbox itself is the safety boundary

They don't appear in `docker ps`. You manage them with `docker sandbox` commands.

**Key difference from containers:** a container shares the host kernel and can escape under certain conditions. A microVM has its own kernel — the isolation boundary is hardware-level.

---

## Prerequisites

- **Docker Desktop 4.58+** (macOS or Windows)
- **Claude API key** set as a global environment variable
- Your dataset files on disk

### Install Docker Desktop

If you don't have Docker Desktop, download it from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/). After installation, verify the version:

```bash
docker --version
# Docker version 28.x.x or later
```

### Set Your API Key Globally

This is critical — Docker Sandboxes inherit environment variables from your shell, but the Docker daemon reads them at startup. You must set the key in your shell profile, not inline:

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

Then **restart Docker Desktop** so the daemon picks up the new variable.

---

## The Problem: What Does "Unsupervised" Actually Mean?

Here's what a single dataset assessment looks like when Claude Code runs it. These are the actual tool calls from one of our test runs on the AJGT Arabic sentiment dataset:

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

Without sandboxing, `--dangerously-skip-permissions` means Claude can do anything your user account can do. With sandboxing, Claude can do anything — but only inside an isolated microVM that can't touch your real system.

---

## Step 1: Create the Sandbox

First, create a workspace directory with your input data and an output folder:

```bash
mkdir -p ~/sandbox-workspace/input ~/sandbox-workspace/output
```

Copy your dataset files into the input directory:

```bash
cp /path/to/masader/datasets/*.json ~/sandbox-workspace/input/
```

Now create and launch the sandbox:

```bash
docker sandbox run claude ~/sandbox-workspace
```

This does several things:
1. Spins up a microVM with Ubuntu, Node.js, Python 3, Git, and Claude Code pre-installed
2. Syncs `~/sandbox-workspace` into the sandbox at the same absolute path
3. Drops you into a Claude Code session inside the sandbox

The first run takes a minute to pull the base image. Subsequent runs start in seconds.

---

## Step 2: Lock Down the Network

By default, sandboxes allow all outbound traffic. For our use case, Claude only needs to reach:

- **api.anthropic.com** — Claude API calls
- **huggingface.co** and its CDN — dataset downloads and page fetches
- **github.com** and **raw.githubusercontent.com** — dataset repos
- **pypi.org** and **files.pythonhosted.org** — Python package installs
- **arxiv.org** — research papers
- **semanticscholar.org** — paper metadata

Lock it down with a denylist policy (block everything, allow only what's needed):

```bash
docker sandbox network proxy my-sandbox \
  --policy deny \
  --allow-host api.anthropic.com \
  --allow-host "*.anthropic.com" \
  --allow-host huggingface.co \
  --allow-host "*.huggingface.co" \
  --allow-host "*.hf.co" \
  --allow-host cdn-lfs.huggingface.co \
  --allow-host github.com \
  --allow-host "*.github.com" \
  --allow-host "*.githubusercontent.com" \
  --allow-host pypi.org \
  --allow-host "*.pypi.org" \
  --allow-host files.pythonhosted.org \
  --allow-host arxiv.org \
  --allow-host "*.arxiv.org" \
  --allow-host semanticscholar.org \
  --allow-host "*.semanticscholar.org" \
  --allow-host "*.researchgate.net"
```

### How Network Policies Work

The proxy intercepts all HTTP/HTTPS traffic inside the sandbox. Non-HTTP protocols are blocked entirely.

**Domain matching rules:**
- `example.com` matches only `example.com`, **not** `sub.example.com`
- `*.example.com` matches subdomains, **not** the root domain
- To allow both, specify both patterns

**Default blocked CIDRs** (always active):
- `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` — private networks
- `127.0.0.0/8` — localhost
- `169.254.0.0/16` — link-local

This means even if Claude somehow resolved an internal IP, the request would be blocked.

### Monitoring Network Activity

Watch what Claude is actually requesting in real-time:

```bash
docker sandbox network log
```

This shows every allowed and blocked request — useful for debugging if a dataset fetch fails.

---

## Step 3: Install Python Dependencies

The sandbox comes with Python 3, but you'll need the HuggingFace datasets library. Open a shell inside the sandbox:

```bash
docker sandbox exec -it my-sandbox bash
```

Then install:

```bash
pip install datasets huggingface-hub
```

These packages persist — the sandbox retains all installed packages until you `docker sandbox rm` it.

---

## Step 4: Create the Batch Processing Script

Inside the sandbox, create the script that loops through datasets and calls `claude -p` for each one:

```bash
#!/bin/bash
# assess_datasets.sh — Run inside Docker Sandbox

INPUT_DIR="$HOME/sandbox-workspace/input"
OUTPUT_DIR="$HOME/sandbox-workspace/output"
LOG_FILE="$OUTPUT_DIR/progress.log"

# Count total files
TOTAL=$(ls "$INPUT_DIR"/*.json 2>/dev/null | wc -l)
CURRENT=0

echo "Starting assessment of $TOTAL datasets" | tee "$LOG_FILE"
echo "$(date): Begin" >> "$LOG_FILE"

for DATASET_FILE in "$INPUT_DIR"/*.json; do
    DATASET_NAME=$(basename "$DATASET_FILE" .json)
    OUTPUT_FILE="$OUTPUT_DIR/${DATASET_NAME}_assessment.json"

    CURRENT=$((CURRENT + 1))

    # Skip if already assessed
    if [ -f "$OUTPUT_FILE" ]; then
        echo "[$CURRENT/$TOTAL] Skipping (exists): $DATASET_NAME"
        continue
    fi

    echo "[$CURRENT/$TOTAL] Assessing: $DATASET_NAME"
    echo "$(date): [$CURRENT/$TOTAL] $DATASET_NAME" >> "$LOG_FILE"

    claude -p \
      "أنت مقيّم متخصص في مجموعات بيانات معالجة اللغة العربية. اكتب كل شيء بالعربية.

الخطوة ١: اقرأ ملف البيانات الوصفية: $DATASET_FILE

الخطوة ٢: حاول تحميل عينات حقيقية من البيانات:
  - إذا يوجد رابط HuggingFace، استخدم:
    python3 -c \"from datasets import load_dataset; ds = load_dataset('<id>', split='train', streaming=True, trust_remote_code=True); [print(row) for i, row in enumerate(ds) if i < 10]\"
  - إذا فشل، جرب WebFetch على صفحة HuggingFace
  - إذا يوجد رابط GitHub، حاول قراءة الملفات الخام

الخطوة ٣: افتح رابط الورقة البحثية لفهم المنهجية.

الخطوة ٤: بناءً على ما رأيته فعلياً، قيّم الجودة واكتب JSON إلى: $OUTPUT_FILE

هيكل JSON:
{
  \"الاسم\": \"<اسم>\",
  \"الاسم_الأصلي\": \"<name>\",
  \"درجة_الجودة\": <0-100>,
  \"تقدير_الجودة\": \"<ممتاز|جيد|مقبول|ضعيف>\",
  \"الملخص\": \"<3-5 جمل بالعربية>\",
  \"فحص_البيانات\": {
    \"الطريقة_المستخدمة\": \"<datasets_lib|hf_viewer|github_raw|metadata_only>\",
    \"عدد_العينات_المفحوصة\": <عدد>,
    \"معاينة_العينات\": [\"<3 أمثلة حقيقية>\"],
    \"مشاكل_مكتشفة\": [\"<مشاكل بالعربية>\"],
    \"البيانات_تطابق_الوصف\": <true|false>
  },
  \"نقاط_القوة\": [\"<بالعربية>\"],
  \"نقاط_الضعف\": [\"<بالعربية>\"],
  \"الاستخدامات_الموصى_بها\": [\"<بالعربية>\"],
  \"تفصيل_الجودة\": {
    \"سهولة_الوصول\": <0-100>,
    \"التوثيق\": <0-100>,
    \"السلامة_الأخلاقية\": <0-100>,
    \"الترخيص\": <0-100>,
    \"قابلية_إعادة_الإنتاج\": <0-100>,
    \"المراجعة_العلمية\": <0-100>,
    \"جودة_البيانات\": <0-100>
  },
  \"المصادر_المفتوحة\": [\"<URLs>\"],
  \"تم_تحميل_البيانات\": <true|false>
}

التقديرات: ٨٠-١٠٠=ممتاز، ٦٠-٧٩=جيد، ٤٠-٥٩=مقبول، ٠-٣٩=ضعيف
اكتب كل النصوص بالعربية الفصحى."

    # Brief pause to avoid API rate limits
    sleep 2
done

echo "$(date): Complete — $CURRENT datasets processed" >> "$LOG_FILE"
echo "Done. Results in $OUTPUT_DIR"
```

### Why the Script Skips Existing Files

The `if [ -f "$OUTPUT_FILE" ]` check is critical. If the process crashes at dataset 247, you restart the script and it picks up at 248. No duplicate work, no lost progress.

---

## Step 5: Run It

From inside the sandbox:

```bash
chmod +x assess_datasets.sh
./assess_datasets.sh
```

Or run it as a one-shot command from the host:

```bash
docker sandbox run my-sandbox -- -p "Run /path/to/assess_datasets.sh"
```

### Monitoring Progress

From the host, check the progress log:

```bash
tail -f ~/sandbox-workspace/output/progress.log
```

Check how many assessments are complete:

```bash
ls ~/sandbox-workspace/output/*_assessment.json | wc -l
```

Open a second terminal into the sandbox to inspect results as they come in:

```bash
docker sandbox exec -it my-sandbox bash
cat ~/sandbox-workspace/output/ajgt_assessment.json | python3 -m json.tool
```

---

## What the Sandbox Actually Prevents

Here's a concrete comparison of what happens with and without the sandbox:

| Scenario | Without Sandbox | With Docker Sandbox |
|----------|----------------|-------------------|
| Claude runs `rm -rf ~/Documents` | Your documents are deleted | Only sandbox files affected; host untouched |
| Claude runs `pip install malicious-pkg` | Installed on your system | Installed only in the microVM |
| Claude fetches `http://evil-exfil-site.com` | Request goes through | **Blocked** by network denylist policy |
| Claude reads `~/.ssh/id_rsa` | Returns your private key | File doesn't exist in sandbox |
| Claude runs `docker rm -f $(docker ps -q)` | Kills your running containers | Only affects sandbox's private daemon |
| Claude writes to `/etc/hosts` | Modifies your system | Modifies only the microVM's hosts file |
| Process crashes | Orphaned processes on your system | MicroVM contains everything; `docker sandbox rm` cleans up |

---

## Sandbox Lifecycle

### Persistence

Sandboxes **persist** until you remove them. If you close your terminal or restart your machine:

```bash
# Reconnect to an existing sandbox
docker sandbox run my-sandbox

# List all sandboxes
docker sandbox ls
```

Everything you installed (pip packages, downloaded files, configs) is still there.

### Cleanup

When you're done with all 580 assessments:

```bash
# Copy results out (they're already synced via workspace)
ls ~/sandbox-workspace/output/

# Remove the sandbox and all its packages/state
docker sandbox rm my-sandbox
```

---

## Parallel Processing with Multiple Sandboxes

For faster throughput, split the 580 datasets across multiple sandboxes:

```bash
# Split input files into 4 batches
mkdir -p ~/batch-{1,2,3,4}/input ~/batch-{1,2,3,4}/output

ls ~/sandbox-workspace/input/*.json | head -145 | xargs -I{} cp {} ~/batch-1/input/
ls ~/sandbox-workspace/input/*.json | tail -n+146 | head -145 | xargs -I{} cp {} ~/batch-2/input/
ls ~/sandbox-workspace/input/*.json | tail -n+291 | head -145 | xargs -I{} cp {} ~/batch-3/input/
ls ~/sandbox-workspace/input/*.json | tail -n+436 | xargs -I{} cp {} ~/batch-4/input/

# Launch 4 sandboxes in parallel
docker sandbox run batch-1 ~/batch-1
docker sandbox run batch-2 ~/batch-2
docker sandbox run batch-3 ~/batch-3
docker sandbox run batch-4 ~/batch-4
```

Each sandbox is a fully independent microVM. They don't share state, network, or filesystem.

---

## Tips and Gotchas

### 1. Always Set API Key Globally

If you pass `ANTHROPIC_API_KEY` inline (`ANTHROPIC_API_KEY=sk-xxx docker sandbox run ...`), the Docker daemon might not see it. Always use `~/.zshrc` and restart Docker Desktop.

### 2. Workspace Sync is Bidirectional

Files Claude writes to the workspace directory appear on your host immediately. This is how you get results out — no `docker cp` needed.

### 3. Sandboxes Don't Show in `docker ps`

They're microVMs, not containers. Use:
```bash
docker sandbox ls     # list sandboxes
docker sandbox rm X   # remove sandbox
```

### 4. Network Policy Changes Take Effect Immediately

You can tighten or loosen network rules while the sandbox is running. No restart needed.

### 5. Certificate Pinning

Some services use certificate pinning. If a fetch fails inside the sandbox, the proxy's HTTPS interception might be the cause. Use bypass mode:

```bash
docker sandbox network proxy my-sandbox \
  --bypass-host api.pinned-service.com
```

### 6. Rate Limits

When processing 580 datasets sequentially, Claude makes ~5,000 API calls. Add a `sleep 2` between datasets to stay within rate limits. For parallel sandboxes, increase the delay or check your API tier limits.

---

## The Result

After running this setup on our 580 Modern Standard Arabic datasets, each assessment file looks like this:

```json
{
  "الاسم": "تغريدات أردنية عامة للتحليل العاطفي",
  "الاسم_الأصلي": "Arabic Jordanian General Tweets (AJGT)",
  "درجة_الجودة": 65,
  "تقدير_الجودة": "جيد",
  "الملخص": "مجموعة بيانات تتضمن 1,800 تغريدة عربية...",
  "فحص_البيانات": {
    "الطريقة_المستخدمة": "datasets_lib",
    "عدد_العينات_المفحوصة": 1800,
    "معاينة_العينات": ["اربد فيها جامعات اكثر من عمان..."],
    "مشاكل_مكتشفة": ["حجم صغير جداً", "لا يوجد تقسيم اختبار"],
    "البيانات_تطابق_الوصف": true
  },
  "تفصيل_الجودة": {
    "سهولة_الوصول": 90,
    "التوثيق": 45,
    "السلامة_الأخلاقية": 50,
    "الترخيص": 20,
    "قابلية_إعادة_الإنتاج": 50,
    "المراجعة_العلمية": 70,
    "جودة_البيانات": 70
  },
  "تم_تحميل_البيانات": true
}
```

Claude actually loaded all 1,800 samples via the Python `datasets` library, verified zero duplicates, checked label distribution, and found specific quality issues — all from inside a sandbox where the worst it could do is clutter its own temporary filesystem.

---

## Resources

- [Docker Sandboxes Documentation](https://docs.docker.com/ai/sandboxes/)
- [Docker Sandboxes: Get Started](https://docs.docker.com/ai/sandboxes/get-started/)
- [Configure Claude Code in Docker Sandboxes](https://docs.docker.com/ai/sandboxes/claude-code/)
- [Network Policies Reference](https://docs.docker.com/ai/sandboxes/network-policies/)
- [Claude Code Sandboxing Docs](https://code.claude.com/docs/en/sandboxing)
- [Docker Sandboxes Blog Post](https://www.docker.com/blog/docker-sandboxes-run-claude-code-and-other-coding-agents-unsupervised-but-safely/)
