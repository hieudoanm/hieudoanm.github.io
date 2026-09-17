import { LinkedListSimulator } from '@/games/stem/engineering/data-structures/linked-lists';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Linked List Playground</h2>
      <p className="text-base-content/70">
        Append nodes, then search the list and watch each node visited in turn.
      </p>
    </div>
    <LinkedListSimulator />
  </div>
);

export default Page;
