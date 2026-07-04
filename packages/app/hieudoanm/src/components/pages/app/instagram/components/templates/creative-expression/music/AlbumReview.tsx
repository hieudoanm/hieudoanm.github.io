import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const AlbumReview: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Untitled Album';
  const artist = (data.artist as string) ?? 'Unknown Artist';
  const genre = (data.genre as string) ?? '';
  const rating = (data.rating as number) ?? 0;
  const review = (data.review as string) ?? '';
  const favoriteTrack = (data.favoriteTrack as string) ?? '';

  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="bg-base-200 mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl">
        🎵
      </div>
      <h1 className="text-base-content text-xl font-bold">{title}</h1>
      <p className="text-neutral mt-1 text-sm">{artist}</p>
      {genre && (
        <span className="bg-accent/10 text-accent mt-2 rounded-full px-3 py-0.5 text-[10px] font-bold">
          {genre}
        </span>
      )}
      <div className="mt-3 flex gap-1">
        {stars.map((filled, i) => (
          <span
            key={i}
            className={
              filled ? 'text-primary text-lg' : 'text-base-300 text-lg'
            }>
            ★
          </span>
        ))}
      </div>
      <p className="text-neutral mt-4 max-w-xs text-xs leading-relaxed">
        &ldquo;{review}&rdquo;
      </p>
      {favoriteTrack && (
        <p className="text-base-content mt-3 text-[10px]">
          <span className="text-neutral">Favorite: </span>
          <span className="font-bold">{favoriteTrack}</span>
        </p>
      )}
    </div>
  );
};
AlbumReview.displayName = 'AlbumReview';
