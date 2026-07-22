'use client';

import { type FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { SVG_TEMPLATES } from '@/data/models';
import { formatRelativeTime, downloadFile, exportAsSVG } from '@/utils/format';
import {
  FiPlus,
  FiUpload,
  FiTrash2,
  FiEdit3,
  FiFile,
  FiGrid,
  FiImage,
  FiLayout,
  FiStar,
  FiFolder,
} from 'react-icons/fi';

const HomePageContent: FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const {
    documents,
    isLoading,
    createNewDocument,
    createFromTemplate,
    deleteDocument,
    renameDocument,
  } = useData();
  const [showNewModal, setShowNewModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newWidth, setNewWidth] = useState(800);
  const [newHeight, setNewHeight] = useState(600);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState('');

  const handleCreate = async () => {
    if (!newTitle.trim()) {
      addToast('Please enter a title', 'error');
      return;
    }
    const doc = await createNewDocument(newTitle, newWidth, newHeight);
    setShowNewModal(false);
    setNewTitle('');
    router.push(`/edit/${doc.id}`);
  };

  const handleTemplate = async (templateId: string) => {
    const doc = await createFromTemplate(templateId);
    setShowTemplateModal(false);
    router.push(`/edit/${doc.id}`);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await deleteDocument(id);
      addToast('Document deleted', 'success');
    }
  };

  const handleRename = async (id: string) => {
    if (renameTitle.trim()) {
      await renameDocument(id, renameTitle);
      setRenameId(null);
      addToast('Renamed successfully', 'success');
    }
  };

  const handleExport = (doc: { title: string }) => {
    const svgContent = exportAsSVG(doc as never);
    downloadFile(svgContent, `${doc.title}.svg`);
    addToast('Exported as SVG', 'success');
  };

  const templateIcons: Record<string, FC<{ className?: string }>> = {
    'tpl-blank': FiFile,
    'tpl-icon-set': FiGrid,
    'tpl-illustration': FiImage,
    'tpl-logo': FiLayout,
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <FiFile className="text-primary size-6" />
          <h1 className="text-xl font-bold">SVG Library</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowTemplateModal(true)}
            className="btn btn-outline btn-sm">
            <FiLayout className="size-4" />
            Templates
          </button>
          <button
            type="button"
            onClick={() => setShowNewModal(true)}
            className="btn btn-primary btn-sm">
            <FiPlus className="size-4" />
            New Document
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-64 rounded-xl" />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FiFile className="text-base-content/20 mb-4 size-16" />
            <h2 className="text-base-content/50 mb-2 text-xl font-semibold">
              No documents yet
            </h2>
            <p className="text-base-content/30 mb-6">
              Create your first SVG document
            </p>
            <button
              type="button"
              onClick={() => setShowNewModal(true)}
              className="btn btn-primary">
              <FiPlus className="size-4" />
              New Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="card bg-base-200 cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => router.push(`/edit/${doc.id}`)}>
                <figure className="bg-base-300 h-40">
                  <svg
                    viewBox={`0 0 ${doc.width} ${doc.height}`}
                    className="h-full w-full p-4">
                    {doc.shapes.slice(0, 10).map((shape) => {
                      const fill =
                        shape.fill.type === 'none' ? 'none' : shape.fill.color;
                      switch (shape.type) {
                        case 'rect':
                          return (
                            <rect
                              key={shape.id}
                              x={shape.x}
                              y={shape.y}
                              width={shape.width}
                              height={shape.height}
                              fill={fill}
                              rx={shape.rx ?? 0}
                              opacity={shape.opacity}
                            />
                          );
                        case 'ellipse':
                          return (
                            <ellipse
                              key={shape.id}
                              cx={shape.x + shape.width / 2}
                              cy={shape.y + shape.height / 2}
                              rx={shape.width / 2}
                              ry={shape.height / 2}
                              fill={fill}
                              opacity={shape.opacity}
                            />
                          );
                        case 'line':
                          return (
                            <line
                              key={shape.id}
                              x1={shape.x}
                              y1={shape.y}
                              x2={shape.x + shape.width}
                              y2={shape.y + shape.height}
                              stroke={shape.stroke.color}
                              strokeWidth={shape.stroke.width}
                              opacity={shape.opacity}
                            />
                          );
                        case 'path':
                          return (
                            <path
                              key={shape.id}
                              d={shape.pathData ?? ''}
                              fill={fill}
                              opacity={shape.opacity}
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </svg>
                </figure>
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    {renameId === doc.id ? (
                      <input
                        type="text"
                        value={renameTitle}
                        onChange={(e) => setRenameTitle(e.target.value)}
                        onBlur={() => handleRename(doc.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(doc.id);
                        }}
                        className="input input-sm input-bordered flex-1"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <h3 className="card-title text-sm">{doc.title}</h3>
                    )}
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenameId(doc.id);
                          setRenameTitle(doc.title);
                        }}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiEdit3 className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id, doc.title);
                        }}
                        className="btn btn-ghost btn-xs btn-circle text-error">
                        <FiTrash2 className="size-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-base-content/50 text-xs">
                    {doc.width} x {doc.height} &middot;{' '}
                    {formatRelativeTime(doc.updatedAt)}
                  </p>
                  <div className="text-base-content/30 mt-1 text-xs">
                    {doc.shapes.length} shape
                    {doc.shapes.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showNewModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">New Document</h3>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="My SVG"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Width</span>
                </label>
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => setNewWidth(Number(e.target.value))}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Height</span>
                </label>
                <input
                  type="number"
                  value={newHeight}
                  onChange={(e) => setNewHeight(Number(e.target.value))}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="btn btn-ghost">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </dialog>
      )}

      {showTemplateModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Choose Template</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {SVG_TEMPLATES.map((tpl) => {
                const Icon = templateIcons[tpl.id] ?? FiFile;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleTemplate(tpl.id)}
                    className="card bg-base-200 hover:bg-base-300 p-4 text-left transition-colors">
                    <Icon className="text-primary mb-2 size-8" />
                    <h4 className="font-semibold">{tpl.name}</h4>
                    <p className="text-base-content/50 text-xs">
                      {tpl.description}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="btn btn-ghost">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

const HomePage: FC = () => (
  <Providers>
    <HomePageContent />
  </Providers>
);

export default HomePage;
