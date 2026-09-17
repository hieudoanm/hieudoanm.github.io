import { render, screen } from '@testing-library/react';
import BrainAtlasPage from '@/app/(games)/(stem)/neuroscience/(anatomy)/brain-atlas/page';
import { DIVISION_ROUTES } from '@/games/stem/neuroscience/anatomy/brain-atlas/atlas';

describe('BrainAtlasPage', () => {
  it('introduces the atlas and links back to the subject hub', () => {
    render(<BrainAtlasPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Brain Atlas' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to Neuroscience/ })
    ).toBeInTheDocument();
  });

  it('links to the depth explorer', () => {
    render(<BrainAtlasPage />);
    expect(
      screen.getByRole('link', { name: /Depth Explorer/ })
    ).toHaveAttribute('href', '/neuroscience/brain-atlas/interactive');
  });

  it('groups every division under its parent region', () => {
    render(<BrainAtlasPage />);
    DIVISION_ROUTES.forEach(({ route }) => {
      const name = route.split('/').pop()!.replace(/-/g, ' ');
      expect(screen.getAllByText(new RegExp(name, 'i')).length).toBeGreaterThan(
        0
      );
    });
  });

  it('names all four top-level regions', () => {
    render(<BrainAtlasPage />);
    ['Cerebrum', 'Diencephalon', 'Cerebellum', 'Brainstem'].forEach((name) =>
      expect(
        screen.getByRole('heading', { level: 2, name })
      ).toBeInTheDocument()
    );
  });
});
