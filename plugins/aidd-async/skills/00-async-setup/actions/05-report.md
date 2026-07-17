# 05 - Report

List what is left and the steps that finish the install.

## Input

The written workflow from `03-generate`, the config from `02-configure`, and the secrets record from `04-secrets`.

## Output

A checklist of any deferred secret, the git commit, and the tags.

## Process

1. **Flag deferred secrets.** List every secret `04-secrets` did not set, with its `gh secret set` command, so nothing the workflow needs is missing.
2. **State the git default.** Note that the jobs authenticate git and `gh` with the workflow's built-in `GITHUB_TOKEN`, so its comments and pushes are attributed to the actions bot and never re-trigger the workflow. Name the PAT swap for a repository whose issues edit files under `.github/workflows/`, per `references/auth-and-secrets.md`.
3. **State the commit.** Show the commit and push that lands the workflow, and note that the first mention on an issue then drives the pipeline.
4. **Name the tags.** Restate the two tags and their routing, brainstorm and implement on an issue, and implement on a pull request, so the user knows what to type.

## Test

- The report lists every deferred secret with its command, the commit and push that lands the workflow, the git-token note, and the two tags with their routing; it creates no secret and commits nothing.
