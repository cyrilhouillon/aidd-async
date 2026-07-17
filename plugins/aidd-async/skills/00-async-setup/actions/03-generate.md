# 03 - Generate

Render the workflow file into the repository from the template.

## Input

The detection record from `01-detect` and the config from `02-configure`.

## Output

A file at `.github/workflows/claude-async.yml`.

## Process

1. **Read the template.** Load [claude-async.yml](../assets/claude-async.yml).
2. **Substitute.** Replace each placeholder, preserving the template's indentation:
   - `__BRAINSTORM_TAG__` and `__IMPLEMENT_TAG__` from the tags.
   - `__DEFAULT_BRANCH__` from the detection record.
   - `__CLAUDE_AUTH_LINE__` to `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}` or `claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}`, matching the auth mode.
   - `__ASYNC_MARKETPLACE__` to the `aidd-async` clone URL.
   - `__FRAMEWORK_MARKETPLACE__` to the framework clone URL; a public framework needs no token, a private one carries `x-access-token:${{ secrets.<name>}}@`.
   - `__STACK_TOOLS__` from the stack allowlist, in the implement and fix `claude_args`.
   The per-job `plugins` lists are fixed in the template, one plugin set per job, and need no substitution.
3. **Overwrite guard.** When the file already exists, show the diff and ask to overwrite or skip; never write a duplicate.
4. **Write once.** Write the file under `.github/workflows/`, and only there. Stop and report when the resolved path escapes the repository.
5. **Leave it staged.** `git add` the file; do not commit.

## Test

- The written file contains exactly one of `anthropic_api_key:` or `claude_code_oauth_token:` matching the mode, both tags appear in the job conditions, the brainstorm job loads only `aidd-async` while implement also loads `aidd-pm`, the implement job checks out and branches from the default branch, and no `__` placeholder token remains.
