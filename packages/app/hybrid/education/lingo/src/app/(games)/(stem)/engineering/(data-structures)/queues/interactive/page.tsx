import { QueueSimulator } from '@/games/stem/engineering/data-structures/queues';

const Page = () => (
  <div className="flex w-full flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Queue Playground</h2>
      <p className="text-base-content/70">
        Enqueue and dequeue values and watch the front of the queue advance.
      </p>
    </div>
    <QueueSimulator />
  </div>
);

export default Page;
