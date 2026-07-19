import { render, screen } from '@testing-library/react';

import CerebralCortexPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/cerebral-cortex/page';
import {
  childrenOf,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('CerebralCortexPage', () => {
  it('renders the division heading and its subtitle', () => {
    const region = regionById('cerebral-cortex');
    render(<CerebralCortexPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: region!.name })
    ).toBeInTheDocument();
  });

  it('gives every structure in the division its own section', () => {
    render(<CerebralCortexPage />);
    childrenOf('cerebral-cortex').forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links back to the atlas index and on to the depth explorer', () => {
    render(<CerebralCortexPage />);
    expect(
      screen.getByRole('link', { name: /Back to Brain Atlas/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toBeInTheDocument();
  });
});
