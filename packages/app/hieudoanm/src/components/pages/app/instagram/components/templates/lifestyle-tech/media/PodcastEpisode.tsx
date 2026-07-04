import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const PodcastEpisode: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Untitled Episode';
  const episode = (data.episode as string) ?? '01';
  const guest = (data.guest as string) ?? 'Unknown Guest';
  const duration = (data.duration as string) ?? '00:00';
  const description = (data.description as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center p-8">
      <div className="mb-4 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Podcast
        </div>
      </div>
      <div className="bg-primary text-base-100 mb-5 flex h-24 w-24 items-center justify-center rounded-full">
        <span className="text-3xl">&#9654;</span>
      </div>
      <div className="text-base-content mb-2 text-center text-sm font-bold">
        {title}
      </div>
      <div className="bg-accent/10 text-accent mb-3 rounded px-2.5 py-0.5 text-[10px] font-bold">
        EP {episode}
      </div>
      <div className="text-neutral mb-1 text-xs font-semibold">{guest}</div>
      <div className="text-neutral mb-3 text-[10px]">{duration}</div>
      {description && (
        <p className="text-neutral max-w-[80%] text-center text-[10px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

PodcastEpisode.displayName = 'PodcastEpisode';
