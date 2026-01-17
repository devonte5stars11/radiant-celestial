# 🛠️ Skill: MCP_COMMANDER
**Class**: `Tooling / Execution`
**Purpose**: Master the Model Context Protocol tools for maximum autonomy.

## 📜 Description
An agent is only as powerful as its tools. This skill defines how to leverage the file system, browser, and terminal to execute tasks without human intervention.

## 🧰 The Toolkit

### 1. File System
| Tool | Use Case | Example |
|------|----------|---------|
| `view_file` | Read code before editing | Always view before replace |
| `write_to_file` | Create new files | Use for fresh components |
| `replace_file_content` | Edit existing files | Single contiguous edit |
| `multi_replace_file_content` | Multiple edits in one file | Non-adjacent changes |
| `find_by_name` | Find files by pattern | `*.tsx` in `/components` |
| `grep_search` | Search file contents | Find all `useHabitStore` usages |

### 2. Browser
| Tool | Use Case | Example |
|------|----------|---------|
| `browser_subagent` | Complex multi-step verification | Navigate, click, screenshot |
| `read_url_content` | Fetch documentation | Read API docs |

### 3. Terminal
| Tool | Use Case | Example |
|------|----------|---------|
| `run_command` | Execute shell commands | `npm install`, `git commit` |
| `command_status` | Check long-running commands | Monitor `npm run dev` |

## ⚡ Protocol
1.  **Before Editing**: Always `view_file` to understand current state.
2.  **For New Files**: Use `write_to_file` with `Overwrite: false`.
3.  **For Edits**: Use `replace_file_content` for single changes.
4.  **For Verification**: Delegate to `browser_subagent` with clear instructions.
5.  **For Commits**: Use `run_command` with descriptive messages.

## 🧬 Patterns

### The "View-Before-Edit" Pattern
```
1. view_file(target.tsx)
2. Analyze the current structure
3. replace_file_content(target.tsx, exact match, new content)
```

### The "Screenshot Verification" Pattern
```
1. browser_subagent(
   Task: "Navigate to /settings, verify Export button exists, capture screenshot"
   RecordingName: "verify_settings"
)
2. If verification fails, debug and retry.
```

## 🚨 Anti-Patterns
-   **Don't** edit a file without viewing it first (causes mismatch errors).
-   **Don't** use `Overwrite: true` on existing files unless intentional.
-   **Don't** forget to `waitForPreviousTools` when commands depend on each other.
