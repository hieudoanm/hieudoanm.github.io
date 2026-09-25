import { RouteGuard } from '@/components/wallet/RouteGuard';
import { render, screen } from '@testing-library/react';

const replace = jest.fn();

let pathname = '/wallet';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace }),
  usePathname: () => pathname,
}));

const signIn = (): void => localStorage.setItem('wallet-auth', 'true');

const renderAt = (path: string, content: React.ReactNode): void => {
  pathname = path;
  render(<RouteGuard>{content}</RouteGuard>);
};

describe('RouteGuard', () => {
  beforeEach(() => {
    replace.mockClear();
    localStorage.clear();
    pathname = '/wallet';
  });

  it('renders children when authenticated on a wallet path', () => {
    signIn();
    renderAt('/wallet', <div>wallet app</div>);
    expect(screen.getByText('wallet app')).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it('redirects an unauthenticated visitor to sign-in with an encoded next param', () => {
    renderAt('/wallet/transactions', <div>wallet app</div>);
    expect(replace).toHaveBeenCalledWith(
      '/sign-in?next=%2Fwallet%2Ftransactions'
    );
  });

  it('hides protected content from an unauthenticated visitor', () => {
    renderAt('/wallet', <div>secret wallet app</div>);
    expect(screen.queryByText('secret wallet app')).not.toBeInTheDocument();
  });

  it('renders a public path without a session', () => {
    renderAt('/about', <div>public about</div>);
    expect(screen.getByText('public about')).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it('treats the wallet root itself as protected', () => {
    renderAt('/wallet', <div>secret wallet app</div>);
    expect(replace).toHaveBeenCalledTimes(1);
  });

  it('does not redirect twice for the same target on rerender', () => {
    const view = render(
      <RouteGuard>
        <div>secret wallet app</div>
      </RouteGuard>
    );
    expect(replace).toHaveBeenCalledTimes(1);
    view.rerender(
      <RouteGuard>
        <div>secret wallet app</div>
      </RouteGuard>
    );
    expect(replace).toHaveBeenCalledTimes(1);
  });

  it('redirects again when the pathname changes', () => {
    renderAt('/wallet', <div>secret wallet app</div>);
    replace.mockClear();
    pathname = '/wallet/settings';
    render(
      <RouteGuard>
        <div>second</div>
      </RouteGuard>
    );
    expect(replace).toHaveBeenCalledWith('/sign-in?next=%2Fwallet%2Fsettings');
  });

  it('stops redirecting once a session is established', () => {
    renderAt('/wallet', <div>secret wallet app</div>);
    replace.mockClear();
    signIn();
    render(
      <RouteGuard>
        <div>now visible</div>
      </RouteGuard>
    );
    expect(screen.getAllByText('now visible').length).toBeGreaterThan(0);
  });
});
