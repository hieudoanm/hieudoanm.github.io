jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import RegisterPage from '../page';
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

describe('RegisterPage', () => {
  it('renders and disables submit until agreed', () => {
    renderWithProviders(<RegisterPage />);
    expect(
      screen.getByText('Create Account', { selector: 'h2' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Create Account', { selector: 'button' })
    ).toBeDisabled();
  });

  it('submits and redirects', async () => {
    const { replace } = useRouter();
    renderWithProviders(<RegisterPage />);
    fireEvent.click(screen.getByRole('checkbox'));
    fill('Full Name', 'Jane Doe');
    fill('Email', 'jane@b.com');
    fill('Password', 'pw12345');
    fireEvent.click(screen.getByText('Create Account', { selector: 'button' }));
    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/');
    });
  });
});
