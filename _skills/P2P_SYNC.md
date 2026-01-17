# 🌐 Skill: P2P_SYNC (DECENTRALIZED)
**Class**: `Architecture / Connectivity`
**Purpose**: Multi-device sync without a central server or cloud account.

## 📜 Description
Sovereign tech often fails because it's stuck on one device. This skill enables P2P sync using CRDTs (Conflict-free Replicated Data Types) so you can track on mobile and analyze on desktop without ever "signing in" to a middleman.

## 🛠️ Tech Stack
-   **Data Type**: `Automerge` or `Yjs`
-   **Transport**: `WebRTC` or `Local Area Network (LAN)` discovery
-   **Persistence**: `IndexedDB` (via Zustand middleware)

## ⚡ Protocol
1.  **Peer Discovery**: Generate a local `SpaceID` (seed phrase).
2.  **State Merging**: Use CRDTs to ensure that clicking "Done" on phone and desktop simultaneously doesn't corrupt the JSON.
3.  **Local Transport**: Prioritize LAN sync over internet to keep data within your walls.
4.  **E2E Encryption**: All sync packets must be encrypted with a local key before leaving the device.

## 🧬 Pattern: The Sovereign Sync
```ts
import * as Automerge from "@automerge/automerge";

// Local state merges automatically with peer state
let doc = Automerge.init();
doc = Automerge.change(doc, "Add habit", d => {
  d.habits.push({ id: 1, name: "Deep Work" });
});
```

## 🚨 Anti-Patterns
-   **Don't** use Firebase or AWS for sync (Zero Sovereignty).
-   **Don't** use simple timestamps for merging (causes data loss).
