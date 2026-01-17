# Skill Harvester

Automatically discover and crystallize workflows from X.

## Usage

### On-Demand Harvest
```bash
node scripts/harvest-skills.mjs
```

### Schedule Weekly Auto-Harvest (Windows)
```powershell
# Run as Administrator
powershell -ExecutionPolicy Bypass -File scripts/schedule-weekly-harvest.ps1
```

This will run the harvester every Sunday at 2:00 AM and auto-commit new skills.

### Manual Harvest with Custom Niches
Edit `scripts/harvest-skills.mjs` and modify the `NICHES` array.

## Current Niches
- AI Engineering
- Productivity Systems
- Code Architecture
- Indie Hacking
- Deep Work
- Startup Growth
- Sales & Outbound
- Content Creation
- Learning Frameworks
- Engineering Leadership

## Output
New skills are saved to `/_skills/HARVESTED_[NICHE]_[DATE].md`
