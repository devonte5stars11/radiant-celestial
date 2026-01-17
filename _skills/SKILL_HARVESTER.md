# 🧬 Skill: SKILL_HARVESTER (Meta-Learning)
**Class**: `Meta / Intelligence`
**Purpose**: Autonomously discover, reverse-engineer, and crystallize new agent skills from the best workflows shared on X.

## 📜 Description
This is the "Self-Evolving Arsenal." It monitors X (via Grok) for cutting-edge workflows, productivity systems, and engineering patterns shared by top performers. When it identifies a valuable pattern, it automatically reverse-engineers it into a reusable Agent Skill.

## 🛠️ Tech Stack
-   **API Gateway**: OpenRouter (unified access to all models)
-   **Primary Model**: `x-ai/grok-beta` (Best ROI: Real-time X data at lowest cost)
-   **Fallback Models**: `anthropic/claude-3.5-sonnet` (for complex reverse-engineering)
-   **Storage**: `/_skills/` directory (auto-generated `.md` files)
-   **Curation**: Verified accounts only (10k+ followers, proven expertise)

## ⚡ Protocol

### Step 1: Define Niches to Monitor
```json
{
  "niches": [
    "AI Engineering",
    "Productivity Systems",
    "Code Architecture",
    "Indie Hacking",
    "Deep Work",
    "Learning Frameworks"
  ],
  "sources": {
    "verified_only": true,
    "min_followers": 10000,
    "include_lists": ["founders", "ai-researchers", "staff-engineers"]
  }
}
```

### Step 2: Grok Monitoring Query
```typescript
const query = `
  Find tweets from verified accounts with >10k followers
  in the last 7 days discussing:
  - New productivity workflows
  - Engineering best practices
  - AI tool integrations
  - Deep work protocols
  
  Filter for actionable frameworks (not vague advice)
`;
```

### Step 3: Reverse Engineering
For each discovered workflow:
1.  **Extract**: Pull the core protocol from the thread/tweet
2.  **Structure**: Convert to markdown skill format:
    ```
    # Skill Name
    ## Description
    ## Protocol (step-by-step)
    ## Anti-Patterns
    ```
3.  **Validate**: Check if it's truly novel (doesn't duplicate existing skills)
4.  **Save**: Write to `/_skills/HARVESTED_[topic]_[date].md`

### Step 4: Weekly Curation
-   Run automated scan every Sunday at 2 AM
-   Generate a digest: "5 New Skills Harvested This Week"
-   Auto-add to `ARSENAL_INDEX.md`

## 🧬 Example Harvest

**Input (X Thread)**:
> "My new 'Deep Work 3.0' protocol:
> 1. 90min blocks with 20min breaks
> 2. Phone in Faraday cage
> 3. Lo-fi + binaural beats
> 4. AI co-pilot logs distractions"

**Output (New Skill)**:
`/_skills/DEEP_WORK_3.0.md`
```markdown
# Deep Work 3.0
**Class**: Productivity
**Source**: @username on X (2026-01-15)

## Protocol
1. Schedule 90-minute focus blocks
2. Eliminate all connectivity (Faraday cage for phone)
3. Play lo-fi music + binaural beats
4. Use AI to track/log distraction attempts
```

## 🚨 Anti-Patterns
-   **Don't** harvest from unverified accounts (noise > signal)
-   **Don't** duplicate existing skills (check `ARSENAL_INDEX` first)
-   **Don't** save vague advice ("just work harder")—only actionable protocols
