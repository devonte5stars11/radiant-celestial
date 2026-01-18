// 📦 Bundle Ultimate System
// Usage: node scripts/bundle-ultimate.mjs
// Purpose: Reads current skills/scripts and generates a standalone 'install-ultimate.mjs' file to share.

import fs from 'fs';
import path from 'path';

const FILES_TO_BUNDLE = [
    // Core Skills (Apex Architecture)
    '_skills/APEX_UI_PROTOCOL.md',
    '_skills/MISSION_CONTROL.md',
    '_skills/AGENT_SWARM.md',
    '_skills/AGENT_FORGE.md',
    '_skills/TRINITY_PROTOCOL.md',
    '_skills/TRINITY_ORCHESTRATOR.md',
    '_skills/SKILL_HARVESTER.md',
    '_skills/RALPH_PROTOCOL.md',
    '_skills/SOVEREIGN_DATA.md',
    '_skills/ARSENAL_INDEX.md',

    // Core Automation Scripts
    'scripts/swarm.mjs',
    'scripts/trinity.mjs',
    'scripts/harvest-skills.mjs',

    // Config Documentation
    'AGENTS.md'
];

function bundle() {
    console.log('📦 Bundling Ultimate System...');

    const fileData = {};

    for (const filePath of FILES_TO_BUNDLE) {
        try {
            const absolutePath = path.join(process.cwd(), filePath);
            if (fs.existsSync(absolutePath)) {
                console.log(`  + Adding ${filePath}`);
                fileData[filePath] = fs.readFileSync(absolutePath, 'utf8');
            } else {
                console.warn(`  ! Warning: File not found: ${filePath}`);
            }
        } catch (e) {
            console.error(`  x Error reading ${filePath}:`, e);
        }
    }

    // Create the installer script content
    const installerContent = `
/**
 * 🚀 ULTIMATE AGENT ARSENAL - INSTALLER
 * Generated from Devonte's Sovereign System
 * 
 * Usage: node install-ultimate.mjs
 */

const fs = require('fs');
const path = require('path');

const FILES = ${JSON.stringify(fileData, null, 2)};

console.log('🚀 Initializing Ultimate Agent Arsenal...');

// 1. Create Directories
const dirs = ['_skills', 'scripts'];
dirs.forEach(d => {
    const p = path.join(process.cwd(), d);
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true });
        console.log(\`  + Created directory: \${d}\`);
    }
});

// 2. Write Files
Object.entries(FILES).forEach(([relativePath, content]) => {
    const dest = path.join(process.cwd(), relativePath);
    fs.writeFileSync(dest, content);
    console.log(\`  + Installed: \${relativePath}\`);
});

// 3. Create .env.example if missing
const envPath = path.join(process.cwd(), '.env.example');
if (!fs.existsSync(envPath)) {
    const envContent = \`# Ultimate System Config
# Get key at openrouter.ai/keys
OPENROUTER_API_KEY=\`;
    fs.writeFileSync(envPath, envContent);
    console.log('  + Created .env.example');
}

console.log('\\n✅ INSTALLATION COMPLETE');
console.log('-------------------------------------------');
console.log('1. Run "npm install openai dotenv"');
console.log('2. Add your OPENROUTER_API_KEY to .env');
console.log('3. Test: node scripts/swarm.mjs --persona=qa "Audit this folder"');
console.log('-------------------------------------------');
`;

    fs.writeFileSync('install-ultimate.mjs', installerContent);
    console.log('\n✅ BUNDLE COMPLETE: install-ultimate.mjs created.');
    console.log('Send this file to your friend. It contains NO secrets, only power.');
}

bundle();
