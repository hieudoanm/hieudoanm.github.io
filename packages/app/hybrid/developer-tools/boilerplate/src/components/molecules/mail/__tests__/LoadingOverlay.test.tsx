import { fireEvent, render, screen } from '@testing-library/react';
import { LoadingOverlay } from '../LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<LoadingOverlay open={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a status with the label when open', () => {
    render(<LoadingOverlay open label="Saving" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Saving')).toBeInTheDocument();
  });

  it('applies the requested variant', () => {
    const { container } = render(<LoadingOverlay open variant="dots" />);
    expect(container.querySelector('.loading-dots')).toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = jest.fn();
    render(<LoadingOverlay open label="Saving" onClose={onClose} />);
    fireEvent.click(screen.getByRole('status'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies the transparent style', () => {
    render(<LoadingOverlay open transparent />);
    expect(screen.getByRole('status')).toHaveClass('bg-base-content/20');
  });
});
