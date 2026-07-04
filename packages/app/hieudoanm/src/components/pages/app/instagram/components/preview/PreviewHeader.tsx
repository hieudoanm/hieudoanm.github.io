import type { FC } from 'react';

export const PreviewHeader: FC<{
  totalPosts: number;
  activeIndex: number;
  onCopy: () => void;
  onDownload: () => void;
}> = ({ totalPosts, activeIndex, onCopy, onDownload }) => {
  const multi = totalPosts > 1;

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-neutral text-xs font-semibold tracking-widest uppercase">
          Preview
        </h2>
        {multi && (
          <span className="text-base-content/40 text-xs">
            {activeIndex + 1} / {totalPosts}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={onCopy} className="btn btn-ghost btn-sm">
          Copy Image
        </button>
        <button onClick={onDownload} className="btn btn-primary btn-sm">
          Download PNG
        </button>
      </div>
    </div>
  );
};
