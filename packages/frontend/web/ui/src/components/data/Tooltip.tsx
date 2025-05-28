import { FC } from 'react';

export const Tooltip: FC = () => {
  return (
    <div className="group relative inline-block cursor-pointer">
      <span>Hover me</span>
      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 scale-95 rounded-lg bg-neutral-700 px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-neutral-800">
        <span className="z-20">This is a tooltip</span>
        <div className="absolute top-5 left-1/2 -z-10 h-3 w-3 -translate-x-1/2 rotate-45 bg-neutral-700 dark:bg-neutral-800"></div>
      </div>
    </div>
  );
};
