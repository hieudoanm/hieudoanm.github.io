import { FenwickTreeSimulator } from '@/games/stem/engineering/data-structures/fenwick-trees';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Fenwick Tree Explorer</h2>
      <p className="text-base-content/70">
        Query a prefix and watch the lowbit walk visit each block.
      </p>
    </div>
    <FenwickTreeSimulator />
  </div>
);

export default Page;
