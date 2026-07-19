import { fireEvent, render, screen } from '@testing-library/react';
import { OtpVerify } from '../OtpVerify';

describe('OtpVerify', () => {
  it('renders the digit inputs', () => {
    render(<OtpVerify onSubmit={jest.fn()} />);
    for (let i = 1; i <= 6; i += 1) {
      expect(
        screen.getByRole('textbox', { name: `Digit ${i}` })
      ).toBeInTheDocument();
    }
  });

  it('submits the full code', () => {
    const onSubmit = jest.fn();
    render(<OtpVerify onSubmit={onSubmit} />);
    for (let i = 1; i <= 6; i += 1) {
      fireEvent.change(screen.getByRole('textbox', { name: `Digit ${i}` }), {
        target: { value: String(i) },
      });
    }
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(onSubmit).toHaveBeenCalledWith('123456');
  });

  it('keeps submit disabled until the code is complete', () => {
    render(<OtpVerify onSubmit={jest.fn()} />);
    expect(screen.getByTestId('otp-submit')).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox', { name: 'Digit 1' }), {
      target: { value: '1' },
    });
    expect(screen.getByTestId('otp-submit')).toBeDisabled();
  });

  it('fires onResend', () => {
    const onResend = jest.fn();
    render(<OtpVerify onSubmit={jest.fn()} onResend={onResend} />);
    fireEvent.click(screen.getByTestId('otp-resend'));
    expect(onResend).toHaveBeenCalled();
  });
});
