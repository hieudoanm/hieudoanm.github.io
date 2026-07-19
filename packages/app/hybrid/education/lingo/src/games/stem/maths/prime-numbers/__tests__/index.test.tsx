import { fireEvent, render, screen } from '@testing-library/react';

import { PrimeNumbers } from '..';

describe('PrimeNumbers', () => {
  it('renders the sieve grid with primes and crossed composites', () => {
    render(<PrimeNumbers />);
    const grid = screen.getByRole('img', { name: /Sieve of Eratosthenes/ });
    expect(grid).toBeInTheDocument();

    const four = screen.getByText('4');
    expect(four).toHaveAttribute('data-prime', 'false');
    const eleven = screen.getByText('11');
    expect(eleven).toHaveAttribute('data-prime', 'true');
  });

  it('summarises the prime and composite counts', () => {
    render(<PrimeNumbers />);
    expect(screen.getByText('Primes')).toBeInTheDocument();
    expect(screen.getByText('Composites')).toBeInTheDocument();
    expect(screen.getByText('Density')).toBeInTheDocument();
    expect(screen.getByText('Largest gap')).toBeInTheDocument();
  });

  it('clamps the sieve limit to the valid range', () => {
    render(<PrimeNumbers />);
    const input = screen.getByLabelText('Sieve up to');

    fireEvent.change(input, { target: { value: '9999' } });
    expect(input).toHaveValue(300);

    fireEvent.change(input, { target: { value: '0' } });
    expect(input).toHaveValue(10);
  });

  it('shows the square-root bound for the probe number', () => {
    render(<PrimeNumbers />);
    fireEvent.change(screen.getByLabelText('Test'), {
      target: { value: '100' },
    });
    expect(screen.getByText(/√100 ≈ 10/)).toBeInTheDocument();
    expect(screen.getByTestId('perfect-square-note')).toHaveTextContent(
      'a perfect square'
    );
  });

  it('omits the perfect-square note for a non-square probe', () => {
    render(<PrimeNumbers />);
    fireEvent.change(screen.getByLabelText('Test'), {
      target: { value: '101' },
    });
    expect(screen.getByText(/√101 ≈ 10/)).toBeInTheDocument();
    expect(screen.queryByTestId('perfect-square-note')).not.toBeInTheDocument();
  });

  it('lists twin prime pairs', () => {
    render(<PrimeNumbers />);
    const twins = screen.getAllByTestId('twin-prime');
    expect(twins.length).toBeGreaterThan(0);
    expect(twins[0]).toHaveTextContent('3 · 5');
  });
});
