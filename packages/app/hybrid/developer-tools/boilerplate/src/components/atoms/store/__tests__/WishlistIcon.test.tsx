import { fireEvent, render, screen } from '@testing-library/react';
import { WishlistIcon } from '../WishlistIcon';

describe('WishlistIcon', () => {
  it('starts inactive by default', () => {
    render(<WishlistIcon />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles the active state on click', () => {
    render(<WishlistIcon active={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with the next value', () => {
    const onChange = jest.fn();
    render(<WishlistIcon active onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('uses a custom aria-label', () => {
    render(<WishlistIcon label="Add to wishlist" />);
    expect(
      screen.getByRole('button', { name: 'Add to wishlist' })
    ).toBeInTheDocument();
  });
});
