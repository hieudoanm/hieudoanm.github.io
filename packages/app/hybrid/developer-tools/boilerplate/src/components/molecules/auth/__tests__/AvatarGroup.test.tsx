import { render, screen } from '@testing-library/react';
import { AvatarGroup } from '../AvatarGroup';

describe('AvatarGroup', () => {
  const avatars = [
    { alt: 'A', src: '/a.png' },
    { alt: 'B', src: '/b.png' },
    { alt: 'C', src: '/c.png' },
    { alt: 'D', src: '/d.png' },
  ];

  it('renders all avatars when no max', () => {
    render(<AvatarGroup avatars={avatars} />);
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  it('limits avatars and shows overflow count', () => {
    render(<AvatarGroup avatars={avatars} max={2} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByLabelText('2 more members')).toHaveTextContent('+2');
  });

  it('shows initials fallback for avatar without src', () => {
    render(<AvatarGroup avatars={[{ alt: 'Jane Doe' }]} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
