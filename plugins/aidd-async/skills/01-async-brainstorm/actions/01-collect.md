# 01 - Collect

Read the issue thread, restate the idea, and detect where the brainstorm stands.

## Input

An issue reference, from the CI trigger (event payload) or from the user's argument, plus the triggering comment when one exists.

## Output

The issue identified, the idea restated as bullets with its altitude, the human answers newer than the last bot comment, the detected stage (fresh, continue, or finalize-requested), and the project memory loaded as read-only context.

## Process

1. **Locate.** Resolve the repository and issue number from the trigger event payload, or from the argument when run manually. If no issue resolves, stop and report what is missing.
2. **Read.** Fetch the issue title, body, and the full comment thread with `gh` (for example `gh issue view` and `gh issue view --comments`). Find prior bot rounds by the marker line defined in [comment-template.md](../assets/comment-template.md).
3. **Stage.** Decide the stage from the thread:
   - No marker comment → `fresh`. The idea is the issue body, or the triggering comment when it carries the idea. The answers list is explicitly empty.
   - A marker comment exists → `continue`. Parse the resume block of the newest one, then collect the human comments the bot did not author, posted after it.
   - A marker comment exists and the newest human reply asks to wrap up, approve, or stop → `finalize-requested`.
4. **Restate.** On `fresh`, restate the idea as short bullets at its own altitude, functional or technical, per [probing.md](../references/probing.md). On `continue`, take the idea and altitude from the resume block.
5. **Context.** When `aidd_docs/memory/` exists in the host repo, read it for context. Write nothing.

## Test

- The output names the issue, restates the idea, lists the human answers newer than the last bot comment, and names the stage; no file was written.
