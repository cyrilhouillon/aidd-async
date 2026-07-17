# 02 - Integrate

Fold the new answers into the idea, then judge whether to probe again or finalize.

## Input

The stage, the idea so far, and the answers collected in `01-collect`.

## Output

The updated idea, a leaning when the facts now point one way, and a judgment: probe or finalize.

## Process

1. **Branch by stage.** On `fresh` there is nothing to fold, hand the restated idea to `03-probe`. On `continue` and `finalize-requested`, fold first.
2. **Fold in.** Absorb each answer into the idea bullets. Tighten what they sharpened. Move a settled point out of the open list. When an answer opens a new thread, add it to the open list.
3. **Lean when it points.** When the clarified facts favor one option, state the leaning and its tradeoff. Record it in the open list as a flagged assumption, never as a commitment.
4. **Judge.** Apply the stop test from [probing.md](../references/probing.md):
   - On `finalize-requested`, go to `04-finalize` and carry the remaining ambiguity as open assumptions.
   - If a competent reader could still build two materially different things, go to `03-probe`.
   - Otherwise go to `04-finalize`.

## Test

- The idea reflects the answers, and the probe-or-finalize judgment rests on the remaining ambiguity or an explicit wrap-up request, never on a round count.
