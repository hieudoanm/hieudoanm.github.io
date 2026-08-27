import { renderHook, act, waitFor } from '@testing-library/react';
import { UserProvider, useUserContext } from '../UserProvider';
import { CompaniesProvider, useCompaniesContext } from '../CompaniesProvider';
import {
  SubmissionsProvider,
  useSubmissionsContext,
} from '../SubmissionsProvider';
import { AuditsProvider, useAuditsContext } from '../AuditsProvider';

jest.mock('@/lib/db', () => ({
  db: {
    getAll: jest.fn().mockResolvedValue([]),
    put: jest.fn().mockResolvedValue(undefined),
    putAll: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    STORES: {
      user: 'user',
      companies: 'companies',
      submissions: 'submissions',
      audits: 'audits',
      calculatorHistory: 'calculatorHistory',
    },
  },
}));

describe('UserProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('provides user context', async () => {
    const { result } = renderHook(() => useUserContext(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>,
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toBeNull();
    expect(typeof result.current.updateUser).toBe('function');
  });

  it('throws without provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => renderHook(() => useUserContext())).toThrow();
    spy.mockRestore();
  });
});

describe('CompaniesProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('provides companies context', async () => {
    const { result } = renderHook(() => useCompaniesContext(), {
      wrapper: ({ children }) => (
        <CompaniesProvider>{children}</CompaniesProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.companies).toEqual([]);
    expect(typeof result.current.addCompany).toBe('function');
    expect(typeof result.current.updateCompany).toBe('function');
    expect(typeof result.current.deleteCompany).toBe('function');
  });

  it('throws without provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => renderHook(() => useCompaniesContext())).toThrow();
    spy.mockRestore();
  });
});

describe('SubmissionsProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('provides submissions context', async () => {
    const { result } = renderHook(() => useSubmissionsContext(), {
      wrapper: ({ children }) => (
        <SubmissionsProvider>{children}</SubmissionsProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.submissions).toEqual([]);
    expect(typeof result.current.addSubmission).toBe('function');
    expect(typeof result.current.updateSubmission).toBe('function');
    expect(typeof result.current.deleteSubmission).toBe('function');
  });

  it('throws without provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => renderHook(() => useSubmissionsContext())).toThrow();
    spy.mockRestore();
  });
});

describe('AuditsProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('provides audits context', async () => {
    const { result } = renderHook(() => useAuditsContext(), {
      wrapper: ({ children }) => <AuditsProvider>{children}</AuditsProvider>,
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.audits).toEqual([]);
    expect(typeof result.current.addAudit).toBe('function');
    expect(typeof result.current.updateAudit).toBe('function');
    expect(typeof result.current.deleteAudit).toBe('function');
  });

  it('throws without provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => renderHook(() => useAuditsContext())).toThrow();
    spy.mockRestore();
  });
});
