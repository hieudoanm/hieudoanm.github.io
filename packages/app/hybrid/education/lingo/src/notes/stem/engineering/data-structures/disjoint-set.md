---
"title": "Disjoint Set (Union-Find)"
"subtitle":
  "Two operations, near-constant time, and the amortised bound that is almost
  O(1)."
"parentLink":
  "href": "/engineering"
  "label": "Engineering"
"links":
  - "href": "/engineering/disjoint-set/interactive"
    "label": "Union-Find Playground"
    "description":
      "Merge elements and watch the components and their roots change."
"references":
  - "href": "https://en.wikipedia.org/wiki/Disjoint-set_data_structure"
    "label": "Disjoint-set data structure"
    "description":
      "Union by rank, path compression, and the inverse Ackermann bound."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## The idea

A disjoint set forest answers exactly two questions: which component does this
element belong to, and merge these two components. It cannot list the members,
delete, or check adjacency — the narrow interface is what makes it so fast.

Each element starts as its own root. A union makes one root point at the other,
and a find walks up the parent chain to the current root. All of the cleverness
is in keeping that chain short.

## Two optimisations, both necessary

Union by rank always attaches the smaller tree under the larger, so a root's
depth grows logarithmically. Path compression rewrites every node on a find to
point directly at the root, so a second find over the same path is constant
time.

Each alone gives a bound; together they give O(alpha(n)) amortised, where alpha
is the inverse Ackermann function. That function is effectively constant for any
n you can construct — alpha(10^6) is about 4 — which is why the structure is
described as practically constant time.

## Where it appears

Disjoint set is the natural structure for merging connected components
incrementally, and it appears in Kruskal's minimum spanning tree algorithm, in
connected components of a graph, in image segmentation by region growing, and in
coarsening hierarchies for mesh simplification.

It also underpins the union-find structure behind golfing, equivalence- class
inference in unification-based type checking, and tracking equivalence relations
in constraint solvers. In all of them the operations arrive in an order that the
offline structure is well suited to.
