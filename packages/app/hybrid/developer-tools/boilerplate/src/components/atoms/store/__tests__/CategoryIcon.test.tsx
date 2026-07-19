import { render, screen } from '@testing-library/react';
import { CategoryIcon } from '../CategoryIcon';

describe('CategoryIcon', () => {
  it('renders the category label', () => {
    render(<CategoryIcon label="Electronics" />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('applies a custom size to the icon', () => {
    const { container } = render(<CategoryIcon label="Home" size={28} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '28');
  });

  it('renders a custom label with special characters', () => {
    render(<CategoryIcon label="Food & Drink" />);
    expect(screen.getByText('Food & Drink')).toBeInTheDocument();
  });
});
