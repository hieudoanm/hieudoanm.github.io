import { render, screen } from '@testing-library/react';
import { Progress } from '../Progress';

describe('Progress', () => {
  it('renders a progress element with value and max', () => {
    render(<Progress value={50} max={100} />);
    const bar = screen.getByRole('progressbar', { name: 'Progress' });
    expect(bar).toHaveAttribute('value', '50');
    expect(bar).toHaveAttribute('max', '100');
  });

  it('clamps value into range', () => {
    render(<Progress value={150} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '100');
  });

  it('falls back to 100 when max is invalid', () => {
    render(<Progress value={10} max={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('max', '100');
  });

  it('shows label and percentage when requested', () => {
    render(<Progress value={25} label="Disk" showValue />);
    expect(screen.getByText('Disk')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Progress value={10} variant="success" size="sm" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveClass('progress-success', 'h-1');
  });
});
