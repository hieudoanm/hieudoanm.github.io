'use client';

import { FC, useState } from 'react';
import { PdfFileUpload } from '@/components/atoms/PdfFileUpload';
import { compressPDF, downloadBlob } from '@/lib/pdf-tools';

export const PdfRepairTool: FC = () => {
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
    <div className="flex flex-col gap-4">
      <PdfFileUpload accept=".pdf" onFile={(f) => setFile(f)} />
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
  );
};
