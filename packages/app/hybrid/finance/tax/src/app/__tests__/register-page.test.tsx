import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), replace: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/register'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockLogin = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    login: mockLogin,
  }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import RegisterPage from '../(auth)/register/page';

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  });

  it('renders form fields', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Dang Ky')).toBeTruthy();
    expect(screen.getByText('Ho ten')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Mat khau')).toBeTruthy();
  });

  it('calls login on register click and redirects', async () => {
    const { useRouter } = require('next/navigation');
    const mockPush = useRouter().push;

    mockLogin.mockResolvedValue(true);
    render(<RegisterPage />);

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: 'Hieu' },
    });
    fireEvent.change(screen.getAllByRole('textbox')[1], {
      target: { value: 'a@b.com' },
    });

    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput!, { target: { value: 'pass' } });

    fireEvent.click(screen.getByText('Dang ky'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('does not redirect on failure', async () => {
    const { useRouter } = require('next/navigation');
    const mockPush = useRouter().push;

    mockLogin.mockResolvedValue(false);
    render(<RegisterPage />);

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: 'Hieu' },
    });
    fireEvent.change(screen.getAllByRole('textbox')[1], {
      target: { value: 'a@b.com' },
    });

    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput!, { target: { value: 'pass' } });

    fireEvent.click(screen.getByText('Dang ky'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
