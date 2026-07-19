import Link from 'next/link';
import { FC } from 'react';

import { sanitizeAbstract } from '@/lib/abstract';
import type { Work } from '@/types/doi';

interface SearchResultItemProps {
  work: Work;
}

const SearchResultItem: FC<SearchResultItemProps> = ({ work }) => (
  <li className="card bg-base-200 card-body hover:bg-base-300 transition-colors">
    <h2 className="font-semibold">
      {work.title || <em className="text-base-content/50">(untitled)</em>}
    </h2>
    <p className="text-base-content/50 text-xs">
      {work.year} ·{' '}
      <Link
        href={`https://doi.org/${work.doi}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link hover:text-primary">
        {work.doi}
      </Link>
      {work.type && <> · {work.type}</>}
    </p>
    {work.author && (
      <p className="text-base-content/60 truncate text-sm" title={work.author}>
        {work.author}
      </p>
    )}
    {work.abstract && (
      <p className="text-base-content/60 line-clamp-2 text-sm">
        {sanitizeAbstract(work.abstract)}
      </p>
    )}
  </li>
);

export default SearchResultItem;
