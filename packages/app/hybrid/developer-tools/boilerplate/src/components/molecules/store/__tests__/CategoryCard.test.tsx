import { render, screen } from '@testing-library/react';
import { CategoryCard } from '../CategoryCard';

describe('CategoryCard', () => {
  it('renders category name and image label', () => {
    render(<CategoryCard name="Electronics" imageLabel="Devices" />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Devices')).toBeInTheDocument();
  });

  it('shows product count when provided', () => {
    render(<CategoryCard name="Electronics" productCount={24} />);
    expect(screen.getByTestId('category-count')).toHaveTextContent(
      '24 products'
    );
  });

  it('omits product count when not provided', () => {
    render(<CategoryCard name="Electronics" />);
    expect(screen.queryByTestId('category-count')).not.toBeInTheDocument();
  });
});
