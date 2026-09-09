import { renderHook, act, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';

jest.mock('@/lib/db', () => ({
  db: {
    session: { get: jest.fn(), put: jest.fn() },
    members: { getAll: jest.fn() },
  },
}));

const { db } = jest.requireMock('@/lib/db');

const member = { id: 'mem-1', name: 'Alice', email: 'a@x.com', avatar: 'A' };

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
  db.session.get.mockResolvedValue({ id: 'session', userId: null });
  db.session.put.mockResolvedValue(undefined);
  db.members.getAll.mockResolvedValue([member]);
});

describe('AuthProvider', () => {
  it('is signed out by default', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toBeNull();
  });

  it('restores the saved session on mount', async () => {
    db.session.get.mockResolvedValue({ id: 'session', userId: 'mem-1' });
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.currentUser).toEqual(member));
  });

  it('restores nothing for an unknown saved member', async () => {
    db.session.get.mockResolvedValue({ id: 'session', userId: 'mem-9' });
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.currentUser).toBeNull());
  });

  it('switches to a known member and persists the session', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.switchMember('mem-1');
    });
    expect(db.session.put).toHaveBeenCalledWith({
      id: 'session',
      userId: 'mem-1',
    });
    expect(result.current.currentUser).toEqual(member);
  });

  it('ignores switching to an unknown member', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.switchMember('nope');
    });
    expect(db.session.put).not.toHaveBeenCalled();
    expect(result.current.currentUser).toBeNull();
  });

  it('signs out and persists an empty session', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.switchMember('mem-1');
    });
    await act(async () => {
      await result.current.signOut();
    });
    expect(db.session.put).toHaveBeenCalledWith({
      id: 'session',
      userId: null,
    });
    expect(result.current.currentUser).toBeNull();
  });
});
