# 02 - Delegate

Delegate the fix to the implement step then the review to the review step, and capture the verdict or the failure.

## Input

The fix list from `01-collect`.

## Output

The applied fix in the working tree with a shippable review verdict, or a named failure: implement returned `blocked`, or the review never reached a shippable verdict.

## Process

1. **Fix.** Hand the fix list to `aidd-dev:02-implement` as the work to do. It edits the code on the current pull request branch.
2. **Review.** Hand the resulting diff to `aidd-dev:05-review`. Loop the fix back to `aidd-dev:02-implement` while the verdict is `iterate`.
3. **Never ship.** Delegate neither to the SDLC orchestrator nor to any ship step. The pull request already exists and must not be reopened.
4. **Capture a failure.** When implement returns `blocked`, when the review never reaches a shippable verdict, or when a hook rejects a step, capture the failing step and its reason per `references/failure-report.md`. Stop, do not retry.

## Test

- On success the working tree holds the fix and the review verdict is shippable, and no pull request was opened; on a `blocked` or non-shippable outcome the action yields a named failure and stopped.
