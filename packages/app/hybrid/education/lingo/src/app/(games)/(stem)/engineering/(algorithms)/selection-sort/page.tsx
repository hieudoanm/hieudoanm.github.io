import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Selection Sort"
    subtitle="The quadratic sort with the most predictable cost — and no early exit."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Selection sort scans the unsorted region for its minimum and swaps
              that minimum into the first unsorted position. It then never looks
              at that position again and moves on to the next one.
            </p>
            <p>
              Unlike bubble and insertion sort, the amount of work barely
              depends on the input. Even a sorted array costs the same as a
              reversed one, because the minimum still has to be found by
              scanning the whole remaining region every pass.
            </p>
          </div>
        ),
      },
      {
        title: 'Fewer writes, more comparisons',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The cost profile is the interesting part. Selection sort performs
              about n squared over two comparisons — the most of any sort here —
              but at most n minus one data moves, since each pass swaps at most
              once.
            </p>
            <p>
              That makes it attractive when moving an element is dramatically
              more expensive than comparing two, such as on flash storage or
              over a network. In those settings the number of writes dominates,
              and selection sort's write count is the best available.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it is not stable',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Selection sort is not stable. A long-distance swap can move an
              equal element past an element that should come after it, so the
              relative order of equal keys is not preserved.
            </p>
            <p>
              The visualiser uses distinct values, so instability is invisible
              there. It is a property of the algorithm rather than of the
              animation, and it is worth remembering when choosing a sort for
              records that carry a secondary key.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/selection-sort/interactive',
        label: 'Selection Sort Visualiser',
        description:
          'Step through each pass and watch the minimum swap into the front of the unsorted region.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Big_O_notation',
        label: 'Big O notation',
        description:
          'How asymptotic growth classes are defined, and why constants and lower-order terms drop out.',
      },
    ]}
  />
);

export default Page;
