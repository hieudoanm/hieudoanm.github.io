import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from '../Slider';

describe('Slider', () => {
  it('renders a range input with label and defaults', () => {
    render(<Slider label="Volume" value={50} onChange={jest.fn()} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('value', '50');
  });

  it('calls onChange with numeric value', () => {
    const onChange = jest.fn();
    render(<Slider label="Volume" value={50} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '80' } });
    expect(onChange).toHaveBeenCalledWith(80);
  });

  it('shows value and respects custom bounds', () => {
    render(
      <Slider
        label="Volume"
        value={5}
        onChange={jest.fn()}
        min={0}
        max={10}
        step={1}
        showValue
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('max', '10');
  });

  it('disables when disabled', () => {
    render(<Slider label="Volume" value={50} onChange={jest.fn()} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
