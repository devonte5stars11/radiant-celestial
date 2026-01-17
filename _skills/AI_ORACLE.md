# 🔮 Skill: AI_ORACLE (LOCAL_INTEL)
**Class**: `Intelligence / Edge`
**Purpose**: Integrate Local LLMs and predictive agents directly into the sovereign app.

## 📜 Description
"Ultimate" status requires the app to think for itself. This skill moves the app from a "Passive Database" to an "Active Oracle" using local browser AI (Chrome Prompt API / WebLLM).

## 🛠️ Tech Stack
-   **Engine**: `window.ai` (Chrome Built-in) or `WebLLM` (Local WASM)
-   **Context**: Habit Store JSON + System Prompt
-   **Output**: JSON Recommendations / Chat Interface

## ⚡ Protocol
1.  **Environment Check**: Verify browser supports `window.ai` or load `web-llm` worker.
2.  **Context Injection**: Feed the last 30 days of `habit-store` data into the localized prompt.
3.  **Prompting**: Ask for patterns, not just summaries. "Identify the specific trigger causing the Saturday morning streak break."
4.  **Actionable Intelligence**: AI must output a specific change (e.g., "Change goal from 10 to 5 on Saturdays").

## 🧬 Pattern: The Local Coach
```ts
async function getHabitAdvice(habits) {
  const model = await window.ai.createTextSession();
  const prompt = `Analyze these habits: ${JSON.stringify(habits)}. Suggest one micro-improvement for consistency.`;
  return await model.prompt(prompt);
}
```

## 🚨 Anti-Patterns
-   **Don't** send data to external APIs (violates Sovereignty).
-   **Don't** use heavy models that block the main UI thread (use Web Workers).
