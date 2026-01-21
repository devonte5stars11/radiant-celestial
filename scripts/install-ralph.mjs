#!/usr/bin/env node
/**
 * 🚀 RALPH CORP INSTALLER (Ultimate Edition)
 * Share this script with anyone to install the full system.
 * 
 * Usage: npx https://gist.github.com/YOUR_GIST_URL
 * Or:    node install-ralph.mjs
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REPO_URL = 'https://github.com/devonte5stars11/radiant-celestial.git';
const BRANCH = 'master';

console.log('🏢 RALPH CORP INSTALLER v2.2');
console.log('============================\n');

// 1. Check for git
try {
    execSync('git --version', { stdio: 'ignore' });
} catch {
    console.error('❌ Git is required. Please install Git first.');
    process.exit(1);
}

// 2. Clone or pull
const targetDir = process.argv[2] || 'ralph-corp-ultimate';

if (fs.existsSync(targetDir)) {
    console.log(`📂 Directory '${targetDir}' exists. Pulling latest...`);
    execSync(`git -C ${targetDir} pull origin ${BRANCH}`, { stdio: 'inherit' });
} else {
    console.log(`📥 Cloning Ralph Corp to '${targetDir}'...`);
    execSync(`git clone --depth 1 -b ${BRANCH} ${REPO_URL} ${targetDir}`, { stdio: 'inherit' });
}

// 3. Install dependencies
console.log('\n📦 Installing dependencies...');
execSync(`cd ${targetDir} && npm install`, { stdio: 'inherit' });

// 4. Check for API key
console.log('\n🔑 Checking for OpenRouter API Key...');
if (!process.env.OPENROUTER_API_KEY) {
    console.log('⚠️  No OPENROUTER_API_KEY found in environment.');
    console.log('   Set it with: export OPENROUTER_API_KEY="sk-or-..."');
}

// 5. Done
console.log('\n✅ INSTALLATION COMPLETE!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📁 Location: ${path.resolve(targetDir)}`);
console.log('🚀 Run:      cd ' + targetDir + ' && npm run ralph');
console.log('📖 Docs:     See ULTIMATE_MANIFEST.md');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n🌿🐲💎 Welcome to the Empire of the Self.');
