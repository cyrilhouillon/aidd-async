# Probing, async rounds

How to dig until an idea is clear when every exchange is a PR comment round-trip. Depth still comes from following threads, but rounds are batched because each one may cost hours or days.

## Read the altitude first

An idea sits at a level: functional (what it does and for whom), technical (a design or tooling choice), or mixed. Probe at that level, never one finer. For a technical idea the technical choice is the subject, so engaging it is right. The how-to that implements the choice belongs to planning, leave it as a flagged assumption.

## Batch the round

A live conversation pulls one thread at a time. An async round cannot afford that. Each round covers every thread that still forks the build, grouped by theme, so the author answers once and the idea moves everywhere it can. Within a theme, still go deep, not wide: pointed questions on the fork, never a flat checklist. Number the questions so the author can answer by number and skip freely.

## Follow the threads across rounds

Each answer opens a new thread. The next round pulls what the answers opened, it never re-cycles a fixed topic list. The richest threads are forks, where two materially different builds are still possible. Name the fork and ask which side.

## Tactics to draw from

Reach for one when it fits, never run them all.

- **Five whys.** When the stated goal looks like a chosen solution, ask why a few times to reach the real need underneath.
- **Job to be done.** Reframe a named feature as "when [situation], I want [motivation], so I can [outcome]" to separate the job from the solution.
- **Concrete example.** When a term has two readings, ask for one example that fits and one that does not.
- **Premortem.** To surface failures, ask the author to imagine the idea shipped and then failed, and to name what went wrong.

## Flag, never fake

When a gap stays open, state it as an assumption or a risk to confirm at design time. A reasonable assumption clearly flagged is useful. A guess presented as settled is not.

## The stop test

The idea is clear enough when a competent reader would build the same thing from it, the forks that change the build are answered or consciously deferred, and the edges and failures have been raised. Stop there, or the moment the author asks to wrap up. Never stop on a round count.
