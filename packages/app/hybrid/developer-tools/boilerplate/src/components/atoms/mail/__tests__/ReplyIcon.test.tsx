import { render, screen } from '@testing-library/react';
import { ReplyIcon } from '../ReplyIcon';

describe('ReplyIcon', () => {
  it('renders an inline svg icon', () => {
    render(<ReplyIcon />);
    expect(screen.getByTestId('reply-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<ReplyIcon className="text-primary" />);
    expect(screen.getByTestId('reply-icon')).toHaveClass('text-primary');
  });

  it('respects the size prop', () => {
    render(<ReplyIcon size={22} />);
    const icon = screen.getByTestId('reply-icon');
    expect(icon).toHaveAttribute('width', '22');
    expect(icon).toHaveAttribute('height', '22');
  });
});
