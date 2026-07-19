import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUpPage from '@/app/(templates)/auth/sign-up/page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

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

describe('SignUpPage', () => {
  it('redirects to sign-in after successful signup', async () => {
    render(<SignUpPage />);
    fillSignUp('new@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    await waitFor(
      () => expect(mockPush).toHaveBeenCalledWith('/auth/sign-in'),
      {
        timeout: 3000,
      }
    );
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
