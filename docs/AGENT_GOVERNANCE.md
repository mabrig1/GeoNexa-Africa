# GeoMind agent governance

## Current state
The /api/agents/plan endpoint returns a **static, deterministic plan only**. It does not execute an LLM, external tool, database query or scientific computation.

## Before enabling agent execution
1. Authenticate user and verify organisation/project authorisation.
2. Maintain explicit tool allowlists per specialist agent.
3. Reject instructions embedded in untrusted datasets and retrieved documents.
4. Enforce execution time, token, cost and storage budgets.
5. Record tool inputs, outputs, dataset licences and model versions.
6. Require scientific quality review and named human approval for consequential outputs.
7. Provide cancellation, retry limits and safe failure handling.
8. Prevent agents from directly publishing reports or modifying permissions.
9. Conduct cross-tenant and prompt-injection security testing.
