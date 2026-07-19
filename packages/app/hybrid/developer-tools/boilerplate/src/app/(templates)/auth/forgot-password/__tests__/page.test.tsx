import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ForgotPasswordPage from '@/app/(templates)/auth/forgot-password/page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
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
