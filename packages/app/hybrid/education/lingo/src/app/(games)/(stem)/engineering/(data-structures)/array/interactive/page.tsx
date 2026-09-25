import { ArraySimulator } from '@/games/stem/engineering/data-structures/array';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Array Playground</h2>
      <p className="text-base-content/70">
        Append and remove values, then run a linear scan across the occupied
        slots.
      </p>
    </div>
    <ArraySimulator />
  </div>
);

export default Page;
