# Linear Search

> The only search that needs no ordering — and the baseline every other search
> is measured against.

App route: `/engineering/linear-search/` · back to [Engineering](/engineering)

## The idea

Linear search inspects elements in order and stops at the first match. It makes
no assumptions about the data, works on unsorted input, and is a single loop of
a dozen lines.

Its cost is one comparison per element, so it is O(n) in the worst case, though
the best case is O(1) when the target happens to be first.

## When scanning is the right answer

A small array is faster to scan than to set up. Even with a sorted array, binary
search only overtakes linear search somewhere around a dozen elements, because
it pays for the initial branch mispredictions and cache misses that the simple
sequential loop avoids entirely.

The other case is a single query over unsorted data. Sorting first to search
once costs O(n log n) to save an O(n) scan, which is a bad trade. Sorted data
plus many queries is the only situation where the preprocessing pays for itself.

## Early exit and sentinel values

The early-exit check that stops at the first match is not merely an
optimisation. It is what makes linear search sensitive to where the target sits,
and it is why a successful search on a well-chosen data layout is far cheaper
than an unsuccessful one.

The loop can also be written without a bounds check by appending a sentinel
value that cannot equal the target, trading a branch inside the loop for one at
the end. Modern compilers usually make that rewrite pointless, since the branch
predicts perfectly — an instructive example of an optimisation that outlived its
hardware.

## Examples

- [Linear Search Tracer](/engineering/linear-search/interactive) — Watch each
  element get probed in turn until the target turns up.

## References

1. [Binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)
   — The halving argument, the exact iteration count, and the preconditions that
   make it correct.
2. [MIT 6.006 — Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)
   — Lecture notes covering asymptotics, sorting lower bounds, and hash-based
   lookup.
