// Agent Swarm - Multi-Persona AI Collaboration System
// Usage: node scripts/swarm.mjs --swarm "Review this feature"

import 'dotenv/config';
import OpenAI from 'openai';

const openrouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Persona definitions
const PERSONAS = {
    security: {
        name: '🛡️ Security Auditor',
        model: 'anthropic/claude-3.5-sonnet',
        systemPrompt: `You are a senior security engineer conducting a code audit. Focus on:
- Authentication and authorization vulnerabilities
- Data exposure and privacy risks
- XSS, CSRF, SQL injection vectors
- Secure storage and transmission
- Rate limiting and DDoS protection
Provide specific, actionable security recommendations.`
    },
    performance: {
        name: '⚡ Performance Engineer',
        model: 'deepseek/deepseek-r1',
        systemPrompt: `You are a performance optimization specialist. Focus on:
- Core Web Vitals (LCP, FID, CLS)
- Bundle size and code splitting
- Network waterfalls and lazy loading
- Database query optimization
- Caching strategies
Provide measurable performance improvements.`
    },
    ux: {
        name: '🎨 UX Specialist',
        model: 'anthropic/claude-3.5-sonnet',
        systemPrompt: `You are a UX/UI expert focused on user experience. Analyze:
- Accessibility (WCAG compliance)
- Mobile responsiveness
- Visual hierarchy and clarity
- Micro-interactions and feedback
- Error handling and edge cases
Provide user-centered design recommendations.`
    },
    docs: {
        name: '📚 Documentation Expert',
        model: 'anthropic/claude-3.5-sonnet',
        systemPrompt: `You are a technical writer focused on code documentation. Review:
- JSDoc completeness and accuracy
- README clarity and examples
- Inline comments for complex logic
- API documentation
- Setup and troubleshooting guides
Ensure documentation is clear and comprehensive.`
    },
    test: {
        name: '🧪 Test Architect',
        model: 'deepseek/deepseek-r1',
        systemPrompt: `You are a testing expert focused on quality assurance. Analyze:
- Unit test coverage
- Integration test scenarios
- Edge cases and error conditions
- E2E user flows
- Test maintainability
Recommend specific test cases to add.`
    },
    architect: {
        name: '🏗️ System Architect',
        model: 'google/gemini-2.0-flash-exp:free',
        systemPrompt: `You are a senior software architect focused on system design. Evaluate:
- Architecture patterns and practices
- Code modularity and reusability
- Data flow and state management
- Scalability concerns
- Technical debt
Provide high-level architectural guidance.`
    }
};

async function callPersona(personaKey, task) {
    const persona = PERSONAS[personaKey];
    console.log(`\n${persona.name} analyzing...`);

    const completion = await openrouter.chat.completions.create({
        model: persona.model,
        messages: [
            { role: 'system', content: persona.systemPrompt },
            { role: 'user', content: task }
        ]
    });

    return {
        persona: persona.name,
        analysis: completion.choices[0].message.content
    };
}

async function synthesize(results, task) {
    console.log(`\n🔮 Synthesizing insights...`);

    const synthesis = results.map(r => `${r.persona}:\n${r.analysis}`).join('\n\n---\n\n');

    const completion = await openrouter.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
            {
                role: 'system',
                content: 'You are a senior engineering manager. Synthesize the following expert analyses into prioritized, actionable recommendations.'
            },
            {
                role: 'user',
                content: `Task: ${task}\n\nExpert Analyses:\n\n${synthesis}\n\nProvide a synthesis with:\n1. Critical issues (must fix)\n2. Important improvements (should fix)\n3. Nice-to-haves (optional)`
            }
        ]
    });

    return completion.choices[0].message.content;
}

async function runSwarm(task, personas = null) {
    console.log(`🐝 AGENT SWARM ACTIVATED`);
    console.log(`📋 Task: ${task}\n`);

    // Default: deploy all personas in swarm mode
    const activePersonas = personas || Object.keys(PERSONAS);

    console.log(`Deploying ${activePersonas.length} specialists...`);

    // Run all personas in parallel
    const results = await Promise.all(
        activePersonas.map(key => callPersona(key, task))
    );

    // Print individual analyses
    console.log('\n' + '='.repeat(60));
    console.log('INDIVIDUAL ANALYSES');
    console.log('='.repeat(60));
    results.forEach(r => {
        console.log(`\n${r.persona}`);
        console.log('-'.repeat(60));
        console.log(r.analysis);
    });

    // Synthesize if multiple personas
    if (results.length > 1) {
        const final = await synthesize(results, task);
        console.log('\n' + '='.repeat(60));
        console.log('🎯 SYNTHESIS & RECOMMENDATIONS');
        console.log('='.repeat(60));
        console.log(final);
        return final;
    }

    return results[0].analysis;
}

// CLI handling
const args = process.argv.slice(2);
const swarmFlag = args.includes('--swarm');
const personaFlag = args.find(arg => arg.startsWith('--persona='));
const task = args.filter(arg => !arg.startsWith('--')).join(' ');

if (!task) {
    console.log('Usage:');
    console.log('  node scripts/swarm.mjs --swarm "your task"');
    console.log('  node scripts/swarm.mjs --persona=security "review auth.ts"');
    console.log('\nAvailable personas:', Object.keys(PERSONAS).join(', '));
    process.exit(1);
}

if (personaFlag) {
    const persona = personaFlag.split('=')[1];
    if (!PERSONAS[persona]) {
        console.error(`Unknown persona: ${persona}`);
        process.exit(1);
    }
    runSwarm(task, [persona]).catch(console.error);
} else if (swarmFlag) {
    runSwarm(task).catch(console.error);
} else {
    console.error('Please specify --swarm or --persona=NAME');
    process.exit(1);
}
