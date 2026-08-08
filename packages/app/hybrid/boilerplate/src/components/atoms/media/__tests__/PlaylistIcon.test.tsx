import { render, screen } from '@testing-library/react';
import { PlaylistIcon } from '../PlaylistIcon';

describe('PlaylistIcon', () => {
  it('renders an inline svg icon', () => {
    render(<PlaylistIcon />);
    expect(screen.getByTestId('playlist-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<PlaylistIcon className="text-primary" />);
    expect(screen.getByTestId('playlist-icon')).toHaveClass('text-primary');
  });

  it('respects the size prop', () => {
    render(<PlaylistIcon size={20} />);
    const icon = screen.getByTestId('playlist-icon');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });
});
