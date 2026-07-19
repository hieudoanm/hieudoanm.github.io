import { render, screen } from '@testing-library/react';
import { SpamIcon } from '../SpamIcon';

describe('SpamIcon', () => {
  it('renders an inline svg icon', () => {
    render(<SpamIcon />);
    expect(screen.getByTestId('spam-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<SpamIcon className="text-error" />);
    expect(screen.getByTestId('spam-icon')).toHaveClass('text-error');
  });

  it('respects the size prop', () => {
    render(<SpamIcon size={24} />);
    const icon = screen.getByTestId('spam-icon');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });
});
