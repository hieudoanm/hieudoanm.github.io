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
      <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
        Playlist
      </span>
      <h1 className="text-base-content mt-1 text-lg font-bold">{title}</h1>
      {description && (
        <p className="text-neutral mt-1 text-xs">{description}</p>
      )}
      <ul className="bg-base-200 mt-2 w-full max-w-xs overflow-hidden rounded-lg">
        {tracks.map((track, i) => (
          <li
            key={i}
            className="border-base-300 flex items-center gap-2 border-b px-2 py-1 last:border-b-0">
            <span className="text-neutral w-4 text-xs font-bold">
              {track.number}
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-base-content truncate text-xs font-medium">
                {track.name}
              </p>
              <p className="text-neutral truncate text-xs">{track.artist}</p>
            </div>
            <span className="text-neutral text-xs">{track.duration}</span>
          </li>
        ))}
      </ul>
      {totalDuration && (
        <p className="text-neutral mt-2 text-xs">
          {tracks.length} tracks · {totalDuration}
        </p>
      )}
    </div>
  );
};
Playlist.displayName = 'Playlist';
