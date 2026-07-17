---
name: 00-async-setup
description: Generate the GitHub Actions workflow that wires the async pipeline into the current repository and list the secrets to set. Use when the user wants to install or refresh the async issue and pull request automation in a repo. Not for running a round or authoring a skill.
argument-hint: detect | configure | generate | report
---

# Async setup

Wires the async pipeline into a host repository. It writes one GitHub Actions workflow that routes a mention on an issue or pull request to the right async skill, then names the secrets the workflow needs. It runs locally when a developer installs or refreshes the automation; it never runs headless in CI, and the async rounds it wires do.

## Actions

| #   | Action      | Role                                                             | Input                        |
| --- | ----------- | --------------------------------------------------------------- | ---------------------------- |
| 01  | `detect`    | Identify the repo, default branch, and the async skills shipped | the target repository        |
| 02  | `configure` | Collect the tags, auth mode, marketplaces, and stack allowlist  | the detection record         |
| 03  | `generate`  | Render the workflow into `.github/workflows/` from the template | the config                   |
| 04  | `report`    | List the secrets to set and the steps that finish the install   | the written workflow         |

Run `01 → 02 → 03 → 04`. Interactive; each step confirms before the next. Before running an action, read its file in `actions/`, not only the table or assets.

## Transversal rules

- Write one file only, the workflow under `.github/workflows/`. Touch no other project file.
- Commit nothing. Stage the workflow and hand the commit to the user, who reviews and pushes it.
- Name secrets, never create them. The skill lists every secret and its `gh secret set` command; the user owns the tokens.
- Detect, never assume. Read the repository, its remote, and its default branch from git; hardcode none of them.
- Regenerate in place. On a re-run, show the diff and ask to overwrite the existing workflow; never write a duplicate.
- The plugin ships the skill; the host repository owns its own CI wiring and its own secrets.

## Call context

- A developer runs the skill locally to install or refresh the automation, once, when wiring a repository. It is not triggered by CI.
- The workflow it writes drives `01-async-brainstorm`, `02-async-implement`, and `03-async-fix`, which do run headless, one round per trigger.
- The implement and fix jobs delegate to `aidd-dev` and `aidd-vcs`, so the workflow loads those plugins from the framework marketplace alongside `aidd-async`.

## References

- `references/auth-and-secrets.md`: the Anthropic auth modes, the framework marketplace token, the GitHub write token note, and the stack allowlist.

## Assets

- `assets/claude-async.yml`: the workflow template, one routed file with a placeholder per configured value.
