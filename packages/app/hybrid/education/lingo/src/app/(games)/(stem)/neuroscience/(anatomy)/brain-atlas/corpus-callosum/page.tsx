import type { FC } from 'react';
import { DivisionPage } from '@/games/stem/neuroscience/anatomy/brain-atlas/division-page';

const CorpusCallosumPage: FC = () => (
  <DivisionPage
    divisionId="corpus-callosum"
    subtitle="Two hundred million axons crossing the midline — the structure whose absence has taught us the most about what the two hemispheres share."
    references={[
      {
        href: 'https://doi.org/10.1093/brain/97.2.225',
        label:
          'Agenesis of the Corpus Callosum: A Further Behavioural Investigation — Brain (1974)',
        description:
          'Behavioural work on callosal agenesis, which remains the cleanest evidence for what the hemispheres genuinely need from each other.',
      },
    ]}
  />
);

export default CorpusCallosumPage;
