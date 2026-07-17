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

## Job permissions

The brainstorm job is self-contained and runs under a tight `--allowedTools` list, `Read,Grep,Glob,Write,Bash(gh:*)`, enough to read the thread and post the comment via `--body-file`, capped at a low `--max-turns`. The implement and fix jobs delegate to the SDLC, which spawns subagents and runs the project's own tests, lint, and build, a set no fixed allowlist can enumerate, so they run under `--permission-mode bypassPermissions`, the same choice the framework orchestrator makes for its unattended runs. They carry no `--max-turns` cap, because a full build runs long and a turn cap would kill it mid-flight. Their outer bound is instead a job `timeout-minutes` (45 for implement, 30 for fix), which stops a run that stalls, since a hanging build command, a test waiting on a container or a port, is caught by neither the per-command `timeout` the agent wraps nor a turn cap. A job that hits the timeout fails without a comment, so treat a timed-out run as a signal to look, not as a posted failure. Tune the minutes to the project's real build time.
