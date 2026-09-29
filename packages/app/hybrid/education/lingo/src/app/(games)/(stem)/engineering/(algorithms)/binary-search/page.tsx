import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Binary Search"
    subtitle="Halving the window each step: the algorithm that turned searching from minutes into microseconds."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Binary search only works on sorted data. It compares the target
              against the middle element, and the answer to that one comparison
              discards half the remaining candidates. The window halves until it
              is empty, or until the middle element matches.
            </p>
            <p>
              Starting with n candidates, after k probes at most n/2^k remain.
              Solving for when that drops below one gives ceil(log2(n+1)) probes
              — about 30 comparisons to locate a value in a billion-element
              array.
            </p>
          </div>
        ),
      },
      {
        title: 'The loop invariants',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Two facts make the loop correct. The target, if present, always
              lies within the current window. Each comparison either finds it or
              moves one bound, so the window stays valid and strictly shrinks.
            </p>
            <p>
              The off-by-one hazard is the termination condition. Written as lo
              &lt;= hi the loop handles an inclusive window; written as lo &lt;
              hi with hi as the last candidate, the two forms disagree by one on
              empty ranges, and the bug shows up only on single- element and
              absent cases.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it needs sorted data',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The halving argument depends entirely on a comparison being able
              to eliminate one side. Without sorted order, the comparison tells
              you nothing about the rest of the array, and the algorithm is no
              better than scanning.
            </p>
            <p>
              This is the trade at the heart of searching: sorting costs O(n log
              n) once, and every subsequent query is then logarithmic. Sort when
              you will query repeatedly; scan when you will query once.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/binary-search/interactive',
        label: 'Binary Search Tracer',
        description:
          'Watch the search window halve with every probe until the target is pinned down.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Binary_search_algorithm',
        label: 'Binary search algorithm',
        description:
          'The halving argument, the exact iteration count, and the preconditions that make it correct.',
      },
      {
        href: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
        label: 'MIT 6.006 — Introduction to Algorithms',
        description:
          'Lecture notes covering asymptotics, sorting lower bounds, and hash-based lookup.',
      },
    ]}
  />
);

export default Page;
