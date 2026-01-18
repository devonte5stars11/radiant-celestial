# 🛰️ Skill: MISSION_CONTROL
**Class**: `Meta / Management`
**Purpose**: The "mission-based" operating manual for the Apex Antigravity Agent Manager.

## 1. The Paradigm Shift
In this system, you do not "chat." You issue **Missions**.
- **Old Way**: "Write a button component."
- **Apex Way**: "Deploy a UI Agent to build, style, and visually verify the button component."

## 2. The "God-Tier" Agent Mission Prompt

*Copy-paste this when assigning a new task to an agent (Swarm, Forge, or Trinity).*

```text
# MISSION: [Insert Component/Feature Name]
# AGENT ROLE: Principal Frontend Engineer + QA Lead
# TARGET: [Describe Goal]

# PHASE 1: PRE-FLIGHT (PLANNING)
Before writing code, generate a "Task List" artifact that confirms:
1.  **Spec Compliance:** compliance with Vercel Design Guidelines.
2.  **Constraints:** Adherence to ui-skills.com (No arbitrary values, multiples of 4px).
3.  **Tech Stack:** Next.js 15, Tailwind, shadcn/ui, motion/react.

# PHASE 2: EXECUTION (THE BUILD)
Build the component with "Mobile-First" logic.
* Use `text-balance` for headings.
* Use `motion/react` for a subtle "mount" animation.
* Ensure all interactive states (hover/focus/active) are defined.

# PHASE 3: AUTONOMOUS VERIFICATION (CRITICAL)
Perform the "Rams Protocol":
1.  **Visual Audit:** Verify component in browser (or via mental simulation if headless).
2.  **Self-Correction:** If spacing looks off (>4px drift) or contrast is low, FIX IT.
3.  **Artifact Generation:** Confirm accessibility focus states.

# SUCCESS CRITERIA
* Code is committed.
* "Delightful" interaction confirmed.
* No WCAG violations.
```

## 3. The Antigravity Workflow Loop

| Step | Action | The "Alpha" Move |
| :--- | :--- | :--- |
| **1. Spawn** | Use `AGENT_FORGE` or `AGENT_SWARM`. | Assign specific roles (e.g., "UI Specialist"). |
| **2. Brief** | Use the **Mission Prompt** above. | Attach `ui-skills` context / `APEX_UI_PROTOCOL`. |
| **3. Monitor** | Review "Plan" artifact. | **Reject** if accessibility/shadcn isn't explicit. |
| **4. Verify** | Review outcomes/screenshots. | Don't trust code. Trust the visual. |
| **5. Merge** | Commit changes. | Run final QA. |
