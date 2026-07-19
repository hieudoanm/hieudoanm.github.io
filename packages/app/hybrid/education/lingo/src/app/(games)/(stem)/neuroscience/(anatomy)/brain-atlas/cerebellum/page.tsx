import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const CerebellumPage: FC = () => (
  <DivisionPage
    divisionId="cerebellum"
    subtitle="The little brain that holds most of the neurons — and, for a long time, looked like the part that mattered least."
    references={[
      {
        href: 'https://doi.org/10.1007/978-3-319-57427-1_11',
        label: 'Agarwal (2017) — Neuroimaging: Anatomy Meets Function',
        description:
          'Functional anatomy of the cerebellum and its neighbours, from a neuroimaging perspective.',
      },
    ]}
  />
);

export default CerebellumPage;
