import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Playlist: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'My Playlist';
  const description = (data.description as string) ?? '';
  const tracks =
    (data.tracks as {
      number: number;
      name: string;
      artist: string;
      duration: string;
    }[]) ?? [];
  const totalDuration = (data.totalDuration as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Playlist
      </span>
      <h1 className="text-base-content mt-1 text-xl font-bold">{title}</h1>
      {description && (
        <p className="text-neutral mt-1 text-xs">{description}</p>
      )}
      <div className="bg-base-200 mt-4 w-full max-w-xs overflow-hidden rounded-lg">
        {tracks.map((track, i) => (
          <div
            key={i}
            className="border-base-300 flex items-center gap-3 border-b px-3 py-2 last:border-b-0">
            <span className="text-neutral w-4 text-[10px] font-bold">
              {track.number}
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-base-content truncate text-xs font-medium">
                {track.name}
              </p>
              <p className="text-neutral truncate text-[10px]">
                {track.artist}
              </p>
            </div>
            <span className="text-neutral text-[10px]">{track.duration}</span>
          </div>
        ))}
      </div>
      {totalDuration && (
        <p className="text-neutral mt-3 text-[10px]">
          {tracks.length} tracks · {totalDuration}
        </p>
      )}
    </div>
  );
};
Playlist.displayName = 'Playlist';
