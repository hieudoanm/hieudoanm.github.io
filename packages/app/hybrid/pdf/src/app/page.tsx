'use client';

import { type FC, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiFile,
  FiUpload,
  FiGrid,
  FiList,
  FiSearch,
  FiClock,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatRelativeTime, formatFileSize } from '@/utils/format';
import type { PDFDocument } from '@/types';
import { generateId } from '@/data/models';

const DocumentLibrary: FC = () => {
  const {
    documents,
    isLoading,
    deleteDocument,
    renameDocument,
    openDocument,
    createDocument,
  } = useData();
  const { addToast } = useToast();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocs = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentDocs = documents
    .sort((a, b) => b.lastOpenedAt - a.lastOpenedAt)
    .slice(0, 5);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      for (const file of Array.from(files)) {
        const pages = Array.from(
          { length: Math.floor(Math.random() * 10) + 3 },
          (_, i) => ({
            id: `${Date.now()}-page-${i + 1}`,
            documentId: `${Date.now()}`,
            pageNumber: i + 1,
            width: 595,
            height: 842,
            rotation: 0,
            textBlocks: [],
            images: [],
            labels: `Page ${i + 1}`,
          })
        );
        const doc: PDFDocument = {
          id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: file.name.replace('.pdf', ''),
          filename: file.name,
          author: 'You',
          pageCount: pages.length,
          fileSize: file.size,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lastOpenedAt: Date.now(),
          thumbnailColor: '#3b82f6',
          pages,
        };
        await createDocument(doc);
        addToast(`Uploaded ${file.name}`, 'success');
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [createDocument, addToast]
  );

  const handleOpen = useCallback(
    async (id: string) => {
      await openDocument(id);
      router.push(`/pdf/${id}`);
    },
    [openDocument, router]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteDocument(id);
      setDeleteConfirmId(null);
      addToast('Document deleted', 'success');
    },
    [deleteDocument, addToast]
  );

  const handleRename = useCallback(
    async (id: string) => {
      if (editTitle.trim()) {
        await renameDocument(id, editTitle.trim());
        addToast('Renamed successfully', 'success');
      }
      setEditingId(null);
    },
    [renameDocument, editTitle, addToast]
  );

  const startRename = useCallback((doc: PDFDocument) => {
    setEditingId(doc.id);
    setEditTitle(doc.title);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-base-content text-3xl font-bold">
              PDF Library
            </h1>
            <p className="text-base-content/60 mt-1">
              Manage and view your PDF documents
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Toggle view mode">
              {viewMode === 'grid' ? (
                <FiList className="size-5" />
              ) : (
                <FiGrid className="size-5" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-primary btn-sm gap-2">
              <FiUpload className="size-4" />
              Upload PDF
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <FiSearch className="text-base-content/40 absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>

        {recentDocs.length > 0 && !searchQuery && (
          <div className="mb-8">
            <h2 className="text-base-content mb-3 flex items-center gap-2 text-lg font-semibold">
              <FiClock className="size-5" />
              Recent Documents
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentDocs.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => handleOpen(doc.id)}
                  className="bg-base-100 hover:bg-base-300 min-w-[200px] rounded-lg p-4 text-left transition-colors">
                  <div
                    className="mb-2 flex h-16 items-center justify-center rounded"
                    style={{ backgroundColor: doc.thumbnailColor + '30' }}>
                    <FiFile
                      className="size-8"
                      style={{ color: doc.thumbnailColor }}
                    />
                  </div>
                  <p className="text-base-content truncate text-sm font-medium">
                    {doc.title}
                  </p>
                  <p className="text-base-content/50 text-xs">
                    {formatRelativeTime(doc.lastOpenedAt)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-base-content mb-3 text-lg font-semibold">
            All Documents ({filteredDocs.length})
          </h2>
          {filteredDocs.length === 0 ? (
            <div className="bg-base-100 rounded-lg p-12 text-center">
              <FiFile className="text-base-content/30 mx-auto mb-4 size-12" />
              <p className="text-base-content/60">No documents found</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary btn-sm mt-4 gap-2">
                <FiUpload className="size-4" />
                Upload your first PDF
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-base-100 hover:bg-base-300 group cursor-pointer rounded-lg p-4 transition-colors"
                  onClick={() => handleOpen(doc.id)}>
                  <div
                    className="mb-3 flex h-32 items-center justify-center rounded"
                    style={{ backgroundColor: doc.thumbnailColor + '20' }}>
                    <FiFile
                      className="size-12"
                      style={{ color: doc.thumbnailColor }}
                    />
                  </div>
                  {editingId === doc.id ? (
                    <div
                      className="flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="input input-sm w-full"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(doc.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRename(doc.id)}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiCheck className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiX className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-base-content truncate text-sm font-medium">
                      {doc.title}
                    </p>
                  )}
                  <p className="text-base-content/50 mt-1 text-xs">
                    {doc.pageCount} pages &middot;{' '}
                    {formatFileSize(doc.fileSize)}
                  </p>
                  <p className="text-base-content/40 text-xs">
                    {formatRelativeTime(doc.lastOpenedAt)}
                  </p>
                  <div
                    className="mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => startRename(doc)}
                      className="btn btn-ghost btn-xs btn-circle">
                      <FiEdit2 className="size-3" />
                    </button>
                    {deleteConfirmId === doc.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDelete(doc.id)}
                          className="btn btn-error btn-xs btn-circle">
                          <FiCheck className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="btn btn-ghost btn-xs btn-circle">
                          <FiX className="size-3" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(doc.id)}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiTrash2 className="size-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-base-100 divide-base-200 divide-y rounded-lg">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="hover:bg-base-300 flex cursor-pointer items-center gap-4 p-4 transition-colors"
                  onClick={() => handleOpen(doc.id)}>
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded"
                    style={{ backgroundColor: doc.thumbnailColor + '30' }}>
                    <FiFile
                      className="size-6"
                      style={{ color: doc.thumbnailColor }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {editingId === doc.id ? (
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input input-sm w-full"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleRename(doc.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRename(doc.id)}
                          className="btn btn-ghost btn-xs btn-circle">
                          <FiCheck className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="btn btn-ghost btn-xs btn-circle">
                          <FiX className="size-3" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-base-content truncate text-sm font-medium">
                        {doc.title}
                      </p>
                    )}
                    <p className="text-base-content/50 text-xs">
                      {doc.pageCount} pages &middot;{' '}
                      {formatFileSize(doc.fileSize)} &middot;{' '}
                      {formatRelativeTime(doc.lastOpenedAt)}
                    </p>
                  </div>
                  <div
                    className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => startRename(doc)}
                      className="btn btn-ghost btn-xs btn-circle">
                      <FiEdit2 className="size-3" />
                    </button>
                    {deleteConfirmId === doc.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDelete(doc.id)}
                          className="btn btn-error btn-xs btn-circle">
                          <FiCheck className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="btn btn-ghost btn-xs btn-circle">
                          <FiX className="size-3" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(doc.id)}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiTrash2 className="size-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/settings" className="btn btn-ghost btn-sm">
            Settings
          </Link>
          <Link href="/profile" className="btn btn-ghost btn-sm">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home: FC = () => (
  <Providers>
    <DocumentLibrary />
  </Providers>
);

export default Home;
