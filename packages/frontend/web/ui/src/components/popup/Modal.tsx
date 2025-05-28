import { FC } from 'react';

export const Modal: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
      <div className="px-6 py-4">
        <h3 className="text-2xl font-bold">Modal Title</h3>
      </div>
      <div className="px-6 py-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          venenatis ante a scelerisque rhoncus. Suspendisse vitae sem ac purus
          condimentum faucibus. Suspendisse potenti. Donec porta.
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-end">
          <button className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-red-700 dark:shadow-neutral-100/10">
            Button
          </button>
        </div>
      </div>
    </div>
  );
};
