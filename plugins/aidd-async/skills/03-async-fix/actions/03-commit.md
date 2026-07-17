# 03 - Commit

Commit the reviewed fix and push it onto the pull request branch.

## Input

The reviewed fix in the working tree from `02-delegate`.

## Output

One commit pushed onto the pull request branch, updating the pull request, or a named commit or push failure.

## Process

1. **Commit and push.** Delegate to `aidd-vcs:01-commit` with its push option, committing the fix and pushing onto the current pull request branch. Create no branch, open no pull request, force-push nothing.
2. **Capture a rejection.** When the commit or the push is rejected, capture the reason per `references/failure-report.md`; report a hook rejection by the hook's name. Stop, do not retry.

## Test

- A new commit exists on the pull request branch and the remote branch advanced; on a rejected commit or push the action yields the named reason and stopped; no branch was created and no force-push ran.
