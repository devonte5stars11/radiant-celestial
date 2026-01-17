# 📜 Skill: GIT_DISCIPLINE
**Class**: `Version Control / History`
**Purpose**: Maintain a clean, auditable history of all work.

## 📜 Description
Git is your time machine. This skill defines commit patterns that make your history readable, reversible, and professional.

## 🏷️ Commit Prefixes
| Prefix | Meaning | Example |
|--------|---------|---------|
| `[GRIND]` | Core feature implementation | `[GRIND] Task #2: Streak Gamification` |
| `[POLISH]` | Refinement, animations, copy | `[POLISH] Hero Section: Add Framer Motion` |
| `[FIX]` | Bug fix | `[FIX] Hydration mismatch on page load` |
| `[CHORE]` | Dependencies, config, cleanup | `[CHORE] Update package.json` |
| `[DOCS]` | Documentation only | `[DOCS] Add README` |
| `[NUKE]` | Major removal or reset | `[NUKE] Remove legacy auth flow` |

## ⚡ Protocol
1.  **Atomic Commits**: One logical change per commit.
2.  **Descriptive Messages**: What changed and why.
3.  **Frequent Commits**: Commit after every verified feature.
4.  **Never Commit Broken Code**: Always verify first.

## 🧬 Command Patterns

### Standard Commit
```bash
git add .; git commit -m "[GRIND] Feature: Short description"
```

### View Recent History
```bash
git log --oneline -10
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Create Feature Branch
```bash
git checkout -b feature/new-feature
```

### Merge to Master
```bash
git checkout master
git merge feature/new-feature
git branch -d feature/new-feature
```

## 🚨 Anti-Patterns
-   **Don't** commit with vague messages like "fix" or "update".
-   **Don't** bundle multiple features in one commit.
-   **Don't** commit node_modules or .env files.
-   **Don't** force push to master without extreme caution.

## 📁 .gitignore Essentials
```
node_modules/
.next/
.env
.env.local
*.log
.DS_Store
```
