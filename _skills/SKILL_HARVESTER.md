---
name: SKILL_HARVESTER
description: Automated protocol for extracting reusable patterns from codebase.
---

# Skill Harvester (Night Shift)

## Purpose
To automatically scan the codebase for high-value patterns and document them in the `_skills/` directory, ensuring the system evolves its intelligence over time.

## Usage
Run via npm:
```bash
npm run harvest
```

## Logic
1. Scans `src/` for complex React patterns.
2. Identifies reusable logic (Hooks, UI components).
3. (Future) Uses LLM to generate documentation.
