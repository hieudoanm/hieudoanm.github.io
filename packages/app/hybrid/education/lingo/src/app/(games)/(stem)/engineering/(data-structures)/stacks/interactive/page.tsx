import { StackSimulator } from '@/games/stem/engineering/data-structures/stacks';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Stack Playground</h2>
      <p className="text-base-content/70">
        Push and pop values and watch the top of the stack move back and forth.
      </p>
    </div>
    <StackSimulator />
  </div>
);

export default Page;
