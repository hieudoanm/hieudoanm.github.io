import { render, screen } from '@testing-library/react';
import { RouteGuard } from '../RouteGuard';
import { DataProvider } from '@/providers/DataProvider';

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
    <DataProvider>
      <RouteGuard>
        <div data-testid="child">Protected</div>
      </RouteGuard>
    </DataProvider>
  );
}

describe('RouteGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children on public route when unauthenticated', () => {
    renderGuard('/login');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders children on protected route when authenticated', () => {
    renderGuard('/dashboard', true);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('hides children on protected route when unauthenticated', () => {
    renderGuard('/dashboard');
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('hides children on public route when authenticated', () => {
    renderGuard('/login', true);
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('treats /register as a public route', () => {
    renderGuard('/register');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('hides children on /register when authenticated', () => {
    renderGuard('/register', true);
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });
});
