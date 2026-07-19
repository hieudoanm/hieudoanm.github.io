import { fireEvent, render, screen } from '@testing-library/react';
import { ShareIcon } from '../ShareIcon';

describe('ShareIcon', () => {
  it('renders a share button with default label', () => {
    render(<ShareIcon />);
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<ShareIcon label="Repost" />);
    expect(screen.getByRole('button', { name: 'Repost' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<ShareIcon onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
