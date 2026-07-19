import { fireEvent, render, screen } from '@testing-library/react';
import { FriendRequest } from '../FriendRequest';

describe('FriendRequest', () => {
  it('renders the name and mutual friends', () => {
    render(<FriendRequest name="Minh Le" mutual={8} />);
    expect(screen.getByText('Minh Le')).toBeInTheDocument();
    expect(screen.getByText('8 mutual friends')).toBeInTheDocument();
  });

  it('renders accept and decline buttons', () => {
    render(<FriendRequest name="Minh Le" />);
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('calls onAccept when accept is clicked', () => {
    const onAccept = jest.fn();
    render(<FriendRequest name="Minh Le" onAccept={onAccept} />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('calls onDecline when decline is clicked', () => {
    const onDecline = jest.fn();
    render(<FriendRequest name="Minh Le" onDecline={onDecline} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});
