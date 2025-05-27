import { FC } from 'react';

export const Accordian: FC = () => {
  return (
    <div className="mx-auto w-full max-w-md divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
          <span className="font-semibold text-black dark:text-neutral-100">
            What is Tailwind CSS?
          </span>
          <span className="text-lg text-neutral-600 transition-all duration-300 group-open:rotate-180 dark:text-neutral-400">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="px-4 pb-4 text-neutral-600 dark:text-neutral-400">
          Tailwind CSS is a utility-first CSS framework that provides low-level
          classes for building custom designs quickly.
        </div>
      </details>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
          <span className="font-semibold text-black dark:text-neutral-100">
            Do I need JavaScript?
          </span>
          <span className="text-lg text-neutral-600 transition-all duration-300 group-open:rotate-180 dark:text-neutral-400">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="px-4 pb-4 text-neutral-600 dark:text-neutral-400">
          No JavaScript is needed when using the native{' '}
          <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags.
        </div>
      </details>
    </div>
  );
};
