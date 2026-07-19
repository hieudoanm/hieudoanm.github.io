import { fireEvent, render, screen } from '@testing-library/react';
import { OTPInput } from '../OTPInput';

describe('OTPInput', () => {
  it('renders the expected number of digit boxes', () => {
    render(<OTPInput value="12" onChange={jest.fn()} length={4} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'One-time code' })
    ).toBeInTheDocument();
  });

  it('filters non-digits and calls onChange', () => {
    const onChange = jest.fn();
    render(<OTPInput value="" onChange={onChange} length={6} />);
    const input = screen.getByRole('textbox', { name: 'One-time code' });
    fireEvent.change(input, { target: { value: 'a1b2c3d4' } });
    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('uses the label as accessible name', () => {
    render(
      <OTPInput label="Verification code" value="" onChange={jest.fn()} />
    );
    expect(
      screen.getByRole('textbox', { name: 'Verification code' })
    ).toBeInTheDocument();
  });
});
