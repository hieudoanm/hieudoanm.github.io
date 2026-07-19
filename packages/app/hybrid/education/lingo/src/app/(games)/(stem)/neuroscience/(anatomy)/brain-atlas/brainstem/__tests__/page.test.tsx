import { render, screen } from '@testing-library/react';

import BrainstemPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/brainstem/page';
import {
  childrenOf,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('BrainstemPage', () => {
  it('renders the division heading and its subtitle', () => {
    const region = regionById('brainstem');
    render(<BrainstemPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: region!.name })
    ).toBeInTheDocument();
  });

  it('gives every structure in the division its own section', () => {
    render(<BrainstemPage />);
    childrenOf('brainstem').forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links back to the atlas index and on to the depth explorer', () => {
    render(<BrainstemPage />);
    expect(
      screen.getByRole('link', { name: /Back to Brain Atlas/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toBeInTheDocument();
  });
});
