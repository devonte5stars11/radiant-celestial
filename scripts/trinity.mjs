// Trinity Orchestrator - Automated Multi-Agent Task Routing
// Usage: node scripts/trinity.mjs "your task here"

import 'dotenv/config';
import OpenAI from 'openai';

const openrouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Model configuration (OpenRouter valid IDs)
const MODELS = {
    planner: 'google/gemini-2.0-flash-exp:free',
    builder: 'deepseek/deepseek-r1',
    polisher: 'anthropic/claude-3.5-sonnet'
};

// Task classification
function classifyTask(task) {
    const planKeywords = ['how should', 'design', 'architecture', 'approach', 'plan', 'strategy'];
    const buildKeywords = ['implement', 'build', 'create', 'write', 'add', 'code'];
    const polishKeywords = ['review', 'improve', 'document', 'refactor', 'explain', 'polish'];

    const lowerTask = task.toLowerCase();

    if (planKeywords.some(kw => lowerTask.includes(kw))) return 'plan';
    if (buildKeywords.some(kw => lowerTask.includes(kw))) return 'build';
    if (polishKeywords.some(kw => lowerTask.includes(kw))) return 'polish';

    // Default to full orchestration for complex tasks
    return 'full';
}

async function callModel(modelKey, systemPrompt, userPrompt) {
    console.log(`\n🤖 Calling ${modelKey}...`);

    const completion = await openrouter.chat.completions.create({
        model: MODELS[modelKey],
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ]
    });

    return completion.choices[0].message.content;
}

async function orchestrate(task, mode = null) {
    const taskType = mode || classifyTask(task);

    console.log(`🔱 TRINITY ORCHESTRATOR`);
    console.log(`📋 Task: ${task}`);
    console.log(`🎯 Mode: ${taskType.toUpperCase()}\n`);

    if (taskType === 'plan') {
        const result = await callModel(
            'planner',
            'You are an expert system architect. Analyze the request and create a detailed technical plan.',
            task
        );
        console.log('\n✅ PLAN COMPLETE:\n');
        console.log(result);
        return result;
    }

    if (taskType === 'build') {
        const result = await callModel(
            'builder',
            'You are an expert coder. Implement the requested functionality with clean, production-ready code.',
            task
        );
        console.log('\n✅ BUILD COMPLETE:\n');
        console.log(result);
        return result;
    }

    if (taskType === 'polish') {
        const result = await callModel(
            'polisher',
            'You are a code reviewer and technical writer. Review, document, and refine the provided work.',
            task
        );
        console.log('\n✅ POLISH COMPLETE:\n');
        console.log(result);
        return result;
    }

    if (taskType === 'full') {
        console.log('🔱 FULL TRINITY SEQUENCE INITIATED\n');

        // Phase 1: Plan (Gemini)
        const plan = await callModel(
            'planner',
            'You are an expert system architect. Create a detailed implementation plan.',
            task
        );
        console.log('\n📋 PHASE 1 (PLAN) COMPLETE\n');

        // Phase 2: Build (DeepSeek)
        const build = await callModel(
            'builder',
            'You are an expert coder. Implement the following plan with production-ready code.',
            `${task}\n\nImplementation Plan:\n${plan}`
        );
        console.log('\n⚙️ PHASE 2 (BUILD) COMPLETE\n');

        // Phase 3: Polish (Claude)
        const polish = await callModel(
            'polisher',
            'You are a senior engineer doing final review. Add documentation, improve clarity, and ensure best practices.',
            `Task: ${task}\n\nImplementation:\n${build}`
        );
        console.log('\n✨ PHASE 3 (POLISH) COMPLETE\n');

        console.log('\n🎯 FINAL OUTPUT:\n');
        console.log(polish);
        return polish;
    }
}

// CLI handling
const args = process.argv.slice(2);
const modeFlag = args.find(arg => arg.startsWith('--mode='));
const fullFlag = args.includes('--full');
const mode = modeFlag ? modeFlag.split('=')[1] : (fullFlag ? 'full' : null);
const task = args.filter(arg => !arg.startsWith('--')).join(' ');

if (!task) {
    console.log('Usage: node scripts/trinity.mjs "your task here"');
    console.log('Options:');
    console.log('  --mode=plan|build|polish  Force specific mode');
    console.log('  --full                    Run full orchestration');
    process.exit(1);
}

orchestrate(task, mode).catch(console.error);
