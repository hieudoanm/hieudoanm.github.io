import type { FC } from 'react';

export const ResetButton: FC<{
  onReset: () => void;
}> = ({ onReset }) => (
  <div className="flex flex-wrap justify-center gap-4">
    <button
      className="cursor-pointer rounded-full border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-all duration-150 hover:-translate-y-px hover:border-amber-400 active:translate-y-0"
      onClick={onReset}>
      Reset bracket
    </button>
  </div>
);
