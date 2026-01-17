# 🔱 Skill: TRINITY_PROTOCOL
**Class**: `Meta / Orchestration`
**Purpose**: Route tasks to the optimal AI model based on task type.

## 📜 Description
Not all models are equal. Each has a specialty. This skill defines when to use which model to maximize output quality and minimize cost/latency.

## 🧠 The Trinity
| Role | Model | Strength | When to Use |
|------|-------|----------|-------------|
| **Planner** | Gemini 2.0 Pro | Architecture, System Design | Starting a new feature, defining structure |
| **Grinder** | DeepSeek-R1 | Fast Coding, Iteration | Writing implementation code, fixing bugs |
| **Polisher** | Claude 3.5 Sonnet | Prose, JSDoc, UX Copy | Final pass, documentation, refinement |

## ⚡ Protocol
1.  **New Feature Request**: Start with **Planner** (Gemini) to define the approach.
2.  **Implementation**: Switch to **Grinder** (DeepSeek) to write the code.
3.  **Review & Docs**: Finish with **Polisher** (Claude) to add JSDoc, refine copy, and ensure elegance.
4.  **Debugging**: Use **Grinder** for speed. If stuck, escalate to **Planner** for a new approach.

## 🧬 Example Workflow
```
[USER]: Build a settings page with data export.

[PLANNER - Gemini]: 
  - Create /settings route
  - Add Zustand export action
  - Use Card components for sections

[GRINDER - DeepSeek]:
  - Writes settings/page.tsx
  - Implements handleExport function
  - Adds file input for import

[POLISHER - Claude]:
  - Adds JSDoc to all functions
  - Refines button labels ("Export Backup" vs "Download")
  - Ensures accessibility (aria-labels)
```

## 🚨 Anti-Patterns
-   **Don't** use Claude for heavy algorithmic logic (it's slow and expensive).
-   **Don't** use DeepSeek for nuanced prose or marketing copy (it's too literal).
-   **Don't** use Gemini for simple bug fixes (overkill).
