---
{
  'title': 'Hash Table',
  'subtitle':
    'Turning a key into an array index, so lookup stops being a search.',
  'parentLink': { 'href': '/engineering', 'label': 'Engineering' },
  'links':
    [
      {
        'href': '/engineering/hash-tables/interactive',
        'label': 'Hash Table Playground',
        'description':
          'Insert keys and watch the hash function scatter them across buckets.',
      },
    ],
  'references':
    [
      {
        'href': 'https://en.wikipedia.org/wiki/Hash_table',
        'label': 'Hash table',
        'description':
          'Hash functions, collision resolution, and load-factor resizing.',
      },
    ],
}
---

## The idea

A hash table applies a hash function to a key to get an index into an array of
buckets, then stores the key there. Lookup applies the same function and goes
straight to that bucket, so it does not search at all.

This is the structural difference from an array. An array maps index to value by
position; a hash table maps value to position by computation. The mapping is
one-way in the useful direction, which is why you cannot enumerate a table in
sorted order without extra bookkeeping.

## Collisions are guaranteed, not unlikely

A hash function maps an unbounded key space onto a finite number of buckets, so
by the pigeonhole principle collisions must occur. Design is about making them
rare and cheap: a good function spreads keys uniformly and is fast to compute.

The standard resolutions are chaining, where colliding keys form a list in the
bucket, and open addressing, where a colliding key is stored in the next free
slot and a probe sequence is defined to find it. Chaining degrades gracefully;
open addressing tends to be faster while the load factor stays low.

## Load factor and resizing

The load factor is the ratio of stored keys to buckets, and it governs
performance. Chaining tolerates a load factor above one; open addressing must
keep it below one, usually around 0.7, because a full table cannot terminate its
probe sequence.

When the load factor crosses the threshold the table resizes into a bigger array
and rehashes every key. That is O(n) work at once, which is why hash tables are
described as having amortised O(1) operations rather than worst-case O(1).
