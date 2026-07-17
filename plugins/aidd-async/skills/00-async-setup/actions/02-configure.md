# 02 - Configure

Collect the few runtime parameters the workflow needs.

## Input

The detection record from `01-detect`.

## Output

A config object carrying the two trigger tags, the Anthropic auth mode and its secret, the plugin marketplaces and their access, and the stack tool allowlist.

## Process

1. **Tags.** Confirm the brainstorm tag (default `@brainstorm`) and the implement tag (default `@implemente`). The implement tag routes to implement on an issue and to fix on a pull request; the context decides.
2. **Anthropic auth.** Ask the mode per `references/auth-and-secrets.md`, an API key (default, secret `ANTHROPIC_API_KEY`) or an OAuth token (secret `CLAUDE_CODE_OAUTH_TOKEN`).
3. **Marketplaces.** Confirm the `aidd-async` marketplace, this plugin's public repository, and the framework marketplace that ships the delegated `aidd-dev` and `aidd-vcs` plugins. Ask whether the framework repository is public or private, and the token secret name when private.
4. **Stack allowlist.** Ask which stack tools the implement and fix jobs may run, per `references/auth-and-secrets.md`, defaulting to the JavaScript set. The base tools, read, edit, git, and `gh`, stay allowed in every case.
5. **Emit.** Hand the config to `03-generate`; persist nothing yet.

## Test

- The config carries both tags, an auth mode that is `api_key` or `oauth_token` with its secret name, at least the two marketplaces with the framework access flag, and a non-empty stack allowlist.
