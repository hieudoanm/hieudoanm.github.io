import { render, screen } from '@testing-library/react';
import { BrowseGrid } from '../BrowseGrid';

const items = [
  { id: 'b1', title: 'Chill', subtitle: 'Lo-fi beats' },
  { id: 'b2', title: 'Focus', subtitle: 'Deep work' },
];

describe('BrowseGrid', () => {
  it('renders item titles and subtitles', () => {
    render(<BrowseGrid items={items} />);
    expect(screen.getByText('Chill')).toBeInTheDocument();
    expect(screen.getByText('Lo-fi beats')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
  });

  it('uses the provided title heading', () => {
    render(<BrowseGrid items={items} title="Genres" />);
    expect(screen.getByRole('heading', { name: 'Genres' })).toBeInTheDocument();
  });

  it('renders one card per item', () => {
    render(<BrowseGrid items={items} />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('renders an empty grid for no items', () => {
    render(<BrowseGrid items={[]} />);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
