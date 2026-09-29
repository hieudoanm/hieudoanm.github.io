import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Heapsort"
    subtitle="A guaranteed n log n bound with no auxiliary memory, achieved by treating the array as a heap."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Heapsort reinterprets the array itself as a binary heap. In a
              max-heap every parent is at least as large as its children, so the
              largest value in the entire structure sits at index zero. That
              single fact is what makes the sort work.
            </p>
            <p>
              Build the heap in place by sifting each internal node downward
              from the bottom up, then repeatedly swap the root to the end of
              the unsorted region and sift the new root back down. Each of the
              n-1 rounds costs a logarithmic sift.
            </p>
          </div>
        ),
      },
      {
        title: 'Building the heap in O(n)',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The heapify step is worth pausing on, because it is not O(n log
              n). Sifting is only possible at internal nodes, and there are
              about n/2 of them, while the nodes near the bottom — the ones with
              the longest paths — are exactly the ones with nothing beneath
              them. Summing the work by depth gives 2n rather than n log n.
            </p>
            <p>
              Summing a geometric series is the whole argument. It is a good
              reminder that the depth of a node is not its index, and that a
              bottom-up pass over an array beats a top-down one.
            </p>
          </div>
        ),
      },
      {
        title: 'Why not simply use it',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Heapsort combines the best of merge sort and insertion sort: O(n
              log n) worst case, in place, and no worst case to fear. So why is
              it not the default?
            </p>
            <p>
              Because of cache behaviour. The sift jumps between parent and
              child indices, which are far apart in memory, so every step risks
              a cache miss. Quicksort's sequential scan prefetches beautifully
              and wins on real hardware by a wide margin, while heapsort stays a
              good choice when worst-case bounds and constant memory both
              matter.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/heap-sort/interactive',
        label: 'Heapsort Visualiser',
        description:
          'Step through heapify and the repeated root-to-end swaps of heapsort.',
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
