import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), replace: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/login'),
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

import LoginPage from '../(auth)/login/page';

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  });

  it('renders form fields', () => {
    render(<LoginPage />);
    expect(screen.getByText('Dang Nhap')).toBeTruthy();
    expect(screen.getByPlaceholderText('email@example.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('••••••••')).toBeTruthy();
  });

  it('calls login on button click', async () => {
    mockLogin.mockResolvedValue(false);
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Dang nhap'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password');
    });
  });

  it('redirects on success', async () => {
    const { useRouter } = require('next/navigation');
    const mockPush = useRouter().push;

    mockLogin.mockResolvedValue(true);
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'pass' },
    });
    fireEvent.click(screen.getByText('Dang nhap'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('does not redirect on failure', async () => {
    const { useRouter } = require('next/navigation');
    const mockPush = useRouter().push;

    mockLogin.mockResolvedValue(false);
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'pass' },
    });
    fireEvent.click(screen.getByText('Dang nhap'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
