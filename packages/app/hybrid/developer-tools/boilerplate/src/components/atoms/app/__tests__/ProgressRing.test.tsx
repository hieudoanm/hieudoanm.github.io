import { render, screen } from '@testing-library/react';
import { ProgressRing } from '../ProgressRing';

describe('ProgressRing', () => {
  it('renders a progressbar with the clamped value', () => {
    render(<ProgressRing value={42} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
  });

  it('clamps out-of-range values', () => {
    const { rerender } = render(<ProgressRing value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100'
    );
    rerender(<ProgressRing value={-5} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0'
    );
  });

  it('shows the percentage when requested', () => {
    render(<ProgressRing value={75} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
