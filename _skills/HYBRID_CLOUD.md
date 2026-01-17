# ☁️ Skill: HYBRID_CLOUD (CONNECTED_SOVEREIGNTY)
**Class**: `Architecture / Scale`
**Purpose**: Leverage the infinite power of the Cloud (Auth, Vector DBs, Edge Functions) without sacrificing safety or ownership.

## 📜 Description
Isolation is safety, but it is also a prison. "Max Potential" requires leverage. This protocol defines how to use state-of-the-art serverless infrastructure (Supabase/Vercel) while maintaining a "Safety First" architecture.

## 🛠️ Tech Stack
-   **Database**: Supabase (Postgres) w/ Row Level Security (RLS)
-   **Auth**: Supabase Auth (Social Logins - Google/X)
-   **Edge**: Vercel Edge Functions (Global latency < 50ms)
-   **Encryption**: `pgsodium` for sensitive columns

## ⚡ Protocol
1.  **RLS is Law**: Never deploy a table without `ENABLE ROW LEVEL SECURITY`.
    -   *Rule*: `create policy "Individual" on "habits" for all using (auth.uid() = user_id);`
2.  **Encrypted Fields**: If data is truly sensitive (e.g., journal entries), encrypt it *client-side* before it hits the cloud, or use Postgres transparent column encryption.
3.  **Edge Intelligence**: Use Edge Functions for AI processing that is too heavy for the browser (e.g., embedding generation for semantic search).

## 🧬 Pattern: The Safety Proxy
```ts
// Client-side: Safe interactions with the Cloud
const { data, error } = await supabase
  .from('habits')
  .select('*')
  .eq('user_id', user.id); // RLS guarantees only YOU see this
```

## 🚨 Anti-Patterns
-   **Don't** use a single "Admin Key" in your frontend.
-   **Don't** store unencrypted sensitive data if you fear platform risk.
-   **Don't** build a monolith; use Serverless functions for unlimited scalability.
