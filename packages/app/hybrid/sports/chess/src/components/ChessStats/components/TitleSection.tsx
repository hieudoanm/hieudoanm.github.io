import type { FC } from 'react';
import type { Analysis, Format } from '../types';
import { StatCard } from './StatCard';
import { HistogramBar } from './HistogramBar';

const FORMATS: Format[] = ['rapid', 'blitz', 'bullet'];

export const TitleSection: FC<{
  heading: string;
  titleKeys: string[];
  counts: Record<string, number>;
  histogram: Analysis['histogram'];
}> = ({ heading, titleKeys, counts, histogram }) => (
  <section className="mb-16">
    <h2 className="mb-6 font-serif text-2xl font-semibold">{heading}</h2>
    <div className="mb-8 grid grid-cols-2 gap-5 md:grid-cols-5">
      {titleKeys.map((k) =>
        counts[k] === undefined ? null : (
          <StatCard key={k} label={k.toUpperCase()} value={counts[k]} />
        )
      )}
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {FORMATS.map((fmt) => (
        <HistogramBar
          key={fmt}
          title={`${fmt.charAt(0).toUpperCase() + fmt.slice(1)} Distribution`}
          histogram={histogram}
          timeControl={fmt}
          titleKeys={titleKeys}
        />
      ))}
    </div>
  </section>
);
