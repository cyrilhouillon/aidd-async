# 05 - Post

Render the round as a PR comment with its resume block and post it.

## Input

The PR reference from `01-collect`, the round's body (questions from `03-probe` or the consolidation from `04-finalize`), the updated idea, its altitude, the open list, the settled points, and the round number.

## Output

One comment posted on the PR, carrying the body and the machine-readable resume block; the invocation then ends.

## Process

1. **Render.** Fill [comment-template.md](../assets/comment-template.md): the marker line, the body in the thread's language, and the resume block updated with the idea, altitude, open list, settled points, stage (`probing` or `finalized`), and incremented round. List entries repeat per item; render an empty list as `[]`.
2. **Post.** Publish the comment with `gh pr comment`, passing the body via `--body-file` so the fences and YAML survive quoting. On failure, report the `gh` error and stop; never retry into a duplicate comment.
3. **End.** Confirm the comment URL and end the invocation. Never poll, sleep, or wait for a reply; the author's next comment triggers the next round.

## Test

- A comment exists on the PR containing the marker line, the body, and a resume block whose stage and round are updated; the invocation ended without waiting for a reply.
