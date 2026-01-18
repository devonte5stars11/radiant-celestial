# Cursor-First AI Engineering Workflow

**Source:** @swyx

**Protocol:**
1. Start every coding session in Cursor (AI code editor) with a high-level spec prompt: "Design a production-ready [feature] for [app] using [stack], including error handling, logging, and tests."
2. Generate initial scaffold code via Cursor Composer (Cmd+I), then iterate with inline edits (Cmd+K) for refinements based on runtime feedback.
3. Run local tests immediately; use Cursor's @web/@docs for real-time research if issues arise, committing micro-changes to Git after each passing test suite.
4. Deploy to Vercel/Cloudflare via CLI with AI-generated deployment scripts; monitor with Sentry/PostHog, feeding logs back into Cursor for auto-fixes.
5. Weekly review: Prompt Cursor with "Analyze last week's commits for anti-patterns and suggest refactor PRs" – approve/merge top 3.

**Anti-patterns:**
- Don't code manually first – always spec-prompt to avoid siloed thinking.
- Don't batch tests/deployments – micro-iterations prevent drift.
- Don't ignore runtime logs – treat them as prompt fuel, not post-mortems.
- Don't skip weekly AI audits – leads to tech debt accumulation.