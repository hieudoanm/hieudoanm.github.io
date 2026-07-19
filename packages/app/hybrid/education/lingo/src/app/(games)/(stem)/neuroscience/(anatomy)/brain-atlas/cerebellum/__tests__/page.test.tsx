import { render, screen } from '@testing-library/react';

import CerebellumPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/cerebellum/page';
import {
  childrenOf,
  regionById,
} from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('CerebellumPage', () => {
  it('renders the division heading and its subtitle', () => {
    const region = regionById('cerebellum');
    render(<CerebellumPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: region!.name })
    ).toBeInTheDocument();
  });

  it('gives every structure in the division its own section', () => {
    render(<CerebellumPage />);
    childrenOf('cerebellum').forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links back to the atlas index and on to the depth explorer', () => {
    render(<CerebellumPage />);
    expect(
      screen.getByRole('link', { name: /Back to Brain Atlas/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toBeInTheDocument();
  });
});
