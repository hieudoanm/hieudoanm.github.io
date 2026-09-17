---
"title": "Bubble Sort"
"subtitle": "The slowest comparison sort, and the clearest one to reason about."
"parentLink":
  "href": "/engineering"
  "label": "Engineering"
"links":
  - "href": "/engineering/bubble-sort/interactive"
    "label": "Bubble Sort Visualiser"
    "description":
      "Step through each pass and watch the largest unsorted value bubble to the
      right end."
"references":
  - "href": "https://en.wikipedia.org/wiki/Big_O_notation"
    "label": "Big O notation"
    "description":
      "How asymptotic growth classes are defined, and why constants and
      lower-order terms drop out."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## The idea

Bubble sort walks the array from left to right and swaps any two neighbouring
values that are out of order. Each element that is too large therefore slides
rightward one place per pass, and after a full pass the largest remaining value
has reached its final position at the right end.

The name describes what you would see if you watched the values: smaller ones
rise through the list like bubbles. Nothing about the algorithm depends on that
imagery — what matters is the invariant that after pass k, the k largest values
are in their final positions, so the unsorted region shrinks by exactly one per
pass.

## Why the best case is O(n)

The naive version always runs the full n-1 passes, which is quadratic even on
sorted input. Adding a flag that records whether a pass performed any swap makes
the common case cheap: if a whole pass makes no swap, the array is already
ordered and the sort can stop immediately.

That single flag is the difference between O(n^2) and O(n) on already-sorted or
nearly-sorted data, which is precisely the case that makes bubble sort
interesting in practice as well as on paper.

## What it is good for

Almost nothing, in terms of speed. It appears in teaching because the invariant
is obvious and the visualisation is immediate — which is why this page ships an
interactive one.

It is worth knowing as a contrast case. It is stable, it sorts in place, and it
is the only sort here whose correctness argument needs no auxiliary structure,
so it is a useful baseline against which quicksort's partitioning and heapsort's
heap property are compared.
