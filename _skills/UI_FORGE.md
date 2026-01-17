# ⚔️ Skill: UI_FORGE
**Class**: `Frontend / Visuals`
**Model**: `Claude 3.5 Sonnet` (Recommended)

## 📜 Description
This skill defines the "Platinum-Tier" standard for forging user interfaces. It enforces the use of Shadcn/UI, Tailwind CSS, and Framer Motion to create "Ultimate" grade aesthetics.

## 🛠️ Tech Stack
-   **Framework**: Next.js 16 (App Router)
-   **Structure**: `app/src/components/*`
-   **Styling**: Tailwind (`bg-black`, `text-zinc-400`, `amber-500` accents)
-   **Motion**: `framer-motion` for entry animations and micro-interactions.
-   **Icons**: `lucide-react`

## ⚡ Protocol
1.  **Install Base**: `npx shadcn@latest add [component]`
2.  **Dark Mode**: Force class `dark` in layout or `ThemeProvider`.
3.  **Glassmorphism**: Use `bg-zinc-900/50 backdrop-blur border-zinc-800`.
4.  **Animation**: Wrap distinct sections in `<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} />`.
5.  **Typography**: Use `Geist Sans` or `Inter`. Tracking `tight`.

## 🧬 Reusable Snippets
### The "Hero" Gradient Text
```tsx
<span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
  Ultimate Power
</span>
```

### The "Glass" Card
```tsx
<div className="rounded-xl border border-zinc-800 bg-black/50 p-6 backdrop-blur-xl">
  {content}
</div>
```
