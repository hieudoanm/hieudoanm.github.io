import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const Page = () => (
  <TheoryTemplate
    title="Stack"
    subtitle="Last in, first out: the discipline behind recursion, undo, and expression evaluation."
    parentLink={{ href: '/engineering', label: 'Engineering' }}
    sections={[
      {
        title: 'The idea',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              A stack restricts insertion and removal to one end, the top. Push
              adds to the top, pop removes from it, and peek reads without
              removing. Because the most recent element is always the one you
              get next, the order is last in, first out.
            </p>
            <p>
              It is the natural model for anything where the most recent
              unfinished thing must be dealt with first: a function that calls
              another function cannot finish until the callee returns, which is
              a stack.
            </p>
          </div>
        ),
      },
      {
        title: 'Where the stack is unavoidable',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Recursion is the standard case. Each call pushes a return address,
              parameters, and local variables; each return pops one frame. A
              stack that overflows is a program recursing without a base case,
              and the resulting crash is a direct readout of the memory cost of
              a frame.
            </p>
            <p>
              The same shape appears in undo, browser back, the call stack in a
              debugger, and depth-first search of a graph or tree. The traversal
              works precisely because the most recently discovered branch is
              explored first.
            </p>
          </div>
        ),
      },
      {
        title: 'Implementation',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              A stack needs only an array and a size counter, and both push and
              pop are O(1). Popping from the top is free; popping from the
              bottom would be O(n), which is why the discipline exists in the
              first place.
            </p>
            <p>
              The fixed-capacity version fails predictably — overflow on push,
              underflow on pop. A growable version doubles its capacity when
              full, making every operation amortised O(1).
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/engineering/stacks/interactive',
        label: 'Stack Playground',
        description: 'Push and pop values and watch the top of the stack move.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Stack_(abstract_data_type)',
        label: 'Stack (abstract data type)',
        description:
          'The LIFO discipline and its array and linked-list implementations.',
      },
    ]}
  />
);

export default Page;
