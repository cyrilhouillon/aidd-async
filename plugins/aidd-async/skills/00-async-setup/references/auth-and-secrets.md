# Auth and secrets

The generated workflow references a small set of secrets. This skill names them; the user creates them with `gh secret set`.

## Anthropic auth

The `claude-code-action` step authenticates to Anthropic one of two ways. The workflow emits exactly one auth line matching the chosen mode.

- **API key** (default). Secret `ANTHROPIC_API_KEY`, pay-per-token from the Anthropic console. Best for shared org billing.
- **OAuth token**. Secret `CLAUDE_CODE_OAUTH_TOKEN`, generated with `claude setup-token`, drawn against a Claude Pro or Max subscription. Best for an individual on a paid plan.

## Framework marketplace token

The implement and fix jobs delegate to `aidd-dev` and `aidd-vcs`, which ship from the framework marketplace. When that repository is public, its clone URL needs no token. When it is private, the workflow injects `secrets.<name>`, a fine-grained PAT with `Contents: Read` on the framework repository. The `aidd-async` marketplace is this plugin's own public repository and needs no token.

## GitHub write token

By default the jobs let git and `gh` use the workflow's built-in `GITHUB_TOKEN`. It can comment, push, and open a pull request, and its actions are attributed to the actions bot, so the comments it posts never re-trigger the workflow. One limit, the built-in token lacks the `workflows` scope, so a run that edits a file under `.github/workflows/` is rejected. For a repository whose issues touch workflow files, add a fine-grained PAT with `Contents`, `Pull requests`, and `Issues` read and write plus `Workflows` read and write, and pass it as `github_token` on each `claude-code-action` step.

## Stack allowlist

The implement and fix jobs run the delegated tests, lint, and build, so their `claude_args` allowlist must include the stack's runner. Keep the base tools always, add one stack line, and never grant `Bash(*)` in the large.

- JavaScript or TypeScript: `Bash(npm:*),Bash(npx:*),Bash(pnpm:*),Bash(yarn:*)`
- Python: `Bash(uv:*),Bash(python:*),Bash(pytest:*),Bash(ruff:*)`
- Rust: `Bash(cargo:*)`
- Java: `Bash(mvn:*),Bash(gradle:*)`
- Other: `Bash(make:*)`
