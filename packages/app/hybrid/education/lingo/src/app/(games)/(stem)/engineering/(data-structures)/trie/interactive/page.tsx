import { TrieSimulator } from '@/games/stem/engineering/data-structures/trie';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Trie Builder</h2>
      <p className="text-base-content/70">
        Insert words and watch shared prefixes collapse into a single path.
      </p>
    </div>
    <TrieSimulator />
  </div>
);

export default Page;
