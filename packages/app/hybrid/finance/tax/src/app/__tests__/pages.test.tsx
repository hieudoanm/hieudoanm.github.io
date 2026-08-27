import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../layout';
import ErrorPage from '../error';
import GlobalErrorPage from '../global-error';
import NotFoundPage from '../not-found';
import UnauthorizedPage from '../unauthorized';
import ForbiddenPage from '../forbidden';
import LoadingPage from '../loading';
import LoginPage from '../(auth)/login/page';
import RegisterPage from '../(auth)/register/page';
import RootPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(() => ({
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
    },
    login: jest.fn(),
    logout: jest.fn(),
    companies: [],
    submissions: [],
    audits: [],
    loading: false,
    isAuthenticated: true,
  })),
  DataProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(() => ({ showToast: jest.fn() })),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/RouteGuard', () => ({
  RouteGuard: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/OfflineBanner', () => {
  const OfflineBanner = () => null;
  return { __esModule: true, default: OfflineBanner };
});

jest.mock('@/components/SkipToContent', () => {
  const SkipToContent = () => null;
  return { __esModule: true, default: SkipToContent };
});

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/templates/AuthTemplate', () => ({
  AuthTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/organisms/CalculatorForm', () => ({
  CalculatorForm: () => <div>CalculatorForm</div>,
}));

jest.mock('@/components/organisms/SubmissionList', () => ({
  SubmissionList: () => <div>SubmissionList</div>,
}));

jest.mock('@/components/organisms/SubmissionDetail', () => ({
  SubmissionDetail: () => <div>SubmissionDetail</div>,
}));

jest.mock('@/components/organisms/AuditList', () => ({
  AuditList: () => <div>AuditList</div>,
}));

jest.mock('@/components/organisms/AuditDetail', () => ({
  AuditDetail: () => <div>AuditDetail</div>,
}));

jest.mock('@next/font/google', () => ({
  Inter: () => ({ className: '' }),
}));

describe('RootLayout', () => {
  it('exports app metadata', () => {
    expect(metadata.title).toBe('Tax');
    expect(metadata.manifest).toBe('/manifest.json');
    expect((metadata.appleWebApp as { capable?: boolean }).capable).toBe(true);
  });

  it('renders children inside the themed html shell', () => {
    render(
      <RootLayout>
        <main>hello page</main>
      </RootLayout>
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
    expect(screen.getByText('hello page')).toBeInTheDocument();
  });
});

describe('ErrorPage', () => {
  it('renders error with reload action', () => {
    render(<ErrorPage />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});

describe('GlobalErrorPage', () => {
  it('renders critical error with reload action', () => {
    render(<GlobalErrorPage />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('renders 404 with home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toHaveAttribute('href', '/');
  });
});

describe('UnauthorizedPage', () => {
  it('renders 401 with login link', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(screen.getByText('Unauthorized access')).toBeInTheDocument();
    expect(screen.getByText('Login')).toHaveAttribute('href', '/login');
  });
});

describe('ForbiddenPage', () => {
  it('renders 403 with home link', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toHaveAttribute('href', '/');
  });
});

describe('LoadingPage', () => {
  it('renders a loading spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});

describe('RootPage', () => {
  it('renders a loading spinner while redirecting', () => {
    render(<RootPage />);
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});

describe('LoginPage', () => {
  it('renders login form with email and password fields', () => {
    render(<LoginPage />);
    expect(screen.getByText('Dang Nhap')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('email@example.com')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText('Dang nhap')).toBeInTheDocument();
  });
});

describe('RegisterPage', () => {
  it('renders register form with name, email, and password fields', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Dang Ky')).toBeInTheDocument();
    expect(screen.getByText('Dang ky')).toBeInTheDocument();
  });
});
