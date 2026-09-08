import { FC } from 'react';

const Loading: FC = () => (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <div className="space-y-4">
      <div className="skeleton h-10 w-56" />
      <div className="skeleton h-32 w-full" />
      <div className="skeleton h-32 w-full" />
    </div>
  </main>
);

export default Loading;
