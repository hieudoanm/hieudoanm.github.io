import { SegmentTreeSimulator } from '@/games/stem/engineering/data-structures/segment-trees';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Segment Tree Explorer</h2>
      <p className="text-base-content/70">
        Query a range and watch which disjoint nodes get combined.
      </p>
    </div>
    <SegmentTreeSimulator />
  </div>
);

export default Page;
