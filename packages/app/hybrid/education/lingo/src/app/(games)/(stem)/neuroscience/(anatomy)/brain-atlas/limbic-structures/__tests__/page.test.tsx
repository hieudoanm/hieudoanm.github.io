import { render, screen } from '@testing-library/react';

import LimbicStructuresPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/limbic-structures/page';
import {
  childrenOf,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('LimbicStructuresPage', () => {
  it('renders the division heading and its subtitle', () => {
    const region = regionById('limbic-structures');
    render(<LimbicStructuresPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: region!.name })
    ).toBeInTheDocument();
  });

  it('gives every structure in the division its own section', () => {
    render(<LimbicStructuresPage />);
    childrenOf('limbic-structures').forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links back to the atlas index and on to the depth explorer', () => {
    render(<LimbicStructuresPage />);
    expect(
      screen.getByRole('link', { name: /Back to Brain Atlas/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toBeInTheDocument();
  });
});
