import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryNav } from '../CategoryNav';

const categories = ['World', 'Politics', 'Sports'];

describe('CategoryNav', () => {
  it('renders all categories', () => {
    render(<CategoryNav categories={categories} />);
    expect(
      screen.getByRole('navigation', { name: 'News categories' })
    ).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
  });

  it('marks the first category as active by default', () => {
    render(<CategoryNav categories={categories} />);
    expect(screen.getByRole('button', { name: 'World' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('marks a controlled active category', () => {
    render(<CategoryNav categories={categories} active="Sports" />);
    expect(screen.getByRole('button', { name: 'Sports' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('calls onSelect when a category is clicked', () => {
    const onSelect = jest.fn();
    render(<CategoryNav categories={categories} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Politics' }));
    expect(onSelect).toHaveBeenCalledWith('Politics');
    expect(screen.getByRole('button', { name: 'Politics' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
