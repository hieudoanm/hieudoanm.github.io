import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const WhiteMatterPage: FC = () => (
  <DivisionPage
    divisionId="white-matter"
    subtitle="Nearly half the volume of the cerebrum, and almost entirely invisible from the outside — the myelinated cabling that makes distributed computation possible."
    references={[
      {
        href: 'https://doi.org/10.1016/j.bandc.2009.06.002',
        label: 'Paus et al. (2010) — Brain and Cognition',
        description:
          'Disentangling myelination from axonal growth when interpreting white-matter change over development.',
      },
    ]}
  />
);

export default WhiteMatterPage;
