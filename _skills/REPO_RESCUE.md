# 🔧 Skill: REPO_RESCUE (GitHub Sweep)
**Class**: `Automation / Portfolio`
**Purpose**: Systematically audit, fix, and improve all repos in a GitHub account.

## 📜 Description
You have abandoned projects. Everyone does. This skill weaponizes the Agent Arsenal to sweep through your entire GitHub, identify problems, and fix them at scale.

## 🛠️ Tech Stack
-   **CLI**: `gh` (GitHub CLI)
-   **Cloning**: `git clone` into worktrees
-   **Diagnostics**: `npm run build`, `npm run lint`, `npm test`
-   **Execution**: Apply relevant skills from the Arsenal

## ⚡ Protocol

### Step 1: Authenticate
```bash
gh auth login
gh auth status
```

### Step 2: List All Repos
```bash
gh repo list --json name,description,updatedAt,isPrivate,primaryLanguage --limit 100
```

### Step 3: Clone & Diagnose
For each repo:
```bash
git clone https://github.com/USERNAME/REPO.git ../worktrees/REPO
cd ../worktrees/REPO
npm install
npm run build 2>&1 | tee build_log.txt
```

### Step 4: Triage Categories
| Category | Criteria | Action |
|----------|----------|--------|
| **Abandoned** | No commits in 6+ months, broken build | Archive or Rescue |
| **In-Progress** | Recent commits, some issues | Apply skills, finish features |
| **Shipped** | Working, deployed | Polish only (README, docs) |

### Step 5: Apply Arsenal Skills
| Problem | Skill to Apply |
|---------|----------------|
| Ugly UI | `UI_FORGE` |
| No persistence | `SOVEREIGN_DATA` |
| No tests | `VERIFICATION_LOOP` |
| Bad commits | `GIT_DISCIPLINE` |
| No README | Generate one |

### Step 6: Push & Document
```bash
git add .
git commit -m "[RESCUE] Revived by Agent Arsenal"
git push origin main
```

## 🚨 Anti-Patterns
-   **Don't** mass-push without reviewing diffs.
-   **Don't** fix private repos without permission verification.
-   **Don't** delete repos—archive them instead.
