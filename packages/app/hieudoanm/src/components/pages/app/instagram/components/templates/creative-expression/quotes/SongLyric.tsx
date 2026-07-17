import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const SongLyric: FC<TemplateProps> = ({ data }) => {
  const lyric =
    (data.lyric as string) ?? 'Imagine all the people living life in peace.';
  const song = (data.song as string) ?? 'Imagine';
  const artist = (data.artist as string) ?? 'John Lennon';
  const album = (data.album as string) ?? '';
  const year = (data.year as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-primary mb-1 font-serif text-xl">♪</span>
      <p className="text-base-content mb-3 max-w-xl text-2xl leading-relaxed font-medium italic">
        "{lyric}"
      </p>
      <p className="text-primary mb-0.5 text-xs font-bold">{song}</p>
      <p className="text-secondary mb-1 text-xs">{artist}</p>
      <div className="flex items-center gap-2">
        {album && <p className="badge badge-accent badge-sm">{album}</p>}
        {year && <p className="badge badge-outline badge-sm">{year}</p>}
      </div>
    </div>
  );
};
SongLyric.displayName = 'SongLyric';
