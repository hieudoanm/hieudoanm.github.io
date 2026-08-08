import { fireEvent, render, screen } from '@testing-library/react';
import { DiscoverPage } from '../DiscoverPage';

const items = [
  {
    id: 'd1',
    title: 'Midnight Signals',
    subtitle: 'Sci-Fi movie',
    type: 'Movie',
  },
  {
    id: 'd2',
    title: 'Analog Waves',
    subtitle: 'Music podcast',
    type: 'Podcast',
  },
];

describe('DiscoverPage', () => {
  it('renders discover cards with type badges', () => {
    render(<DiscoverPage items={items} />);
    expect(screen.getByText('Midnight Signals')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi movie')).toBeInTheDocument();
    expect(screen.getAllByText('Movie')).toHaveLength(1);
  });

  it('renders a search input and title heading', () => {
    render(<DiscoverPage items={items} title="Explore" />);
    expect(
      screen.getByRole('heading', { name: 'Explore' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('searchbox', { name: 'Search media' })
    ).toBeInTheDocument();
  });

  it('fires onOpen with the item id', () => {
    const onOpen = jest.fn();
    render(<DiscoverPage items={items} onOpen={onOpen} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Open' })[0]);
    expect(onOpen).toHaveBeenCalledWith('d1');
  });

  it('renders an empty grid for no items', () => {
    render(<DiscoverPage items={[]} />);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
