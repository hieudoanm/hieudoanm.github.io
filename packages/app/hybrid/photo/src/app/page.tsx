'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import {
  formatRelativeTime,
  formatFileSize,
  formatDimensions,
  copyToClipboard,
} from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import {
  FiPlus,
  FiSearch,
  FiStar,
  FiGrid,
  FiList,
  FiImage,
  FiFolder,
  FiUpload,
} from 'react-icons/fi';
import type { ViewMode, SortField } from '@/types';

const HomeContent: FC = () => {
  const {
    images,
    albums,
    isLoading,
    toggleFavorite,
    createImage,
    createAlbum,
  } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const [sort, setSort] = useState<SortField>('date');
  const [showUpload, setShowUpload] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [showNewAlbum, setShowNewAlbum] = useState(false);

  const filtered = images
    .filter(
      (i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.tags.some((t) => t.includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'size') return b.size - a.size;
      if (sort === 'dimensions') return b.width * b.height - a.width * a.height;
      return b.updatedAt - a.updatedAt;
    });

  const handleUpload = async () => {
    const colors = [
      '#f59e0b',
      '#3b82f6',
      '#22c55e',
      '#ec4899',
      '#8b5cf6',
      '#ef4444',
      '#06b6d4',
      '#f97316',
    ];
    await createImage({
      name: `Photo ${images.length + 1}`,
      type: 'image/jpeg',
      width: 1920,
      height: 1080,
      size: 2000000,
      color: colors[images.length % colors.length],
      tags: ['upload'],
      favorite: false,
      albumId: null,
    });
    setShowUpload(false);
    addToast('Image uploaded', 'success');
  };

  const handleNewAlbum = async () => {
    if (!newAlbumName.trim()) return;
    await createAlbum(newAlbumName.trim());
    setNewAlbumName('');
    setShowNewAlbum(false);
    addToast('Album created', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">Photo Library</h1>
        <div className="flex gap-2">
          <Link href="/albums" className="btn btn-ghost btn-sm">
            <FiFolder className="size-4" /> Albums
          </Link>
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="btn btn-primary btn-sm">
            <FiUpload className="size-4" /> Upload
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <FiSearch className="size-4 opacity-50" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-sm flex-1"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortField)}
            className="select select-sm">
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="dimensions">Dimensions</option>
          </select>
          <button
            type="button"
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="btn btn-ghost btn-sm btn-circle">
            {view === 'grid' ? (
              <FiList className="size-4" />
            ) : (
              <FiGrid className="size-4" />
            )}
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Albums</h2>
            <button
              type="button"
              onClick={() => setShowNewAlbum(true)}
              className="btn btn-ghost btn-xs">
              <FiPlus className="size-3" /> New
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {albums.map((album) => (
              <div
                key={album.id}
                className="card bg-base-200 min-w-[120px] cursor-pointer">
                <div
                  className="h-16 w-full rounded-t"
                  style={{
                    backgroundColor:
                      images.find((i) => i.id === album.coverId)?.color ??
                      '#374151',
                  }}
                />
                <div className="card-body p-2">
                  <p className="truncate text-xs font-medium">{album.name}</p>
                  <p className="text-xs opacity-50">
                    {album.imageIds.length} photos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div
            className={
              view === 'grid'
                ? 'grid grid-cols-2 gap-3 md:grid-cols-4'
                : 'space-y-2'
            }>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-40 rounded-lg" />
            ))}
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {filtered.map((img) => (
              <Link
                key={img.id}
                href={`/edit/${img.id}`}
                className="group relative cursor-pointer">
                <div
                  className="aspect-square overflow-hidden rounded-lg"
                  style={{ backgroundColor: img.color }}>
                  <div className="flex h-full items-center justify-center text-white/80">
                    <FiImage className="size-8" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="w-full p-2 text-xs text-white">
                    <div className="flex items-center justify-between">
                      <span className="truncate font-medium">{img.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(img.id);
                        }}
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiStar
                          className={`size-3 ${img.favorite ? 'fill-warning text-warning' : ''}`}
                        />
                      </button>
                    </div>
                    <span className="opacity-70">
                      {formatDimensions(img.width, img.height)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-base-content/50 col-span-full py-8 text-center">
                No images found
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((img) => (
              <Link
                key={img.id}
                href={`/edit/${img.id}`}
                className="card bg-base-200 card-body hover:bg-base-300 flex-row items-center gap-3 p-3 transition-colors">
                <div
                  className="h-12 w-12 flex-shrink-0 rounded"
                  style={{ backgroundColor: img.color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{img.name}</h3>
                    {img.favorite && (
                      <FiStar className="text-warning fill-warning size-3" />
                    )}
                  </div>
                  <p className="text-xs opacity-50">
                    {formatDimensions(img.width, img.height)} ·{' '}
                    {formatFileSize(img.size)}
                  </p>
                </div>
                <span className="text-xs opacity-50">
                  {formatRelativeTime(img.updatedAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card w-full max-w-md shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Upload Image</h2>
              <div className="border-base-300 rounded-lg border-2 border-dashed p-8 text-center">
                <FiUpload className="mx-auto size-8 opacity-50" />
                <p className="mt-2 text-sm opacity-70">
                  Drag & drop or click to upload
                </p>
              </div>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  className="btn btn-primary">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card w-full max-w-sm shadow-xl">
            <div className="card-body">
              <h2 className="card-title">New Album</h2>
              <input
                type="text"
                placeholder="Album name"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                className="input input-bordered w-full"
              />
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewAlbum(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNewAlbum}
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

const HomePage: FC = () => (
  <Providers>
    <HomeContent />
  </Providers>
);
export default HomePage;
