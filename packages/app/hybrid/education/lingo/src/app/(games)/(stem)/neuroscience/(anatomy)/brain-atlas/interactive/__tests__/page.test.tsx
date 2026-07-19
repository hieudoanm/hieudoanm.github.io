import { render, screen } from '@testing-library/react';
import BrainAtlasInteractivePage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/interactive/page';

describe('BrainAtlasInteractivePage', () => {
  it('explains what the explorer is for', () => {
    render(<BrainAtlasInteractivePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Depth Explorer' })
    ).toBeInTheDocument();
  });

  it('mounts the explorer with its controls and outline', () => {
    render(<BrainAtlasInteractivePage />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('tree')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
