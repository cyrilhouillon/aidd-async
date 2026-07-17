# Auth and secrets

The generated workflow references a small set of secrets. The setup skill sets the ones the user supplies a value for with `gh secret set`, and never mints a token itself.

## Anthropic auth

The `claude-code-action` step authenticates to Anthropic one of two ways. The workflow emits exactly one auth line matching the chosen mode.

- **API key** (default). Secret `ANTHROPIC_API_KEY`, pay-per-token from the Anthropic console. Best for shared org billing.
  - Obtain at `https://console.anthropic.com/settings/keys`, create a key, copy the `sk-ant-...` value. The account needs a positive balance, an empty one fails the run with `Credit balance is too low`.
- **OAuth token**. Secret `CLAUDE_CODE_OAUTH_TOKEN`, drawn against a Claude Pro or Max subscription. Best for an individual on a paid plan.
  - Obtain by running `claude setup-token` in a local terminal; it completes a browser flow and prints the token.

## Framework marketplace token

The implement and fix jobs delegate to `aidd-dev`, `aidd-vcs`, and (for the spec step of a thin issue) `aidd-pm`, which ship from the framework marketplace (`ai-driven-dev/framework`). The brainstorm job delegates to nothing, so it loads only `aidd-async` and never references the framework marketplace. When the framework repository is public, its clone URL needs no token. When it is private, the workflow injects `secrets.<name>`, and the runner needs it because it does not carry the developer's local credentials. The `aidd-async` marketplace is this plugin's own public repository and needs no token.

- Obtain a fine-grained PAT at `https://github.com/settings/personal-access-tokens/new`, resource owner the framework repo's owner, repository access that one repo, permission `Contents: Read-only`. Default secret name `AIDD_FRAMEWORK_TOKEN`.

## GitHub write token

By default the jobs let git and `gh` use the workflow's built-in `GITHUB_TOKEN`. It can comment, push, and open a pull request, and its actions are attributed to the actions bot, so the comments it posts never re-trigger the workflow. This needs no secret. One limit, the built-in token lacks the `workflows` scope, so a run that edits a file under `.github/workflows/` is rejected. For a repository whose issues touch workflow files, add a fine-grained PAT with `Contents`, `Pull requests`, and `Issues` read and write plus `Workflows` read and write, and pass it as `github_token` on each `claude-code-action` step.

## Stack allowlist

The implement and fix jobs run the delegated tests, lint, and build, so their `claude_args` allowlist must include the stack's runner. Detect the stack from the repository's build manifest, keep the base tools always, add one stack line, and never grant `Bash(*)` in the large.

| Stack                 | Manifest at the repo root                    | Tool line                                              |
| --------------------- | -------------------------------------------- | ------------------------------------------------------ |
| JavaScript/TypeScript | `package.json`, a lockfile                   | `Bash(npm:*),Bash(npx:*),Bash(pnpm:*),Bash(yarn:*)`    |
| Python                | `pyproject.toml`, `requirements.txt`         | `Bash(uv:*),Bash(python:*),Bash(pytest:*),Bash(ruff:*)`|
| Rust                  | `Cargo.toml`                                 | `Bash(cargo:*)`                                         |
| Java                  | `pom.xml`, `build.gradle`                    | `Bash(mvn:*),Bash(gradle:*)`                           |
| Other                 | `Makefile`                                    | `Bash(make:*)`                                          |
