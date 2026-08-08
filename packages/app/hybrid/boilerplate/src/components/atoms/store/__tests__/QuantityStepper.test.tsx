import { fireEvent, render, screen } from '@testing-library/react';
import { QuantityStepper } from '../QuantityStepper';

describe('QuantityStepper', () => {
  it('displays the current value', () => {
    render(<QuantityStepper value={3} onChange={jest.fn()} />);
    expect(screen.getByTestId('quantity-value')).toHaveTextContent('3');
  });

  it('increments the value', () => {
    const onChange = jest.fn();
    render(<QuantityStepper value={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('decrements the value', () => {
    const onChange = jest.fn();
    render(<QuantityStepper value={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('clamps to the max boundary', () => {
    const onChange = jest.fn();
    render(<QuantityStepper value={5} max={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('clamps to the min boundary', () => {
    const onChange = jest.fn();
    render(<QuantityStepper value={1} min={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
