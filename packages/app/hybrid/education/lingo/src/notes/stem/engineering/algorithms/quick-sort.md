# Quicksort

> The practical default: in place, cache-friendly, and fast except when the
> pivot is bad.

App route: `/engineering/quick-sort/` · back to [Engineering](/engineering)

## The idea

Quicksort picks a pivot, partitions the array so that everything smaller sits to
its left and everything larger to its right, and then recurses into each side.
The pivot is now in its final position and is never moved again.

The partition is usually a single left-to-right scan that keeps an index to the
next slot belonging on the left, swapping each qualifying value there. One pass,
no auxiliary memory, and a nearly perfect access pattern.

## The pivot decision is the whole game

Quicksort's cost is entirely determined by how evenly the pivot splits the
array. A pivot landing in the middle gives balanced subproblems and n log n
behaviour; a pivot landing at either end gives one subproblem of size n-1 and
the cost degenerates to n squared.

Always choosing the first or last element is exactly that worst case, and it is
trivially provoked by input that is already sorted — a realistic case, because
repeatedly sorting nearly-sorted data is common. The standard fix is to pick a
pivot at random, or the median of the first, middle, and last elements.

## In place, but not stable

Quicksort needs no auxiliary array, which is why it tends to beat merge sort in
practice despite having the same average bound. It also partitions by swapping
distant elements, so it is not stable — equal keys can cross.

The empirical gap has a hardware explanation: quicksort's inner loop scans
memory almost linearly, so it benefits from prefetching and cache locality,
while merge sort repeatedly jumps between the input and the buffer.

## Examples

- [Quicksort Visualiser](/engineering/quick-sort/interactive) — Step through
  each partition and watch a pivot carve the array in two.

## References

1. [Big O notation](https://en.wikipedia.org/wiki/Big_O_notation) — How
   asymptotic growth classes are defined, and why constants and lower-order
   terms drop out.
