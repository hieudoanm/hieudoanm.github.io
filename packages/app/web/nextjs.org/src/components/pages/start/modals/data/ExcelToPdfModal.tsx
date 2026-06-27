'use client';

import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

export const ExcelToPdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose} title="Excel to PDF" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Convert Excel files to PDF format.</p>
        <div className="bg-base-200 rounded p-4">
          <p className="mb-2 text-xs font-bold">CLI Command:</p>
          <pre className="text-sm">hieudoanm data excel info file.xlsx</pre>
          <pre className="mt-2 text-sm">
            hieudoanm data excel to-csv file.xlsx
          </pre>
        </div>
        <p className="text-base-content/60 text-xs">
          Excel to PDF conversion requires LibreOffice or pandoc on your system.
        </p>
      </div>
    </ModalWrapper>
  );
};
ExcelToPdfModal.displayName = 'ExcelToPdfModal';
