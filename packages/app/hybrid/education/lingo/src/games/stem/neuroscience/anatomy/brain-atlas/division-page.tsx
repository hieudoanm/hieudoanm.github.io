import type { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';
import type { TheoryLink } from '@/components/templates/TheoryTemplate';
import { childrenOf, regionById } from './atlas';
import { RegionBody, toSection } from './region-body';

export const ATLAS_HOME = '/neuroscience/brain-atlas/';
export const ATLAS_EXPLORER = '/neuroscience/brain-atlas/interactive';

const EXPLORER_LINK: TheoryLink = {
  href: ATLAS_EXPLORER,
  label: 'Depth Explorer',
  description:
    'Scrub from the cortical surface down to the brainstem and watch which structures the cut exposes.',
};

export interface DivisionPageProps {
  /** Id of the atlas division this page covers. */
  divisionId: string;
  /** One line on why this division is worth reading about. */
  subtitle: string;
  /** Sources for the anatomy described on this page. */
  references?: TheoryLink[];
}

/**
 * A reference page for one division of the atlas: the division's own overview
 * followed by a section per structure beneath it. Pages supply only their own
 * prose and sources, so none of them outgrows a readable file.
 */
export const DivisionPage: FC<DivisionPageProps> = ({
  divisionId,
  subtitle,
  references = [],
}) => {
  const division = regionById(divisionId);
  if (!division) {
    throw new Error(`the brain atlas has no division "${divisionId}"`);
  }

  return (
    <TheoryTemplate
      title={division.name}
      subtitle={subtitle}
      parentLink={{ href: ATLAS_HOME, label: 'Brain Atlas' }}
      sections={[
        { title: 'Overview', body: <RegionBody region={division} /> },
        ...childrenOf(divisionId).map(toSection),
      ]}
      links={[EXPLORER_LINK]}
      references={references}
    />
  );
};
