import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Queue"
    subtitle="First in, first out: ordering work fairly, and why a naive array wastes memory."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              A queue adds at the rear and removes from the front, so the
              earliest element waiting is the first one served. Enqueue and
              dequeue are the two operations, and both should be O(1).
            </p>
            <p>
              The same discipline models breadth-first search, where exploring a
              graph level by level requires processing nodes in the order they
              were discovered, and it models any fair scheduling policy such as
              a print queue or a network router's buffer.
            </p>
          </div>
        ),
      },
      {
        title: 'Why the naive implementation fails',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Using an array and removing from the front means shifting every
              remaining element left by one, which is O(n) per dequeue. Worse,
              the space freed at the front is never reclaimed, so a long-running
              queue keeps growing even though it never holds more than its
              capacity.
            </p>
            <p>
              The fix is a ring buffer. Keep a head and a tail index into a
              fixed array, advance them with modular arithmetic, and reuse slots
              as they are vacated. Now both operations are O(1) with no shifting
              and no wasted space.
            </p>
          </div>
        ),
      },
      {
        title: 'The trade-off',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              A ring buffer commits to a maximum size. Exceeding it means
              rejecting new work, backpressure on the producer, or growing — and
              growing a ring buffer requires a copy, which reintroduces the cost
              you were avoiding.
            </p>
            <p>
              A linked-list queue makes the same trade differently: unbounded in
              size, O(1) at both ends if you keep a tail pointer, but it pays a
              pointer chase and an allocation per element instead of getting the
              cache behaviour of a contiguous array.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/queues/interactive',
        label: 'Queue Playground',
        description:
          'Enqueue and dequeue values and watch the front of the queue advance.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Queue_(abstract_data_type)',
        label: 'Queue (abstract data type)',
        description: 'FIFO ordering and the ring-buffer implementation.',
      },
    ]}
  />
);

export default Page;
