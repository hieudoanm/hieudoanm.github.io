import { fireEvent, render, screen } from '@testing-library/react';
import { CyclicNumber } from '../index';

describe('CyclicNumber', () => {
  it('renders the 142857 wheel and the default ×1 product', () => {
    render(<CyclicNumber />);
    expect(screen.getByRole('img', { name: '142857' })).toBeInTheDocument();
    expect(screen.getByText(/142857 × 1 =/)).toBeInTheDocument();
  });

  it('shows the ×2 rotation when the multiplier is increased', () => {
    render(<CyclicNumber />);
    fireEvent.click(screen.getByLabelText('Increase multiplier'));
    expect(screen.getByRole('img', { name: '285714' })).toBeInTheDocument();
    expect(screen.getByText(/142857 × 2 =/)).toBeInTheDocument();
    expect(screen.getByText(/rotated/)).toBeInTheDocument();
  });

  it('shows 999999 and the nines fact for ×7', () => {
    render(<CyclicNumber />);
    const input = screen.getByLabelText('Multiplier') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '7' } });
    expect(screen.getByRole('img', { name: '999999' })).toBeInTheDocument();
    expect(screen.getByText(/all nines/)).toBeInTheDocument();
  });

  it('clamps to 1 on decrease', () => {
    render(<CyclicNumber />);
    fireEvent.click(screen.getByLabelText('Decrease multiplier'));
    const input = screen.getByLabelText('Multiplier') as HTMLInputElement;
    expect(input.value).toBe('1');
  });

  it('clamps to the max multiplier on increase past the limit', () => {
    render(<CyclicNumber />);
    const input = screen.getByLabelText('Multiplier') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '999' } });
    expect(input.value).toBe('12');
  });
});
