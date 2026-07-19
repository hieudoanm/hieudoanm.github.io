import { render, screen } from '@testing-library/react';
import { TrendingList } from '../TrendingList';

const items = [
  { id: '1', title: 'Global economy', count: '12K discussions' },
  { id: '2', title: 'Space launch' },
];

describe('TrendingList', () => {
  it('renders the title and items', () => {
    render(<TrendingList items={items} />);
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Global economy')).toBeInTheDocument();
    expect(screen.getByText('Space launch')).toBeInTheDocument();
  });

  it('renders ranked numbers', () => {
    render(<TrendingList items={items} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders count when present', () => {
    render(<TrendingList items={items} />);
    expect(screen.getByText('12K discussions')).toBeInTheDocument();
  });

  it('renders an empty state when no items', () => {
    render(<TrendingList items={[]} />);
    expect(screen.getByText('Nothing trending yet.')).toBeInTheDocument();
  });
});
