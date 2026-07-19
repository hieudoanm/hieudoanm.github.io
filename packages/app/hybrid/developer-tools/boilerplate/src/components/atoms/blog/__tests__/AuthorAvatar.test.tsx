import { render, screen } from '@testing-library/react';
import { AuthorAvatar } from '../AuthorAvatar';

describe('AuthorAvatar', () => {
  it('renders initials for a two-part name', () => {
    render(<AuthorAvatar name="Ada Lovelace" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<AuthorAvatar name="Ada Lovelace" src="/ada.png" />);
    const img = screen.getByRole('img', { name: 'Ada Lovelace' });
    expect(img).toHaveAttribute('src', '/ada.png');
  });

  it('renders a placeholder for an empty name', () => {
    render(<AuthorAvatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
