import { render, screen } from '@testing-library/react';
import { SentIcon } from '../SentIcon';

describe('SentIcon', () => {
  it('renders an inline svg icon', () => {
    render(<SentIcon />);
    expect(screen.getByTestId('sent-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<SentIcon className="text-primary" />);
    expect(screen.getByTestId('sent-icon')).toHaveClass('text-primary');
  });

  it('respects the size prop', () => {
    render(<SentIcon size={20} />);
    const icon = screen.getByTestId('sent-icon');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });
});
