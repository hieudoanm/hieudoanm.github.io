---
{
  'title': 'Array',
  'subtitle':
    "Contiguous storage: O(1) access by index, and a cache that reads ahead
    for\n    you.",
  'parentLink': { 'href': '/engineering', 'label': 'Engineering' },
  'links':
    [
      {
        'href': '/engineering/array/interactive',
        'label': 'Array Playground',
        'description':
          "Append and remove values and watch which slots the
          structure\n          occupies.",
      },
    ],
  'references':
    [
      {
        'href': 'https://en.wikipedia.org/wiki/Array_data_structure',
        'label': 'Array data structure',
        'description':
          "Contiguous storage, amortised growth, and the shift cost of
          mid-array\n          edits.",
      },
    ],
}
---

## The idea

An array keeps elements next to each other in memory, so the address of element
i is the address of the first element plus i times the element size. That
arithmetic is the whole reason indexing is constant time — no search, no
bookkeeping, just a load.

The contiguity also means the hardware prefetcher works for you. Sequential
access runs at close to memory bandwidth, which is why array- based sorts beat
pointer-chasing algorithms in practice even when their operation counts are
comparable.

## The cost of the middle

Everything is not constant time. Inserting or deleting at position i means
shifting every element after it, which is O(n). Inserting at the end is O(1)
amortised, but only because the structure grows geometrically: when it runs out
of room it allocates twice the space and copies, so the occasional expensive
copy is paid for by all the cheap ones.

Amortised is the key word. A single insertion can cost O(n), but any sequence of
n insertions costs O(n) in total. Structures like stacks and queues built on an
array rely on exactly this argument.

## When to reach for one

Arrays are the right default. They have the lowest constant factors of any
general-purpose structure, they serialise trivially, and they interact well with
binary search because the data is already in the order you need to search.

The structure to prefer instead is one with expensive or impossible random
access — sparse indices, arbitrary insertion in the middle at high frequency, or
a working set far larger than memory.
