jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import LoginPage from '../page';
import { useRouter } from 'next/navigation';

const fill = (label: string, value: string) => {
  fireEvent.change(screen.getByPlaceholderText(label), {
    target: { value },
  });
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('LoginPage', () => {
  it('renders the login form', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('does not redirect when email is empty', async () => {
    const { replace } = useRouter();
    renderWithProviders(<LoginPage />);
    fireEvent.submit(document.querySelector('form') as HTMLFormElement);
    await waitFor(() => {
      expect(replace).not.toHaveBeenCalled();
    });
  });

  it('redirects to / on successful login', async () => {
    const { replace } = useRouter();
    renderWithProviders(<LoginPage />);
    fill('Email', 'a@b.com');
    fill('Password', 'pw');
    fireEvent.click(screen.getByText('Sign In'));
    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/');
    });
  });
});
