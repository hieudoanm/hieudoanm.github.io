import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const BrainstemPage: FC = () => (
  <DivisionPage
    divisionId="brainstem"
    subtitle="The stalk: every long tract between brain and body, stacked above the centres that keep a body breathing."
    references={[
      {
        href: 'https://doi.org/10.1007/978-3-319-57427-1_11',
        label: 'Agarwal (2017) — Neuroimaging: Anatomy Meets Function',
        description:
          'Functional anatomy of the cerebellum and brainstem, and why level of lesion predicts which signs appear.',
      },
    ]}
  />
);

export default BrainstemPage;
