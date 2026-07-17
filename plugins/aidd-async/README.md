# aidd-async

Asynchronous collaboration plugin for Claude Code, composing with the AI-Driven Development framework.

> Status: experimental.

First time? Install with `/plugin install aidd-async@aidd-async`, then comment on a pull request asking to brainstorm, or run `aidd-async:01-async-brainstorm` with a PR reference.

One skill that refines ideas over GitHub PR comment threads: each invocation runs one round (read the thread, fold in the answers, ask a batched set of pointed questions or post the consolidated idea) and ends. The PR thread itself carries the state between rounds, so the skill works headless from CI as well as manually.

## Skills

| Skill | Description |
| ----- | ----------- |
| [async-brainstorm](skills/01-async-brainstorm/SKILL.md) | Clarify a vague idea through rounds of GitHub PR comments, one probing round per invocation, with the thread carrying the state. |

## Requirements

- An authenticated `gh` CLI with permission to comment on the target PR.
- The CI wiring that triggers the skill on a PR comment belongs to the host repository (for example a workflow reacting to a mention); this plugin ships the skill only.
