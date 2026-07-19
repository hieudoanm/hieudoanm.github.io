import { SelectionSortSimulator } from '@/games/stem/engineering/algorithms/selection-sort';

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          Selection Sort Visualiser
        </h1>
        <p className="text-base-content/60 text-sm">
          Step through each pass and watch the minimum swap into the front of
          the unsorted region.
        </p>
      </div>
      <SelectionSortSimulator />
    </div>
  );
}
