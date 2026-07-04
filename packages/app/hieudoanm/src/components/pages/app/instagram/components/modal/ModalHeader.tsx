import type { FC } from 'react';

import { ModalTabs, type DocTab } from './ModalTabs';

export const ModalHeader: FC<{
  tab: DocTab;
  onTabChange: (tab: DocTab) => void;
  onCopy: () => void;
  copied: boolean;
  onDownload: () => void;
  onClose: () => void;
}> = ({ tab, onTabChange, onCopy, copied, onDownload, onClose }) => (
  <div className="border-base-300 flex items-center justify-between border-b px-6 py-4">
    <h2 className="text-base-content text-sm font-bold tracking-widest uppercase">
      Template Reference
    </h2>
    <div className="flex items-center gap-2">
      <ModalTabs tab={tab} onChange={onTabChange} />
      <button
        onClick={onCopy}
        className="btn btn-ghost btn-sm rounded-box text-neutral text-xs">
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <button
        onClick={onDownload}
        className="btn btn-ghost btn-sm rounded-box text-neutral text-xs">
        Download
      </button>
      <button
        onClick={onClose}
        className="btn btn-ghost btn-sm rounded-box text-neutral text-xs">
        Close
      </button>
    </div>
  </div>
);
