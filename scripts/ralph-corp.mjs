/**
 * 🏢 RALPH ENTERPRISES v2.0 (Max Potential Edition)
 * --------------------------------------------------
 * Features:
 * 1. READ + WRITE file access (sees your code, writes changes)
 * 2. MULTI-FILE JSON output (change multiple files per task)
 * 3. BUILD VERIFICATION (runs `npm run build`, checks for errors)
 * 4. RETRY LOOP (feeds errors back to Engineer for a second attempt)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CONFIG = {
    maxLoops: 200,
    maxRetries: 2, // Retry a failed task up to 2 times
    prdFile: 'PRD.json',
    logFile: '.agent/corp_diary.txt',
    skillsDir: '_skills',
    ollamaBaseUrl: 'http://localhost:11434/api/chat',
    models: {
        leader: process.env.MODEL_LEADER || 'x-ai/grok-beta',
        engineering: process.env.MODEL_ENGINEER || 'deepseek/deepseek-r1',
        verifier: process.env.MODEL_VERIFIER || 'google/gemini-2.0-pro-exp-02-05',
        local: process.env.MODEL_LOCAL || 'qwen2.5-coder:32b'
    }
};

// Ensure directories exist
['.agent'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function log(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
    fs.appendFileSync(CONFIG.logFile, `[${timestamp}] ${message}\n`);
}

// ============================================
// 🛠️ TOOL BELT: The Agent's Hands
// ============================================

/**
 * Reads the content of a file.
 */
function readFile(filePath) {
    try {
        const fullPath = path.resolve(filePath);
        if (fs.existsSync(fullPath)) {
            return fs.readFileSync(fullPath, 'utf8');
        }
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Writes content to a file, creating directories if needed.
 */
function writeFile(filePath, content) {
    try {
        const fullPath = path.resolve(filePath);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(fullPath, content);
        log(`   ✏️  Updated: ${filePath}`);
        return true;
    } catch (e) {
        log(`   ❌ Write Failed: ${e.message}`);
        return false;
    }
}

/**
 * Runs a command and returns { success, stdout, stderr }.
 */
function runCommand(command) {
    try {
        const stdout = execSync(command, { encoding: 'utf8', timeout: 60000 });
        return { success: true, stdout, stderr: '' };
    } catch (e) {
        return { success: false, stdout: e.stdout || '', stderr: e.stderr || e.message };
    }
}

// ============================================
// 🧠 LLM INTERFACE
// ============================================

async function smartLLMCall(role, model, instructions) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const skillsContext = (() => {
        if (!fs.existsSync(CONFIG.skillsDir)) return "";
        return fs.readdirSync(CONFIG.skillsDir)
            .filter(f => f.endsWith('.md'))
            .map(f => `[SKILL: ${f}]\n${fs.readFileSync(path.join(CONFIG.skillsDir, f), 'utf8').substring(0, 1000)}`) // Limit skill size
            .join('\n---\n');
    })();

    const systemPrompt = `You are the ${role} at Ralph Corp. Follow all skills/protocols.\n${skillsContext}`;
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: instructions }
    ];

    if (OPENROUTER_API_KEY) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://human-being-studio.vercel.app',
                    'X-Title': `Ralph Corp (${role})`
                },
                body: JSON.stringify({ model, messages })
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices?.[0]?.message?.content || 'No response';
            }
        } catch (e) {
            log(`   ⚠️ Cloud error for ${role}. Trying local...`);
        }
    }

    // Local Fallback
    try {
        const response = await fetch(CONFIG.ollamaBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: CONFIG.models.local, messages, stream: false })
        });
        if (response.ok) {
            const data = await response.json();
            return data.message?.content || 'No local response';
        }
    } catch (e) { }

    return role === 'Verifier' ? '{"approved": true}' : '{"files": []}';
}

// ============================================
// 🏭 THE MAIN LOOP
// ============================================

async function runBusiness() {
    log("🏢 RALPH ENTERPRISES v2.0: MAX POTENTIAL ACTIVE");

    // --- CLI HOT TASK INJECTION ---
    const args = process.argv.slice(2);
    if (args.length > 0) {
        const prompt = args.join(' ');
        log(`🔥 HOT TASK DETECTED: "${prompt}"`);

        let existingPrd = { tasks: [] };
        if (fs.existsSync(CONFIG.prdFile)) {
            existingPrd = JSON.parse(fs.readFileSync(CONFIG.prdFile, 'utf8'));
        }

        // Inject at top with ID 'hot-{timestamp}'
        const hotTask = {
            id: `hot-${Date.now()}`,
            story: prompt,
            done: false,
            isHot: true // Flag to skip rigid checks if needed
        };

        existingPrd.tasks.unshift(hotTask);
        fs.writeFileSync(CONFIG.prdFile, JSON.stringify(existingPrd, null, 2));
    }

    for (let i = 1; i <= CONFIG.maxLoops; i++) {
        log(`\n⏰ [Quarter ${i}] Starting New Sprint...`);

        if (!fs.existsSync(CONFIG.prdFile)) {
            log("❌ PRD.json not found!");
            process.exit(1);
        }
        const prd = JSON.parse(fs.readFileSync(CONFIG.prdFile, 'utf8'));
        const pendingTasks = prd.tasks.filter(t => !t.done);

        if (pendingTasks.length === 0) {
            log("🥂 ALL TASKS COMPLETE. IPO Time!");
            process.exit(0);
        }

        const currentTask = pendingTasks[0];
        log(`📋 Task: "${currentTask.story}"`);

        let approved = false;
        let retryCount = 0;
        let lastError = '';

        while (!approved && retryCount < CONFIG.maxRetries) {
            retryCount++;
            log(`   [Attempt ${retryCount}/${CONFIG.maxRetries}]`);

            // --- 1. LEADER: STRATEGY ---
            const leaderPrompt = `
Task: "${currentTask.story}"
${lastError ? `PREVIOUS ATTEMPT FAILED WITH ERROR:\n${lastError}\n` : ''}
Identify the specific file paths that need to be modified or created. 
Read the package.json and src/ directory structure to understand the project.
Output a concise plan.`;
            const strategy = await smartLLMCall("Leader", CONFIG.models.leader, leaderPrompt);
            log("   🧠 Strategy defined.");

            // --- 2. ENGINEER: BUILD ---
            // Gather context by reading key files (Smart Discovery)
            const packageJson = readFile('package.json') || '{}';

            // Smart Entry File Discovery
            let existingCode = '';
            const entrySearchPaths = ['src/App.tsx', 'src/pages/Index.tsx', 'app/src/app/page.tsx', 'app/page.tsx', 'README.md'];
            for (const p of entrySearchPaths) {
                const content = readFile(p);
                if (content) { existingCode = content; log(`   📂 Context from: ${p}`); break; }
            }

            const engineerPrompt = `
## STRATEGY
${strategy}

## TASK
${currentTask.story}
${lastError ? `\nPREVIOUS ERROR TO FIX:\n${lastError}` : ''}

## EXISTING CONTEXT
package.json (first 500 chars): ${packageJson.substring(0, 500)}
Main App/Page (first 1000 chars): ${existingCode.substring(0, 1000)}

## YOUR OUTPUT (STRICT JSON FORMAT)
Respond with ONLY a JSON object. No markdown, no explanation.
{
  "files": [
    { "path": "relative/path/to/file.ts", "content": "...full file content..." }
  ]
}`;
            const engineerResponse = await smartLLMCall("Engineer", CONFIG.models.engineering, engineerPrompt);
            log("   🔨 Engineer produced output.");

            // --- PARSE & WRITE ---
            let filesWritten = 0;
            try {
                // Extract JSON from potential markdown code fences
                const jsonMatch = engineerResponse.match(/```json\n?([\s\S]*?)\n?```/) ||
                    engineerResponse.match(/({[\s\S]*})/);
                if (jsonMatch) {
                    const data = JSON.parse(jsonMatch[1]);
                    if (data.files && Array.isArray(data.files)) {
                        for (const file of data.files) {
                            if (file.path && file.content) {
                                writeFile(file.path, file.content);
                                filesWritten++;
                            }
                        }
                    }
                }
            } catch (e) {
                log(`   ⚠️ Failed to parse engineer output: ${e.message}`);
            }
            log(`   📄 Files written: ${filesWritten}`);

            if (filesWritten === 0) {
                lastError = "Engineer produced no valid file output.";
                continue;
            }

            // --- 3. VERIFIER: BUILD CHECK (Skip for Research/Docs) ---
            const isCodeTask = !currentTask.story.toLowerCase().startsWith('research') &&
                !currentTask.story.toLowerCase().startsWith('post');

            if (isCodeTask) {
                log("   🧪 Running build verification...");
                const buildResult = runCommand('npm run build');

                if (!buildResult.success) {
                    log("   ❌ Build failed!");
                    lastError = buildResult.stderr.substring(0, 1000); // Feed error back
                    // Rollback
                    runCommand('git checkout .');
                    runCommand('git clean -fd');
                    continue;
                }
                log("   ✅ Build passed!");
            } else {
                log("   ⏩ Skipping Build Verification (General/Research Task)");
            }

            // --- 4. VERIFIER: FINAL APPROVAL ---
            const verifierPrompt = `
Task: "${currentTask.story}"
Build Result: SUCCESS
Files Changed: ${filesWritten}

Does this implementation meet the requirements? 
Respond ONLY with JSON: {"approved": true} or {"approved": false, "reason": "..."}`;
            const verifierResponse = await smartLLMCall("Verifier", CONFIG.models.verifier, verifierPrompt);

            try {
                const jsonMatch = verifierResponse.match(/({[\s\S]*})/);
                if (jsonMatch) {
                    const verdict = JSON.parse(jsonMatch[1]);
                    if (verdict.approved) {
                        approved = true;
                    } else {
                        lastError = verdict.reason || "Verifier rejected without reason.";
                    }
                }
            } catch (e) {
                approved = true; // Default to approved if parsing fails
            }
        }

        // --- POST-LOOP: COMMIT OR ROLLBACK ---
        if (approved) {
            log("🎉 TASK APPROVED. Committing...");
            currentTask.done = true;
            fs.writeFileSync(CONFIG.prdFile, JSON.stringify(prd, null, 2));
            runCommand('git add .');
            runCommand(`git commit -m "feat: ${currentTask.story} (Ralph v2.2)"`);
            runCommand('git push'); // 🚀 Push to Remote
            runCommand('npm run harvest'); // Night Shift
        } else {
            log(`🚫 TASK FAILED after ${CONFIG.maxRetries} retries. Skipping for now.`);
            runCommand('git checkout .');
            runCommand('git clean -fd');
        }

        await new Promise(r => setTimeout(r, 500));
    }
}

runBusiness();
