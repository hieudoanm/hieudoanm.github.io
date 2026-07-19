'use client';

import { collectionToHtmlDoc, collectionToMarkdown } from '@/lib/apidoc';
import { copyText } from '@/lib/clipboard';
import { findMockTarget } from '@/lib/mock';
import { collectionToOpenApi } from '@/lib/openapi';
import { downloadFile } from '@/lib/request-file';
import { RequestCollection, RequestConfig } from '@/types/api-client';
import { type FC, useMemo, useState } from 'react';
import { FiCopy, FiDownload, FiServer } from 'react-icons/fi';

interface DesignPanelProps {
  collections: RequestCollection[];
  request: RequestConfig;
  mockEnabled: boolean;
  onMockToggle: () => void;
}

export const DesignPanel: FC<DesignPanelProps> = ({
  collections,
  request,
  mockEnabled,
  onMockToggle,
}) => {
  const [collectionId, setCollectionId] = useState<string>(
    collections[0]?.id ?? ''
  );
  const [copied, setCopied] = useState(false);

  const collection =
    collections.find((item) => item.id === collectionId) ?? null;
  const docs = collection ? collectionToHtmlDoc(collection) : '';
  const target = findMockTarget(collections, request);

  const exportOpenApi = (): void => {
    if (!collection) return;
    downloadFile(
      collectionToOpenApi(collection),
      `${collection.name}.openapi.json`,
      'application/json'
    );
  };

  const downloadDocs = (): void => {
    if (!collection) return;
    downloadFile(docs, `${collection.name}.api-docs.html`, 'text/html');
  };

  const copyMarkdown = (): void => {
    if (!collection) return;
    void copyText(collectionToMarkdown(collection)).then((ok) => {
      if (ok) setCopied(true);
    });
  };

  const options = useMemo(
    () => collections.map((item) => ({ id: item.id, name: item.name })),
    [collections]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          Design
        </span>
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <FiServer className="size-3" />
          <span>Mock server</span>
          <input
            type="checkbox"
            checked={mockEnabled}
            onChange={onMockToggle}
            aria-label="Enable mock server"
            className="toggle toggle-sm"
          />
        </label>
      </div>

      {collections.length === 0 ? (
        <p className="text-base-content/40 px-2 text-sm">
          No collections yet. Import or save one to design from.
        </p>
      ) : (
        <>
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            aria-label="Design collection"
            className="select select-bordered select-sm w-full">
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          {target ? (
            <div role="status" className="alert alert-info py-2 text-xs">
              Mocking: {target.collectionName} / {target.entryName}
            </div>
          ) : (
            <div role="status" className="alert py-2 text-xs">
              {mockEnabled
                ? 'No mock matches the current request'
                : 'Enable the mock server to answer matching requests'}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportOpenApi}
              disabled={!collection}
              className="btn btn-ghost btn-xs gap-1">
              <FiDownload className="size-3" />
              <span>OpenAPI</span>
            </button>
            <button
              type="button"
              onClick={downloadDocs}
              disabled={!collection}
              className="btn btn-ghost btn-xs gap-1">
              <FiDownload className="size-3" />
              <span>HTML</span>
            </button>
            <button
              type="button"
              onClick={copyMarkdown}
              disabled={!collection}
              className="btn btn-ghost btn-xs gap-1">
              <FiCopy className="size-3" />
              <span>{copied ? 'Copied' : 'Markdown'}</span>
            </button>
          </div>

          <iframe
            title="API documentation preview"
            srcDoc={docs}
            className="bg-base-200 border-base-300 h-96 w-full rounded-lg border"
          />
        </>
      )}
    </div>
  );
};

DesignPanel.displayName = 'DesignPanel';
