import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const IconText: FC<TemplateProps> = ({ data }) => {
  const icon = (data.icon as string) ?? '🚀';
  const headline = (data.headline as string) ?? 'Ship Faster';
  const text = (data.text as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <div className="text-center">
        <div className="text-primary text-4xl leading-none">{icon}</div>
        <h1 className="text-base-content mt-2 text-4xl font-bold tracking-tight">
          {headline}
        </h1>
        {text && (
          <p className="text-neutral mt-2 text-base leading-relaxed">{text}</p>
        )}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

IconText.displayName = 'IconText';
