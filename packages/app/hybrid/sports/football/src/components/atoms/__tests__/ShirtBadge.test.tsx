import { render, screen } from '@testing-library/react';
import { ShirtBadge } from '@/components/atoms/ShirtBadge';

describe('ShirtBadge', () => {
  it('renders the shirt number', () => {
    render(<ShirtBadge number={9} label="ST" />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('renders without a label', () => {
    render(<ShirtBadge number={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('uses the small size class when requested', () => {
    render(<ShirtBadge number={2} size="sm" />);
    const badge = screen.getByText('2');
    expect(badge.className).toContain('h-6');
    expect(badge.className).toContain('w-6');
  });
});
