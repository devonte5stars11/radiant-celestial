# AI-First Code Review Workflow

**Source:** @swyx

**Protocol:**
1. **Prompt LLM with context**: Feed the code diff + repo README + recent PRs into Claude/GPT-4o with a custom system prompt emphasizing architecture, security, and perf.
2. **Generate 3 variants**: Ask for 3 independent review passes (nitpicks, deep analysis, alternative impls) to reduce hallucination via self-consistency.
3. **Agentic refinement**: Use a secondary agent (e.g., o1-mini) to critique and merge the 3 reviews into a single polished report with diffs.
4. **Human veto loop**: Paste into GitHub PR; approve/reject suggestions manually, logging vetoes to fine-tune the system prompt iteratively.
5. **Metrics dashboard**: Track acceptance rate, bug rate reduction, and cycle time in a Notion/Linear dashboard; retrain prompt monthly on veto data.

**Anti-patterns:**
- Reviewing code manually first (biases human judgment).
- Using a single LLM pass (prone to oversights/missing edge cases).
- Ignoring iterative fine-tuning (leads to stagnant prompt quality).
- Skipping metrics tracking (can't prove ROI or improve).