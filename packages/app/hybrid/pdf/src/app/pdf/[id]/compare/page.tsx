'use client';

import { type FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiArrowLeft, FiFile } from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';

const Compare: FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { documents, getDocument } = useData();

  const [docA, setDocA] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);
  const [docBId, setDocBId] = useState('');
  const [docB, setDocB] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);

  useEffect(() => {
    const load = async () => {
      const d = await getDocument(id);
      setDocA(d);
    };
    load();
  }, [id, getDocument]);

  useEffect(() => {
    const load = async () => {
      if (!docBId) {
        setDocB(null);
        return;
      }
      const d = await getDocument(docBId);
      setDocB(d);
    };
    load();
  }, [docBId, getDocument]);

  if (!docA) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href={`/pdf/${id}`} className="btn btn-ghost btn-sm btn-circle">
            <FiArrowLeft className="size-4" />
          </Link>
          <h1 className="text-base-content text-2xl font-bold">Compare PDFs</h1>
        </div>

        <div className="mb-6">
          <label className="text-base-content/60 mb-1 text-xs">
            Compare with:
          </label>
          <select
            value={docBId}
            onChange={(e) => setDocBId(e.target.value)}
            className="select select-bordered w-full max-w-xs">
            <option value="">Select a document...</option>
            {documents
              .filter((d) => d.id !== id)
              .map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.pageCount} pages)
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-base-100 rounded-lg p-4">
            <h3 className="text-base-content mb-3 flex items-center gap-2 font-semibold">
              <FiFile className="text-primary size-4" />
              {docA.title}
            </h3>
            <div className="space-y-2">
              {docA.pages.slice(0, 5).map((page) => (
                <div
                  key={page.id}
                  className="bg-base-200 flex h-24 items-center justify-center rounded">
                  <span className="text-base-content/40 text-xs">
                    Page {page.pageNumber}
                  </span>
                </div>
              ))}
              {docA.pageCount > 5 && (
                <p className="text-base-content/50 text-center text-xs">
                  +{docA.pageCount - 5} more pages
                </p>
              )}
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-4">
            {docB ? (
              <>
                <h3 className="text-base-content mb-3 flex items-center gap-2 font-semibold">
                  <FiFile className="text-secondary size-4" />
                  {docB.title}
                </h3>
                <div className="space-y-2">
                  {docB.pages.slice(0, 5).map((page) => (
                    <div
                      key={page.id}
                      className="bg-base-200 flex h-24 items-center justify-center rounded">
                      <span className="text-base-content/40 text-xs">
                        Page {page.pageNumber}
                      </span>
                    </div>
                  ))}
                  {docB.pageCount > 5 && (
                    <p className="text-base-content/50 text-center text-xs">
                      +{docB.pageCount - 5} more pages
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-base-content/40 text-sm">
                  Select a document to compare
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparePage: FC = () => (
  <Providers>
    <Compare />
  </Providers>
);

export default ComparePage;
