---
"title": "Trie"
"subtitle":
  "A tree of prefixes: lookup time depends on the key length, not on how many
  keys you store."
"parentLink":
  "href": "/engineering"
  "label": "Engineering"
"links":
  - "href": "/engineering/trie/interactive"
    "label": "Trie Builder"
    "description":
      "Insert words and watch shared prefixes collapse into a single path."
"references":
  - "href": "https://en.wikipedia.org/wiki/Trie"
    "label": "Trie"
    "description":
      "Prefix trees, the O(m) lookup bound, and the space trade-off."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## The idea

A trie stores keys in a tree where each edge is one character and each node
represents a prefix. The root is the empty prefix, and a node is marked terminal
exactly when it completes a stored key.

Because the structure is the set of prefixes, searching is a walk down one path:
one edge per character of the key, and no comparisons against any other key.
Lookup cost is O(m) for a key of length m, independent of n.

## What that buys and what it costs

Trie search cost does not grow with the number of stored keys, so a trie suits
very large or unbounded key sets: dictionaries, autocomplete, and IP routing
tables all use them.

The cost is space. A trie stores one node per distinct prefix, so a dictionary
of n words of length m can need O(nm) nodes, while a hash table needs O(n).
Tries are also awkward with keys that are not sequences — arbitrary numbers or
objects need an encoding step first.

## The prefix property

Storing car, cat and cart creates one shared path for c-a, then a fork. The
branch point is a real cost and a real benefit: the set of all stored keys
sharing a prefix is available for free, which is what makes prefix queries and
autocomplete cheap.

It also makes a useful distinction visible. Searching ca in a set containing
car, cat and cart walks the whole path successfully but finds no terminal node,
so the answer is correctly not a member — a prefix is not a key.
