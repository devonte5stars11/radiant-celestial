# Cursor Composer Workflow for AI Engineering

**Source:** @swyx (verified, 100k+ followers)

**Protocol:**
1. Define the "vibe" of the project in 1-2 sentences (e.g., "Build a RAG pipeline that feels fast and reliable").
2. Use Cursor Composer to generate initial boilerplate with @web search for latest libs (e.g., "@web LangGraph latest").
3. Iterate in "vibe mode": Describe changes in natural language, apply diffs, test inline with Composer’s preview.
4. Add evals early: Prompt Composer to "generate 5 synthetic test cases and pytest suite".
5. Deploy via Composer: "@apply Deploy to Vercel with env vars from .env".

**Anti-patterns:**
- Starting with architecture diagrams instead of prototyping vibes.
- Manual dependency hunting without @web.
- Skipping inline evals until "done".
- Over-editing diffs manually—let Composer handle 80%.