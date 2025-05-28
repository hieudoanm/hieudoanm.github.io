import { FC } from 'react';

export const ButtonGroup: FC = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center divide-x divide-purple-700 overflow-hidden rounded border border-purple-700 dark:divide-purple-800 dark:border-purple-800">
        <button
          type="button"
          className="grow cursor-pointer bg-purple-600 px-4 py-2 text-white shadow dark:bg-purple-700">
          Button 1
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-purple-600 px-4 py-2 text-white shadow dark:bg-purple-700">
          Button 2
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-purple-600 px-4 py-2 text-white shadow dark:bg-purple-700">
          Button 3
        </button>
      </div>
      <div className="flex items-center divide-x divide-green-700 overflow-hidden rounded border border-green-700 dark:divide-green-800 dark:border-green-800">
        <button
          type="button"
          className="grow cursor-pointer bg-green-600 px-4 py-2 text-white shadow dark:bg-green-700">
          Button 1
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-green-600 px-4 py-2 text-white shadow dark:bg-green-700">
          Button 2
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-green-600 px-4 py-2 text-white shadow dark:bg-green-700">
          Button 3
        </button>
      </div>
      <div className="flex items-center divide-x divide-blue-700 overflow-hidden rounded border border-blue-700 dark:divide-blue-800 dark:border-blue-800">
        <button
          type="button"
          className="grow cursor-pointer bg-blue-600 px-4 py-2 text-white shadow dark:bg-blue-700">
          Button 1
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-blue-600 px-4 py-2 text-white shadow dark:bg-blue-700">
          Button 2
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-blue-600 px-4 py-2 text-white shadow dark:bg-blue-700">
          Button 3
        </button>
      </div>
      <div className="flex items-center divide-x divide-yellow-700 overflow-hidden rounded border border-yellow-700 dark:divide-yellow-800 dark:border-yellow-800">
        <button
          type="button"
          className="grow cursor-pointer bg-yellow-600 px-4 py-2 text-white shadow dark:bg-yellow-700">
          Button 1
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-yellow-600 px-4 py-2 text-white shadow dark:bg-yellow-700">
          Button 2
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-yellow-600 px-4 py-2 text-white shadow dark:bg-yellow-700">
          Button 3
        </button>
      </div>
      <div className="flex items-center divide-x divide-orange-700 overflow-hidden rounded border border-orange-700 dark:divide-orange-800 dark:border-orange-800">
        <button
          type="button"
          className="grow cursor-pointer bg-orange-600 px-4 py-2 text-white shadow dark:bg-orange-700">
          Button 1
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-orange-600 px-4 py-2 text-white shadow dark:bg-orange-700">
          Button 2
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-orange-600 px-4 py-2 text-white shadow dark:bg-orange-700">
          Button 3
        </button>
      </div>
      <div className="flex items-center divide-x divide-red-700 overflow-hidden rounded border border-red-700 dark:divide-red-800 dark:border-red-800">
        <button
          type="button"
          className="grow cursor-pointer bg-red-600 px-4 py-2 text-white shadow dark:bg-red-700">
          Button 1
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-red-600 px-4 py-2 text-white shadow dark:bg-red-700">
          Button 2
        </button>
        <button
          type="button"
          className="grow cursor-pointer bg-red-600 px-4 py-2 text-white shadow dark:bg-red-700">
          Button 3
        </button>
      </div>
    </div>
  );
};
