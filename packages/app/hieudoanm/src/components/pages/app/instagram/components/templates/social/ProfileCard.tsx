import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const ProfileCard: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? '';
  const titleText = (data.title as string) ?? '';
  const bio = (data.bio as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10 text-center">
      {imageUrl ? (
        <div
          className="ring-accent/20 mb-6 h-28 w-28 rounded-full bg-cover bg-center ring-4"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="bg-accent/10 ring-accent/20 mb-6 flex h-28 w-28 items-center justify-center rounded-full ring-4">
          <span className="text-accent text-4xl font-bold">
            {name.charAt(0) || '?'}
          </span>
        </div>
      )}
      <h1 className="text-base-content mb-1 text-3xl font-bold tracking-tight">
        {name}
      </h1>
      <p className="text-primary mb-6 text-sm font-semibold tracking-widest uppercase">
        {titleText}
      </p>
      <p className="text-neutral mx-auto max-w-sm text-sm leading-relaxed">
        {bio}
      </p>
    </div>
  );
};

ProfileCard.displayName = 'ProfileCard';
