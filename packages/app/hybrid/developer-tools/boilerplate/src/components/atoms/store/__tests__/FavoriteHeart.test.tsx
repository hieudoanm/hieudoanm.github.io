import { fireEvent, render, screen } from '@testing-library/react';
import { FavoriteHeart } from '../FavoriteHeart';

describe('FavoriteHeart', () => {
  it('starts inactive by default', () => {
    render(<FavoriteHeart />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles the active state on click', () => {
    render(<FavoriteHeart active={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with the next value', () => {
    const onChange = jest.fn();
    render(<FavoriteHeart active onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('uses a custom aria-label', () => {
    render(<FavoriteHeart label="Add to favorites" />);
    expect(
      screen.getByRole('button', { name: 'Add to favorites' })
    ).toBeInTheDocument();
  });
});
