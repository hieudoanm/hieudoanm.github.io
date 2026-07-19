import { SuffixArraySimulator } from '@/games/stem/engineering/data-structures/suffix-arrays';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Suffix Array Builder</h2>
      <p className="text-base-content/70">
        Build the suffix array by doubling and watch the ranks settle.
      </p>
    </div>
    <SuffixArraySimulator />
  </div>
);

export default Page;
