---
layout: post
title: "Tracking Large Files with DVC and Google Drive: Replacing Git LFS"
date: 2026-03-01 10:00:00 +0300
lang: en
categories: [Developer Tools, Data Engineering]
tags: [DVC, Google Drive, Git LFS, Data Version Control, MLOps, Large Files]
---

I had a 2 GB SQLite database, a 300 MB backup, and 60 MB of experiment datasets in a git repo. Git LFS tracked the experiment files, but I was already hitting bandwidth limits on pushes. The database wasn't tracked at all — just gitignored and hoping for the best.

I needed a way to version-control these large files alongside my code, share them with collaborators, and not pay for LFS bandwidth. The solution: **DVC (Data Version Control)** with **Google Drive** as the storage backend. Free, unlimited (within your Drive quota), and it took about 15 minutes to set up — plus another 15 debugging Google's OAuth consent screen.

This article walks through the full setup, including every gotcha I hit along the way.

---

## Why Not Git LFS?

Git LFS works well for moderate file sizes, but it has real limitations:

| Issue | Git LFS | DVC + Google Drive |
|-------|---------|-------------------|
| **Storage** | 1 GB free, then $5/50 GB/mo | Your existing Google Drive quota (15 GB free, 100 GB for $2/mo) |
| **Bandwidth** | 1 GB/mo free, then $5/50 GB/mo | No bandwidth limits |
| **Hosting** | Tied to GitHub/GitLab | Any remote (GDrive, S3, GCS, SSH, Azure) |
| **Lock-in** | LFS objects stored on GitHub's servers | Files stored where you choose |
| **Dedup** | Per-repo | Content-addressable cache across repos |

For my use case — a research project with multi-GB databases — Google Drive was the obvious choice. I already had the storage, and DVC makes it feel like a native part of the git workflow.

---

## How DVC Works (30-Second Version)

DVC replaces large files with tiny pointer files (`.dvc`) that get committed to git. The actual data lives in a cache and a remote (Google Drive in our case).

```
# What git sees (committed, ~100 bytes):
data/my_database.db.dvc

# What's on disk (gitignored, managed by DVC):
data/my_database.db          # 2 GB
```

The `.dvc` file is just YAML with an MD5 hash:

```yaml
outs:
- md5: a1b2c3d4e5f6...
  size: 2147483648
  path: my_database.db
```

When a collaborator clones the repo and runs `dvc pull`, DVC reads these pointer files and downloads the matching data from Google Drive. It's content-addressable — if the file hasn't changed, nothing gets re-uploaded or re-downloaded.

One thing to internalize: DVC versions **whole-file snapshots**, not diffs. Deduplication is across *identical* files, so a database that changes a little on every run stores a **full new copy** each time you `dvc add` it. That's fine on Drive (cheap, and old versions are reachable via `git checkout` of the pointer), but don't expect git-style line-level history of the data — for that, export the rows to a text format and track *that*.

---

## Full Setup Guide

### Prerequisites

- A git repository with large files you want to track
- A Google account (for Google Drive storage)
- ~15 minutes

### Step 1: Install DVC

DVC is a command-line tool, so install it **isolated** rather than into a project or system Python. The cleanest way is [`uv`](https://docs.astral.sh/uv/) or `pipx`:

```bash
uv tool install "dvc[gdrive]"      # recommended
# or: pipx install "dvc[gdrive]"
```

On macOS you can also use Homebrew:

```bash
brew install dvc                   # gdrive backend included
```

The `[gdrive]` extra installs the Google Drive backend.

> **Avoid a bare `pip install`.** On modern distros (Fedora, recent Debian/Ubuntu) a system-wide `pip install` fails with an *externally-managed-environment* error (PEP 668), and installing into your project's venv pins DVC as a project dependency it doesn't need. `uv tool`/`pipx` sidestep both by giving DVC its own isolated environment on your `PATH`.

### Step 2: Initialize DVC in Your Repo

```bash
cd your-repo
dvc init
```

This creates:
- `.dvc/` — DVC's config directory (like `.git/` for git)
- `.dvc/config` — remote storage configuration
- `.dvcignore` — like `.gitignore` but for DVC

### Step 3: Create a Google Drive Folder

Go to Google Drive and create a folder for your DVC data. DVC identifies the folder by its **ID**, not its name or path — and the ID only appears in the URL when you **open the folder** in a browser:

```
https://drive.google.com/drive/folders/YOUR_FOLDER_ID
                                        ^^^^^^^^^^^^^^
                                        a ~33-char string of letters/digits/-/_
```

The remote URL is `gdrive://YOUR_FOLDER_ID` — the folder name (e.g. `dvc-storage`) is *not* usable in its place. The ID is not a secret (it grants no access on its own), so it's safe to commit and share.

### Step 4: Configure the Remote

```bash
dvc remote add -d gdrive gdrive://YOUR_FOLDER_ID
```

The `-d` flag sets it as the default remote. Your `.dvc/config` now contains:

```ini
[core]
    remote = gdrive
['remote "gdrive"']
    url = gdrive://YOUR_FOLDER_ID
```

This file is safe to commit — the folder ID alone doesn't grant access.

### Step 5: Set Up Google Cloud OAuth

This is where I spent most of my time. DVC's built-in OAuth client ID is blocked by Google for most accounts. You need to create your own.

#### 5a. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **New Project** (or select an existing one)
3. Give it a name (e.g., "DVC")

#### 5b. Enable the Google Drive API

1. Go to **APIs & Services → Library**
2. Search "Google Drive API"
3. Click **Enable**

#### 5c. Configure the OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Select **External** for user type
3. Fill in:
   - **App name**: `DVC` (or anything)
   - **User support email**: your email
   - **Developer contact**: your email
4. Skip the scopes page (DVC handles this)
5. Leave publishing status as **Testing**

#### 5d. Add Yourself as a Test User

When the app is in "Testing" mode, **even you** can't use it until you're added as a test user:

1. Go to **OAuth consent screen → Audience**
2. Under **Test users**, click **+ Add users**
3. Enter your Gmail address
4. Click **Save**

Without this step, you'll see: *"DVC has not completed the Google verification process. The app is currently being tested, and can only be accessed by developer-approved testers. Error 403: access_denied"*

#### 5e. Create OAuth Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Application type: **Desktop app**
4. Name: `DVC`
5. Click **Create**

After clicking Create, Google shows a confirmation screen with your **Client ID** and a **Download JSON** button. The **Client Secret** is only available inside the downloaded JSON file — it's not displayed on screen. Handle these securely:

> ⚠️ **This is your one and only chance to capture the Client Secret.** Google no longer lets you view or re-download it later — once you close this dialog, the Console shows only the **last 4 characters** of the secret, with no "reveal" option. Download the JSON *now* and back it up. If you lose it, you can't recover it (see ["Recovering a lost secret"](#recovering-a-lost-secret) below — you rotate to a new one).

1. **Copy the Client ID** from the confirmation screen
2. **Download the JSON file** — this is the only way to get your Client Secret. Click the download button immediately.
3. **Save the JSON file outside your git repo** and restrict permissions:

```bash
mkdir -p ~/.config/dvc
mv ~/Downloads/client_secret_*.json ~/.config/dvc/oauth-credentials.json
chmod 600 ~/.config/dvc/oauth-credentials.json
```

4. **Extract the Client Secret** from the JSON file:

```bash
cat ~/.config/dvc/oauth-credentials.json | python3 -c "import sys,json; print(json.load(sys.stdin)['installed']['client_secret'])"
```

Do not commit this JSON file to git. **Back it up somewhere durable** (a password manager is ideal) — it's the *only* copy of your Client Secret, and you'll reuse it to set up DVC on every other machine. Because the Console won't show the secret again, losing this file means rotating to a new secret rather than recovering the old one.

#### 5f. Configure DVC with Your Credentials

```bash
dvc remote modify --local gdrive gdrive_client_id 'YOUR_CLIENT_ID'
dvc remote modify --local gdrive gdrive_client_secret 'YOUR_CLIENT_SECRET'
```

The `--local` flag is critical — it writes to `.dvc/config.local` which is **gitignored** by DVC automatically. Your credentials never get committed to git.

| Config file | Committed to git? | What goes here |
|------------|-------------------|----------------|
| `.dvc/config` | Yes | Remote URL (folder ID) |
| `.dvc/config.local` | No (gitignored) | OAuth client ID and secret |

#### Recovering a lost secret

If you no longer have the JSON — say it was only on a machine you can't reach — **you can't view the old secret again** (the Console shows just its last 4 characters). Don't hunt for it; rotate instead:

1. Open **APIs & Services → Credentials** and click your OAuth client's **name** (not the row icons — the row only offers *edit* and *delete*).
2. On the detail page, click **"Add Secret"**. A client can hold up to **two** secrets at once, so this doesn't disturb anything still using the old one.
3. The new secret is shown **once** — copy it immediately, then feed it to DVC with `dvc remote modify --local … gdrive_client_secret` (Step 5f).
4. Later, **disable/delete** the old secret you couldn't recover.

The **Client ID stays the same** through rotation, so nothing else changes. (Creating a brand-new Desktop client also works, but rotating is less setup.)

### Step 6: Add Files to DVC

```bash
dvc add data/my_database.db data/my_database.db.bak \
        experiments/dataset.json \
        experiments/splits/train.json \
        experiments/splits/test.json
```

> **Tracking a live SQLite database?** Two things to watch:
> - **Checkpoint the WAL first.** A database in WAL mode keeps uncommitted pages in a `-wal` sidecar, so `dvc add` can capture an incomplete snapshot. Close all connections, or run `sqlite3 my_database.db 'PRAGMA wal_checkpoint(TRUNCATE);'` before adding.
> - **Never track the sidecars.** `-wal` and `-shm` are transient — `echo -e '*.db-wal\n*.db-shm' >> .gitignore` and DVC-track only the `.db` itself.

For each file, DVC:
1. Computes the MD5 hash
2. Copies the file to `.dvc/cache/` (local content-addressable store)
3. Creates a `.dvc` pointer file (e.g., `db/arabic_dict.db.dvc`)
4. Adds the original file to `.gitignore` (in the same directory)

You'll see output like:

```
To track the changes with git, run:
    git add data/my_database.db.dvc data/my_database.db.bak.dvc ...
```

### Step 7: Push to Google Drive

```bash
dvc push
```

On first run, this opens a browser for Google OAuth consent. Authorize access, and DVC uploads all tracked files to your Google Drive folder.

```
5 files pushed
```

For my ~2.5 GB of data, the initial push took about 3 minutes on a fast connection.

### Step 8: Commit the DVC Files to Git

```bash
git add .dvc/ .dvcignore \
        data/my_database.db.dvc data/my_database.db.bak.dvc \
        experiments/dataset.json.dvc \
        experiments/splits/train.json.dvc \
        experiments/splits/test.json.dvc \
        experiments/.gitignore \
        experiments/splits/.gitignore

git commit -m "Track large files with DVC + Google Drive"
```

Note that you're committing the `.dvc` pointer files and the DVC-generated `.gitignore` files — not the actual data.

---

## Migrating from Git LFS

If you're already using Git LFS (like I was), the migration is straightforward but the order matters:

```bash
# 1. Remove LFS tracking pattern
git lfs untrack "*.json"

# 2. Remove LFS files from git index (keeps them on disk)
git rm --cached data/large_file.json data/another_file.json

# 3. Add to DVC
dvc add data/large_file.json data/another_file.json

# 4. Push to Google Drive
dvc push

# 5. Uninstall LFS hooks
git lfs uninstall

# 6. Remove .gitattributes if empty
rm .gitattributes

# 7. Commit everything
git add .
git commit -m "Migrate from Git LFS to DVC + Google Drive"
```

The critical step is `git rm --cached` — it removes the LFS pointer from git's index **without deleting the actual file from disk**. Then `dvc add` picks up the real file and creates a DVC pointer.

---

## Setting Up on a New Machine

Whether you're cloning on a second machine or a collaborator is joining the project, the setup is the same.

### Step 1: Clone and Install

```bash
# Install DVC (isolated — see Step 1)
uv tool install "dvc[gdrive]"     # or: pipx install … / brew install dvc

# Clone the repo
git clone git@github.com:your/repo.git
cd repo
```

At this point you have all the code and `.dvc` pointer files, but the actual data files are missing.

### Step 2: Configure OAuth Credentials

The repo's `.dvc/config` already has the Google Drive remote URL, but each machine needs its own OAuth credentials. If you saved the JSON file from Step 5e earlier:

```bash
# Extract Client ID
cat ~/.config/dvc/oauth-credentials.json | python3 -c "import sys,json; d=json.load(sys.stdin)['installed']; print(d['client_id'])"

# Extract Client Secret
cat ~/.config/dvc/oauth-credentials.json | python3 -c "import sys,json; d=json.load(sys.stdin)['installed']; print(d['client_secret'])"

# Configure DVC (use the values printed above)
dvc remote modify --local gdrive gdrive_client_id 'YOUR_CLIENT_ID'
dvc remote modify --local gdrive gdrive_client_secret 'YOUR_CLIENT_SECRET'
```

If you don't have the JSON file on this machine, copy it from your original machine first (e.g., via a USB drive, AirDrop, or a password manager).

### Step 3: Pull the Data

```bash
dvc pull
```

On first run, this opens a browser for Google Drive authentication. Authorize access, and DVC downloads all tracked files. After that, the OAuth token is cached locally and subsequent pulls won't require browser auth.

---

## Daily Workflow

DVC mirrors git's workflow:

```bash
# Check what's changed
dvc status

# After modifying a tracked file (e.g., rebuilding the database)
dvc add data/my_database.db
git add data/my_database.db.dvc
git commit -m "Update database with new entries"
dvc push          # push the DATA first...
git push          # ...then the pointer that references it

# Pull latest data on another machine
git pull
dvc pull
```

The key mental model: **`git` tracks code + `.dvc` pointers, `dvc` tracks the actual data**. Commit the `.dvc` files after running `dvc add`, and **`dvc push` before `git push`** — if the pointer reaches the remote before its data does, a collaborator who runs `git pull && dvc pull` in that window gets a "missing data" error.

---

## Gotchas and Tips

### 1. "This app is blocked" on Google OAuth

DVC's built-in OAuth client ID is unverified and blocked by Google for most accounts. You **must** create your own credentials (Step 5 above). This is the most common DVC + Google Drive setup issue.

### 2. "Error 403: access_denied" Even With Custom Credentials

You created the OAuth app but forgot to add yourself as a test user. While the app is in "Testing" mode (which is fine for personal use), only explicitly listed test users can authenticate. Go to **OAuth consent screen → Audience → Test users → + Add users** and enter your Gmail.

### 3. Don't Commit Your Client Secret

Always use `--local` when setting credentials:

```bash
# WRONG — secret gets committed to git
dvc remote modify gdrive gdrive_client_secret 'abc123'

# RIGHT — stored in .dvc/config.local (gitignored)
dvc remote modify --local gdrive gdrive_client_secret 'abc123'
```

### 4. DVC Init Must Be in the Right Git Repo

If your project has nested git repos (e.g., a parent repo with submodules), make sure you `cd` into the correct repo before running `dvc init`. DVC attaches to whichever `.git/` directory it finds. I accidentally initialized DVC in the parent repo and had to clean it up:

```bash
# If you initialized in the wrong place
rm -rf .dvc .dvcignore

# Then cd to the right repo and init there
cd correct-repo/
dvc init
```

### 5. Whole-Directory Gitignores Block DVC Pointer Files

A **file-glob** ignore is fine: with `*.db` in your `.gitignore`, the data file stays ignored while the `*.db.dvc` pointer (a different name) is *not* matched, so git happily tracks it. DVC even reuses your existing rule instead of adding a duplicate.

The problem is a **whole-directory** ignore (e.g. `extraction/db/`): that swallows the `.dvc` pointer too, so git never tracks it and `dvc pull` has nothing to read. Either:
- Narrow the rule from `extraction/db/` (whole dir) to `extraction/db/*.db` (data files only), or
- Don't DVC-track files inside a fully-ignored directory.

### 6. Publishing Your OAuth App Is Optional

For personal or small-team use, leaving the app in "Testing" mode is fine. You can add up to 100 test users. Publishing requires Google's verification process (they review your app's scopes and privacy policy), which is unnecessary for a DVC remote.

### 7. Google Drive Folder Structure

DVC stores files in Google Drive using their content hash as the filename. Don't be alarmed when you see files like `a1b2c3d4e5f6...` in your Drive folder instead of `arabic_dict.db`. This is by design — it enables content-addressable deduplication.

### 8. The Auth Token Is Cached Per-Machine

The OAuth *client* (id + secret) is reused everywhere, but the **token** from the browser consent is cached locally, under `~/.cache/pydrive2fs/<client_id>/`. That's why every new machine prompts a browser sign-in once even with the same credentials. If auth gets into a weird state (revoked access, "token expired", a stale consent), delete that directory and the next `dvc push`/`pull` re-authenticates cleanly. The harmless `Cannot access .../default.json: No such file or directory` warning on a first push just means that cache doesn't exist yet.

### 9. For CI / Headless: Use a Service Account

The whole user-OAuth flow needs a browser, which you don't have in CI or on a headless server. For automation, create a **Google Cloud service account**, download its JSON key, share the Drive folder with the service account's email, and point DVC at it:

```bash
dvc remote modify --local gdrive gdrive_use_service_account true
dvc remote modify --local gdrive gdrive_service_account_json_file_path path/to/sa-key.json
```

No browser, no per-machine consent — ideal for pipelines. (Treat the key file like any other secret: keep it out of git.)

---

## What's on Google Drive vs. What's in Git

After the full setup, here's what lives where:

| Location | What's There | Size |
|----------|-------------|------|
| **Git** (GitHub) | Code, configs, `.dvc` pointer files | Small |
| **Google Drive** | Database, backups, experiment datasets | ~2.5 GB |
| **Local disk** | Everything (git + DVC cache + working files) | ~5+ GB |

The `.dvc/cache/` directory on your local machine mirrors Google Drive. If you need to free disk space, you can run `dvc gc` to clean up unused cache entries.

---

## Resources

- [DVC Documentation](https://dvc.org/doc)
- [DVC Google Drive Remote Setup](https://dvc.org/doc/user-guide/data-management/remote-storage/google-drive)
- [Google Cloud Console](https://console.cloud.google.com/) — for creating OAuth credentials
- [DVC Command Reference](https://dvc.org/doc/command-reference)
- [Migrating from Git LFS to DVC](https://dvc.org/doc/user-guide/data-management/large-dataset-optimization)
