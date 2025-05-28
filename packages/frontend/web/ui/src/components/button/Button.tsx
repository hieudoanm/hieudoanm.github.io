import { FC } from 'react';

export const Button: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:grid-rows-2 md:gap-4">
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <button className="cursor-pointer rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-white shadow dark:bg-purple-700 dark:shadow-neutral-100/10">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-green-600 bg-green-600 px-4 py-2 text-white shadow dark:bg-green-700 dark:shadow-neutral-100/10">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-white shadow dark:bg-blue-700 dark:shadow-neutral-100/10">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-yellow-600 bg-yellow-600 px-4 py-2 text-white shadow dark:bg-yellow-700 dark:shadow-neutral-100/10">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-orange-600 bg-orange-600 px-4 py-2 text-white shadow dark:bg-orange-700 dark:shadow-neutral-100/10">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-red-600 bg-red-600 px-4 py-2 text-white shadow dark:bg-red-700 dark:shadow-neutral-100/10">
          Button
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <button className="cursor-pointer rounded-md border border-purple-600 px-4 py-2 text-purple-600 dark:border-purple-700 dark:text-purple-700">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-green-600 px-4 py-2 text-green-600 dark:border-green-700 dark:text-green-700">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-blue-600 px-4 py-2 text-blue-600 dark:border-blue-700 dark:text-blue-700">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-yellow-600 px-4 py-2 text-yellow-600 dark:border-yellow-700 dark:text-yellow-700">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-orange-600 px-4 py-2 text-orange-600 dark:border-orange-700 dark:text-orange-700">
          Button
        </button>
        <button className="cursor-pointer rounded-md border border-red-600 px-4 py-2 text-red-600 dark:border-red-700 dark:text-red-700">
          Button
        </button>
      </div>
    </div>
  );
};
