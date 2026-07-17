# aidd-async

Asynchronous collaboration plugin for Claude Code, composing with the AI-Driven Development framework.

> Status: experimental.

First time? Install with `/plugin install aidd-async@aidd-async`, then comment on an issue with the trigger tag to brainstorm, or run `aidd-async:01-async-brainstorm` with an issue reference.

One skill that refines ideas over GitHub issue comment threads: each invocation runs one round (read the thread, fold in the answers, ask a batched set of pointed questions or post the consolidated idea) and ends. The issue thread itself carries the state between rounds, so the skill works headless from CI as well as manually.

## Skills

| Skill | Description |
| ----- | ----------- |
| [async-brainstorm](skills/01-async-brainstorm/SKILL.md) | Clarify a vague idea through rounds of GitHub issue comments, one probing round per invocation, with the thread carrying the state. |

## Requirements

- An authenticated `gh` CLI with permission to comment on the target issue (a token with `issues: write`).
- The CI wiring that triggers the skill belongs to the host repository: a workflow reacting to an `issue_comment` event gated on the trigger tag in the comment body. Every new tagged comment starts a round; this plugin ships the skill only.
