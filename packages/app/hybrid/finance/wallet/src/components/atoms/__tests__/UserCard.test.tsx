import { render, screen } from '@testing-library/react';
import UserCard from '../UserCard';
import type { User } from '@/types';

const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'http://example.com/avatar.jpg',
  phone: '1234567890',
  country: 'USA',
  timezone: 'UTC-5',
  currency: 'USD',
};

describe('UserCard', () => {
  it('renders user name', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  });

  it('renders user email', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('alex@example.com')).toBeInTheDocument();
  });
});
