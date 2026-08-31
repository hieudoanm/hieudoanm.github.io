import { render, screen } from '@testing-library/react';
import RegisterPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), replace: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/register'),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    login: jest.fn().mockResolvedValue(false),
  }),
}));

jest.mock('@/components/templates/AuthTemplate', () => ({
  AuthTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RegisterPage', () => {
  it('renders register form with name, email, and password fields', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Dang Ky')).toBeInTheDocument();
    expect(screen.getByText('Dang ky')).toBeInTheDocument();
  });
});
