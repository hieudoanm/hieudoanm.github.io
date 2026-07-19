---
"title": "Segment Tree"
"subtitle":
  "Disjoint segments storing partial sums, answering any range in logarithmic
  time."
"parentLink":
  "href": "/engineering"
  "label": "Engineering"
"links":
  - "href": "/engineering/segment-trees/interactive"
    "label": "Segment Tree Explorer"
    "description": "Query a range and watch which disjoint nodes get combined."
"references":
  - "href": "https://en.wikipedia.org/wiki/Segment_tree"
    "label": "Segment tree"
    "description":
      "Disjoint segment decomposition, power-of-two sizing, and lazy
      propagation."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## The idea

A segment tree stores an aggregate for every interval of a fixed power-of- two
length. The leaves are the elements, each internal node stores the combination
of its two children, and the root holds the aggregate of the whole array.

Because the segments are disjoint, a range query decomposes into O(log n) whole
nodes. You climb from the two ends of the range, taking a node whenever its
segment lies inside the query and discarding the rest, and never descend below
the top.

## Why the size must be a power of two

The standard iterative query tests whether each bound index is odd or even,
which only works if the leaves start at a power-of-two offset. With a
non-power-of-two size the tree is no longer a complete binary structure and the
decomposition silently returns the wrong answer.

So implementations round the size up to the next power of two and pad the extra
leaves with identity values. The visualiser shows this padding, because the
unused slots are otherwise mysterious.

## Applications beyond sums

Anything associative works: minimum, maximum, greatest common divisor, or a
monoid summary. The segment tree is the general form of the prefix-sum idea that
lets a dynamic array answer range queries in logarithmic time after a
logarithmic update.

It is also the standard tool for range-update range-query problems such as lazy
propagation for range increments. The cost is memory: a tree over n elements
holds roughly 2n nodes, which is acceptable for arrays that fit in memory but
not for the largest inputs — where the Fenwick tree is usually the better trade.
