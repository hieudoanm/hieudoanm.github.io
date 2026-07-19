import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const LimbicStructuresPage: FC = () => (
  <DivisionPage
    divisionId="limbic-structures"
    subtitle="Emotion, motivation, and the formation of memory — the medial rim of the brain, where the oldest and least precisely delimited parts live."
    references={[
      {
        href: 'https://doi.org/10.1016/j.jocn.2011.04.039',
        label: 'Shah et al. (2012) — Journal of Clinical Neuroscience',
        description:
          'The Papez circuit and adjoining limbic system reconstructed by fibre dissection, rather than inferred from a diagram.',
      },
    ]}
  />
);

export default LimbicStructuresPage;
