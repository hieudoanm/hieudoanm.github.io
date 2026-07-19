import { render, screen } from '@testing-library/react';
import { TrashIcon } from '../TrashIcon';

describe('TrashIcon', () => {
  it('renders an inline svg icon', () => {
    render(<TrashIcon />);
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<TrashIcon className="text-error" />);
    expect(screen.getByTestId('trash-icon')).toHaveClass('text-error');
  });

  it('respects the size prop', () => {
    render(<TrashIcon size={18} />);
    const icon = screen.getByTestId('trash-icon');
    expect(icon).toHaveAttribute('width', '18');
    expect(icon).toHaveAttribute('height', '18');
  });
});
