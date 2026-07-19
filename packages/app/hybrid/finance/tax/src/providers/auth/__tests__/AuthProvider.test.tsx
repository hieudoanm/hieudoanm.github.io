import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthProvider';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides useAuth hook', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current).toBeDefined();
    expect(result.current.isAuthenticated).toBe(false);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.forgotPassword).toBe('function');
    expect(typeof result.current.resetPassword).toBe('function');
  });

  it('login sets isAuthenticated to true', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      const success = await result.current.login('test@test.com', 'password');
      expect(success).toBe(true);
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('tax-auth')).toBe('true');
  });

  it('login fails with empty email', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      const success = await result.current.login('', 'password');
      expect(success).toBe(false);
    });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logout sets isAuthenticated to false', async () => {
    localStorage.setItem('tax-auth', 'true');
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(true);
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('tax-auth')).toBeNull();
  });

  it('forgotPassword returns true', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      const success = await result.current.forgotPassword('test@test.com');
      expect(success).toBe(true);
    });
  });

  it('resetPassword returns true', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      const success = await result.current.resetPassword('token', 'newpass');
      expect(success).toBe(true);
    });
  });

  it('reads initial auth state from localStorage', () => {
    localStorage.setItem('tax-auth', 'true');
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(true);
  });
});

describe('useAuth without provider', () => {
  it('throws when used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within AuthProvider');
    spy.mockRestore();
  });
});
