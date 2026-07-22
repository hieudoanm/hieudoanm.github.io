import { render, screen, waitFor } from '@testing-library/react';
import { RouteGuard } from '../RouteGuard';
import { AuthProvider } from '@/providers/auth/AuthProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: jest.fn(),
}));

const mockUsePathname = jest.requireMock('next/navigation').usePathname;

function renderGuard(pathname: string, authed = false) {
  mockUsePathname.mockReturnValue(pathname);
  if (authed) localStorage.setItem('wallet-auth', 'true');

  return render(
    <AuthProvider>
      <RouteGuard>
        <div data-testid="child">Protected</div>
      </RouteGuard>
    </AuthProvider>
  );
}

describe('RouteGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children on public route when unauthenticated', async () => {
    renderGuard('/login');
    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  it('renders children on protected route when authenticated', async () => {
    renderGuard('/dashboard', true);
    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  it('hides children on protected route when unauthenticated', async () => {
    renderGuard('/dashboard');
    await waitFor(() => {
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
  });

  it('hides children on public route when authenticated', async () => {
    renderGuard('/login', true);
    await waitFor(() => {
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
  });

  it('treats /register as a public route', async () => {
    renderGuard('/register');
    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  it('hides children on /register when authenticated', async () => {
    renderGuard('/register', true);
    await waitFor(() => {
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
  });
});
