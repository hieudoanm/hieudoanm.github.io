import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryShowcase } from '../CategoryShowcase';

const categories = [
  { id: 'cat1', name: 'Furniture', icon: '🛋️', count: 240 },
  { id: 'cat2', name: 'Kitchen', icon: '🍳', count: 480 },
];

describe('CategoryShowcase', () => {
  it('renders category names and item counts', () => {
    render(<CategoryShowcase categories={categories} />);
    expect(screen.getByText('Furniture')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByText(/480 items/)).toBeInTheDocument();
  });

  it('fires onSelect with the category id', () => {
    const onSelect = jest.fn();
    render(<CategoryShowcase categories={categories} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Furniture'));
    expect(onSelect).toHaveBeenCalledWith('cat1');
  });
});
