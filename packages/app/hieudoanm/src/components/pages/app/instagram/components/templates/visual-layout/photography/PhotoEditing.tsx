import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const PhotoEditing: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Photo Editing';
  const beforeLabel = (data.beforeLabel as string) ?? 'Before';
  const afterLabel = (data.afterLabel as string) ?? 'After';
  const description = (data.description as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Photo Editing
      </div>
      <h1 className="text-base-content mb-4 text-2xl font-bold">{title}</h1>
      <div className="flex w-full max-w-md gap-2">
        <div className="border-base-300 flex-1 rounded border p-4">
          <span className="text-neutral text-[10px] font-bold uppercase">
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
        <div className="border-base-300 flex-1 rounded border p-4">
          <span className="text-primary text-[10px] font-bold uppercase">
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
        <p className="text-neutral mt-4 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

PhotoEditing.displayName = 'PhotoEditing';
