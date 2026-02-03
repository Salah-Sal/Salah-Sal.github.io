---
layout: post
title: "Tips on Claude Code: Getting the Most Out of Your AI Coding Assistant"
date: 2026-02-03 10:00:00 +0300
lang: en
categories: [Artificial Intelligence, Developer Tools]
tags: [Claude Code, Anthropic, AI Assistant, Productivity, CLI]
---

These tips come directly from Boris (creator of Claude Code) and the Claude Code team at Anthropic. The interesting thing is that everyone on the team uses Claude differently. There's no single "right way" to use Claude Code—everyone's setup is unique. Experiment to find what works best for you.

---

## 1. Do More in Parallel

**This is the single biggest productivity unlock**, and the top tip from the team.

Spin up 3–5 git worktrees at once, each running its own Claude session in parallel. Boris personally uses multiple git checkouts, but most of the Claude Code team prefers worktrees—it's the reason @amorriscode built native support for them into the Claude Desktop app.

Some team members name their worktrees with simple letters and set up shell aliases (`za`, `zb`, `zc`) to hop between them in one keystroke. Others keep a dedicated "analysis" worktree just for reading logs and running queries—never for writing code.

### What Are Git Worktrees?

Normally, a git repository has **one working directory**. If you're working on `feature-A` and suddenly need to fix a bug on `main`, you have to:

1. Stash or commit your incomplete work
2. Switch branches (`git checkout main`)
3. Fix the bug
4. Switch back (`git checkout feature-A`)
5. Restore your work

This is disruptive, especially with a Claude Code session running.

A **worktree** solves this by letting you have **multiple working directories** from the same repo, each on a different branch, **simultaneously**:

```
my-project/              # main branch
my-project-feature-a/    # feature-a branch
my-project-bugfix/       # bugfix branch
```

All three share the same `.git` history, but each has its own isolated files.

### Why Worktrees Are Powerful with Claude Code

| Without Worktrees | With Worktrees |
|-------------------|----------------|
| One Claude session at a time | 3–5 Claude sessions in parallel |
| Must stop work to switch context | Each task is fully isolated |
| Risk of uncommitted changes conflicts | No interference between tasks |

**Example workflow:**

```
Terminal 1: ~/project-feature-a/     → Claude building auth system
Terminal 2: ~/project-bugfix/        → Claude fixing production bug
Terminal 3: ~/project-refactor/      → Claude refactoring utils
```

All running simultaneously with zero conflicts.

### Basic Worktree Commands

```bash
# Create a worktree with a new branch
git worktree add ../project-feature-a -b feature-a

# Create a worktree from an existing branch
git worktree add ../project-bugfix bugfix-123

# List all worktrees
git worktree list

# Remove a worktree when done
git worktree remove ../project-feature-a
```

### Pro Tip: Shell Aliases for Instant Switching (macOS + iTerm)

Set up shell aliases to jump between worktrees in one keystroke.

**Step 1:** Open your zsh config file (macOS uses zsh by default):

```bash
nano ~/.zshrc
```

**Step 2:** Add your aliases at the end of the file:

```bash
# Worktree shortcuts for Claude Code sessions
alias za="cd ~/projects/myapp-a"
alias zb="cd ~/projects/myapp-b"
alias zc="cd ~/projects/myapp-c"
```

**Step 3:** Reload your config:

```bash
source ~/.zshrc
```

Now instead of typing `cd ~/projects/myapp-feature-auth`, just type `za` and hit enter.

**Full workflow in iTerm:**

```bash
# Create named worktrees
git worktree add ~/projects/myapp-a -b feature-auth
git worktree add ~/projects/myapp-b -b bugfix-login
git worktree add ~/projects/myapp-c -b refactor-api

# Open 3 tabs in iTerm (Cmd+T) and in each:
# Tab 1: za → run 'claude'
# Tab 2: zb → run 'claude'
# Tab 3: zc → run 'claude'
```

**iTerm bonus:** Use `Cmd+1`, `Cmd+2`, `Cmd+3` to switch between tabs instantly.

### The Complete Worktree Workflow

Here's the full cycle from setup to cleanup:

**Initial setup:**

```bash
cd ~/projects/myapp

# Create worktrees for different tasks
git worktree add ../myapp-feature-auth -b feature-auth
git worktree add ../myapp-bugfix-login -b bugfix-login
```

Your folder structure:

```
~/projects/
├── myapp/                  # main branch (original)
├── myapp-feature-auth/     # feature-auth branch
└── myapp-bugfix-login/     # bugfix-login branch
```

**Working and committing:**

```bash
za                    # Jump to feature worktree
claude                # Start Claude
> build the login form
> /commit             # Commit when done
git push -u origin feature-auth
```

**Creating a PR:**

```bash
gh pr create --title "Add authentication" --body "Description here"

# Or let Claude do it:
> create a PR for my changes
```

**After the PR is merged:**

```bash
cd ~/projects/myapp           # Go to main worktree
git pull origin main          # Pull merged changes
git branch -d feature-auth    # Delete the merged branch
git worktree remove ../myapp-feature-auth  # Remove the worktree
```

**Keeping a worktree in sync with main:**

```bash
cd ~/projects/myapp-feature-auth
git fetch origin
git rebase origin/main    # Or: git merge origin/main
```

### Understanding What's Shared vs. Isolated

| Shared Across All Worktrees | Isolated Per Worktree |
|----------------------------|----------------------|
| Commit history | Working files |
| Branches | Staged changes |
| Remotes | Current branch |
| Stashes | Uncommitted edits |
| The `.git` folder | File modifications |

**Key insight:** There's only ONE `.git` folder, stored in the main worktree. Other worktrees contain a small `.git` file that points to it.

```
~/projects/
├── myapp/                    # Main worktree
│   ├── .git/                 # ← The only .git folder (shared)
│   └── (working files)
│
├── myapp-feature-a/          # Worktree A
│   ├── .git                  # ← A file pointing to ../myapp/.git
│   └── (working files)       # ← Isolated copy
│
└── myapp-feature-b/          # Worktree B
    ├── .git                  # ← Also points to ../myapp/.git
    └── (working files)       # ← Isolated copy
```

Think of it this way:
- **`.git` folder** = A shared Google Doc (everyone sees changes instantly)
- **Working files** = Your own printed copy (edits are private until you commit)

This means:
- Commits in worktree A are **immediately visible** to worktree B—no fetch needed
- File edits in worktree A have **no effect** on worktree B
- You **cannot** have two worktrees on the same branch

### Alternative: Multiple Git Checkouts

Boris personally uses **multiple git checkouts** instead of worktrees. This means cloning the same repository multiple times:

```bash
git clone git@github.com:user/project.git project-main
git clone git@github.com:user/project.git project-feature
git clone git@github.com:user/project.git project-bugfix
```

Each clone is a **completely independent copy** with its own `.git` folder.

### Worktrees vs. Multiple Checkouts

| Aspect | Worktrees | Multiple Checkouts |
|--------|-----------|-------------------|
| Disk space | Shared `.git` (lightweight) | Separate `.git` each (heavier) |
| Sync | Commits visible instantly | Must `git pull` in each |
| Complexity | Slightly more to learn | Simpler mental model |
| Isolation | Shared history | Fully independent |

**Which should you choose?**
- **Worktrees:** Recommended for most cases—lighter, stays in sync automatically
- **Multiple checkouts:** Better if you prefer full isolation or a simpler approach

Both achieve the same goal: **running multiple Claude Code sessions in parallel without interference**.

---

## 2. Start Every Complex Task in Plan Mode

Pour your energy into the plan so Claude can one-shot the implementation.

One team member has Claude write the plan, then spins up a second Claude session to review it as a staff engineer. Another says the moment something goes sideways, they switch back to plan mode and re-plan—don't keep pushing. They also use plan mode for verification steps, not just building.

### How to Use Plan Mode

Plan Mode instructs Claude to analyze the codebase with read-only operations before making changes. It's perfect for exploring unfamiliar code, planning complex features, or reviewing changes safely.

**When to use it:**
- Multi-step implementations spanning many files
- Exploring a codebase before making changes
- Iterating on the approach with Claude before committing to it

**How to activate:**
- Press **Shift+Tab** to cycle through permission modes during a session
- Start a new session with: `claude --permission-mode plan`
- Run headless: `claude --permission-mode plan -p "Analyze the authentication system"`

Press `Ctrl+G` to open the plan in your default text editor and refine it before Claude proceeds.

---

## 3. Invest in Your CLAUDE.md

After every correction, end with: *"Update your CLAUDE.md so you don't make that mistake again."*

Claude is eerily good at writing rules for itself. Ruthlessly edit your CLAUDE.md over time. Keep iterating until Claude's mistake rate measurably drops.

One engineer has Claude maintain a notes directory for every task, updated after every PR. They point CLAUDE.md at these notes for persistent context.

---

## 4. Create Your Own Skills and Commit Them to Git

If you do something more than once a day, turn it into a skill or command. Reuse across every project.

**Ideas from the team:**
- Build a `/techdebt` slash command to find and eliminate duplicated code at the end of every session
- Create a slash command that syncs 7 days of Slack, Google Drive, Asana, and GitHub into one context dump
- Build specialized agents that write dbt models, review code, and run tests

Learn more in the [Skills Documentation](https://code.claude.com/docs/en/skills#extend-claude-with-skills).

---

## Quick Reference: Common Workflows

### Understand a new codebase

```
> give me an overview of this codebase
> explain the main architecture patterns used here
> what are the key data models?
```

### Fix bugs

```
> I'm seeing an error when I run npm test
> suggest a few ways to fix the @ts-ignore in user.ts
> update user.ts to add the null check you suggested
```

### Work with tests

```
> find functions in NotificationsService.swift not covered by tests
> add tests for the notification service
> add edge case tests for error conditions
```

### Create pull requests

```
> /commit-push-pr
```

This commits, pushes, and opens a PR in one step.

### Extended thinking

Extended thinking is enabled by default, giving Claude up to 31,999 tokens to reason through complex problems. Toggle with `Option+T` (macOS) or `Alt+T` (Windows/Linux). View Claude's thinking with `Ctrl+O`.

### Resume previous sessions

```bash
claude --continue    # Continue the most recent conversation
claude --resume      # Open a conversation picker
```

Use `/rename auth-refactor` to name sessions for easy retrieval later.

---

## Resources

- [Claude Code Documentation](https://code.claude.com/docs)
- [Common Workflows](https://code.claude.com/docs/en/common-workflows)
- [Best Practices](https://code.claude.com/docs/en/best-practices)
- [Skills Documentation](https://code.claude.com/docs/en/skills)
