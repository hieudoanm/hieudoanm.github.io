import { fireEvent, render, screen } from '@testing-library/react';
import { ResultsStep } from '../ResultsStep';
import { BDI_ITEMS } from '../../utils';

describe('ResultsStep', () => {
  const argmaxSelected = BDI_ITEMS.map(
    (item) =>
      item.options.reduce(
        (best, option, index) =>
          option.value > best.value ? { value: option.value, index } : best,
        { value: -1, index: 0 }
      ).index
  );

  it('shows the total score out of 63', () => {
    render(<ResultsStep selected={argmaxSelected} onReset={jest.fn()} />);
    expect(screen.getByText(/\/ 63/)).toBeInTheDocument();
  });

  it('flags suicidal ideation with a crisis notice', () => {
    const selected = [...argmaxSelected];
    selected[8] = 1;
    render(<ResultsStep selected={selected} onReset={jest.fn()} />);
    expect(screen.getByText(/988/)).toBeInTheDocument();
  });
});
