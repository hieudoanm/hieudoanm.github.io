import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Testimonial: FC<TemplateProps> = ({ data }) => {
  const quote = (data.quote as string) ?? '';
  const name = (data.name as string) ?? '';
  const titleText = (data.title as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';
  const rating = (data.rating as number) ?? 5;

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10 text-center">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`h-6 w-6 ${i < rating ? 'text-warning' : 'text-neutral/20'}`}
            fill="currentColor"
            viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="mb-6 max-w-md">
        <p className="text-base-content text-xl leading-relaxed font-light italic">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      <div className="flex items-center gap-4">
        {imageUrl ? (
          <div
            className="ring-accent/20 h-12 w-12 rounded-full bg-cover bg-center ring-2"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="bg-accent/10 ring-accent/20 flex h-12 w-12 items-center justify-center rounded-full ring-2">
            <span className="text-accent text-base font-bold">
              {name.charAt(0) || '?'}
            </span>
          </div>
        )}
        <div className="text-left">
          <p className="text-base-content text-sm font-bold">{name}</p>
          <p className="text-neutral text-xs">{titleText}</p>
        </div>
      </div>
    </div>
  );
};

Testimonial.displayName = 'Testimonial';
