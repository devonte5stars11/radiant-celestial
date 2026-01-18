### Modular Monolith Evolution Protocol

**Source:** @swyx

**Protocol:**
1. Start with a single repo and minimal layers: domain (entities/use cases), application (services), infrastructure (DB/externals).
2. Define explicit boundaries with interfaces (ports) for all external dependencies.
3. Implement feature toggles for every new module to enable/disable at runtime.
4. Use database-per-domain schema with views for cross-domain queries (no joins across domains).
5. Extract to microservices only after 3+ teams depend on it and monolith perf degrades >20%.
6. Automate boundary enforcement with custom linters (e.g., no direct infra imports in domain).
7. Quarterly "architecture spike": prototype one risky integration in a throwaway service.

**Anti-patterns:**
- Premature microservices (split before monolith pain).
- Anemic domain models (logic in services, not entities).
- Shared databases across bounded contexts.
- Cyclic dependencies between layers.
- Big Bang rewrites (evolve incrementally only).