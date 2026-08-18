import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/atoms/Avatar';

describe('Avatar', () => {
  it('renders initials for a user', () => {
    render(<Avatar name="Alice Nguyen" color="#4da3ff" />);
    expect(screen.getByText('AN')).toBeInTheDocument();
  });

  it('renders a group icon for groups', () => {
    const { container } = render(
      <Avatar name="Team" color="#000" kind="group" />
    );
    expect(screen.queryByText('TE')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a single initial for a single-word name', () => {
    render(<Avatar name="alice" color="#4da3ff" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows an online status dot when online is set', () => {
    render(<Avatar name="Alice" color="#4da3ff" online />);
    expect(screen.getByLabelText('online')).toBeInTheDocument();
  });

  it('shows an offline status dot when online is false', () => {
    render(<Avatar name="Alice" color="#4da3ff" online={false} />);
    expect(screen.getByLabelText('offline')).toBeInTheDocument();
  });

  it('omits the status dot when online is not provided', () => {
    render(<Avatar name="Alice" color="#4da3ff" />);
    expect(screen.queryByLabelText('online')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('offline')).not.toBeInTheDocument();
  });
});
