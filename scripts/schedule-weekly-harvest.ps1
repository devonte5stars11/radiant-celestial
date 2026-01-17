# Weekly Skill Harvester
# Runs every Sunday at 2:00 AM

# Windows Task Scheduler XML
# Import with: schtasks /create /xml weekly-harvest.xml /tn "SkillHarvester"

$action = New-ScheduledTaskAction -Execute "node" -Argument "scripts/harvest-skills.mjs" -WorkingDirectory "c:\Users\devon\.gemini\antigravity\playground\radiant-celestial"

$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 2:00AM

$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

$principal = New-ScheduledTaskPrincipal -UserId "$env:USERNAME" -LogonType Interactive -RunLevel Highest

Register-ScheduledTask -TaskName "SkillHarvester-Weekly" -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "Auto-harvest skills from X via Grok every Sunday"

Write-Host "✅ Weekly Skill Harvester scheduled for Sundays at 2:00 AM"
