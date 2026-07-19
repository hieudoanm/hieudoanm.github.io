import { render, screen } from '@testing-library/react';

import NikoliPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/page';

describe('NikoliPage', () => {
  it('names the collection', () => {
    render(<NikoliPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Nikoli' })
    ).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<NikoliPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('lists every puzzle in the collection', () => {
    render(<NikoliPage />);

    for (const name of [
      'Sudoku',
      'Nurikabe',
      'Masyu',
      'Shikaku',
      'Fillomino',
      'Norinori',
      'Heyawake',
    ]) {
      expect(
        screen.getByRole('link', { name: new RegExp(name) })
      ).toHaveAttribute(
        'href',
        `/psychology/cognitive/reasoning/nikoli/${name.toLowerCase()}`
      );
    }
  });
});
