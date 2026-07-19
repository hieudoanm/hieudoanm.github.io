import { fireEvent, render, screen } from '@testing-library/react';
import { LikeButton } from '../LikeButton';

describe('LikeButton', () => {
  it('renders like count', () => {
    render(<LikeButton count={5} />);
    expect(screen.getByTestId('like-button')).toHaveTextContent('5');
  });

  it('renders as unliked by default', () => {
    render(<LikeButton count={5} />);
    expect(screen.getByTestId('like-button')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('toggles state on click and calls onToggle', () => {
    const onToggle = jest.fn();
    render(<LikeButton count={5} onToggle={onToggle} />);
    const button = screen.getByTestId('like-button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders active state when liked initially', () => {
    render(<LikeButton liked count={5} />);
    const button = screen.getByTestId('like-button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveTextContent('6');
  });
});
