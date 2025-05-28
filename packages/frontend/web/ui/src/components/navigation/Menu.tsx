import { FC } from 'react';

export const Menu: FC = () => {
  return (
    <ul className="w-full max-w-md space-y-1">
      <li>
        <button className="w-full cursor-pointer rounded-lg bg-neutral-200 px-4 py-2 text-left text-sm font-semibold text-neutral-900 hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-300">
          General
        </button>
      </li>
      <li>
        <button className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300">
          Teams
        </button>
      </li>
      <li>
        <button className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300">
          Billing
        </button>
      </li>
      <li>
        <button className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300">
          Invoices
        </button>
      </li>
      <li>
        <button className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300">
          Account
        </button>
      </li>
    </ul>
  );
};
