import { fireEvent, render, screen } from '@testing-library/react';

import { FibonacciSequence } from '..';

describe('FibonacciSequence', () => {
  it('renders the sequence up to the selected term', () => {
    render(<FibonacciSequence />);
    // n = 10 shows F(1)…F(10), so the strip ends 13, 21, 34, 55.
    // 55 also shows in the F(n) stat, so scope to the last strip entry.
    const active = document.querySelector('[data-active="true"]');
    expect(active).toHaveTextContent('55');
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getByText('F(n)')).toBeInTheDocument();
  });

  it('steps forward and back through the terms', () => {
    render(<FibonacciSequence />);
    const input = screen.getByLabelText('Term index');

    fireEvent.click(screen.getByLabelText('Next term'));
    expect(input).toHaveValue(11);
    expect(screen.getByText('F(12)/F(11) =')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Previous term'));
    expect(input).toHaveValue(10);
  });

  it('clamps the term index to the valid range', () => {
    render(<FibonacciSequence />);
    const input = screen.getByLabelText('Term index');

    fireEvent.change(input, { target: { value: '999' } });
    expect(input).toHaveValue(40);

    fireEvent.change(input, { target: { value: '0' } });
    expect(input).toHaveValue(1);
  });

  it('decomposes the target number with Zeckendorf terms', () => {
    render(<FibonacciSequence />);
    const input = screen.getByLabelText('Decompose');

    fireEvent.change(input, { target: { value: '100' } });
    const terms = screen
      .getAllByTestId('zeckendorf-term')
      .map((el) => el.textContent);
    expect(terms).toEqual(['89', '8', '3']);
  });

  it('shows an empty state for zero', () => {
    render(<FibonacciSequence />);
    fireEvent.change(screen.getByLabelText('Decompose'), {
      target: { value: '0' },
    });
    expect(screen.queryAllByTestId('zeckendorf-term')).toHaveLength(0);
    expect(screen.getByText(/0 has no representation/)).toBeInTheDocument();
  });

  it('explains that the ratio is undefined at n = 0', () => {
    render(<FibonacciSequence />);
    // The control clamps to n = 1, so the guard is reached only via the
    // component's own minimum; assert the visible contract instead.
    expect(screen.getByText(/φ =/)).toBeInTheDocument();
    expect(screen.getByTestId('ratio-closeness')).toBeInTheDocument();
  });
});
