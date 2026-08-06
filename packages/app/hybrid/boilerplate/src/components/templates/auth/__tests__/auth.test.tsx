import { fireEvent, render, screen } from '@testing-library/react';
import { AuthLoadingTemplate } from '../AuthLoadingTemplate';
import { ForgetPassword } from '../ForgetPassword';
import { ResetPassword } from '../ResetPassword';
import { SignInTemplate } from '../SignInTemplate';
import { SignUpTemplate } from '../SignUpTemplate';

describe('AuthLoadingTemplate', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<AuthLoadingTemplate />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});

describe('SignInTemplate', () => {
  it('renders header and form', () => {
    render(<SignInTemplate onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<SignInTemplate onSubmit={jest.fn()} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('submits email and password', () => {
    const onSubmit = jest.fn();
    render(<SignInTemplate onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'secret123' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'secret123',
    });
  });

  it('toggles password visibility', () => {
    render(<SignInTemplate onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('Enter your password');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(input).toHaveAttribute('type', 'text');
  });

  it('shows loading state and disables submit', () => {
    render(<SignInTemplate onSubmit={jest.fn()} loading />);
    const button = screen.getByRole('button', { name: 'Signing in...' });
    expect(button).toBeDisabled();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('provides links to forgot-password and sign-up', () => {
    render(<SignInTemplate onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('link', { name: 'Forgot password?' })
    ).toHaveAttribute('href', '/forgot-password');
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/sign-up'
    );
  });
});

describe('SignUpTemplate', () => {
  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'password123' },
    });
    fireEvent.submit(document.querySelector('form')!);
  };

  it('submits valid data', () => {
    const onSubmit = jest.fn();
    render(<SignUpTemplate onSubmit={onSubmit} />);
    fillForm();
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@test.com',
      password: 'password123',
    });
  });

  it('rejects mismatched passwords', () => {
    const onSubmit = jest.fn();
    render(<SignUpTemplate onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'different' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects short passwords', () => {
    const onSubmit = jest.fn();
    render(<SignUpTemplate onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'short' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(
      screen.getByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('displays prop error and shows loading state', () => {
    render(<SignUpTemplate onSubmit={jest.fn()} error="Email taken" loading />);
    expect(screen.getByText('Email taken')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Creating account...' })
    ).toBeDisabled();
  });

  it('toggles password visibility', () => {
    render(<SignUpTemplate onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('At least 8 characters');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(input).toHaveAttribute('type', 'text');
  });

  it('links to sign-in', () => {
    render(<SignUpTemplate onSubmit={jest.fn()} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/sign-in'
    );
  });
});

describe('ForgetPassword', () => {
  it('submits email', () => {
    const onSubmit = jest.fn();
    render(<ForgetPassword onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(onSubmit).toHaveBeenCalledWith('user@test.com');
  });

  it('displays error and loading state', () => {
    render(
      <ForgetPassword onSubmit={jest.fn()} error="No account found" loading />
    );
    expect(screen.getByText('No account found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  it('shows success message with email', () => {
    const { rerender } = render(<ForgetPassword onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.submit(document.querySelector('form')!);
    rerender(<ForgetPassword onSubmit={jest.fn()} success />);
    expect(screen.getByText('Check your email')).toBeInTheDocument();
    expect(screen.getByText('user@test.com')).toBeInTheDocument();
  });

  it('links back to sign in', () => {
    render(<ForgetPassword onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('link', { name: /Back to sign in/ })
    ).toHaveAttribute('href', '/sign-in');
  });
});

describe('ResetPassword', () => {
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
    render(<ResetPassword onSubmit={onSubmit} />);
    fillForm();
    expect(onSubmit).toHaveBeenCalledWith('Password1');
  });

  it('rejects mismatched passwords', () => {
    const onSubmit = jest.fn();
    render(<ResetPassword onSubmit={onSubmit} />);
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
    render(<ResetPassword onSubmit={onSubmit} />);
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
    render(<ResetPassword onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('At least 8 characters');
    fireEvent.change(input, { target: { value: 'Password1' } });
    expect(screen.getAllByText('✓').length).toBe(4);
  });

  it('marks requirements as unmet with empty password', () => {
    render(<ResetPassword onSubmit={jest.fn()} />);
    expect(screen.getAllByText('○').length).toBe(4);
  });

  it('displays error and success states', () => {
    const { unmount } = render(
      <ResetPassword onSubmit={jest.fn()} error="Invalid token" />
    );
    expect(screen.getByText('Invalid token')).toBeInTheDocument();
    unmount();
    render(<ResetPassword onSubmit={jest.fn()} success />);
    expect(screen.getByText('Password reset')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<ResetPassword onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('At least 8 characters');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(input).toHaveAttribute('type', 'text');
  });
});
