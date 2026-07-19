import { render, screen } from '@testing-library/react';
import { TeamAvatar } from '../TeamAvatar';

describe('TeamAvatar', () => {
  it('renders initials for a two-part name', () => {
    render(<TeamAvatar name="Sam Lee" />);
    expect(screen.getByText('SL')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<TeamAvatar name="Sam Lee" src="/sam.png" />);
    expect(screen.getByRole('img', { name: 'Sam Lee' })).toHaveAttribute(
      'src',
      '/sam.png'
    );
  });

  it('applies the ring class when enabled', () => {
    render(<TeamAvatar name="Sam Lee" ring />);
    expect(screen.getByText('SL')).toHaveClass('ring');
  });

  it('renders a placeholder for an empty name', () => {
    render(<TeamAvatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
