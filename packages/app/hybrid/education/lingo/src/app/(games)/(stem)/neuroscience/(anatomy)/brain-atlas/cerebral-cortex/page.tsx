import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const CerebralCortexPage: FC = () => (
  <DivisionPage
    divisionId="cerebral-cortex"
    subtitle="The folded sheet of grey matter that every other structure here serves — and the surface landmark the rest of the anatomy is named against."
    references={[
      {
        href: 'https://doi.org/10.1093/cercor/bhm225',
        label: 'Fischl et al. (2007) — Cerebral Cortex',
        description:
          'Folding patterns predict cytoarchitecture, and why surface geometry and cell structure are not the same boundary.',
      },
      {
        href: 'https://doi.org/10.1038/nrn2575',
        label: 'Bullmore & Sporns (2009) — Nature Reviews Neuroscience',
        description:
          'Graph-theoretical analysis of the cortex as a complex network, which is why area boundaries alone under-describe it.',
      },
    ]}
  />
);

export default CerebralCortexPage;
