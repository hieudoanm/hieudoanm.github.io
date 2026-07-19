---
"title": "Suffix Trees and Arrays"
"subtitle":
  "Sorting every suffix to answer substring questions in logarithmic time."
"parentLink":
  "href": "/engineering"
  "label": "Engineering"
"links":
  - "href": "/engineering/suffix-arrays/interactive"
    "label": "Suffix Array Builder"
    "description":
      "Build the suffix array by doubling and watch the ranks settle."
"references":
  - "href": "https://en.wikipedia.org/wiki/Suffix_array"
    "label": "Suffix array"
    "description":
      "Doubling construction, the LCP array, and substring queries."
---

<!-- prettier-ignore-end -->

<!-- prettier-ignore-end -->

## The idea

A suffix array is the sorted list of the starting positions of every suffix of a
string. Once sorted, the suffixes sharing a given prefix form one contiguous
run, so finding every occurrence of a pattern reduces to a binary search for its
range followed by a scan of that run.

A suffix tree is the equivalent prefix tree over all suffixes, storing O(n)
nodes for a string of length n. The array uses less memory and is easier to
build; the tree answers queries faster. Most implementations build the array.

## Building the array by doubling

Comparing suffixes directly is quadratic, so the standard construction compares
prefixes of increasing power-of-two length instead. Start by ranking each
position on its first character, then re-rank on the pair of characters at
distance 2, then 4, then 8, stopping when every rank is distinct.

At each round the number of rounds is at most log n, and each round is a sort
plus a linear re-ranking pass. The visualiser shows the rank array and the
resulting order after each doubling step, which is where the correctness
argument lives.

## What you can then ask

Longest common prefix between any two suffixes is the LCP array, computable in
linear time from the suffix array and enabling the longest repeated substring
problem. Longest common substring of two strings, longest repeated substring,
and substring counting all follow from the same structure.

The array is also a compressed representation of the string itself: to store a
text of length n, storing a suffix array and a base-64 string is asymptotically
smaller than storing the text naively, which is how large genome assemblies
compress their data.
