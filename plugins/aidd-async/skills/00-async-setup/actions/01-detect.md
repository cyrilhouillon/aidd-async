# 01 - Detect

Identify the repository, its default branch, and whether a prior async workflow exists.

## Input

The target repository and the current working directory.

## Output

A detection record naming the repository, its remote owner and name, the default branch, whether `.github/workflows/claude-async.yml` already exists, and the async skills available to route.

## Process

1. **Resolve the repo.** Read the repository root and the `origin` remote with git, and parse the owner and name. This workflow targets GitHub; stop with a clear message when the remote is not GitHub.
2. **Read the default branch.** Resolve it from `git symbolic-ref refs/remotes/origin/HEAD`, falling back to a `gh` query. The implement job branches from it.
3. **Detect a prior workflow.** Look for an existing `.github/workflows/claude-async.yml`. When present, flag it for the overwrite prompt in `03-generate`.
4. **List the skills.** Confirm the pipeline skills the plugin ships, brainstorm on an issue, implement on an issue, and fix on a pull request, so the generated jobs match what is installed.
5. **Emit.** Hand the detection record to `02-configure`. Write nothing.

## Test

- The record names the GitHub owner and repo matching `gh repo view --json owner,name`, names the default branch, and flags whether `.github/workflows/claude-async.yml` already exists; no file was written.
