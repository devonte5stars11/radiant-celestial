# Vertical Slice Architecture Protocol

**Source:** @jimmybogard

**Protocol:**
1. Identify a single user story or feature (e.g., "User login").
2. Create a top-level folder named after the feature (e.g., `/Features/Login`).
3. Inside the folder, add all related files: Handler, Request, Validator, Endpoint, ViewModel—no shared layers.
4. Implement request/response models directly in the slice.
5. Wire endpoints/handlers using minimal shared infrastructure (e.g., MediatR for handlers).
6. Test the entire slice in isolation with integration tests.
7. Deploy slices independently via feature flags if needed.

**Anti-patterns:**
- Organizing by technical layers (e.g., `/Controllers`, `/Services`, `/Models`).
- Sharing models across features (leads to god-objects).
- Premature abstraction or interfaces between slices.
- Big Bang refactoring of legacy layered code.