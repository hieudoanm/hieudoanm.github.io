import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const BasalGangliaPage: FC = () => (
  <DivisionPage
    divisionId="basal-ganglia"
    subtitle="The cortex's gatekeeper: a set of deep nuclei that decides which programme runs, and how strongly."
    references={[
      {
        href: 'https://doi.org/10.1016/j.neuron.2012.09.012',
        label: 'Lee (2012) — Neuron',
        description:
          'How neuromodulators reconfigure circuit state, which is what gives the basal-ganglia loops their task-dependent gain.',
      },
    ]}
  />
);

export default BasalGangliaPage;
