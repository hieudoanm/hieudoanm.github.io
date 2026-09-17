---
"title": "Binary Search"
"subtitle":
  "Halving the window each step: the algorithm that turned searching from
  minutes into microseconds."
"parentLink":
  "href": "/engineering"
  "label": "Engineering"
"links":
  - "href": "/engineering/binary-search/interactive"
    "label": "Binary Search Tracer"
    "description":
      "Watch the search window halve with every probe until the target is pinned
      down."
"references":
  - "href": "https://en.wikipedia.org/wiki/Binary_search_algorithm"
    "label": "Binary search algorithm"
    "description":
      "The halving argument, the exact iteration count, and the preconditions
      that make it correct."
  - "href": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"
    "label": "MIT 6.006 — Introduction to Algorithms"
    "description":
      "Lecture notes covering asymptotics, sorting lower bounds, and hash-based
      lookup."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## The idea

Binary search only works on sorted data. It compares the target against the
middle element, and the answer to that one comparison discards half the
remaining candidates. The window halves until it is empty, or until the middle
element matches.

Starting with n candidates, after k probes at most n/2^k remain. Solving for
when that drops below one gives ceil(log2(n+1)) probes — about 30 comparisons to
locate a value in a billion-element array.

## The loop invariants

Two facts make the loop correct. The target, if present, always lies within the
current window. Each comparison either finds it or moves one bound, so the
window stays valid and strictly shrinks.

The off-by-one hazard is the termination condition. Written as lo <= hi the loop
handles an inclusive window; written as lo < hi with hi as the last candidate,
the two forms disagree by one on empty ranges, and the bug shows up only on
single- element and absent cases.

## Why it needs sorted data

The halving argument depends entirely on a comparison being able to eliminate
one side. Without sorted order, the comparison tells you nothing about the rest
of the array, and the algorithm is no better than scanning.

This is the trade at the heart of searching: sorting costs O(n log n) once, and
every subsequent query is then logarithmic. Sort when you will query repeatedly;
scan when you will query once.
