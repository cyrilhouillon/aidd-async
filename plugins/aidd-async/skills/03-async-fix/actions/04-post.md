# 04 - Post

Comment the applied fix or the named failure on the pull request, then end.

## Input

The pull request reference from `01-collect` and the outcome from `02-delegate` and `03-commit`.

## Output

One comment on the pull request, summarizing the applied fix or naming the failure, after which the invocation ends.

## Process

1. **Render.** On success fill [fix-comment.md](../assets/fix-comment.md) with the feedback addressed and the review verdict. On a failure fill [failure-comment.md](../assets/failure-comment.md) per `references/failure-report.md`. Write the body in the thread's language.
2. **Post.** Publish the comment with `gh pr comment`, passing the body via `--body-file` so the fences survive quoting. On a `gh` error, report it and stop; never retry into a duplicate comment.
3. **End.** Confirm the comment URL and end the invocation. Never poll, sleep, or wait for a reply; the next feedback triggers the next round.

## Test

- A single comment exists on the pull request carrying the marker line and either the fix summary or the named failure; the invocation ended without waiting.
