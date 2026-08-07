import { fireEvent, render, screen } from '@testing-library/react';
import { NumberInput } from '../NumberInput';

describe('NumberInput', () => {
  it('renders the label and value', () => {
    render(<NumberInput label="Quantity" value={4} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Quantity')).toHaveValue(4);
  });

  it('calls onChange with a clamped minimum', () => {
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" value={10} min={5} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '3' },
    });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('calls onChange with a clamped maximum', () => {
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" value={1} max={5} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '9' },
    });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('uses the minimum when the field is cleared', () => {
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" value={10} min={5} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('shows the hint when there is no message', () => {
    render(
      <NumberInput
        label="Quantity"
        value={4}
        onChange={jest.fn()}
        hint="Whole numbers"
      />
    );
    expect(screen.getByText('Whole numbers')).toBeInTheDocument();
  });

  it('shows an external error', () => {
    render(
      <NumberInput
        label="Quantity"
        value={4}
        onChange={jest.fn()}
        error="Too low"
      />
    );
    expect(screen.getByText('Too low')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('shows an out-of-range message when no error is provided', () => {
    render(
      <NumberInput label="Quantity" value={15} max={10} onChange={jest.fn()} />
    );
    expect(screen.getByText('Out of range (any to 10)')).toBeInTheDocument();
  });

  it('disables the input', () => {
    render(
      <NumberInput label="Quantity" value={4} onChange={jest.fn()} disabled />
    );
    expect(screen.getByLabelText('Quantity')).toBeDisabled();
  });
});
