'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'create-zip' | 'epoch' | 'word-counter';

const TAB_LABELS: Record<Tab, string> = {
  'create-zip': 'Create ZIP',
  epoch: 'Epoch Converter',
  'word-counter': 'Word Counter',
};

const CLI_INFO: Record<string, { cmd: string; note: string }> = {
  'create-zip': {
    cmd: 'zip -r archive.zip <files>',
    note: 'Creates a ZIP archive. Use your system zip command.',
  },
  epoch: {
    cmd: 'hieudoanm data epoch <timestamp>',
    note: 'Converts between epoch timestamps and human-readable dates.',
  },
  'word-counter': {
    cmd: 'wc -w <file>',
    note: 'Counts words in a text file using the system wc command.',
  },
};

export const FileArchiveModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('create-zip');

  return (
    <ModalWrapper onClose={onClose} title="File Utilities">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">{TAB_LABELS[tab]}.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">{CLI_INFO[tab].cmd}</pre>
        </div>
        <p className="text-base-content/60 text-xs">{CLI_INFO[tab].note}</p>
      </div>
    </ModalWrapper>
  );
};
FileArchiveModal.displayName = 'FileArchiveModal';
