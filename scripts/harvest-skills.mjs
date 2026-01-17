// Skill Harvester - Auto-discover workflows from X using OpenRouter + Grok
// Usage: node scripts/harvest-skills.mjs

import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openrouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

const SKILLS_DIR = path.join(process.cwd(), '_skills');
const NICHES = [
    'AI Engineering',
    'Productivity Systems',
    'Code Architecture',
    'Indie Hacking',
    'Deep Work',
    'Startup Growth',
    'Sales & Outbound',
    'Content Creation',
    'Learning Frameworks',
    'Engineering Leadership'
];

async function harvestSkills() {
    console.log('🧬 Skill Harvester: Starting scan...\n');

    for (const niche of NICHES) {
        console.log(`📡 Scanning: ${niche}`);

        const completion = await openrouter.chat.completions.create({
            model: 'x-ai/grok-4.1-fast', // Latest Grok with real-time X access
            messages: [
                {
                    role: 'system',
                    content: 'You are a workflow analyzer. Extract actionable protocols from X discussions.'
                },
                {
                    role: 'user',
                    content: `Find the most valuable workflow or productivity system discussed on X in the last 7 days related to "${niche}". 
          
Requirements:
- From verified accounts with 10k+ followers
- Must be a concrete, step-by-step protocol (not vague advice)
- Must be novel/unique

Return ONLY:
1. Workflow name
2. Source (username)
3. Protocol (numbered steps)
4. Anti-patterns (what NOT to do)

Format as markdown.`
                }
            ]
        });

        const result = completion.choices[0].message.content;

        if (result && result.length > 100) {
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `HARVESTED_${niche.replace(/\s+/g, '_').toUpperCase()}_${timestamp}.md`;
            const filepath = path.join(SKILLS_DIR, filename);

            await fs.writeFile(filepath, result);
            console.log(`✅ Harvested: ${filename}\n`);
        } else {
            console.log(`⚠️  No viable workflows found for ${niche}\n`);
        }

        // Rate limit: wait 2 seconds between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('🎯 Harvest complete! Check /_skills/ for new workflows.');
}

harvestSkills().catch(console.error);
