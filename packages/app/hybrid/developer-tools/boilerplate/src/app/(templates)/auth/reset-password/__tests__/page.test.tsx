import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ResetPasswordPage from '@/app/(templates)/auth/reset-password/page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
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
