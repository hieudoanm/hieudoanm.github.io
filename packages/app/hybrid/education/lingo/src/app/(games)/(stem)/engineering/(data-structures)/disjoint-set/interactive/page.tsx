import { DisjointSetSimulator } from '@/games/stem/engineering/data-structures/disjoint-set';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Union-Find Playground</h2>
      <p className="text-base-content/70">
        Merge elements and watch the components and their roots change.
      </p>
    </div>
    <DisjointSetSimulator />
  </div>
);

export default Page;
