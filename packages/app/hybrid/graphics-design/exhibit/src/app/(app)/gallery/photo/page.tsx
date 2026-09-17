'use client';

import { type FC, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiStar, FiTrash2 } from 'react-icons/fi';
import { Providers } from '@/providers/gallery/Providers';
import { useData } from '@/providers/gallery/DataProvider';
import { useToast } from '@/providers/gallery/ToastProvider';
import { PhoneFrame } from '@/components/gallery/organisms/PhoneFrame';
import { PhotoViewer } from '@/components/gallery/organisms/PhotoViewer';
import { EmptyState } from '@/components/gallery/molecules/EmptyState';
import { sortPhotos } from '@/lib/gallery/selectors';

const PhotoContent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const { photos, isLoading, toggleFavorite, deletePhoto } = useData();
  const { addToast } = useToast();

  const ordered = sortPhotos(photos, 'date');
  const index = ordered.findIndex((p) => p.id === id);
  const photo = index >= 0 ? ordered[index] : undefined;

  if (!photo) {
    return (
      <PhoneFrame title="Photo" backHref="/gallery">
        <EmptyState
          title={isLoading ? 'Loading...' : 'Photo not found'}
          hint={isLoading ? undefined : 'It may have been deleted'}
        />
      </PhoneFrame>
    );
  }

  const goTo = (offset: number) => {
    const target = ordered[index + offset];
    if (target) router.push(`/gallery/photo?id=${target.id}`);
  };

  return (
    <PhoneFrame
      title={photo.name}
      backHref="/gallery"
      actions={
        <>
          <button
            type="button"
            aria-label="Toggle favorite"
            onClick={() => toggleFavorite(photo.id)}
            className="btn btn-ghost btn-sm btn-circle">
            <FiStar
              className={`size-4 ${photo.favorite ? 'fill-warning text-warning' : ''}`}
            />
          </button>
          <button
            type="button"
            aria-label="Delete photo"
            onClick={async () => {
              await deletePhoto(photo.id);
              addToast('Photo deleted', 'info');
              router.push('/gallery');
            }}
            className="btn btn-ghost btn-sm btn-circle text-error">
            <FiTrash2 className="size-4" />
          </button>
        </>
      }>
      <PhotoViewer
        photo={photo}
        hasPrev={index > 0}
        hasNext={index < ordered.length - 1}
        onPrev={() => goTo(-1)}
        onNext={() => goTo(1)}
      />
    </PhoneFrame>
  );
};

const PhotoPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <PhotoContent />
    </Suspense>
  </Providers>
);

export default PhotoPage;
