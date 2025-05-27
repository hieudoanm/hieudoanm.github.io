import { FC } from 'react';

export const Accordian: FC = () => {
  return (
    <div className="mx-auto w-full max-w-md divide-y divide-neutral-200 rounded border border-neutral-200 bg-white shadow">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
          <span className="font-semibold text-gray-800">
            What is Tailwind CSS?
          </span>
          <span className="text-lg text-gray-500 transition-all duration-300 group-open:rotate-180">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="px-4 pb-4 text-gray-600">
          Tailwind CSS is a utility-first CSS framework that provides low-level
          classes for building custom designs quickly.
        </div>
      </details>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
          <span className="font-semibold text-gray-800">
            Do I need JavaScript?
          </span>
          <span className="text-lg text-gray-500 transition-all duration-300 group-open:rotate-180">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="px-4 pb-4 text-gray-600">
          No JavaScript is needed when using the native{' '}
          <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags.
        </div>
      </details>
    </div>
  );
};
