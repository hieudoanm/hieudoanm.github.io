import type { FC } from 'react';
import type { Analysis as AnalysisData } from '../types';
import { TitleSection } from './TitleSection';
import { OPEN_TITLES, WOMAN_TITLES } from '../constants';

export const AnalysisSection: FC<{
  analysis: AnalysisData | null;
  dbLoading: boolean;
  titleCounts: Record<string, number>;
  histogram: AnalysisData['histogram'];
}> = ({ analysis, dbLoading, titleCounts, histogram }) => {
  if (dbLoading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-ring loading-lg text-primary" />
      </div>
    );
  }

  if (analysis) {
    return (
      <>
        <TitleSection
          heading="Open Titles"
          titleKeys={OPEN_TITLES}
          counts={titleCounts}
          histogram={histogram}
        />
        <TitleSection
          heading="Women's Titles"
          titleKeys={WOMAN_TITLES}
          counts={titleCounts}
          histogram={histogram}
        />
      </>
    );
  }

  return <p className="text-base-content/40 text-sm">No data available.</p>;
};
