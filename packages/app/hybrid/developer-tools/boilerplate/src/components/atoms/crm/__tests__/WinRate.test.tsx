import { render, screen } from '@testing-library/react';
import { WinRate } from '../WinRate';

describe('WinRate', () => {
  it('renders the rate as a percentage', () => {
    render(<WinRate rate={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('clamps the rate above 100', () => {
    render(<WinRate rate={120} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('clamps the rate below 0', () => {
    render(<WinRate rate={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('reflects the clamped value on the progress bar', () => {
    render(<WinRate rate={40} />);
    const progress = document.querySelector('progress');
    expect(progress).toHaveAttribute('value', '40');
    expect(progress).toHaveAttribute('max', '100');
  });
});
