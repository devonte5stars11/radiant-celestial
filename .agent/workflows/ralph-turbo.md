---
description: Run Ralph Corp with auto-accept on all commands (Turbo Mode)
---
// turbo-all

# Ralph Corp Turbo Mode

This workflow runs the Ralph Corp agent with automatic command approval.

## Steps

1. Ensure your OpenRouter API key is set
```bash
echo $OPENROUTER_API_KEY
```

2. Run the Ralph Corp agent
```bash
npm run ralph
```

3. (Optional) Run with a hot task
```bash
npm run ralph -- "Your task here"
```

## Notes
- All `git` and `npm` commands will auto-execute
- The agent will commit and push automatically
- Night Shift harvesting runs after each success
