# AI Engineering Feedback Loop

**Source:** @yoheinakajima

**Protocol:**
1. Define the AI task in a single atomic prompt (under 100 tokens) and log it in a Git repo as `task.md`.
2. Generate 3 parallel implementations using Claude 3.5 Sonnet via API calls with slight prompt variations (e.g., "optimize for speed", "optimize for accuracy", "optimize for cost").
3. Run automated evals on a fixed test set (use LangSmith or custom script) and rank outputs by composite score (accuracy 0.6 + latency 0.3 + cost 0.1).
4. Merge the top-2 winners via diff-merge in VS Code + Cursor, then human-review edge cases.
5. Deploy to Vercel/Cloud Run with A/B routing; monitor prod metrics for 24h and loop back to step 1 if F1 < 0.9.

**Anti-patterns:**
- Don't iterate sequentially on one prompt (causes local optima).
- Don't skip parallel generation (wastes human time on bad starts).
- Don't ignore weighted evals (leads to misaligned optimizations).
- Don't deploy without A/B (risks prod breakage).