import type { FC } from 'react';
import Link from 'next/link';
import type { TheorySection } from '@/components/templates/TheoryTemplate';
import type { BrainRegion } from './types';

/** Where a structure sits relative to the cortical surface, in words. */
export const depthLabel = (depth: number): string => {
  if (depth <= 0.1) return 'Cortical surface';
  if (depth <= 0.4) return 'Just beneath the surface';
  if (depth <= 0.65) return 'Deep and central';
  if (depth <= 0.85) return 'Diencephalon and cerebellum';
  return 'Brainstem';
};

/**
 * One structure, rendered as a reference entry: what it is, what it does, why
 * it matters, and where to read more.
 */
export const RegionBody: FC<{ region: BrainRegion }> = ({ region }) => (
  <div className="flex flex-col gap-3">
    <p>{region.summary}</p>
    <p>
      <strong>Function.</strong> {region.function}
    </p>
    <p>
      <strong>Why it matters.</strong> {region.note}
    </p>
    <p className="text-base-content/50 text-xs">
      Sits: {depthLabel(region.depth)}.
    </p>
    {region.seeAlso && (
      <p>
        <strong>Explore it.</strong>{' '}
        <Link
          href={region.seeAlso.href}
          className="text-primary hover:underline">
          {region.seeAlso.label}
        </Link>{' '}
        — a working model of the process this structure carries out.
      </p>
    )}
  </div>
);

/** A region as a `TheoryTemplate` section, keeping pages declarative. */
export const toSection = (region: BrainRegion): TheorySection => ({
  title: region.name,
  body: <RegionBody region={region} />,
});
