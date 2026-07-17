---
name: 01-async-brainstorm
description: Clarify a vague idea through rounds of GitHub issue comments, one probing round per invocation. Use when an issue comment tags the skill to brainstorm an idea, or the user points at an issue to brainstorm on. Not for live in-session brainstorming or reviewing code.
argument-hint: collect | integrate | probe | finalize | post
---

# Async brainstorm

Turns a vague idea into a precise one over a GitHub issue thread. Each invocation runs one round: read the thread, fold in the new answers, probe with a batch of pointed questions or finalize the clarified idea, post the comment, end. The thread itself carries the state between rounds.

## Actions

| #   | Action      | Role                                                      | Input                                      |
| --- | ----------- | --------------------------------------------------------- | ------------------------------------------ |
| 01  | `collect`   | Read the thread, restate the idea, detect the stage       | an issue reference (CI trigger or argument) |
| 02  | `integrate` | Fold the new answers in, judge probe or finalize          | the answers + the idea so far              |
| 03  | `probe`     | Compose one batched round of pointed questions            | the idea so far                            |
| 04  | `finalize`  | Consolidate the idea, flag what stays open                | the clarified idea                         |
| 05  | `post`      | Render the comment with its resume block and post it      | the round's body                           |

Run `01 → 02`, then `03` when real ambiguity remains or `04` when the idea is clear, then `05`. One round per invocation; the next round starts when a new invocation fires on the author's reply. Before running an action, read its file in `actions/`, not only the table or assets.

## Transversal rules

- Clarify the idea, never build it. Surface a leaning and its tradeoff when the facts point one way, but lock no solution, write no plan, produce no code.
- One round per invocation. After posting, end the invocation. Never poll, sleep, or wait for a reply.
- The thread is the state. Rebuild the idea from the resume block of the last bot comment plus the human replies posted after it. Trust the thread over anything local.
- Answer only the new comments the bot did not author, that is everything posted since the bot's last round. Never re-integrate the bot's own comments.
- Project memory (`aidd_docs/memory/`) is read-only context. Write no memory file, no repo file, nothing but the issue comment. Never touch the issue's own state either: no label, no assignee, no title edit.
- Batch the round. An async round-trip is expensive, so ask the full set of questions the live threads support, grouped by theme, instead of one at a time.
- Write comments in the thread's language.
- Posting needs an authenticated `gh` CLI with permission to comment on the issue. The CI wiring that triggers the skill belongs to the host repo, not to this skill.

## Call context

- The skill is driven by a GitHub Action in the host repository, invoked headless once per trigger. It also runs manually when the user points at an issue.
- The Action fires on **every new issue comment that contains the explicit trigger tag**. Re-tagging a reply is what launches the next round; a reply without the tag does not wake the skill. The skill itself does not depend on this — it simply reads the whole thread and answers the comments it has not yet responded to.
- The skill consumes the triggering issue from the event payload; it does not infer the repository from a local git remote.
- Finalizing produces no side effect beyond the comment. When the resume block reaches `stage: finalized`, the user decides manually whether to trigger the downstream step (creating the pull request, then a development skill, and a spec or plan in between when needed). This skill only questions until the subject is validated; it neither creates the PR nor launches development.

## Expected configuration

The host repository owns the trigger wiring; this plugin ships the skill only. A workflow is expected to:

- React to `issue_comment` (and optionally `issues`) events, gated on the presence of the trigger tag in the comment body.
- Expose an authenticated `gh` CLI (a token with `issues: write`) to the job so the skill can read the thread and post its comment.
- Invoke `aidd-async:01-async-brainstorm`, passing the issue reference from the event payload.

## References

- `references/probing.md`: altitude, threads, probing tactics, and the stop test, adapted to async rounds.

## Assets

- `assets/comment-template.md`: the issue comment skeleton, body plus the machine-readable resume block.

## External data

- `aidd_docs/memory/`: project memory, loaded as read-only context when present.
