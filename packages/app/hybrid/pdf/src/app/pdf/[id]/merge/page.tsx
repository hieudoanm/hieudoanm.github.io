'use client';

import { type FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
  FiFile,
  FiCheck,
} from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

const MergeSplit: FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { documents, getDocument } = useData();
  const { addToast } = useToast();

  const [doc, setDoc] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);
  const [mode, setMode] = useState<'merge' | 'split'>('merge');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([id]);
  const [splitRange, setSplitRange] = useState('');
  const [pageRanges, setPageRanges] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      const d = await getDocument(id);
      setDoc(d);
    };
    load();
  }, [id, getDocument]);

  const availableDocs = documents.filter((d) => d.id !== id);

  const handleToggleDoc = useCallback((docId: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(docId) ? prev.filter((d) => d !== docId) : [...prev, docId]
    );
  }, []);

  const handleMoveDoc = useCallback(
    (docId: string, direction: 'up' | 'down') => {
      setSelectedDocIds((prev) => {
        const idx = prev.indexOf(docId);
        if (idx === -1) return prev;
        const newIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= prev.length) return prev;
        const copy = [...prev];
        [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
        return copy;
      });
    },
    []
  );

  const handleMerge = useCallback(() => {
    addToast(`Merging ${selectedDocIds.length} documents...`, 'info');
    setTimeout(() => addToast('Merge complete!', 'success'), 1500);
  }, [selectedDocIds, addToast]);

  const handleSplit = useCallback(() => {
    if (!splitRange.trim()) {
      addToast('Please enter a page range', 'error');
      return;
    }
    addToast(`Splitting by range: ${splitRange}`, 'info');
    setTimeout(() => addToast('Split complete!', 'success'), 1500);
  }, [splitRange, addToast]);

  if (!doc) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href={`/pdf/${id}`} className="btn btn-ghost btn-sm btn-circle">
            <FiArrowLeft className="size-4" />
          </Link>
          <h1 className="text-base-content text-2xl font-bold">
            Merge & Split
          </h1>
        </div>

        <div className="tabs tabs-boxed mb-6">
          <button
            type="button"
            onClick={() => setMode('merge')}
            className={`tab ${mode === 'merge' ? 'tab-active' : ''}`}>
            Merge PDFs
          </button>
          <button
            type="button"
            onClick={() => setMode('split')}
            className={`tab ${mode === 'split' ? 'tab-active' : ''}`}>
            Split by Range
          </button>
        </div>

        {mode === 'merge' ? (
          <div className="space-y-4">
            <div className="bg-base-100 rounded-lg p-4">
              <h3 className="text-base-content mb-3 font-semibold">
                Selected Documents ({selectedDocIds.length})
              </h3>
              <div className="space-y-2">
                {selectedDocIds.map((docId, idx) => {
                  const d = documents.find((x) => x.id === docId);
                  if (!d) return null;
                  return (
                    <div
                      key={docId}
                      className="bg-base-200 flex items-center gap-3 rounded p-3">
                      <span className="text-base-content/50 w-6 text-center text-sm">
                        {idx + 1}
                      </span>
                      <FiFile className="text-primary size-4" />
                      <span className="text-base-content flex-1 text-sm">
                        {d.title}
                      </span>
                      <span className="text-base-content/50 text-xs">
                        {d.pageCount} pages
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveDoc(docId, 'up')}
                          className="btn btn-ghost btn-xs btn-circle"
                          disabled={idx === 0}>
                          <FiChevronUp className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDoc(docId, 'down')}
                          className="btn btn-ghost btn-xs btn-circle"
                          disabled={idx === selectedDocIds.length - 1}>
                          <FiChevronDown className="size-3" />
                        </button>
                        {docId !== id && (
                          <button
                            type="button"
                            onClick={() => handleToggleDoc(docId)}
                            className="btn btn-ghost btn-xs btn-circle">
                            <FiTrash2 className="size-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-base-100 rounded-lg p-4">
              <h3 className="text-base-content mb-3 font-semibold">
                Add Documents
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableDocs
                  .filter((d) => !selectedDocIds.includes(d.id))
                  .map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleToggleDoc(d.id)}
                      className="bg-base-200 hover:bg-base-300 flex items-center gap-2 rounded p-3 text-left transition-colors">
                      <FiPlus className="text-success size-4" />
                      <span className="text-base-content flex-1 text-sm">
                        {d.title}
                      </span>
                      <span className="text-base-content/50 text-xs">
                        {d.pageCount}p
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleMerge}
              className="btn btn-primary w-full gap-2">
              <FiCheck className="size-4" />
              Merge {selectedDocIds.length} Documents
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-base-100 rounded-lg p-4">
              <h3 className="text-base-content mb-2 font-semibold">
                {doc.title}
              </h3>
              <p className="text-base-content/60 mb-4 text-sm">
                {doc.pageCount} pages total
              </p>
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Page Range (e.g. 1-5, 8, 12-15)
                </label>
                <input
                  type="text"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="1-5, 8, 12-15"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSplit}
              className="btn btn-primary w-full gap-2">
              <FiCheck className="size-4" />
              Extract Pages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MergePage: FC = () => (
  <Providers>
    <MergeSplit />
  </Providers>
);

export default MergePage;
