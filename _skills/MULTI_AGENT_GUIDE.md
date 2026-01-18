# Multi-Agent Orchestration for Radiant Celestial

This document codifies when and how to route tasks across different AI models for optimal results.

## The Trinity Protocol

### Gemini 2.0 Flash Thinking (Scout/Planner)
**Use for:**
- Initial exploration and analysis
- Planning and strategy
- Research and discovery
- Understanding complex codebases
- Designing system architecture

**Strengths:** Fast, excellent at reasoning, broad context understanding

### DeepSeek R1 (Grinder/Executor)  
**Use for:**
- Code generation and implementation
- Bulk refactoring work
- Repetitive tasks at scale
- Technical problem-solving
- Heavy lifting (building features)

**Strengths:** Cost-effective, excellent at coding, handles large volumes

### Claude 3.5 Sonnet (Polisher/Reviewer)
**Use for:**
- Code review and quality assurance
- Documentation and communication
- Complex reasoning and edge cases
- Final polish before deployment
- User-facing content

**Strengths:** Highest quality output, excellent judgment, best for critical decisions

## Practical Workflow

### Phase 1: Planning (Gemini)
```
User Request → Gemini analyzes → Creates implementation_plan.md
```

### Phase 2: Execution (DeepSeek)
```
Approved Plan → DeepSeek builds → Generates code/features
```

### Phase 3: Polish (Claude)
```
Raw Output → Claude reviews → Refined final product
```

## Current Implementation Status

✅ **Trinity is ACTIVE in this session:**
- I (Claude) am handling planning, communication, and quality
- When needed, I can delegate to other models via the user's model selector
- The SKILL_HARVESTER uses Grok (via OpenRouter) for X data access

⚠️ **Future Enhancement:**
- Create a script that automatically routes tasks to the optimal model
- Implement a "Ralph Protocol" runner that uses all three in sequence

## How to Invoke Trinity Manually

**For Planning Phase:**
Switch to "Gemini 2.0 Flash Thinking Experimental" and ask for analysis/strategy.

**For Execution Phase:**
Switch to "DeepSeek R1" and provide the implementation plan for building.

**For Review Phase:**
Switch to "Claude 3.5 Sonnet" (current) for final review and polish.

The system is designed to support this workflow - you control the routing via model selection.
