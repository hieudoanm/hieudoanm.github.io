import type { FC } from 'react';

export const BracketActions: FC<{
  onReset: () => void;
  onDownload: () => void;
  onShare: () => void;
  copied: boolean;
}> = ({ onReset, onDownload, onShare, copied }) => (
  <div className="mt-8 flex flex-wrap justify-center gap-4">
    <button
      className="cursor-pointer rounded-full border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-all duration-150 hover:-translate-y-px hover:border-amber-400 active:translate-y-0"
      onClick={onReset}>
      Reset bracket
    </button>
    <button
      className="cursor-pointer rounded-full border border-neutral-600 bg-neutral-800 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-all duration-150 hover:-translate-y-px hover:border-amber-400 active:translate-y-0"
      onClick={onDownload}>
      Download
    </button>
    <button
      className="cursor-pointer rounded-full border border-neutral-500 bg-neutral-700 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-all duration-150 hover:-translate-y-px hover:border-amber-400 active:translate-y-0"
      onClick={onShare}>
      {copied ? 'Copied!' : 'Share'}
    </button>
  </div>
);
BracketActions.displayName = 'BracketActions';
