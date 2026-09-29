---
{
  'title': 'Linked Lists',
  'subtitle':
    'Nodes joined by pointers: O(1) splicing, no shifting, and no random access.',
  'parentLink': { 'href': '/engineering', 'label': 'Engineering' },
  'links':
    [
      {
        'href': '/engineering/linked-lists/interactive',
        'label': 'Linked List Playground',
        'description':
          'Append nodes and search the list, watching each node visited in turn.',
      },
    ],
  'references':
    [
      {
        'href': 'https://algs4.cs.princeton.edu/home/',
        'label': 'Sedgewick & Flajolet — Algorithms, 4th edition',
        'description':
          "The standard reference for data-structure invariants and
          the\n          amortised cost of dynamic array growth.",
      },
      {
        'href': 'https://en.wikipedia.org/wiki/Linked_list',
        'label': 'Linked list',
        'description':
          'Node layout, the locality trade-off, and the skip-list variant.',
      },
    ],
}
---

## The idea

A linked list stores each element in a node holding a value and a pointer to the
next node. The nodes are allocated independently, so they need not be adjacent,
and the structure grows without copying.

That buys O(1) insertion and deletion at a known node, including in the middle
of the list. The cost is paid on lookup: there is no way to address the i-th
element, so reaching it means walking from the head, which is O(i).

## The locality trade

This is the central bargain. Arrays give O(1) access and great cache behaviour;
linked lists give O(1) splicing and terrible cache behaviour, because following
a pointer to an independently allocated node is very likely a cache miss.

The practical consequence is that traversing a list is far more expensive per
element than scanning an array, often by an order of magnitude. A linked list is
worth it when you already hold a pointer to the node you care about, and a
liability when you need to search.

## Variants

A doubly linked list adds a backward pointer, giving O(1) removal given a node
and making reverse traversal possible at the cost of one more pointer per node
and more bookkeeping on every change.

A skip list adds several forward pointers at geometrically increasing distances
to a sorted linked list, giving O(log n) search with a far simpler
implementation than a balanced tree. Redis uses sorted skip lists instead of
balanced trees, and the comparison is instructive about where simplicity beats
theory.
