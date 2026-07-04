import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const IconText: FC<TemplateProps> = ({ data }) => {
  const icon = (data.icon as string) ?? '🚀';
  const headline = (data.headline as string) ?? 'Ship Faster';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="text-primary text-7xl leading-none">{icon}</div>
        <h1 className="text-base-content mt-4 text-4xl font-bold tracking-tight">
          {headline}
        </h1>
        {text && (
          <p className="text-neutral mt-3 text-sm leading-relaxed">{text}</p>
        )}
      </div>
    </div>
  );
};

IconText.displayName = 'IconText';
