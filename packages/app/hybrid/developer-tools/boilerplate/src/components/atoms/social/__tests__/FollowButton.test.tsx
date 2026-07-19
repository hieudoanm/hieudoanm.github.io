import { fireEvent, render, screen } from '@testing-library/react';
import { FollowButton } from '../FollowButton';

describe('FollowButton', () => {
  it('renders follow label by default', () => {
    render(<FollowButton />);
    const button = screen.getByTestId('follow-button');
    expect(button).toHaveTextContent('Follow');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders following state when following', () => {
    render(<FollowButton following />);
    const button = screen.getByTestId('follow-button');
    expect(button).toHaveTextContent('Following');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('toggles state on click and calls onToggle', () => {
    const onToggle = jest.fn();
    render(<FollowButton onToggle={onToggle} />);
    const button = screen.getByTestId('follow-button');
    fireEvent.click(button);
    expect(button).toHaveTextContent('Following');
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders custom labels', () => {
    render(<FollowButton label="Subscribe" followingLabel="Subscribed" />);
    expect(screen.getByTestId('follow-button')).toHaveTextContent('Subscribe');
  });
});
