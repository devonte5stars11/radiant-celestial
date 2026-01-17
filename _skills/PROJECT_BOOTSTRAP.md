# 🚀 Skill: PROJECT_BOOTSTRAP
**Class**: `Initialize / Scaffold`
**Purpose**: Start new projects with the "Platinum" foundation already in place.

## 📜 Description
Never start from zero. This skill defines the exact commands and configurations to bootstrap a new web application with all sovereign defaults.

## 🧰 The Stack
| Layer | Tech | Why |
|-------|------|-----|
| Framework | Next.js 16 | App Router, Server Components |
| Styling | Tailwind + Shadcn | Rapid Premium UI |
| State | Zustand | Simple, Persistent, Local-First |
| Motion | Framer Motion | Micro-interactions |
| Icons | Lucide React | Consistent, Tree-shakable |
| Charts | Recharts | Flexible SVG visualizations |

## ⚡ Bootstrap Protocol

### Step 1: Create Next.js App
```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Step 2: Initialize Shadcn/UI
```bash
npx shadcn@latest init
# Select: New York style, Zinc base color, CSS variables: yes
```

### Step 3: Add Core Components
```bash
npx shadcn@latest add button card input label dialog sheet command avatar dropdown-menu
```

### Step 4: Install State & Motion
```bash
npm install zustand framer-motion recharts lucide-react clsx tailwind-merge
```

### Step 5: Configure Dark Mode
In `layout.tsx`:
```tsx
<html lang="en" className="dark">
```

### Step 6: Create Core Directories
```
src/
  app/           # Routes
  components/    # UI Components
  store/         # Zustand stores
  lib/           # Utilities (cn, etc.)
```

### Step 7: Add Sovereign Store
Create `src/store/app-store.ts` using the SOVEREIGN_DATA pattern.

## 🧬 Files to Create Immediately
1.  `src/app/layout.tsx` - With dark mode and font config
2.  `src/app/page.tsx` - Hero section placeholder
3.  `src/store/app-store.ts` - Zustand with persistence
4.  `src/lib/utils.ts` - The `cn()` helper

## 🚨 Anti-Patterns
-   **Don't** use CRA (Create React App). It's legacy.
-   **Don't** skip Shadcn initialization (rebuilding components is wasteful).
-   **Don't** forget to set dark mode as default (light mode is not Platinum).
