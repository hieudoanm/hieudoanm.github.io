import { HashTableSimulator } from '@/games/stem/engineering/data-structures/hash-tables';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Hash Table Playground</h2>
      <p className="text-base-content/70">
        Insert keys and watch the hash function scatter them across buckets.
      </p>
    </div>
    <HashTableSimulator />
  </div>
);

export default Page;
