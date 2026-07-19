import { fireEvent, render, screen } from '@testing-library/react';
import { PasswordReset } from '../PasswordReset';

describe('PasswordReset', () => {
  it('to match snapshot', () => {
    const { container } = render(<PasswordReset />);
    expect(container).toMatchSnapshot();
  });

  it('shows invalid link state when no token is present', () => {
    render(<PasswordReset />);
    expect(screen.getByText(/invalid reset link/i)).toBeInTheDocument();
    expect(screen.getByText(/expired/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /back to sign in/i })
    ).toBeInTheDocument();
  });

  it('shows reset form when token is in URL', () => {
    render(<PasswordReset token="abc123" />);
    expect(screen.getByText(/choose a new password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/8 characters/)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/repeat your password/i)
    ).toBeInTheDocument();
  });

  it('shows error when password is too short', () => {
    render(<PasswordReset token="abc123" />);
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it('shows error when passwords do not match', () => {
    render(<PasswordReset token="abc123" />);
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat your password/i), {
      target: { value: 'differentpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(screen.getByText(/do not match/i)).toBeInTheDocument();
  });

  it('shows success state after valid submission', async () => {
    render(<PasswordReset token="abc123" onSuccess={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat your password/i), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(screen.getByText(/resetting/i)).toBeInTheDocument();
    await screen.findByText(/password updated/i, {}, { timeout: 5000 });
    expect(
      screen.getByRole('button', { name: /sign in with new password/i })
    ).toBeInTheDocument();
  });

  it('calls onSuccess after password reset', async () => {
    const onSuccess = jest.fn();
    render(<PasswordReset token="abc123" onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/8 characters/), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat your password/i), {
      target: { value: 'longenoughpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    await screen.findByText(/password updated/i, {}, { timeout: 5000 });
    fireEvent.click(
      screen.getByRole('button', { name: /sign in with new password/i })
    );
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('toggles password visibility', () => {
    render(<PasswordReset token="abc123" />);
    const passwordInput = screen.getByPlaceholderText(/8 characters/);
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: /🙈|👁/i }));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('calls onBackToSignIn from invalid link state', () => {
    const onClick = jest.fn();
    render(<PasswordReset onBackToSignIn={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /back to sign in/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
