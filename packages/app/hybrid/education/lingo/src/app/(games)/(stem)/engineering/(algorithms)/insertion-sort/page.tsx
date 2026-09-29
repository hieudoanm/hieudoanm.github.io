import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Insertion Sort"
    subtitle="The sort that is O(n) on nearly-sorted input, and the method behind most small-array sorts."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Insertion sort maintains a sorted prefix. Starting from the second
              element, it lifts the current value out, shifts every larger value
              in the prefix one position to the right, and drops the lifted
              value into the gap that opens up. Then it advances the boundary by
              one.
            </p>
            <p>
              The result is the ordinary way people hand-sort a hand of playing
              cards: hold the sorted group in one hand, pull one card at a time
              from the other, and slot it into position. Every element is
              compared against the sorted prefix exactly once per insertion.
            </p>
          </div>
        ),
      },
      {
        title: 'Why nearly-sorted input is cheap',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The cost of an insertion is proportional to how far the value has
              to travel left. On sorted or nearly-sorted data each element stays
              put, so each insertion does one comparison and no shifts, giving
              O(n) total — and O(n) with a very small constant, because the
              inner loop exits immediately.
            </p>
            <p>
              This is the whole reason insertion sort survives in production
              code. Timsort, the sorting strategy Python and Java use, falls
              back to insertion sort for runs shorter than a threshold precisely
              because small and nearly-sorted inputs are common in practice.
            </p>
          </div>
        ),
      },
      {
        title: 'The shift loop',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Notice that the implementation shifts rather than swaps. Each
              larger element moves one slot right and the hole travels left
              until it reaches the insertion point, so an element that belongs k
              places from the front costs k writes rather than the k swaps a
              swap-based version would need.
            </p>
            <p>
              The visualiser marks the gap with the active state, so the hole is
              visible as it migrates. That motion is the algorithm; everything
              else is bookkeeping.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/insertion-sort/interactive',
        label: 'Insertion Sort Visualiser',
        description:
          'Step through each insertion and watch the sorted prefix grow by one element.',
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
