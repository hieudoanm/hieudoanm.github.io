interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface PhotosGridProps {
  photos: Photo[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  aspectRatio?: string;
  class?: string;
  onPhotoClick?: (photo: Photo) => void;
}

const colsMap: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'sm:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'lg:grid-cols-4',
  '5': 'xl:grid-cols-5',
  '6': '2xl:grid-cols-6',
};

export const PhotosGrid = (props: PhotosGridProps) => {
  const gridCols = [
    props.columns?.xl && colsMap[String(props.columns.xl)],
    props.columns?.lg && colsMap[String(props.columns.lg)],
    props.columns?.md && colsMap[String(props.columns.md)],
    props.columns?.sm && colsMap[String(props.columns.sm)],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      class={`grid ${gridCols || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} ${props.gap || 'gap-4'} ${props.class || ''}`}>
      {props.photos.map((photo) => (
        <button
          type="button"
          onClick={() => props.onPhotoClick?.(photo)}
          class={`group relative w-full overflow-hidden rounded-xl ${props.onPhotoClick ? 'cursor-pointer' : 'cursor-default'}`}>
          <div class={`${props.aspectRatio || 'aspect-[4/3]'} w-full`}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {photo.caption && (
            <div class="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-3 transition-transform duration-300 group-hover:translate-y-0">
              <p class="text-sm text-white">{photo.caption}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
