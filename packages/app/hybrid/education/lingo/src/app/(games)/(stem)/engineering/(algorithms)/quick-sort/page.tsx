import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Quicksort"
    subtitle="The practical default: in place, cache-friendly, and fast except when the pivot is bad."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Quicksort picks a pivot, partitions the array so that everything
              smaller sits to its left and everything larger to its right, and
              then recurses into each side. The pivot is now in its final
              position and is never moved again.
            </p>
            <p>
              The partition is usually a single left-to-right scan that keeps an
              index to the next slot belonging on the left, swapping each
              qualifying value there. One pass, no auxiliary memory, and a
              nearly perfect access pattern.
            </p>
          </div>
        ),
      },
      {
        title: 'The pivot decision is the whole game',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Quicksort's cost is entirely determined by how evenly the pivot
              splits the array. A pivot landing in the middle gives balanced
              subproblems and n log n behaviour; a pivot landing at either end
              gives one subproblem of size n-1 and the cost degenerates to n
              squared.
            </p>
            <p>
              Always choosing the first or last element is exactly that worst
              case, and it is trivially provoked by input that is already sorted
              — a realistic case, because repeatedly sorting nearly-sorted data
              is common. The standard fix is to pick a pivot at random, or the
              median of the first, middle, and last elements.
            </p>
          </div>
        ),
      },
      {
        title: 'In place, but not stable',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Quicksort needs no auxiliary array, which is why it tends to beat
              merge sort in practice despite having the same average bound. It
              also partitions by swapping distant elements, so it is not stable
              — equal keys can cross.
            </p>
            <p>
              The empirical gap has a hardware explanation: quicksort's inner
              loop scans memory almost linearly, so it benefits from prefetching
              and cache locality, while merge sort repeatedly jumps between the
              input and the buffer.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/quick-sort/interactive',
        label: 'Quicksort Visualiser',
        description:
          'Step through each partition and watch a pivot carve the array in two.',
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
