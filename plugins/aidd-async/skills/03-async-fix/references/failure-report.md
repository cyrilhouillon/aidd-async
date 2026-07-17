# Reporting a failure

A round that cannot finish still speaks once, then stops. The comment names what failed so the human can act without reading the CI log.

## Name the step and the reason

State which delegated step failed and why, in one line. "The push was rejected, the branch is behind the remote", not "it failed". Point at the phase, never at its internals.

## Report a hook rejection by name

When a hook rejected a step, name the hook. The human fixes the hook or its input, so the hook's name is the actionable fact.

## Never duplicate

One round, one comment. Post the failure once for this invocation, then stop. Never post a second comment that repeats a failure the newest bot comment already carries.
