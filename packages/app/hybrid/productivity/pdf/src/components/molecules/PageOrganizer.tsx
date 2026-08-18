'use client';

import { useState, type FC } from 'react';
import {
  FiCopy,
  FiCrop,
  FiMove,
  FiRotateCcw,
  FiRotateCw,
  FiScissors,
  FiTrash2,
} from 'react-icons/fi';
import type { PDFDocument, PDFPage } from '@/types';

interface PageOrganizerProps {
  pages: PDFPage[];
  currentPage: number;
  cropMode: boolean;
  otherDocuments: PDFDocument[];
  onSelect: (pageNumber: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onLabelChange: (pageNumber: number, label: string) => void;
  onRotate: (pageNumber: number, delta: number) => void;
  onDuplicate: (pageNumber: number) => void;
  onDelete: (pageNumber: number) => void;
  onExtract: (range: string) => void;
  onSplit: (after: number) => void;
  onMerge: (pages: PDFPage[]) => void;
  onToggleCropMode: () => void;
  onApplyCrop: () => void;
  onClearCrop: () => void;
}

export const PageOrganizer: FC<PageOrganizerProps> = ({
  pages,
  currentPage,
  cropMode,
  otherDocuments,
  onSelect,
  onReorder,
  onLabelChange,
  onRotate,
  onDuplicate,
  onDelete,
  onExtract,
  onSplit,
  onMerge,
  onToggleCropMode,
  onApplyCrop,
  onClearCrop,
}) => {
  const [extractRange, setExtractRange] = useState('');
  const [splitAt, setSplitAt] = useState('');
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [mergePages, setMergePages] = useState<PDFPage[] | null>(null);

  const startDrag = (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
    setDragIndex(index);
  };

  const dropOn = (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData('text/plain'));
    if (Number.isInteger(from) && from >= 0 && from !== index) {
      onReorder(from, index);
    }
    setDragIndex(null);
  };

  const mergeDropOn =
    (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();
      if (!mergePages) return;
      const from = Number(e.dataTransfer.getData('text/plain'));
      if (Number.isInteger(from) && from >= 0 && from !== index) {
        const next = [...mergePages];
        const [moved] = next.splice(from, 1);
        next.splice(index, 0, moved);
        setMergePages(next);
      }
      setDragIndex(null);
    };

  const addDocToMerge = (d: PDFDocument) => {
    const added = d.pages.map((p, i) => ({
      ...p,
      pageNumber: (mergePages?.length ?? pages.length) + i + 1,
    }));
    setMergePages((prev) =>
      prev ? [...prev, ...added] : [...pages, ...added]
    );
  };

  const confirmDelete = () => {
    if (pendingDelete !== null) {
      onDelete(pendingDelete);
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-base-content/60 text-xs">Extract pages</label>
        <div className="flex gap-1">
          <input
            type="text"
            value={extractRange}
            onChange={(e) => setExtractRange(e.target.value)}
            placeholder="e.g. 1,3 or 2-4"
            className="input input-xs w-full"
            aria-label="Extract page range"
          />
          <button
            type="button"
            className="btn btn-outline btn-xs gap-1"
            onClick={() => onExtract(extractRange)}>
            <FiScissors className="size-3" /> Extract
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-base-content/60 text-xs">Split after page</label>
        <div className="flex gap-1">
          <input
            type="number"
            value={splitAt}
            onChange={(e) => setSplitAt(e.target.value)}
            className="input input-xs w-full"
            aria-label="Split after page"
          />
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => onSplit(Number(splitAt))}>
            Split
          </button>
        </div>
      </div>

      <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto">
        {pages.map((page, index) => (
          <li
            key={page.id}
            draggable
            onDragStart={startDrag(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={dropOn(index)}
            onDragEnd={() => setDragIndex(null)}
            className={`bg-base-200 flex flex-col gap-1 rounded border p-2 text-xs ${page.pageNumber === currentPage ? 'border-primary' : 'border-transparent'} ${dragIndex === index ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-1">
              <FiMove className="text-base-content/40 size-3 cursor-grab" />
              <button
                type="button"
                className="font-medium"
                onClick={() => onSelect(page.pageNumber)}>
                Page {page.pageNumber}
              </button>
              <span className="ml-auto flex gap-0.5">
                <button
                  type="button"
                  aria-label={`Rotate page ${page.pageNumber} left`}
                  className="btn btn-ghost btn-xs btn-square"
                  onClick={() => onRotate(page.pageNumber, -90)}>
                  <FiRotateCcw className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label={`Rotate page ${page.pageNumber} right`}
                  className="btn btn-ghost btn-xs btn-square"
                  onClick={() => onRotate(page.pageNumber, 90)}>
                  <FiRotateCw className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label={`Duplicate page ${page.pageNumber}`}
                  className="btn btn-ghost btn-xs btn-square"
                  onClick={() => onDuplicate(page.pageNumber)}>
                  <FiCopy className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label={`Delete page ${page.pageNumber}`}
                  className="btn btn-ghost btn-xs btn-square text-error"
                  onClick={() => setPendingDelete(page.pageNumber)}>
                  <FiTrash2 className="size-3" />
                </button>
              </span>
            </div>
            <input
              type="text"
              value={page.labels}
              onChange={(e) => onLabelChange(page.pageNumber, e.target.value)}
              className="input input-xs w-full"
              aria-label={`Label page ${page.pageNumber}`}
            />
          </li>
        ))}
      </ul>

      <div className="space-y-1">
        <div className="flex gap-1">
          <button
            type="button"
            className={`btn btn-outline btn-xs flex-1 gap-1 ${cropMode ? 'btn-primary' : ''}`}
            aria-pressed={cropMode}
            onClick={onToggleCropMode}>
            <FiCrop className="size-3" /> Crop
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs flex-1"
            onClick={onApplyCrop}>
            Apply
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={onClearCrop}>
            Clear
          </button>
        </div>
        <p className="text-base-content/50 text-[10px]">
          Select Crop, drag the box on the page, then Apply.
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-base-content/60 text-xs">Merge documents</label>
        <ul className="flex flex-col gap-1">
          {otherDocuments.length === 0 ? (
            <li className="text-base-content/40 text-[10px]">
              No other documents
            </li>
          ) : (
            otherDocuments.map((d) => (
              <li
                key={d.id}
                className="bg-base-200 flex items-center gap-2 rounded px-2 py-1 text-xs">
                <span className="flex-1 truncate">{d.title}</span>
                <span className="text-base-content/40">{d.pageCount}p</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => addDocToMerge(d)}>
                  Add
                </button>
              </li>
            ))
          )}
        </ul>
        {mergePages && (
          <>
            <p className="text-base-content/50 text-[10px]">
              Drag to order merged pages:
            </p>
            <ul className="flex max-h-40 flex-col gap-1 overflow-y-auto">
              {mergePages.map((page, index) => (
                <li
                  key={page.id}
                  draggable
                  onDragStart={startDrag(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={mergeDropOn(index)}
                  onDragEnd={() => setDragIndex(null)}
                  className="bg-base-200 flex items-center gap-1 rounded px-2 py-1 text-xs">
                  <FiMove className="text-base-content/40 size-3 cursor-grab" />
                  {page.labels || `Page ${page.pageNumber}`}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-primary btn-xs w-full"
              onClick={() => {
                onMerge(mergePages);
                setMergePages(null);
              }}>
              Apply Merge ({mergePages.length} pages)
            </button>
          </>
        )}
      </div>

      {pendingDelete !== null && (
        <div
          className="modal modal-open"
          role="dialog"
          aria-label="Delete page confirmation">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete page {pendingDelete}?</h3>
            <p className="text-base-content/70 py-2 text-sm">
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setPendingDelete(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
