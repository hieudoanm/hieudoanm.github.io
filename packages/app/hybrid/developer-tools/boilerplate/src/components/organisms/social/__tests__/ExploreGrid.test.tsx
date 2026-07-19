import { fireEvent, render, screen } from '@testing-library/react';
import { ExploreGrid } from '../ExploreGrid';

const items = [
  { id: 'x1', label: 'City lights', type: 'photo' as const, likes: 320 },
  { id: 'x2', label: 'Studio session', type: 'video' as const, likes: 980 },
];

describe('ExploreGrid', () => {
  it('renders category tabs and item labels', () => {
    render(<ExploreGrid items={items} />);
    expect(screen.getByText('For you')).toBeInTheDocument();
    expect(screen.getByText('City lights')).toBeInTheDocument();
    expect(screen.getByText('Studio session')).toBeInTheDocument();
  });

  it('applies type badges to items', () => {
    render(<ExploreGrid items={items} />);
    expect(screen.getAllByText('photo').length).toBeGreaterThan(0);
    expect(screen.getAllByText('video').length).toBeGreaterThan(0);
  });

  it('fires onSelect with the item id', () => {
    const onSelect = jest.fn();
    render(<ExploreGrid items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('City lights'));
    expect(onSelect).toHaveBeenCalledWith('x1');
  });

  it('renders an empty grid when there are no items', () => {
    render(<ExploreGrid items={[]} />);
    expect(screen.getByTestId('explore-grid')).toBeInTheDocument();
  });
});
