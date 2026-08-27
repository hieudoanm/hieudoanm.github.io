import { render, screen, waitFor } from '@testing-library/react';
import { RouteGuard } from '../RouteGuard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    replace: jest.fn(),
    push: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/personal'),
}));

describe('RouteGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children for public route when not authenticated', async () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/login');
    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeTruthy();
    });
  });

  it('redirects to login for protected route when not authenticated', async () => {
    const { useRouter, usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/personal');
    const mockReplace = useRouter().replace;
    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/login');
    });
  });

  it('redirects away from public route when authenticated', async () => {
    localStorage.setItem('tax-auth', 'true');
    const { useRouter, usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/login');
    const mockReplace = useRouter().replace;
    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    });
  });

  it('renders children for protected route when authenticated', async () => {
    localStorage.setItem('tax-auth', 'true');
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/personal');
    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeTruthy();
    });
  });
});
