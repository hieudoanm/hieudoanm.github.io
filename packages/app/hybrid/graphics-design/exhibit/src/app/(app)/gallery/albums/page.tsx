'use client';

import { type FC, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Providers } from '@/providers/gallery/Providers';
import { useData } from '@/providers/gallery/DataProvider';
import { useToast } from '@/providers/gallery/ToastProvider';
import { PhoneFrame } from '@/components/gallery/organisms/PhoneFrame';
import { AlbumTile } from '@/components/gallery/molecules/AlbumTile';
import { EmptyState } from '@/components/gallery/molecules/EmptyState';
import { NameDialog } from '@/components/gallery/molecules/NameDialog';
import { albumCover } from '@/lib/gallery/selectors';

const AlbumsContent: FC = () => {
  const { albums, photos, isLoading, createAlbum } = useData();
  const { addToast } = useToast();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <PhoneFrame
      title="Albums"
      actions={
        <button
          type="button"
          aria-label="New album"
          onClick={() => setShowCreate(true)}
          className="btn btn-primary btn-sm btn-circle">
          <FiPlus className="size-4" />
        </button>
      }>
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-40 rounded-xl" />
            ))}
          </div>
        ) : albums.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {albums.map((album) => (
              <AlbumTile
                key={album.id}
                album={album}
                cover={albumCover(photos, album)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No albums yet"
            hint="Create an album to organise your photos"
          />
        )}
      </div>

      {showCreate && (
        <NameDialog
          title="New Album"
          placeholder="Album name"
          submitLabel="Create"
          onCancel={() => setShowCreate(false)}
          onSubmit={async (name) => {
            await createAlbum(name);
            setShowCreate(false);
            addToast('Album created', 'success');
          }}
        />
      )}
    </PhoneFrame>
  );
};

const AlbumsPage: FC = () => (
  <Providers>
    <AlbumsContent />
  </Providers>
);

export default AlbumsPage;
