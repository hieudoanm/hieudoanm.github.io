import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignInPage from '../sign-in/page';
import SignUpPage from '../sign-up/page';
import ForgotPasswordPage from '../forgot-password/page';
import ResetPasswordPage from '../reset-password/page';
import AuthLoading from '../loading';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

const fillSignIn = (email: string, password: string) => {
  fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: password },
  });
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
};

describe('SignInPage', () => {
  it('redirects home on valid credentials', async () => {
    render(<SignInPage />);
    fillSignIn('demo@example.com', 'password');
    submitForm();
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'), {
      timeout: 3000,
    });
  });

  it('shows error on invalid credentials', async () => {
    render(<SignInPage />);
    fillSignIn('nope@example.com', 'wrong');
    submitForm();
    await waitFor(
      () =>
        expect(
          screen.getByText('Invalid email or password')
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});

describe('SignUpPage', () => {
  const fillSignUp = (email: string) => {
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText('At least 8 characters'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat your password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
  };

  it('redirects to sign-in after successful signup', async () => {
    render(<SignUpPage />);
    fillSignUp('new@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/sign-in'), {
      timeout: 3000,
    });
  });

  it('shows error for existing email', async () => {
    render(<SignUpPage />);
    fillSignUp('existing@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    await waitFor(
      () =>
        expect(
          screen.getByText('An account with this email already exists')
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
});

describe('ForgotPasswordPage', () => {
  it('shows success message after sending reset link', async () => {
    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send reset link' }));
    await waitFor(
      () => expect(screen.getByText('Check your email')).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });

  it('shows error for empty email', async () => {
    render(<ForgotPasswordPage />);
    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: '' },
    });
    fireEvent.submit(form);
    await waitFor(
      () =>
        expect(screen.getByText('Please enter your email')).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
});

describe('ResetPasswordPage', () => {
  it('shows success message after resetting password', async () => {
    render(<ResetPasswordPage />);
    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.change(
      screen.getAllByPlaceholderText('At least 8 characters')[0],
      { target: { value: 'NewPassword1' } }
    );
    fireEvent.change(screen.getByPlaceholderText('Repeat your new password'), {
      target: { value: 'NewPassword1' },
    });
    fireEvent.submit(form);
    await waitFor(
      () => expect(screen.getByText('Password reset')).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
});

describe('AuthLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<AuthLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
