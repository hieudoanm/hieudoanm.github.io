import { render, screen } from '@testing-library/react';
import { Gauge } from '../Gauge';

describe('Gauge', () => {
  it('renders a progressbar with the value', () => {
    render(<Gauge value={75} label="Health" />);
    const gauge = screen.getByRole('progressbar', { name: 'Health' });
    expect(gauge).toHaveAttribute('aria-valuenow', '75');
    expect(gauge).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('clamps values outside the range', () => {
    render(<Gauge value={120} />);
    expect(screen.getByRole('progressbar', { name: 'Gauge' })).toHaveAttribute(
      'aria-valuenow',
      '100'
    );
  });

  it('shows the percentage when requested', () => {
    render(<Gauge value={50} showValue />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('applies a custom variant class', () => {
    const { container } = render(<Gauge value={10} variant="success" />);
    expect(container.querySelector('.radial-progress')).toHaveClass(
      'text-success'
    );
  });
});
