'use client';

import { type FC, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Providers } from '@/providers/gallery/Providers';
import { useData } from '@/providers/gallery/DataProvider';
import { useToast } from '@/providers/gallery/ToastProvider';
import { PhoneFrame } from '@/components/gallery/organisms/PhoneFrame';
import { ConfirmDialog } from '@/components/gallery/molecules/ConfirmDialog';
import { EmptyState } from '@/components/gallery/molecules/EmptyState';
import { NameDialog } from '@/components/gallery/molecules/NameDialog';
import { PhotoTile } from '@/components/gallery/molecules/PhotoTile';
import { photosInAlbum } from '@/lib/gallery/selectors';

const AlbumContent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const {
    albums,
    photos,
    isLoading,
    renameAlbum,
    deleteAlbum,
    removePhotoFromAlbum,
  } = useData();
  const { addToast } = useToast();
  const [showRename, setShowRename] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const album = albums.find((a) => a.id === id);
  const inAlbum = album ? photosInAlbum(photos, album) : [];

  if (!album) {
    return (
      <PhoneFrame title="Album" backHref="/gallery/albums">
        <EmptyState
          title={isLoading ? 'Loading...' : 'Album not found'}
          hint={isLoading ? undefined : 'It may have been deleted'}
        />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame
      title={album.name}
      backHref="/gallery/albums"
      actions={
        <>
          <button
            type="button"
            aria-label="Rename album"
            onClick={() => setShowRename(true)}
            className="btn btn-ghost btn-sm btn-circle">
            <FiEdit2 className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Delete album"
            onClick={() => setShowDelete(true)}
            className="btn btn-ghost btn-sm btn-circle text-error">
            <FiTrash2 className="size-4" />
          </button>
        </>
      }>
      <div className="p-4">
        {inAlbum.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {inAlbum.map((photo) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                onRemove={(pid) => removePhotoFromAlbum(pid, album.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="This album is empty"
            hint="Add photos from the library"
          />
        )}
      </div>

      {showRename && (
        <NameDialog
          title="Rename Album"
          placeholder="Album name"
          submitLabel="Save"
          initialValue={album.name}
          onCancel={() => setShowRename(false)}
          onSubmit={async (name) => {
            await renameAlbum(album.id, name);
            setShowRename(false);
            addToast('Album renamed', 'success');
          }}
        />
      )}
      {showDelete && (
        <ConfirmDialog
          title="Delete album?"
          message={`Delete "${album.name}"? The photos stay in your library.`}
          onCancel={() => setShowDelete(false)}
          onConfirm={async () => {
            await deleteAlbum(album.id);
            addToast('Album deleted', 'info');
            router.push('/gallery/albums');
          }}
        />
      )}
    </PhoneFrame>
  );
};

const AlbumPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <AlbumContent />
    </Suspense>
  </Providers>
);

export default AlbumPage;
