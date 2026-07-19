import { render, screen } from '@testing-library/react';
import { ContactAvatar } from '../ContactAvatar';

describe('ContactAvatar', () => {
  it('renders initials for a two-part name', () => {
    render(<ContactAvatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<ContactAvatar name="Jane Doe" src="/jane.png" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute(
      'src',
      '/jane.png'
    );
  });

  it('applies the color class', () => {
    render(<ContactAvatar name="Jane Doe" color="accent" />);
    expect(screen.getByText('JD')).toHaveClass(
      'bg-accent',
      'text-accent-content'
    );
  });

  it('renders a placeholder for an empty name', () => {
    render(<ContactAvatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
