import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const PhotoEditing: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Photo Editing';
  const beforeLabel = (data.beforeLabel as string) ?? 'Before';
  const afterLabel = (data.afterLabel as string) ?? 'After';
  const description = (data.description as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign>
      <h2 className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Photo Editing
      </h2>
      <h1 className="text-base-content mb-2 text-4xl font-bold">{title}</h1>
      <div className="flex w-full max-w-md gap-1">
        <div className="border-base-300 flex-1 rounded border p-2">
          <span className="text-neutral text-xs font-bold uppercase">
            {beforeLabel}
          </span>
          <div className="bg-base-300 mt-2 flex aspect-square items-center justify-center rounded">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={beforeLabel}
                className="h-full w-full rounded object-cover opacity-50 grayscale"
              />
            ) : (
              <span className="text-neutral text-xs">Original</span>
            )}
          </div>
        </div>
        <div className="border-base-300 flex-1 rounded border p-2">
          <span className="text-primary text-xs font-bold uppercase">
            {afterLabel}
          </span>
          <div className="bg-base-300 mt-2 flex aspect-square items-center justify-center rounded">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={afterLabel}
                className="h-full w-full rounded object-cover"
              />
            ) : (
              <span className="text-neutral text-xs">Edited</span>
            )}
          </div>
        </div>
      </div>
      {description && (
        <p className="text-neutral mt-2 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

PhotoEditing.displayName = 'PhotoEditing';
