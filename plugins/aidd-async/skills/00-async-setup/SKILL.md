---
name: 00-async-setup
description: Generate the GitHub Actions workflow that wires the async pipeline into the current repository and set the secrets it needs. Use when the user wants to install or refresh the async issue and pull request automation in a repo. Not for running a round or authoring a skill.
argument-hint: detect | configure | generate | secrets | report
---

# Async setup

Wires the async pipeline into a host repository. It writes one GitHub Actions workflow that routes a mention on an issue or pull request to the right async skill, sets the secrets the workflow needs, and reports what is left. It runs locally when a developer installs or refreshes the automation; it never runs headless in CI, and the async rounds it wires do.

## Actions

| #   | Action      | Role                                                             | Input                        |
| --- | ----------- | --------------------------------------------------------------- | ---------------------------- |
| 01  | `detect`    | Read the repo, stack, framework access, and existing secrets    | the target repository        |
| 02  | `configure` | Confirm the tags, auth mode, marketplaces, and stack allowlist  | the detection record         |
| 03  | `generate`  | Render the workflow into `.github/workflows/` from the template | the config                   |
| 04  | `secrets`   | Set the secrets the workflow references, skipping the present   | the config and detection     |
| 05  | `report`    | List any deferred secret and the steps that finish the install  | the written workflow         |

Run `01 → 02 → 03 → 04 → 05`. Interactive; each step confirms before the next. Before running an action, read its file in `actions/`, not only the table or assets.

## Transversal rules

- Write one project file, the workflow under `.github/workflows/`. Touch no other file.
- Set secrets, never mint them. The skill stores a value the user supplies with `gh secret set`, skips the names already present, and defers the ones the user declines; it never generates a token.
- Commit nothing. Stage the workflow and hand the commit to the user, who reviews and pushes it.
- Detect, never ask blind. Read the repository, its default branch, its stack, the framework access, and the existing secrets from the repo, then confirm the detected value instead of asking cold.
- Regenerate in place. On a re-run, show the diff and ask to overwrite the existing workflow; never write a duplicate.
- The plugin ships the skill; the host repository owns its own CI wiring and its own secrets.

## Call context

- A developer runs the skill locally to install or refresh the automation, once, when wiring a repository. It is not triggered by CI.
- The workflow it writes drives `01-async-brainstorm`, `02-async-implement`, and `03-async-fix`, which do run headless, one round per trigger.
- Each job loads only the plugins its skill transitively delegates to. Brainstorm loads only `aidd-async`; implement adds `aidd-dev`, `aidd-vcs`, and `aidd-pm` (the spec capability); fix adds `aidd-dev` and `aidd-vcs`.

## References

- `references/auth-and-secrets.md`: the Anthropic auth modes, the framework marketplace token, the GitHub write token note, and the stack allowlist.

## Assets

- `assets/claude-async.yml`: the workflow template, one routed file with a placeholder per configured value.
