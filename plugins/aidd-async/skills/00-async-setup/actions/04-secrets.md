# 04 - Secrets

Set the GitHub Actions secrets the workflow references, skipping the ones already present.

## Input

The config from `02-configure`, and the existing-secrets list and framework visibility from `01-detect`.

## Output

A record of the secrets set, kept, and deferred.

## Process

1. **Build the required list.** The Anthropic auth secret is always required. The framework marketplace token is required only when the framework repository is private. The built-in `GITHUB_TOKEN` is never set here; a write PAT is optional and belongs to `05-report`.
2. **Skip the present ones.** For each required secret in the detection's existing-secrets list, ask keep, rotate, or skip. Keep and skip move on; rotate continues to the next step.
3. **Set the missing ones.** Print the short what, why, and how for that secret from `references/auth-and-secrets.md`, then read the value and store it with `gh secret set <NAME> --repo <owner>/<repo>`.
4. **Defer on decline.** When the user declines to paste a value, print the exact `gh secret set` command for them to run later and mark the secret deferred; never block the flow.
5. **Never mint.** The skill stores a value the user supplies. It never generates an API key, an OAuth token, or a PAT.
6. **Verify.** Re-read `gh secret list` and confirm each non-deferred required secret is present. Emit the record.

## Test

- After the user supplies values, `gh secret list` contains the Anthropic secret and, for a private framework, the marketplace token; re-running with all present and keep answered sets none; a declined secret is reported as deferred with its `gh secret set` command; the skill generated no token.
