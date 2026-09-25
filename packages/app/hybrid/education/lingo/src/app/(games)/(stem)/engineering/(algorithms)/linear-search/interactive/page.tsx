import { LinearSearchSimulator } from '@/games/stem/engineering/algorithms/linear-search';

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          Linear Search Tracer
        </h1>
        <p className="text-base-content/60 text-sm">
          Watch each element get probed in turn until the target turns up.
        </p>
      </div>
      <LinearSearchSimulator />
    </div>
  );
}
