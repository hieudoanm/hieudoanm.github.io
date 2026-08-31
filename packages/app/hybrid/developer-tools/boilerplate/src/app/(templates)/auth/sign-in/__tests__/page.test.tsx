import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignInPage from '@/app/(templates)/auth/sign-in/page';

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
