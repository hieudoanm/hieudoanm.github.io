import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const LaunchCountdown: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Coming Soon';
  const date = (data.date as string) ?? '2025-03-01';
  const text = (data.text as string) ?? '';

  const units = [
    { label: 'Days', value: '14' },
    { label: 'Hours', value: '08' },
    { label: 'Min', value: '32' },
    { label: 'Sec', value: '17' },
  ];

  const citation = (data.citation as string) ?? '';
  return (
    <Background center>
      <div className="text-center">
        <h2 className="text-primary text-xs font-bold tracking-widest uppercase">
          {title}
        </h2>
        <time className="text-neutral mt-2 text-xs">{date}</time>
        <ul className="mt-6 flex gap-4">
          {units.map((u, i) => (
            <li key={i} className="flex flex-col items-center">
              <div className="bg-primary text-primary-content flex h-14 w-14 items-center justify-center rounded-lg text-base font-black">
                {u.value}
              </div>
              <span className="text-neutral mt-1 text-xs tracking-wider uppercase">
                {u.label}
              </span>
            </li>
          ))}
        </ul>
        {text && <p className="text-neutral mt-4 text-sm">{text}</p>}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

LaunchCountdown.displayName = 'LaunchCountdown';
