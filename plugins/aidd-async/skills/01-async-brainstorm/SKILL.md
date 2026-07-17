---
name: 01-async-brainstorm
description: Clarify a vague idea through rounds of GitHub PR comments, one probing round per invocation. Use when a PR comment asks to brainstorm an idea, or the user points at a pull request to brainstorm on. Not for live in-session brainstorming or reviewing code.
argument-hint: collect | integrate | probe | finalize | post
---

# Async brainstorm

Turns a vague idea into a precise one over a GitHub PR thread. Each invocation runs one round: read the thread, fold in the new answers, probe with a batch of pointed questions or finalize the clarified idea, post the comment, end. The thread itself carries the state between rounds.

## Actions

| #   | Action      | Role                                                      | Input                                   |
| --- | ----------- | --------------------------------------------------------- | --------------------------------------- |
| 01  | `collect`   | Read the thread, restate the idea, detect the stage       | a PR reference (CI trigger or argument) |
| 02  | `integrate` | Fold the new answers in, judge probe or finalize          | the answers + the idea so far           |
| 03  | `probe`     | Compose one batched round of pointed questions            | the idea so far                         |
| 04  | `finalize`  | Consolidate the idea, flag what stays open                | the clarified idea                      |
| 05  | `post`      | Render the comment with its resume block and post it      | the round's body                        |

Run `01 → 02`, then `03` when real ambiguity remains or `04` when the idea is clear, then `05`. One round per invocation; the next round starts when a new invocation fires on the author's reply. Before running an action, read its file in `actions/`, not only the table or assets.

## Transversal rules

- Clarify the idea, never build it. Surface a leaning and its tradeoff when the facts point one way, but lock no solution, write no plan, produce no code.
- One round per invocation. After posting, end the invocation. Never poll, sleep, or wait for a reply.
- The thread is the state. Rebuild the idea from the resume block of the last bot comment plus the human replies after it. Trust the thread over anything local.
- Project memory (`aidd_docs/memory/`) is read-only context. Write no memory file, no repo file, nothing but the PR comment.
- Batch the round. An async round-trip is expensive, so ask the full set of questions the live threads support, grouped by theme, instead of one at a time.
- Write comments in the thread's language.
- Posting needs an authenticated `gh` CLI with permission to comment on the PR. The CI wiring that triggers the skill belongs to the host repo, not to this skill.

## References

- `references/probing.md`: altitude, threads, probing tactics, and the stop test, adapted to async rounds.

## Assets

- `assets/comment-template.md`: the PR comment skeleton, body plus the machine-readable resume block.

## External data

- `aidd_docs/memory/`: project memory, loaded as read-only context when present.
