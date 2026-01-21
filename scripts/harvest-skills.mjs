/**
 * 🌙 NIGHT SHIFT: Automated Skill Harvester (Intelligent Hybrid)
 */

import fs from 'fs';
import path from 'path';

const SKILLS_DIR = '_skills';
const SOURCES = ['src/components', 'src/hooks'];
const OLLAMA_URL = 'http://localhost:11434/api/chat';

// Ensure skills directory
if (!fs.existsSync(SKILLS_DIR)) {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
}

async function askAI(content) {
    const prompt = `Analyze this code. Convert it into a reusable 'Skill Definition' (Markdown).
    Follow the APEX_UI_PROTOCOL if applicable.
    Output only the markdown content.
    Code: \n\n${content.substring(0, 3000)}`;

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    // 1. Try Cloud
    if (OPENROUTER_API_KEY) {
        try {
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-exp',
                    messages: [{ role: 'user', content: prompt }]
                })
            });
            if (res.ok) {
                const data = await res.json();
                return data.choices?.[0]?.message?.content;
            }
        } catch (e) { }
    }

    // 2. Try Local
    try {
        const res = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3',
                messages: [{ role: 'user', content: prompt }],
                stream: false
            })
        });
        if (res.ok) {
            const data = await res.json();
            return data.message?.content;
        }
    } catch (e) { }

    return "### Skill harvested\n(Manual review required).";
}

async function scanAndHarvest() {
    console.log("🌙 NIGHT SHIFT: Gathering project intelligence...");

    let skillsFound = 0;

    for (const dir of SOURCES) {
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

        for (const file of files) {
            const content = fs.readFileSync(path.join(dir, file), 'utf8');

            if (content.includes('God-Tier') || content.includes('useEffect') || content.length > 800) {
                const skillName = file.replace(/\..+$/, '').toUpperCase() + '_SKILL.md';
                const skillPath = path.join(SKILLS_DIR, skillName);

                if (fs.existsSync(skillPath)) continue;

                console.log(`   💎 Processing Intelligence: ${file}`);
                const skillDoc = await askAI(content);

                fs.writeFileSync(skillPath, skillDoc);
                console.log(`   ✨ Skill Forge Complete: ${skillName}`);
                skillsFound++;

                if (skillsFound >= 1) break;
            }
        }
        if (skillsFound >= 1) break;
    }

    console.log(skillsFound > 0 ? `✅ Harvested ${skillsFound} new intelligence assets.` : "   No new assets detected.");
}

scanAndHarvest();
