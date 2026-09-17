import { BinarySearchSimulator } from '@/games/stem/engineering/algorithms/binary-search';

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          Binary Search Tracer
        </h1>
        <p className="text-base-content/60 text-sm">
          Watch the search window halve with every probe until the target is
          pinned down.
        </p>
      </div>
      <BinarySearchSimulator />
    </div>
  );
}
