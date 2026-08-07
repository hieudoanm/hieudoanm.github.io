import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/avatar.png" alt="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toHaveAttribute('src', '/avatar.png');
  });

  it('renders initials from alt when no src', () => {
    render(<Avatar alt="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback initials when provided', () => {
    render(<Avatar alt="Jane Doe" fallback="X" />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Avatar size="sm" alt="A B" />);
    expect(screen.getByText('AB').parentElement).toHaveClass('w-8');
    rerender(<Avatar size="lg" alt="A B" />);
    expect(screen.getByText('AB').parentElement).toHaveClass('w-16');
  });
});
