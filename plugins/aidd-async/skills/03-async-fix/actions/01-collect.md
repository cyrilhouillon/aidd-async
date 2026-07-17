# 01 - Collect

Read the review feedback newer than the last bot activity and take the pull request branch as given.

## Input

A pull request reference, from the CI trigger event payload or the user's argument when run manually.

## Output

The pull request identified, the review feedback newer than the bot's last comment collected as the fix list, and project memory loaded as read-only context.

## Process

1. **Locate.** Resolve the repository and pull request number from the trigger event payload, or from the argument when run manually. If none resolves, stop and report what is missing.
2. **Read.** Fetch the pull request thread with `gh`, both the conversation comments and the review comments (for example `gh pr view --comments` and `gh api` for the review threads).
3. **Scope to new.** Find the bot's last activity by the marker line the assets templates carry. Collect only the human feedback posted after it; that is the fix list. When nothing is newer, stop; there is nothing to fix.
4. **Assume the branch.** The host workflow checked out the pull request branch; take it as given, do not create or switch a branch.
5. **Context.** When `aidd_docs/memory/` exists in the host repo, read it for context. Write nothing.

## Test

- The output names the pull request and lists the feedback newer than the bot's last comment; when nothing is newer the run stops; no file was written.
