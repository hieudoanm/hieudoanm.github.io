import { render, screen } from '@testing-library/react';
import { AttachmentIcon } from '../AttachmentIcon';

describe('AttachmentIcon', () => {
  it('renders an inline svg icon', () => {
    render(<AttachmentIcon />);
    expect(screen.getByTestId('attachment-icon')).toBeInTheDocument();
  });

  it('applies the custom className', () => {
    render(<AttachmentIcon className="text-primary" />);
    expect(screen.getByTestId('attachment-icon')).toHaveClass('text-primary');
  });

  it('respects the size prop', () => {
    render(<AttachmentIcon size={24} />);
    const icon = screen.getByTestId('attachment-icon');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });
});
