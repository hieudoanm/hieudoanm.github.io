import { renderHook, act, waitFor } from '@testing-library/react';
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

describe('CompaniesProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('addCompany calls persistOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useCompaniesContext(), {
      wrapper: ({ children }) => (
        <CompaniesProvider>{children}</CompaniesProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.addCompany({ id: 'c1', name: 'Test' } as any);
    });
    expect(db.put).toHaveBeenCalled();
  });

  it('updateCompany calls persistOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useCompaniesContext(), {
      wrapper: ({ children }) => (
        <CompaniesProvider>{children}</CompaniesProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.updateCompany({ id: 'c1', name: 'Updated' } as any);
    });
    expect(db.put).toHaveBeenCalled();
  });

  it('deleteCompany calls removeOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useCompaniesContext(), {
      wrapper: ({ children }) => (
        <CompaniesProvider>{children}</CompaniesProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.deleteCompany('c1');
    });
    expect(db.remove).toHaveBeenCalled();
  });
});

describe('SubmissionsProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('addSubmission calls persistOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useSubmissionsContext(), {
      wrapper: ({ children }) => (
        <SubmissionsProvider>{children}</SubmissionsProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.addSubmission({ id: 's1' } as any);
    });
    expect(db.put).toHaveBeenCalled();
  });

  it('updateSubmission calls persistOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useSubmissionsContext(), {
      wrapper: ({ children }) => (
        <SubmissionsProvider>{children}</SubmissionsProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.updateSubmission({ id: 's1' } as any);
    });
    expect(db.put).toHaveBeenCalled();
  });

  it('deleteSubmission calls removeOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useSubmissionsContext(), {
      wrapper: ({ children }) => (
        <SubmissionsProvider>{children}</SubmissionsProvider>
      ),
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.deleteSubmission('s1');
    });
    expect(db.remove).toHaveBeenCalled();
  });
});

describe('AuditsProvider', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    jest.clearAllMocks();
  });

  it('addAudit calls persistOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useAuditsContext(), {
      wrapper: ({ children }) => <AuditsProvider>{children}</AuditsProvider>,
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.addAudit({ id: 'a1' } as any);
    });
    expect(db.put).toHaveBeenCalled();
  });

  it('updateAudit calls persistOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useAuditsContext(), {
      wrapper: ({ children }) => <AuditsProvider>{children}</AuditsProvider>,
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.updateAudit({ id: 'a1' } as any);
    });
    expect(db.put).toHaveBeenCalled();
  });

  it('deleteAudit calls removeOne', async () => {
    const { db } = require('@/lib/db');
    const { result } = renderHook(() => useAuditsContext(), {
      wrapper: ({ children }) => <AuditsProvider>{children}</AuditsProvider>,
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.deleteAudit('a1');
    });
    expect(db.remove).toHaveBeenCalled();
  });
});
