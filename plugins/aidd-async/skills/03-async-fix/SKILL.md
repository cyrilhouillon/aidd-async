---
name: 03-async-fix
description: Apply the review feedback on an open pull request by delegating the fix and the review then pushing onto the pull request branch. Use when the user wants to address review comments on an open pull request. Not for opening a pull request or brainstorming an idea.
argument-hint: collect | delegate | commit | post
---

# Async fix

Applies the review feedback on an open pull request. Each invocation runs one round: read the feedback newer than the last bot activity, delegate the fix and the review, commit and push onto the pull request branch, comment back, end. The pull request thread carries the state between rounds.

## Actions

| #   | Action     | Role                                                          | Input                                             |
| --- | ---------- | ------------------------------------------------------------ | ------------------------------------------------- |
| 01  | `collect`  | Read the feedback newer than the last bot activity           | a pull request reference (CI trigger or argument) |
| 02  | `delegate` | Delegate the fix then the review, capture verdict or failure | the feedback from collect                         |
| 03  | `commit`   | Commit and push the fix onto the pull request branch         | the reviewed fix                                  |
| 04  | `post`     | Comment the applied fix or the named failure                 | the round's outcome                               |

Run `01 → 02 → 03 → 04`. One round per invocation; the next round starts when a new invocation fires on fresh feedback. Before running an action, read its file in `actions/`, not only the table or assets.

## Transversal rules

- Delegate, never build. Carry no coding, review, commit, or pull-request logic; the delegated steps own all of it.
- One round per invocation. After posting, end the invocation. Never poll, sleep, or wait for a reply.
- The pull request thread is the state. Answer only the feedback posted after the bot's last activity. Rebuild it from the thread, trust it over anything local.
- The skill runs on the pull request branch the host workflow checked out. It assumes this branch, it never creates, names, rebases, merges, or force-pushes one.
- Open no pull request. The pull request already exists; the push onto its branch updates it.
- Project memory (`aidd_docs/memory/`) is read-only context. The delegated fix writes the code; this skill writes nothing but the pull request comment. Never touch the pull request's own state either: no label, no reviewer, no title edit.
- Never end silently. On a failure, post a comment naming what failed and where per `references/failure-report.md`, then stop. Never retry into a duplicate comment.
- Write comments in the thread's language.
- Posting needs an authenticated `gh` CLI with permission to comment on the pull request. The CI wiring that triggers the skill belongs to the host repo, not to this skill.

## Call context

- The skill is driven by a GitHub Action in the host repository, invoked headless once per trigger. It also runs manually when the user points at a pull request.
- The Action fires on a new pull request comment carrying the explicit fix trigger tag. Re-tagging a reply launches the next round; a reply without the tag does not wake the skill.
- The skill consumes the triggering pull request from the event payload; it does not infer the repository from a local git remote.
- The push updates the existing draft; the human still reviews and promotes it. The skill adds no approval step.

## Expected configuration

The host repository owns the trigger wiring; this plugin ships the skill only. A workflow is expected to:

- React to `issue_comment` events on pull requests, gated on the presence of the fix trigger tag in the comment body.
- Check out the pull request branch before the skill runs.
- Expose an authenticated `gh` CLI (a token with `contents: write` and `pull-requests: write`) so the skill can push onto the branch and comment.
- Invoke `aidd-async:03-async-fix`, passing the pull request reference from the event payload.

## References

- `references/failure-report.md`: how to name a fix, review, or push failure in a comment without duplicating.

## Assets

- `assets/fix-comment.md`: the pull request comment summarizing the applied fix and the review verdict.
- `assets/failure-comment.md`: the pull request comment naming what failed and where.

## External data

- `aidd_docs/memory/`: project memory, loaded as read-only context when present.
