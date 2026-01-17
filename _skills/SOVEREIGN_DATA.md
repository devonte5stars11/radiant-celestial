# 🏰 Skill: SOVEREIGN_DATA
**Class**: `Architecture / State`
**Model**: `Gemini 2.0 / DeepSeek`

## 📜 Description
This skill defines the "Local-First" architecture for building sovereign applications. It ensures the user owns their data by default, avoiding reliance on external cloud databases for personal tools.

## 🛠️ Tech Stack
-   **State**: `zustand`
-   **Persistence**: `createJSONStorage(() => localStorage)`
-   **Format**: JSON (Schema-less flexibility)

## ⚡ Protocol
1.  **Store Creation**: Define a Zustand store with `persist` middleware.
2.  **Schema Definition**: Use TypeScript interfaces for strict typing of the JSON blob.
3.  **Export Logic**: providing a `Blob` download link for `state`.
4.  **Import Logic**: Parse `file` input -> `JSON.parse` -> `store.setState()`.
5.  **Nuclear Option**: Always provide a mechanism to wipe `localStorage`.

## 🧬 Reusable Snippets
### The "Sovereign Store" Pattern
```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      data: [],
      addData: (item) => set((state) => ({ data: [...state.data, item] })),
      nuke: () => set({ data: [] }),
    }),
    {
      name: 'sovereign-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```
