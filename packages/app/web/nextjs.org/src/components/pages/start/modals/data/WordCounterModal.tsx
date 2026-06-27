'use client';
import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
export const WordCounterModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="Word Counter" size="max-w-lg">
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Counts words in a text file using the system wc command.
      </p>
      <div className="bg-base-200 rounded p-4">
        <p className="mb-2 text-xs font-bold">CLI Command:</p>
        <pre className="text-sm">wc -w &lt;file&gt;</pre>
      </div>
      <p className="text-base-content/60 text-xs">
        Counts words in a text file using the system wc command.
      </p>
    </div>
  </ModalWrapper>
);
WordCounterModal.displayName = 'WordCounterModal';
