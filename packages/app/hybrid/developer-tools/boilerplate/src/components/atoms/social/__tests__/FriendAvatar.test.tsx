import { render, screen } from '@testing-library/react';
import { FriendAvatar } from '../FriendAvatar';

describe('FriendAvatar', () => {
  it('renders initials fallback', () => {
    render(<FriendAvatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders image when src provided', () => {
    render(<FriendAvatar name="Jane Doe" src="/jane.jpg" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute(
      'src',
      '/jane.jpg'
    );
  });

  it('applies size class', () => {
    render(<FriendAvatar name="Jane Doe" size="lg" />);
    expect(screen.getByTestId('friend-avatar')).toHaveClass('w-16');
  });
});
