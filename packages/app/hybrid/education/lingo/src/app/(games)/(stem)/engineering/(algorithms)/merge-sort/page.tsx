import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Merge Sort"
    subtitle="The divide-and-conquer sort that always takes n log n and pays for it with memory."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Merge sort splits the array in half recursively until each piece
              is a single element, which is trivially sorted, then merges pairs
              of sorted runs back together. The merge always compares the two
              front elements and writes the smaller one, so each merge pass is
              linear in the size of the run it is producing.
            </p>
            <p>
              The recursion bottoms out at size one, so there is no separate
              base case to reason about. The whole algorithm is the observation
              that merging two sorted runs of length k takes O(k), plus the fact
              that there are log n levels of merging.
            </p>
          </div>
        ),
      },
      {
        title: 'Why the buffer is necessary',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The merge cannot be done in place. Writing the smallest value into
              the output position destroys the input value we have not read yet,
              so the run has to be copied into an auxiliary buffer first. That
              buffer is the algorithm's real cost: O(n) extra space.
            </p>
            <p>
              The visualiser shows the buffer as a second row so the copy is
              visible rather than implicit. It is the clearest way to see why
              merge sort trades memory for its guaranteed bound.
            </p>
          </div>
        ),
      },
      {
        title: 'Always the same cost',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Unlike quicksort, merge sort has no bad case. Already-sorted,
              reversed, and random input all cost n log n, because the merge
              always performs the same number of comparisons per level
              regardless of the values involved.
            </p>
            <p>
              That predictability is why it is the default choice when the worst
              case has to be bounded — real-time systems, and merge phases of
              external sorts where the data no longer fits in memory.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/merge-sort/interactive',
        label: 'Merge Sort Visualiser',
        description:
          'Step through each merge and watch two sorted runs combine through the auxiliary buffer.',
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
