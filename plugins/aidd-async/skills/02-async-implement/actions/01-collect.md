# 01 - Collect

Read the implementation request from the issue thread and detect whether a build already ran.

## Input

An issue reference, from the CI trigger event payload or the user's argument when run manually.

## Output

The issue identified, the implementation request taken from the thread, whether a prior implement comment already links a pull request, and project memory loaded as read-only context.

## Process

1. **Locate.** Resolve the repository and issue number from the trigger event payload, or from the argument when run manually. If no issue resolves, stop and report what is missing.
2. **Read.** Fetch the issue title, body, and full comment thread with `gh` (for example `gh issue view` and `gh issue view --comments`).
3. **Detect.** Find a prior implement round by the marker line the assets templates carry. When the newest one already links a pull request, stop; the issue is already built, do not post again.
4. **Prefer the finalized brainstorm.** When the thread carries a brainstorm comment whose resume block reads `stage: finalized`, take its consolidated idea and its open list as the request; that block is authored to be self-contained. `aidd-async:01-async-brainstorm` writes it under its own brainstorm marker line, distinct from the implement marker.
5. **Fall back to the issue.** Absent a finalized brainstorm, take the issue body and thread as the request, the objective and acceptance criteria as the issue states them. Either way add no interpretation; the delegated spec step consolidates a thin request itself.
6. **Context.** When `aidd_docs/memory/` exists in the host repo, read it for context. Write nothing.

## Test

- The output names the issue and the request; when the thread carries a finalized brainstorm the request is taken from it, otherwise from the issue body and thread; when a prior comment already links a pull request the run stops without posting; no file was written.
