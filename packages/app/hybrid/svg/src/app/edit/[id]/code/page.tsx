'use client';

import { type FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { exportAsSVG, copyToClipboard } from '@/utils/format';
import { FiArrowLeft, FiCopy, FiDownload, FiSave } from 'react-icons/fi';

const CodeEditorContent: FC = () => {
  const router = useRouter();
  const params = useParams();
  const documentId = params.id as string;
  const { addToast } = useToast();
  const { documents, updateDocument } = useData();
  const svgDoc = documents.find((d) => d.id === documentId);

  const [code, setCode] = useState('');

  useEffect(() => {
    if (svgDoc) {
      setCode(exportAsSVG(svgDoc));
    }
  }, [svgDoc]);

  const handleSave = () => {
    if (svgDoc) {
      updateDocument({
        ...svgDoc,
        title: svgDoc.title,
        updatedAt: Date.now(),
      });
      addToast('Saved', 'success');
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      addToast('Copied to clipboard', 'success');
    }
  };

  if (!svgDoc) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex h-screen flex-col">
      <header className="border-base-300 bg-base-100 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/edit/${documentId}`)}
          className="btn btn-ghost btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">SVG Code Editor</h1>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-ghost btn-sm">
          <FiCopy className="size-4" />
          Copy
        </button>
        <button
          type="button"
          onClick={() => {
            const blob = new Blob([code], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = window.document.createElement('a');
            a.href = url;
            a.download = `${svgDoc.title}.svg`;
            a.click();
            URL.revokeObjectURL(url);
            addToast('Downloaded', 'success');
          }}
          className="btn btn-ghost btn-sm">
          <FiDownload className="size-4" />
          Download
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-base-200 text-base-content h-full w-full resize-none p-4 font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        </div>
        <div className="border-base-300 bg-base-200 w-80 overflow-auto border-l p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase">Preview</h3>
          <div className="bg-base-100 flex items-center justify-center rounded p-4">
            <div
              className="max-h-64 max-w-full overflow-hidden"
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>
          <div className="text-base-content/50 mt-4 text-xs">
            <p>Lines: {code.split('\n').length}</p>
            <p>Size: {new Blob([code]).size} bytes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CodeEditorPage: FC = () => (
  <Providers>
    <CodeEditorContent />
  </Providers>
);

export default CodeEditorPage;
