# 🧠 THE MAX POTENTIAL INTELLIGENCE STACK (v5.0)

This is the final, production-ready architecture for Ralph Corp.

## 🏛️ The 3-Tier Stack
| Role | Model | Capabilities |
|------|-------|--------------|
| **Leader** | `x-ai/grok-beta` | Strategic Planning, File Path Identification |
| **Engineer** | `deepseek/deepseek-r1` | **READ** existing files, **WRITE** multi-file JSON output |
| **Verifier** | `gemini-2.0-pro` | Runs `npm run build`, checks for real errors, Approves/Rejects |

## 🛠️ The Tool Belt (Agent's Hands)
The agents now have access to:
1.  `readFile(path)` → Returns file content.
2.  `writeFile(path, content)` → Creates/updates files.
3.  `runCommand(cmd)` → Executes shell commands, returns stdout/stderr.

## 🔄 The Loop (With Retry)
```
for each task:
    for attempt in 1..MAX_RETRIES:
        1. Leader: Get Strategy (read context, identify files)
        2. Engineer: Produce JSON { files: [{path, content}] }
        3. Parse & Write all files to disk
        4. Verifier: Run `npm run build`
           - If FAIL: Feed error back to Engineer, RETRY
           - If PASS: Get final approval, COMMIT
```

## 🏠 Local Failover
*   **Model**: `qwen2.5-coder:32b`
*   **Trigger**: Automatically used if OpenRouter is unreachable.

**Status**: **MAX POTENTIAL UNLOCKED.** 🌿🐲💎
