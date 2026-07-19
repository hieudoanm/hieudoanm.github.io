import { render, screen } from '@testing-library/react';
import { CategoryTag } from '../CategoryTag';

describe('CategoryTag', () => {
  it('renders label with default variant', () => {
    render(<CategoryTag label="React" />);
    expect(screen.getByText('React')).toHaveClass(
      'badge-outline',
      'badge-primary'
    );
  });

  it('renders a link when href is provided', () => {
    render(<CategoryTag label="React" href="/blog/react" />);
    const link = screen.getByRole('link', { name: 'React' });
    expect(link).toHaveAttribute('href', '/blog/react');
  });

  it('applies variant class', () => {
    render(<CategoryTag label="React" variant="info" />);
    expect(screen.getByText('React')).toHaveClass('badge-info');
  });
});
