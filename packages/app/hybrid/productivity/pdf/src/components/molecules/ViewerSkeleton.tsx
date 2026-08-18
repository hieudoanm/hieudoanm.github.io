import { type FC } from 'react';

const ViewerSkeleton: FC = () => (
  <div className="bg-base-200 flex h-screen flex-col">
    <div className="bg-base-100 border-base-300 flex items-center gap-2 border-b px-4 py-2">
      <div className="skeleton size-8 rounded-full" />
      <div className="skeleton h-4 w-40" />
      <div className="ml-auto flex items-center gap-2">
        <div className="skeleton size-8 rounded-full" />
        <div className="skeleton size-8 rounded-full" />
        <div className="skeleton h-4 w-16" />
        <div className="skeleton size-8 rounded-full" />
      </div>
    </div>
    <div className="flex flex-1 overflow-hidden">
      <div className="bg-base-100 border-base-300 hidden w-48 border-r p-2 lg:block">
        <div className="skeleton mb-2 h-24 rounded" />
        <div className="skeleton mb-2 h-24 rounded" />
        <div className="skeleton mb-2 h-24 rounded" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="skeleton h-[70vh] w-[50vw] max-w-[620px]" />
      </div>
    </div>
  </div>
);

export default ViewerSkeleton;
