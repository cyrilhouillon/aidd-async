# 01 - Collect

Read the PR thread, restate the idea, and detect where the brainstorm stands.

## Input

A PR reference, from the CI trigger (event payload) or from the user's argument, plus the triggering comment when one exists.

## Output

The PR identified, the idea restated as bullets with its altitude, the human answers newer than the last bot comment, the detected stage (fresh, continue, or finalize-requested), and the project memory loaded as read-only context.

## Process

1. **Locate.** Resolve the repository and PR number from the trigger environment, or from the argument. Infer the repository from the current git remote when the argument is a bare number. If no PR resolves, stop and report what is missing.
2. **Read.** Fetch the PR title, description, and the full thread with `gh`: issue comments, inline review comments, and review bodies. Find prior bot rounds by the marker line defined in [comment-template.md](../assets/comment-template.md).
3. **Stage.** Decide the stage from the thread:
   - No marker comment → `fresh`. The idea is the PR description, or the triggering comment when it carries the idea. The answers list is explicitly empty. If neither source carries a brainstormable idea (for example the PR only reports shipped work), stop and report that there is nothing to brainstorm.
   - A marker comment exists → `continue`. Parse the resume block of the newest one, then collect the human comments posted after it.
   - A marker comment exists and the newest human reply asks to wrap up, approve, or stop → `finalize-requested`.
4. **Restate.** On `fresh`, restate the idea as short bullets at its own altitude, functional or technical, per [probing.md](../references/probing.md). On `continue`, take the idea and altitude from the resume block.
5. **Context.** When `aidd_docs/memory/` exists in the host repo, read it for context. Write nothing.

## Test

- The output names the PR, restates the idea, lists the answers newer than the last bot comment, and names the stage; no file was written.
