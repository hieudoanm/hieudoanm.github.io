import { fireEvent, render, screen } from '@testing-library/react';
import { PasswordResetTemplate } from '../PasswordResetTemplate';

describe('PasswordResetTemplate (request)', () => {
  it('submits email', () => {
    const onSubmit = jest.fn();
    render(<PasswordResetTemplate mode="request" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(onSubmit).toHaveBeenCalledWith('user@test.com');
  });

  it('displays error and loading state', () => {
    render(
      <PasswordResetTemplate
        mode="request"
        onSubmit={jest.fn()}
        error="No account found"
        loading
      />
    );
    expect(screen.getByText('No account found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  it('shows success message with email', () => {
    const { rerender } = render(
      <PasswordResetTemplate mode="request" onSubmit={jest.fn()} />
    );
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.submit(document.querySelector('form')!);
    rerender(
      <PasswordResetTemplate mode="request" onSubmit={jest.fn()} success />
    );
    expect(screen.getByText('Check your email')).toBeInTheDocument();
    expect(screen.getByText('user@test.com')).toBeInTheDocument();
  });

  it('links back to sign in', () => {
    render(<PasswordResetTemplate mode="request" onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('link', { name: /Back to sign in/ })
    ).toHaveAttribute('href', '/auth/sign-in');
  });
});

describe('PasswordResetTemplate (confirm)', () => {
  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'Password1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your new password'), {
      target: { value: 'Password1' },
    });
    fireEvent.submit(document.querySelector('form')!);
  };

  it('submits valid password', () => {
    const onSubmit = jest.fn();
    render(<PasswordResetTemplate mode="confirm" onSubmit={onSubmit} />);
    fillForm();
    expect(onSubmit).toHaveBeenCalledWith('Password1');
  });

  it('rejects mismatched passwords', () => {
    const onSubmit = jest.fn();
    render(<PasswordResetTemplate mode="confirm" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'Password1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your new password'), {
      target: { value: 'Password2' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects short passwords', () => {
    const onSubmit = jest.fn();
    render(<PasswordResetTemplate mode="confirm" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your new password'), {
      target: { value: 'short' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(
      screen.getByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('marks requirements as met when password is strong', () => {
    render(<PasswordResetTemplate mode="confirm" onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('At least 8 characters');
    fireEvent.change(input, { target: { value: 'Password1' } });
    expect(screen.getAllByText('✓').length).toBe(4);
  });

  it('marks requirements as unmet with empty password', () => {
    render(<PasswordResetTemplate mode="confirm" onSubmit={jest.fn()} />);
    expect(screen.getAllByText('○').length).toBe(4);
  });

  it('displays error and success states', () => {
    const { unmount } = render(
      <PasswordResetTemplate
        mode="confirm"
        onSubmit={jest.fn()}
        error="Invalid token"
      />
    );
    expect(screen.getByText('Invalid token')).toBeInTheDocument();
    unmount();
    render(
      <PasswordResetTemplate mode="confirm" onSubmit={jest.fn()} success />
    );
    expect(screen.getByText('Password reset')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<PasswordResetTemplate mode="confirm" onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('At least 8 characters');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(input).toHaveAttribute('type', 'text');
  });
});
