import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const BookReview: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Atomic Habits';
  const author = (data.author as string) ?? 'James Clear';
  const rating = (data.rating as number) ?? 4;
  const review =
    (data.review as string) ??
    'A practical guide to building good habits and breaking bad ones.';
  const genre = (data.genre as string) ?? 'Self-Help';

  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="border-l-accent flex flex-1 flex-col border-l-4 pl-4">
        <div className="mb-2 text-2xl">📖</div>
        <div className="text-base-content text-2xl font-bold">{title}</div>
        <div className="text-neutral mb-2 text-sm">by {author}</div>
        <div className="mb-3 flex gap-1">
          {stars.map((filled, i) => (
            <span key={i} className={filled ? 'text-primary' : 'text-base-300'}>
              ★
            </span>
          ))}
        </div>
        <p className="text-neutral mb-3 flex-1 text-sm leading-relaxed">
          {review}
        </p>
        <span className="bg-accent/10 text-accent w-fit rounded-full px-4 py-2 text-sm font-bold">
          {genre}
        </span>
      </div>
    </div>
  );
};

BookReview.displayName = 'BookReview';
