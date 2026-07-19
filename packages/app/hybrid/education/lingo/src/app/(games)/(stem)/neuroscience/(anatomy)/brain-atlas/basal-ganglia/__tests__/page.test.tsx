import { render, screen } from '@testing-library/react';

import BasalGangliaPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/basal-ganglia/page';
import {
  childrenOf,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('BasalGangliaPage', () => {
  it('renders the division heading and its subtitle', () => {
    const region = regionById('basal-ganglia');
    render(<BasalGangliaPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: region!.name })
    ).toBeInTheDocument();
  });

  it('gives every structure in the division its own section', () => {
    render(<BasalGangliaPage />);
    childrenOf('basal-ganglia').forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links back to the atlas index and on to the depth explorer', () => {
    render(<BasalGangliaPage />);
    expect(
      screen.getByRole('link', { name: /Back to Brain Atlas/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toBeInTheDocument();
  });
});
