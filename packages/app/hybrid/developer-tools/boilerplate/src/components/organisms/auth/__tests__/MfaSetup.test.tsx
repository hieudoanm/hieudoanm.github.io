import { fireEvent, render, screen } from '@testing-library/react';
import { MfaSetup } from '../MfaSetup';

describe('MfaSetup', () => {
  it('renders the secret and a QR placeholder', () => {
    render(<MfaSetup secret="JBSWY3DPEHPK3PXP" />);
    expect(screen.getByTestId('mfa-qr')).toBeInTheDocument();
    expect(screen.getByText('JBSWY3DPEHPK3PXP')).toBeInTheDocument();
  });

  it('advances to the verify step', () => {
    render(<MfaSetup onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByTestId('mfa-continue'));
    expect(
      screen.getByRole('textbox', { name: 'Verification code' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Activate' })
    ).toBeInTheDocument();
  });

  it('submits the verification code', () => {
    const onSubmit = jest.fn();
    render(<MfaSetup onSubmit={onSubmit} />);
    fireEvent.click(screen.getByTestId('mfa-continue'));
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Verification code' }),
      {
        target: { value: '123456' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Activate' }));
    expect(onSubmit).toHaveBeenCalledWith('123456');
  });

  it('goes back to the scan step', () => {
    render(<MfaSetup onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByTestId('mfa-continue'));
    fireEvent.click(screen.getByTestId('mfa-back'));
    expect(screen.getByTestId('mfa-continue')).toBeInTheDocument();
  });
});
