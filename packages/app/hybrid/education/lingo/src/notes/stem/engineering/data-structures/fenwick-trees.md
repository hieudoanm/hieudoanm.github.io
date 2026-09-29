---
{
  'title': 'Fenwick Tree',
  'subtitle':
    'Overlapping blocks of lowbit length: point update and prefix sum, both in
    log n, in one array.',
  'parentLink': { 'href': '/engineering', 'label': 'Engineering' },
  'links':
    [
      {
        'href': '/engineering/fenwick-trees/interactive',
        'label': 'Fenwick Tree Explorer',
        'description':
          'Query a prefix and watch the lowbit walk visit each block.',
      },
    ],
  'references':
    [
      {
        'href': 'https://en.wikipedia.org/wiki/Fenwick_tree',
        'label': 'Fenwick tree',
        'description':
          'Lowbit block decomposition and the shared update/query walk.',
      },
    ],
}
---

## The idea

A Fenwick tree, or binary indexed tree, stores at index i the sum of a block of
elements whose length is the lowbit of i — the largest power of two dividing i.
Index 3 stores one element, index 4 stores four, index 8 stores eight.

The blocks overlap, and that is the design. Any prefix can be decomposed into
O(log n) whole blocks by repeatedly clearing the lowest set bit of its endpoint,
so a prefix sum is a walk that adds one number per step.

## The i plus i and minus i trick

Updating a point at zero-based index i starts at i + 1 and advances by adding
the lowbit: i += i and -i. That single expression walks exactly the blocks
containing that element, so an update touches the same O(log n) nodes a query
would read.

Both operations are the same loop shape in opposite directions — one clearing
low bits, one setting them — which is why the structure is so small. There is no
pointer structure, no parent array, and no traversal logic.

## Choosing between the two trees

A Fenwick tree is a single flat array of n integers, against roughly 2n nodes
for a segment tree, and it is markedly simpler to implement. But its blocks are
fixed and overlapping, so it only handles invertible operations like sum,
difference, and min under a restricted update.

The segment tree generalises to any monoid, at the price of more memory and more
code. The rule of thumb is to use a Fenwick tree when the operation is a sum and
the memory matters, and a segment tree when the operation is associative but not
invertible or when you need range updates.
