'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const JsonToCsvModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="JSON to CSV" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert JSON files to CSV format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm data convert input.json output.csv
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires Python with pandas installed.
        </p>
      </div>
    </ModalWrapper>
  );
};
JsonToCsvModal.displayName = 'JsonToCsvModal';
