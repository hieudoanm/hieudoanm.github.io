'use client';

import { type FC, Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { exportAsSVG, copyToClipboard } from '@/utils/format';
import { IconWorkbench } from '@/components/organisms/IconWorkbench';
import { FiArrowLeft, FiCopy, FiDownload, FiSave } from 'react-icons/fi';

const CodeEditorContent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const documentId = searchParams.get('id') as string;
  const { addToast } = useToast();
  const { documents, updateDocument } = useData();
  const [code, setCode] = useState('');
  const svgDoc = documents.find((d) => d.id === documentId);

  useEffect(() => {
    if (svgDoc) {
      setCode(exportAsSVG(svgDoc));
    }
  }, [svgDoc]);

  if (!documentId || !svgDoc) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const handleSave = () => {
    updateDocument({
      ...svgDoc,
      title: svgDoc.title,
      updatedAt: Date.now(),
    });
    addToast('Saved', 'success');
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      addToast('Copied to clipboard', 'success');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${svgDoc.title}.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    addToast('Downloaded', 'success');
  };

  return (
    <div className="bg-base-100 flex h-screen flex-col">
      <header className="border-base-300 bg-base-100 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/edit?id=${documentId}`)}
          className="btn btn-ghost btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">SVG Code Editor</h1>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-ghost btn-sm">
          <FiSave className="size-4" />
          Save
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-ghost btn-sm">
          <FiCopy className="size-4" />
          Copy
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="btn btn-ghost btn-sm">
          <FiDownload className="size-4" />
          Download
        </button>
      </header>
      <IconWorkbench value={code} onChange={setCode} />
    </div>
  );
};

const CodeEditorPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <CodeEditorContent />
    </Suspense>
  </Providers>
);

export default CodeEditorPage;
