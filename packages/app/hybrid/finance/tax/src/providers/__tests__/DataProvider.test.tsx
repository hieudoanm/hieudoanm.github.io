import { renderHook, act, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '../DataProvider';

jest.mock('@/lib/db', () => ({
  db: {
    getAll: jest.fn().mockResolvedValue([]),
    put: jest.fn().mockResolvedValue(undefined),
    putAll: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    count: jest.fn().mockResolvedValue(0),
    needsSeed: jest.fn().mockResolvedValue(false),
    STORES: {
      user: 'user',
      companies: 'companies',
      submissions: 'submissions',
      audits: 'audits',
      calculatorHistory: 'calculatorHistory',
    },
  },
}));

jest.mock('@/lib/seed', () => ({
  ensureSeeded: jest.fn().mockResolvedValue(undefined),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DataProvider>{children}</DataProvider>
);

describe('DataProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  });

  it('provides useData hook with initial values', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toBeNull();
    expect(result.current.companies).toEqual([]);
    expect(result.current.submissions).toEqual([]);
    expect(result.current.audits).toEqual([]);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('login authenticates user', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      const success = await result.current.login('test@test.com', 'pass');
      expect(success).toBe(true);
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('logout deauthenticates user', async () => {
    localStorage.setItem('tax-auth', 'true');
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe('useData without provider', () => {
  it('throws when used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      renderHook(() => useData());
    }).toThrow('useData must be used within DataProvider');
    spy.mockRestore();
  });
});
