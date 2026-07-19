import { render, screen } from '@testing-library/react';
import { ComposeIcon } from '../ComposeIcon';

describe('ComposeIcon', () => {
  it('renders an inline svg icon', () => {
    render(<ComposeIcon />);
    expect(screen.getByTestId('compose-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<ComposeIcon className="text-primary" />);
    expect(screen.getByTestId('compose-icon')).toHaveClass('text-primary');
  });

  it('respects the size prop', () => {
    render(<ComposeIcon size={20} />);
    const icon = screen.getByTestId('compose-icon');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });
});
