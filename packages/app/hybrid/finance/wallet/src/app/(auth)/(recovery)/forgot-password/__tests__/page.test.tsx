jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import ForgotPasswordPage from '../page';

const fill = (label: string, value: string) => {
  fireEvent.change(screen.getByPlaceholderText(label), {
    target: { value },
  });
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('ForgotPasswordPage', () => {
  it('shows sent confirmation on success', async () => {
    renderWithProviders(<ForgotPasswordPage />);
    fill('Email', 'a@b.com');
    fireEvent.click(screen.getByText('Send Reset Link'));
    await screen.findByText('Check Your Email');
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
  });

  it('shows error toast when email is empty', async () => {
    renderWithProviders(<ForgotPasswordPage />);
    fireEvent.submit(document.querySelector('form') as HTMLFormElement);
    await waitFor(() => {
      expect(screen.getByText('Email not found')).toBeInTheDocument();
    });
  });
});
