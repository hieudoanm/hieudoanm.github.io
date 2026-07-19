import { fireEvent, render, screen } from '@testing-library/react';
import { ColorPicker } from '../ColorPicker';

describe('ColorPicker', () => {
  it('renders swatches and the hex input', () => {
    render(
      <ColorPicker value="#3b82f6" onChange={jest.fn()} label="Primary" />
    );
    expect(
      screen.getByRole('button', { name: 'Pick #3b82f6' })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('textbox', { name: 'Primary hex value' })
    ).toHaveValue('#3b82f6');
  });

  it('calls onChange when a swatch is picked', () => {
    const onChange = jest.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pick #10b981' }));
    expect(onChange).toHaveBeenCalledWith('#10b981');
  });

  it('commits a valid hex from the input on Enter', () => {
    const onChange = jest.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Color hex value' });
    fireEvent.change(input, { target: { value: 'FF0000' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('reverts invalid hex on blur', () => {
    const onChange = jest.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Color hex value' });
    fireEvent.change(input, { target: { value: 'not-a-color' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('#000000');
    expect(onChange).not.toHaveBeenCalled();
  });
});
