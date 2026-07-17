# 02 - Configure

Confirm the runtime parameters, seeded from what `01-detect` found.

## Input

The detection record from `01-detect`.

## Output

A config object carrying the two trigger tags, the Anthropic auth mode and its secret, the plugin marketplaces with the framework access, and the stack tool allowlist.

## Process

1. **Tags.** Confirm the brainstorm tag (default `@brainstorm`) and the implement tag (default `@implemente`). The implement tag routes to implement on an issue and to fix on a pull request; the context decides.
2. **Anthropic auth.** Ask the mode per `references/auth-and-secrets.md`, an API key (default, secret `ANTHROPIC_API_KEY`) or an OAuth token (secret `CLAUDE_CODE_OAUTH_TOKEN`).
3. **Marketplaces.** Take the `aidd-async` marketplace, this plugin's public repository, and the framework marketplace that ships the delegated `aidd-dev`, `aidd-vcs`, and `aidd-pm` plugins. The brainstorm job loads only `aidd-async`, so only the implement and fix jobs reference the framework marketplace. Set the framework access from the detection probe rather than asking; when the probe read it private, confirm the token secret name (default `AIDD_FRAMEWORK_TOKEN`). Ask only when the probe was inconclusive.
4. **Stack allowlist.** Seed the allowlist from the stack `01-detect` found and confirm its tool line per `references/auth-and-secrets.md`. Ask which stack applies only when detection found none or several. The base tools, read, edit, git, and `gh`, stay allowed in every case.
5. **Emit.** Hand the config to `03-generate`; persist nothing yet.

## Test

- The config carries both tags, an auth mode that is `api_key` or `oauth_token` with its secret name, the two marketplaces with the framework access resolved from the detection probe, and a stack allowlist seeded from the detected stack.
