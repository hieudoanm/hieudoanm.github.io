import { render, screen } from '@testing-library/react';

import CorpusCallosumPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/corpus-callosum/page';
import {
  childrenOf,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('CorpusCallosumPage', () => {
  it('renders the division heading and its subtitle', () => {
    const region = regionById('corpus-callosum');
    render(<CorpusCallosumPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: region!.name })
    ).toBeInTheDocument();
  });

  it('gives every structure in the division its own section', () => {
    render(<CorpusCallosumPage />);
    childrenOf('corpus-callosum').forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links back to the atlas index and on to the depth explorer', () => {
    render(<CorpusCallosumPage />);
    expect(
      screen.getByRole('link', { name: /Back to Brain Atlas/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toBeInTheDocument();
  });
});
