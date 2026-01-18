# Dependency Injection Architecture Workflow

**Source:** @swyx

**Protocol:**
1. Define core domain entities as plain data classes without dependencies.
2. Create use case classes that orchestrate business logic, injecting repositories via constructor.
3. Implement repositories as interfaces with concrete adapters for DB/HTTP/external services.
4. Use a DI container (e.g., tsyringe or Inversify) to wire interfaces to implementations at app bootstrap.
5. Layer HTTP controllers/GraphQL resolvers to invoke use cases, passing validated input DTOs.
6. Test use cases in isolation by mocking injected dependencies.

**Anti-patterns:**
- Hardcoding dependencies inside classes (service locator anti-pattern).
- Mixing domain logic with infrastructure concerns in entities.
- Global singletons for stateful services.
- Skipping interface abstraction for third-party libs.