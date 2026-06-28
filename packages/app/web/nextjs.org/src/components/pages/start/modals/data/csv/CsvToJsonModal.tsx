'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const CsvToJsonModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="CSV to JSON" size="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert CSV files to JSON format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">
            hieudoanm data convert input.csv output.json
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Requires Python with pandas installed.
        </p>
      </div>
    </ModalWrapper>
  );
};
CsvToJsonModal.displayName = 'CsvToJsonModal';
