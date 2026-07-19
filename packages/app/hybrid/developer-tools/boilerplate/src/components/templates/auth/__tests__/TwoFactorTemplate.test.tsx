import { fireEvent, render, screen } from '@testing-library/react';
import TwoFactorPage from '@/app/(templates)/auth/two-factor/page';
import { TwoFactorTemplate } from '../TwoFactorTemplate';

describe('TwoFactorTemplate', () => {
  it('renders the code entry form', () => {
    render(<TwoFactorTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Enter your code' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('123456')).toBeInTheDocument();
    expect(
      screen.getByText('Your code expires in 5 minutes.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Resend code' })
    ).toBeInTheDocument();
  });

  it('shows an error for a short code', () => {
    render(<TwoFactorTemplate />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(screen.getByText('Code must be 6 digits')).toBeInTheDocument();
  });

  it('shows an error for a long code', () => {
    render(<TwoFactorTemplate />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '1234567' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(screen.getByText('Code must be 6 digits')).toBeInTheDocument();
  });

  it('shows the success state for a valid code', () => {
    render(<TwoFactorTemplate />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(
      screen.getByRole('heading', { name: 'Two-factor authentication enabled' })
    ).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('toggles the resend confirmation', () => {
    render(<TwoFactorTemplate />);
    const resend = screen.getByRole('button', { name: 'Resend code' });
    fireEvent.click(resend);
    expect(
      screen.getByText('A new code was sent to your device')
    ).toBeInTheDocument();
    fireEvent.click(resend);
    expect(
      screen.queryByText('A new code was sent to your device')
    ).not.toBeInTheDocument();
  });

  it('renders the TwoFactorPage', () => {
    render(<TwoFactorPage />);
    expect(
      screen.getByRole('heading', { name: 'Enter your code' })
    ).toBeInTheDocument();
  });
});
