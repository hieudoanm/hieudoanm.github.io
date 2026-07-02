'use client';

import { FC, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { compressPDF, downloadBlob } from '../../pdf-misc/utils/pdf';

export const PdfRepairModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRepair = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await compressPDF(file);
      downloadBlob(bytes, 'repaired.pdf');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose} title="Repair PDF" size="max-w-md">
      <div className="flex flex-col gap-4">
        <Dropzone accept=".pdf" onFile={(f) => setFile(f)} />

        <div className="flex flex-col gap-3">
          <p className="text-base-content/70 text-sm">
            Re-saves the PDF to fix structural issues. This is a best-effort
            repair.
          </p>
          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={handleRepair}>
            {loading ? 'Repairing...' : 'Repair'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
PdfRepairModal.displayName = 'PdfRepairModal';
