# Ralph Protocol - Setup Guide

This document explains how to activate the Ralph Protocol for autonomous operations.

## What is Ralph Protocol?

Ralph is your "Night Shift" agent that works while you sleep. Every Sunday at 2 AM UTC, Ralph:
1. Runs the Skill Harvester
2. Discovers new workflows from X (via Grok)
3. Creates new skill files in `/_skills/`
4. Commits and pushes changes to GitHub

## Prerequisites

- GitHub repository with Actions enabled
- *(Optional)* OpenRouter API key - needed only for skill harvesting

**Note**: Ralph will activate without an API key, but skill harvesting will be skipped until you add one.

## Setup Instructions

### 1. (Optional) Add OpenRouter API Key to GitHub Secrets

1. Go to your GitHub repository: `github.com/devonte5stars11/radiant-celestial`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `OPENROUTER_API_KEY`
5. Value: `sk-or-v1-...` (your OpenRouter API key)
6. Click **Add secret**

### 2. Verify Workflow File

The workflow file is already in place at `.github/workflows/night-shift.yml`.

GitHub Actions will automatically detect it on the next push.

### 3. Test the Workflow (Manual Trigger)

1. Go to **Actions** tab in your GitHub repo
2. Select **Ralph Protocol - Night Shift** workflow
3. Click **Run workflow** → **Run workflow**
4. Watch Ralph harvest skills in real-time

### 4. Verify Automatic Schedule

After the first manual test:
- Ralph will run every **Sunday at 2:00 AM UTC**
- No further action needed from you
- Check the **Actions** tab to see weekly runs

## How to Monitor Ralph

### Check Recent Harvests
```bash
git log --author="Ralph Protocol" --oneline
```

### View New Skills
```bash
ls -la _skills/HARVESTED_*
```

### Check Workflow Status
Visit: `https://github.com/devonte5stars11/radiant-celestial/actions`

## Troubleshooting

**Problem**: Workflow fails with "401 Unauthorized"
- **Solution**: Re-check your `OPENROUTER_API_KEY` secret in GitHub

**Problem**: No new skills harvested
- **Solution**: This is normal if no new workflows were discovered that week

**Problem**: Merge conflicts
- **Solution**: Ralph will skip the push. Manually resolve conflicts locally.

## Deactivating Ralph

To pause Ralph temporarily:
1. Go to `.github/workflows/night-shift.yml`
2. Comment out the `schedule:` section
3. Commit and push

## Next Steps

Once Ralph is running smoothly, consider:
- Adding Slack/Discord notifications on harvest
- Expanding to other social platforms (LinkedIn, Reddit)
- Creating a PR-based review system for harvested skills

**Ralph is now your autonomous learning agent.** 🌙💎
