# 📡 Skill: GROK_PULSE (COMMUNITY_INTEL)
**Class**: `Intelligence / Real-time`
**Purpose**: Inject real-time community context and "Vibe Checks" into applications using the X.ai (Grok) API.

## 📜 Description
The world moves fast. Static AI models (trained on data from 2023) are obsolete for trends. This skill integrates **Grok** to ensure your application is "In Tuned" with reality, checking current events, sentiment, and community pulses.

## 🛠️ Tech Stack
-   **API**: X.ai (Grok API)
-   **Context**: Real-time X (Twitter) Data Stream
-   **Role**: The "Scout" or "News Anchor"

## ⚡ Protocol
1.  **Vibe Check**: Before offering advice, the app consults Grok.
    -   *Query*: "What is the sentiment among indie hackers regarding 'Building in Public' today?"
2.  **Trend Injection**: If a user is tracking "Fitness", fetch trending fitness challenges on X to suggest relevant goals.
3.  **Reality Grounding**: Use Grok to verify if a "Best Practice" has recently changed or been debunked by the community.

## 🧬 Pattern: The Reality Check
```ts
async function getCommunityPulse(topic: string) {
  const completion = await openai.chat.completions.create({
    model: "grok-beta", // Access real-time X data
    messages: [
      { role: "system", content: "You are plugged into the live community feed." },
      { role: "user", content: `What are people saying about ${topic} right now? Give me the raw sentiment.` }
    ],
  });
  return completion.choices[0].message.content;
}
```

## 🚨 Anti-Patterns
-   **Don't** treat Grok as a coder (use DeepSeek for that).
-   **Don't** let community noise override user data (Grok is advice, not law).
