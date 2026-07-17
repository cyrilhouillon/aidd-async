# 01 - Detect

Read the repository, its stack, the framework access, and the secrets already set.

## Input

The target repository and the current working directory.

## Output

A detection record naming the repository, its remote owner and name, the default branch, whether `.github/workflows/claude-async.yml` already exists, the detected stack, the framework repository and its visibility, and the secret names already present.

## Process

1. **Resolve the repo.** Read the repository root and the `origin` remote with git, and parse the owner and name. This workflow targets GitHub; stop with a clear message when the remote is not GitHub.
2. **Read the default branch.** Resolve it from `git symbolic-ref refs/remotes/origin/HEAD`, falling back to a `gh` query. The implement job branches from it.
3. **Detect a prior workflow.** Look for an existing `.github/workflows/claude-async.yml`. When present, flag it for the overwrite prompt in `03-generate`.
4. **Detect the stack.** Scan the repository root for the build manifests mapped in `references/auth-and-secrets.md`, and record every stack that matches. This seeds the allowlist in `02-configure`.
5. **Probe the framework.** Read the framework repository visibility with `gh repo view ai-driven-dev/framework --json visibility`. A private repository needs a clone token in CI; a public one does not.
6. **List existing secrets.** Read `gh secret list` so `04-secrets` skips the names already present.
7. **Emit.** Hand the detection record to `02-configure`. Write nothing.

## Test

- The record names the owner and repo matching `gh repo view --json owner,name`, the default branch, the prior-workflow flag, at least one stack when a known manifest is present, the framework visibility, and the set of already-present secret names; no file was written.
