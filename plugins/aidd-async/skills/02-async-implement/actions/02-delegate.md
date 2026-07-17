# 02 - Delegate

Run the SDLC orchestrator unattended and capture the draft pull request it opens or the failure it hits.

## Input

The implementation request from `01-collect`.

## Output

Either the URL of the draft pull request the orchestrator opened, or a named failure: the step that returned `blocked`, the review that never reached a shippable verdict, or a hook rejection.

## Process

1. **Delegate.** Hand the whole build to the SDLC orchestrator `aidd-dev:00-sdlc` in `auto`, passing the request as the objective. It runs spec, plan, implement, review, and ship, and loops review back to implement on an `iterate` verdict.
2. **Stay on the branch.** Run nothing that creates or names a branch. The orchestrator's implement step keeps the current feature branch, and its ship step commits, pushes, and opens the draft pull request.
3. **Capture the URL.** Read the draft pull request URL the ship step returns. Open no pull request here.
4. **Capture a failure.** When the orchestrator returns `blocked`, when review never reaches a shippable verdict, or when a hook rejects the flow, capture the failing step and its reason per `references/failure-report.md`. Stop the flow, do not retry.

## Test

- On success the action yields a draft pull request URL and opened no pull request itself; on a `blocked` or non-shippable outcome it yields a named failure and the flow stopped.
