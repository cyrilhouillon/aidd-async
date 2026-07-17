---
name: 02-async-implement
description: Implement a ready GitHub issue by delegating the full development flow and comment the resulting draft pull request back on the issue. Use when the user wants to turn a ready issue into an open draft pull request. Not for brainstorming an idea or reviewing code.
argument-hint: collect | delegate | post
---

# Async implement

Turns a ready issue into an open draft pull request. Each invocation runs one build: read the request from the issue thread, preferring the finalized brainstorm consolidation when the thread carries one, delegate the whole development flow to the SDLC orchestrator running unattended, read the draft pull request it opens, comment the link back on the issue, end. The issue thread carries the state between the pipeline's stages.

## Actions

| #   | Action     | Role                                                            | Input                                        |
| --- | ---------- | -------------------------------------------------------------- | -------------------------------------------- |
| 01  | `collect`  | Read the request from the thread, detect prior activity        | an issue reference (CI trigger or argument)  |
| 02  | `delegate` | Run the SDLC orchestrator unattended, capture the PR or failure | the request from collect                     |
| 03  | `post`     | Comment the pull request link or the named failure             | the delegation outcome                       |

Run `01 → 02 → 03`. One build per invocation; the issue is done once the draft pull request is linked. Before running an action, read its file in `actions/`, not only the table or assets.

## Transversal rules

- Delegate, never build. Carry no planning, coding, review, or pull-request logic; the delegated flow owns all of it.
- One build per invocation. After posting, end the invocation. Never poll, sleep, or wait for a reply.
- Run the delegated flow to completion inside this one invocation. Spawn every subagent synchronously and read its result before continuing. Never background a task or defer work to a later turn, because a headless run has no later turn; ending before the pull request is open and commented loses the whole build.
- The issue thread is the state. Rebuild the request from the issue body and its comments. Trust the thread over anything local.
- The skill runs on a feature branch the host workflow prepared from the default branch. It assumes this branch, it never creates, names, rebases, merges, or force-pushes one.
- Open no pull request. The delegated ship step opens the draft; the skill only reads the URL ship returns.
- Project memory (`aidd_docs/memory/`) is read-only context. The delegated flow writes the code; this skill writes nothing but the issue comment. Never touch the issue's own state either: no label, no assignee, no title edit.
- Never end silently. On a failure, post a comment naming what failed and where per `references/failure-report.md`, then stop. Never retry into a duplicate comment.
- Write comments in the thread's language.
- Posting needs an authenticated `gh` CLI with permission to comment on the issue. The CI wiring that triggers the skill belongs to the host repo, not to this skill.

## Call context

- The skill is driven by a GitHub Action in the host repository, invoked headless once per trigger. It also runs manually when the user points at a ready issue.
- The Action fires on a new issue comment carrying the explicit implement trigger tag. One trigger, one build.
- The skill consumes the triggering issue from the event payload; it does not infer the repository from a local git remote.
- The draft is deliberate. Ship opens the pull request as a draft so the human reviews and promotes it; that draft is the validation gate, and the skill adds no other approval step.

## Expected configuration

The host repository owns the trigger wiring; this plugin ships the skill only. A workflow is expected to:

- React to `issue_comment` events, gated on the presence of the implement trigger tag in the comment body.
- Check out a feature branch prepared from the default branch before the skill runs.
- Expose an authenticated `gh` CLI (a token with `contents: write`, `issues: write`, and `pull-requests: write`) so the delegated flow can push the branch and open the draft, and the skill can comment.
- Invoke `aidd-async:02-async-implement`, passing the issue reference from the event payload.

## References

- `references/failure-report.md`: how to name a delegation, review, or push failure in a comment without duplicating.

## Assets

- `assets/pr-comment.md`: the issue comment linking the opened draft pull request.
- `assets/failure-comment.md`: the issue comment naming what failed and where.

## External data

- `aidd_docs/memory/`: project memory, loaded as read-only context when present.
