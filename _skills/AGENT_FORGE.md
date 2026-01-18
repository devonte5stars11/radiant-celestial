# ⚒️ Skill: AGENT_FORGE
**Class**: `Meta / Generation`
**Purpose**: Dynamically spawn new, specialized AI agents on-demand and equip them with the full Arsenal.

## 📜 Description
Why be limited to fixed personas? **Agent Forge** allows the system to create custom agents for specific problems instantly. If you need a "Cobol Migration Expert" or a "Gen Z Marketing Specialist," the Forge creates them, generates their personality/expertise, and grants them access to your library of skills.

## ⚡ Protocol

### Dynamic Spawning
Instead of using a pre-defined persona, describe the agent you need:

```bash
node scripts/swarm.mjs --spawn "SVG Animation Wizard: expert in math and geometry" --task "Create a spinning tesseract loader"
```

### The Forge Process
1.  **Analysis**: The Forge (Gemini 2.0) analyzes your request.
2.  **System Prompt Gen**: It crafts a highly specialized system prompt ("You are a world-class SVG math expert...").
3.  **Skill Injection**: It reads `ARSENAL_INDEX.md` and injects the list of available skills into the new agent's context.
4.  **Execution**: The new agent runs the task immediately.

### Recursive Capability
Agents can theoretically call the Forge to create *other* agents if they encounter obstacles outside their domain (requires Orchestrator integration).

## 🧬 Usage

**Spawn a Specialist:**
```bash
node scripts/swarm.mjs --spawn "Database Migration Expert" "Analyze schema.prisma for optimization"
```

**Spawn a Creative:**
```bash
node scripts/swarm.mjs --spawn "Sci-Fi UI Writer" "Write copy for the dashboard empty states"
```

## 💎 Benefits
-   **Infinite Adaptability**: You are never limited by your predefined team.
-   **Context Aware**: Every spawned agent knows about your existing Skills (`UI_FORGE`, `HYBRID_CLOUD`, etc).
-   **Instant Expertise**: Domain experts on demand.
