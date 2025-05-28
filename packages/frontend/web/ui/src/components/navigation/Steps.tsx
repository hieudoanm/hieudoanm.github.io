import { FC } from 'react';

export const Steps: FC = () => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-full w-1/3 rounded-full bg-purple-600 dark:bg-purple-700"></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-purple-600 dark:text-purple-700">
            Step 1
          </p>
          <p className="font-semibold text-purple-600 dark:text-purple-700">
            Step 2
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 3
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 4
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-full w-1/3 rounded-full bg-green-600 dark:bg-green-700"></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-green-600 dark:text-green-700">
            Step 1
          </p>
          <p className="font-semibold text-green-600 dark:text-green-700">
            Step 2
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 3
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 4
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-full w-1/3 rounded-full bg-blue-600 dark:bg-blue-700"></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-blue-600 dark:text-blue-700">
            Step 1
          </p>
          <p className="font-semibold text-blue-600 dark:text-blue-700">
            Step 2
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 3
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 4
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-full w-1/3 rounded-full bg-yellow-600 dark:bg-yellow-700"></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-yellow-600 dark:text-yellow-700">
            Step 1
          </p>
          <p className="font-semibold text-yellow-600 dark:text-yellow-700">
            Step 2
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 3
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 4
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-full w-1/3 rounded-full bg-orange-600 dark:bg-orange-700"></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-orange-600 dark:text-orange-700">
            Step 1
          </p>
          <p className="font-semibold text-orange-600 dark:text-orange-700">
            Step 2
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 3
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 4
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div className="h-full w-1/3 rounded-full bg-red-600 dark:bg-red-700"></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-red-600 dark:text-red-700">Step 1</p>
          <p className="font-semibold text-red-600 dark:text-red-700">Step 2</p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 3
          </p>
          <p className="font-semibold text-neutral-400 dark:text-neutral-600">
            Step 4
          </p>
        </div>
      </div>
    </div>
  );
};
