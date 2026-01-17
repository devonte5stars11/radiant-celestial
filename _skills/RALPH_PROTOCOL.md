# 🌙 Skill: RALPH_PROTOCOL (NIGHT_SHIFT)
**Class**: `Autonomous / Execution`
**Persona**: `Ralph the Grinder`
**Primary Model**: `DeepSeek-R1`

## 📜 Description
This is the "Night Shift" mode. It is designed for hands-off, high-iteration autonomous work where the agent executes the `prd.json` task list until completion or exhaustion.

## 🛠️ Tech Stack
-   **Engine**: OpenCode / Ralph CLI
-   **Config**: `opencode.jsonc`
-   **Input**: `prd.json`
-   **Logic**: `AGENTS.md` (The Platinum Trinity)

## ⚡ Protocol
1.  **Preparation**: Ensure `prd.json` has clearly defined tasks and `AGENTS.md` laws are updated.
2.  **Launching**: Use the `/night-shift` workflow command.
3.  **Command**:
    ```bash
    ralph run --prd ./prd.json --model deepseek-r1 --max-iterations 60
    ```
4.  **Operational Mode**:
    -   Ralph treats the terminal as his "limbs."
    -   He does not ask for permission; he commits code and checks `progress.txt` himself.
    -   He continues until a blocker is identified or the task list is clear.
5.  **Recovery**: If a crash occurs, use `opencode --continue`.

## 🧬 Ralph's Mantra
-   *Execution > Perfection* (DeepSeek Phase).
-   *Atomic Commits* (Every tool execution).
-   *Sovereignty Secured* (Final Handoff).

## 🚨 Anti-Patterns
-   **Don't** launch Ralph without a clear `prd.json` (he will wander).
-   **Don't** interrupt the loop manually unless `status: BLOCKED` is detected.
-   **Don't** expect refined prose from Ralph (he is a surgeon, not a poet; Claude polishes later).

---
**Sovereignty Secured.** 🌿🐲💎
