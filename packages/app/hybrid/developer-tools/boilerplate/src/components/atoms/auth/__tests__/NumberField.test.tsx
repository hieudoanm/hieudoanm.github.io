import { fireEvent, render, screen } from '@testing-library/react';
import { NumberField } from '../NumberField';

describe('NumberField', () => {
  it('renders label and value', () => {
    render(<NumberField label="Quantity" value={2} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Quantity')).toHaveValue(2);
  });

  it('increments and decrements via buttons', () => {
    const onChange = jest.fn();
    render(<NumberField label="Quantity" value={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase Quantity' }));
    expect(onChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Quantity' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('clamps to min and max', () => {
    const onChange = jest.fn();
    render(
      <NumberField label="Qty" value={5} min={0} max={5} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase Qty' }));
    expect(onChange).toHaveBeenCalledWith(5);
    fireEvent.change(screen.getByLabelText('Qty'), { target: { value: '3' } });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('disables buttons and input when disabled', () => {
    render(<NumberField label="Qty" value={1} onChange={jest.fn()} disabled />);
    expect(screen.getByLabelText('Qty')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase Qty' })).toBeDisabled();
  });
});
