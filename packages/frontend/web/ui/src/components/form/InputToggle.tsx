import { FC } from 'react';

export const Toggle: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
      <label
        aria-label="Toggle"
        className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-purple-600 dark:bg-neutral-800 dark:has-checked:bg-purple-700">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
      </label>
      <label
        aria-label="Toggle"
        className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-600 dark:bg-neutral-800 dark:has-checked:bg-green-700">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
      </label>
      <label
        aria-label="Toggle"
        className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-blue-600 dark:bg-neutral-800 dark:has-checked:bg-blue-700">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
      </label>
      <label
        aria-label="Toggle"
        className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-yellow-600 dark:bg-neutral-800 dark:has-checked:bg-yellow-700">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
      </label>
      <label
        aria-label="Toggle"
        className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-orange-600 dark:bg-neutral-800 dark:has-checked:bg-orange-700">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
      </label>
      <label
        aria-label="Toggle"
        className="relative block h-8 w-14 rounded-full bg-neutral-200 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-600 dark:bg-neutral-800 dark:has-checked:bg-red-700">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6 dark:bg-neutral-900"></span>
      </label>
    </div>
  );
};
