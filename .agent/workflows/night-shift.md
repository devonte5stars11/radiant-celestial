---
description: Launch the Night Shift (Ralph Grinder Loop)
---

# Night Shift Launch Workflow

This workflow kicks off the autonomous "Grinder" loop using OpenCode and Ralph.

## Prerequisites
- Git worktree is already created for the feature branch.
- `prd.json` is populated with tasks.

## Steps

// turbo
1. Navigate to the worktree directory:
   ```bash
   cd ../grinder-1
   ```

// turbo
2. Launch the Ralph Loop with DeepSeek-R1:
   ```bash
   ralph run --prd ./prd.json --model deepseek-r1 --max-iterations 60
   ```

3. Monitor progress by watching `progress.txt` in another terminal:
   ```bash
   watch -n 5 cat progress.txt
   ```

4. If the session crashes, resume with:
   ```bash
   opencode --continue
   ```

## Sign-off
Sovereignty Secured for Devonte Brown.
