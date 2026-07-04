import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Setlist: FC<TemplateProps> = ({ data }) => {
  const artist = (data.artist as string) ?? 'Artist';
  const venue = (data.venue as string) ?? '';
  const date = (data.date as string) ?? '';
  const songs =
    (data.songs as { number: number; title: string; album: string }[]) ?? [];
  const encore = (data.encore as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Setlist
      </span>
      <h1 className="text-base-content mt-1 text-xl font-bold">{artist}</h1>
      {venue && <p className="text-neutral text-xs">{venue}</p>}
      {date && <p className="text-neutral text-[10px]">{date}</p>}
      <div className="mt-4 w-full max-w-xs space-y-1">
        {songs.map((song, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-neutral w-4 text-[10px] font-bold">
              {song.number}
            </span>
            <span className="text-base-content flex-1 text-left text-xs font-medium">
              {song.title}
            </span>
            {song.album && (
              <span className="bg-base-200 text-neutral rounded px-1.5 py-0.5 text-[9px]">
                {song.album}
              </span>
            )}
          </div>
        ))}
      </div>
      {encore.length > 0 && (
        <div className="mt-4 w-full max-w-xs">
          <p className="text-accent text-[10px] font-bold uppercase">Encore</p>
          <div className="mt-1 space-y-1">
            {encore.map((song, i) => (
              <p key={i} className="text-base-content text-left text-xs">
                {song}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
Setlist.displayName = 'Setlist';
