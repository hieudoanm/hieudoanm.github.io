import { render, screen } from '@testing-library/react';
import { EntertainmentFeed } from '../EntertainmentFeed';

const items = [
  {
    title: 'Indie film wins top prize',
    type: 'Movies',
    time: '3h ago',
    imageAlt: 'Film festival',
  },
  {
    title: 'Album of the summer drops',
    type: 'Music',
    time: '6h ago',
    imageAlt: 'Concert stage',
  },
];

describe('EntertainmentFeed', () => {
  it('renders entertainment items with types', () => {
    render(<EntertainmentFeed items={items} />);
    expect(screen.getByText('Indie film wins top prize')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('Album of the summer drops')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  it('applies a type-specific badge class', () => {
    render(<EntertainmentFeed items={items} />);
    expect(screen.getByText('Movies')).toHaveClass('badge-warning');
  });

  it('renders timestamps', () => {
    render(<EntertainmentFeed items={items} />);
    expect(screen.getByText('3h ago')).toBeInTheDocument();
    expect(screen.getByText('6h ago')).toBeInTheDocument();
  });

  it('handles an empty items list', () => {
    render(<EntertainmentFeed items={[]} />);
    expect(screen.getByTestId('entertainment-feed')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
