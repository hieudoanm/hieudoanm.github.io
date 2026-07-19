import Link from 'next/link';
import { FC } from 'react';
import type { RankedWork } from '@/types/doi';

interface RankingListProps {
  title: string;
  rows: RankedWork[];
}

const doiUrl = (doi: string): string => `https://doi.org/${doi}`;

const RankingList: FC<RankingListProps> = ({ title, rows }) => (
  <div className="card bg-base-200 card-body min-w-0">
    <h3 className="mb-3 font-semibold">{title}</h3>
    {rows.length === 0 ? (
      <p className="text-base-content/50 text-sm">No data.</p>
    ) : (
      <ol className="space-y-2">
        {rows.map((row, i) => (
          <li key={row.doi} className="flex items-start gap-3 text-sm">
            <span className="text-base-content/40 mt-0.5 w-5 shrink-0 text-right">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium" title={row.title}>
                {row.title || (
                  <em className="text-base-content/50">(untitled)</em>
                )}
              </p>
              <p
                className="text-base-content/50 truncate text-xs"
                title={row.title}>
                {row.year} ·{' '}
                <Link
                  href={doiUrl(row.doi)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link hover:text-primary">
                  {row.doi}
                </Link>
                {row.type && <> · {row.type}</>} · {row.count}
              </p>
            </div>
          </li>
        ))}
      </ol>
    )}
  </div>
);

export default RankingList;
