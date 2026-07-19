import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const DiencephalonPage: FC = () => (
  <DivisionPage
    divisionId="diencephalon"
    subtitle="The deep central core — relay, gate, and thermostat, sitting where nothing of it can be seen from the outside."
    references={[
      {
        href: 'https://doi.org/10.1016/B978-0-12-817424-1.00008-2',
        label: 'Moini (2020) — Functional and Clinical Neuroanatomy',
        description:
          'Thalamus and hypothalamus as functional anatomy, tying each nucleus to the clinical signs of its damage.',
      },
    ]}
  />
);

export default DiencephalonPage;
