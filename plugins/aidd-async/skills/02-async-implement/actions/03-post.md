# 03 - Post

Comment the pull request link or the named failure back on the issue, then end.

## Input

The issue reference from `01-collect` and the outcome from `02-delegate`.

## Output

One comment on the issue, linking the draft pull request or naming the failure, after which the invocation ends.

## Process

1. **Render.** On success fill [pr-comment.md](../assets/pr-comment.md) with the draft pull request URL. On a failure fill [failure-comment.md](../assets/failure-comment.md) per `references/failure-report.md`. Write the body in the thread's language.
2. **Post.** Publish the comment with `gh issue comment`, passing the body via `--body-file` so the fences survive quoting. On a `gh` error, report it and stop; never retry into a duplicate comment.
3. **End.** Confirm the comment URL and end the invocation. Never poll, sleep, or wait for a reply.

## Test

- A single comment exists on the issue carrying the marker line and either the pull request link or the named failure; the invocation ended without waiting.
