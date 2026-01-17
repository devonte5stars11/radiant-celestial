# ✅ Skill: VERIFICATION_LOOP
**Class**: `Quality / Testing`
**Purpose**: Ensure every feature works before marking it complete.

## 📜 Description
Code is worthless if it doesn't work. This skill defines the verification process to guarantee that shipped features are functional and meet acceptance criteria.

## 🔄 The Loop
```
CODE -> BUILD -> TEST -> SCREENSHOT -> DOCUMENT -> COMMIT
```

## ⚡ Protocol

### 1. Build Check
After writing code, ensure the dev server is running without errors.
```bash
# Check terminal output for errors
command_status(dev_server_id)
```

### 2. Browser Verification
Use the browser subagent to interact with the feature.
```
browser_subagent(
  Task: "
    1. Navigate to [route].
    2. Perform [action] (click, type, etc.).
    3. Verify [expected outcome].
    4. Capture screenshot named [feature_name].
  "
)
```

### 3. Screenshot as Proof
Every verification should produce a screenshot artifact. Embed it in the walkthrough.
```markdown
![Feature Verified](file:///path/to/screenshot.png)
```

### 4. Document
Update `task.md` to mark the item as `[x]` complete.

### 5. Commit
```bash
git add .; git commit -m "[GRIND] Feature: Description"
```

## 🧬 Verification Checklist Template
```markdown
## Verification: [Feature Name]
- [ ] Dev server running without errors
- [ ] Feature accessible at correct route
- [ ] Core functionality works (action -> outcome)
- [ ] Edge cases handled (empty state, error state)
- [ ] Mobile responsive (375px viewport)
- [ ] Screenshot captured
- [ ] Committed to git
```

## 🚨 Anti-Patterns
-   **Don't** mark a task complete without browser verification.
-   **Don't** skip screenshots (they are proof of work).
-   **Don't** commit broken code (always verify first).
