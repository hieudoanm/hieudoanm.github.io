'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiPlus, FiTrash2, FiImage } from 'react-icons/fi';

const AlbumsContent: FC = () => {
  const { albums, images, createAlbum, deleteAlbum } = useData();
  const { addToast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createAlbum(newName.trim());
    setNewName('');
    setShowCreate(false);
    addToast('Album created', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <Link href="/" className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </Link>
        <h1 className="flex-1 text-lg font-bold">Albums</h1>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="btn btn-primary btn-sm">
          <FiPlus className="size-4" /> New
        </button>
      </header>
      <main className="mx-auto grid max-w-4xl grid-cols-2 gap-4 p-6 md:grid-cols-3">
        {albums.map((album) => {
          const cover = images.find((i) => i.id === album.coverId);
          return (
            <div
              key={album.id}
              className="card bg-base-200 card-body overflow-hidden p-0">
              <div
                className="flex h-32 w-full items-center justify-center"
                style={{ backgroundColor: cover?.color ?? '#374151' }}>
                <FiImage className="size-8 text-white/50" />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">{album.name}</h3>
                <p className="text-xs opacity-50">
                  {album.imageIds.length} photos
                </p>
                <button
                  type="button"
                  onClick={() => {
                    deleteAlbum(album.id);
                    addToast('Album deleted', 'info');
                  }}
                  className="btn btn-ghost btn-xs text-error mt-2">
                  <FiTrash2 className="size-3" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </main>
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card w-full max-w-sm shadow-xl">
            <div className="card-body">
              <h2 className="card-title">New Album</h2>
              <input
                type="text"
                placeholder="Album name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered w-full"
              />
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};

const AlbumsPage: FC = () => (
  <Providers>
    <AlbumsContent />
  </Providers>
);
export default AlbumsPage;
