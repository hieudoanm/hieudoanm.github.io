import { FC } from 'react';

export const Toast: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <div className="max-w-sm rounded-md bg-purple-600 px-4 py-3 text-white dark:bg-purple-700">
        This is a toast notification!
      </div>
      <div className="max-w-sm rounded-md bg-green-600 px-4 py-3 text-white dark:bg-green-700">
        This is a toast notification!
      </div>
      <div className="max-w-sm rounded-md bg-blue-600 px-4 py-3 text-white dark:bg-blue-700">
        This is a toast notification!
      </div>
      <div className="max-w-sm rounded-md bg-orange-600 px-4 py-3 text-white dark:bg-orange-700">
        This is a toast notification!
      </div>
      <div className="max-w-sm rounded-md bg-yellow-600 px-4 py-3 text-white dark:bg-yellow-700">
        This is a toast notification!
      </div>
      <div className="max-w-sm rounded-md bg-red-600 px-4 py-3 text-white dark:bg-red-700">
        This is a toast notification!
      </div>
    </div>
  );
};
