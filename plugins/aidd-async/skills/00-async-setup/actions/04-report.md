# 04 - Report

List the secrets to set and the steps that finish the install.

## Input

The written workflow from `03-generate` and the config from `02-configure`.

## Output

A checklist naming every secret to create and the commands that finish the install.

## Process

1. **Name the secrets.** List each secret the workflow references, the Anthropic auth secret and the framework marketplace token when the framework repository is private, with a `gh secret set` command for each.
2. **State the git default.** Note that the jobs authenticate git and `gh` with the workflow's built-in `GITHUB_TOKEN`, so its comments and pushes are attributed to the actions bot and never re-trigger the workflow. Name the PAT swap for a repository whose issues edit files under `.github/workflows/`, per `references/auth-and-secrets.md`.
3. **State the commit.** Show the commit and push that lands the workflow, and note that the first mention on an issue then drives the pipeline.
4. **Name the tags.** Restate the two tags and their routing, brainstorm and implement on an issue, and implement on a pull request, so the user knows what to type.

## Test

- The report lists one `gh secret set` line per referenced secret, the commit and push that lands the workflow, and the two tags with their routing; it creates no secret and commits nothing.
