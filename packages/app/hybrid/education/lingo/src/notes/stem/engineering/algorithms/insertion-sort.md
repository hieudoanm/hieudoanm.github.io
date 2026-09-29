# Insertion Sort

> The sort that is O(n) on nearly-sorted input, and the method behind most
> small-array sorts.

App route: `/engineering/insertion-sort/` · back to [Engineering](/engineering)

## The idea

Insertion sort maintains a sorted prefix. Starting from the second element, it
lifts the current value out, shifts every larger value in the prefix one
position to the right, and drops the lifted value into the gap that opens up.
Then it advances the boundary by one.

The result is the ordinary way people hand-sort a hand of playing cards: hold
the sorted group in one hand, pull one card at a time from the other, and slot
it into position. Every element is compared against the sorted prefix exactly
once per insertion.

## Why nearly-sorted input is cheap

The cost of an insertion is proportional to how far the value has to travel
left. On sorted or nearly-sorted data each element stays put, so each insertion
does one comparison and no shifts, giving O(n) total — and O(n) with a very
small constant, because the inner loop exits immediately.

This is the whole reason insertion sort survives in production code. Timsort,
the sorting strategy Python and Java use, falls back to insertion sort for runs
shorter than a threshold precisely because small and nearly-sorted inputs are
common in practice.

## The shift loop

Notice that the implementation shifts rather than swaps. Each larger element
moves one slot right and the hole travels left until it reaches the insertion
point, so an element that belongs k places from the front costs k writes rather
than the k swaps a swap-based version would need.

The visualiser marks the gap with the active state, so the hole is visible as it
migrates. That motion is the algorithm; everything else is bookkeeping.

## Examples

- [Insertion Sort Visualiser](/engineering/insertion-sort/interactive) — Step
  through each insertion and watch the sorted prefix grow by one element.

## References

1. [Big O notation](https://en.wikipedia.org/wiki/Big_O_notation) — How
   asymptotic growth classes are defined, and why constants and lower-order
   terms drop out.
