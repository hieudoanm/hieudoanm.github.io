import { fireEvent, render, screen } from '@testing-library/react';
import { LikeButton } from '../LikeButton';

describe('LikeButton', () => {
  it('renders the label and count', () => {
    render(<LikeButton count={5} label="Likes" />);
    expect(screen.getByText('Likes')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('toggles like state on click and bumps the count', () => {
    render(<LikeButton count={5} />);
    const button = screen.getByRole('button', { name: 'Likes' });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('calls onToggle with the new state', () => {
    const onToggle = jest.fn();
    render(<LikeButton count={1} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Likes' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('starts active when the active prop is true', () => {
    render(<LikeButton count={2} active />);
    expect(screen.getByRole('button', { name: 'Likes' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
