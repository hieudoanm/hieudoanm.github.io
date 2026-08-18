'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useEntitySync } from '@/hooks/useEntitySync';
import { user as seedUser } from '@/data/mock';
import { db } from '@/lib/db';
import type { User } from '@/types';

interface UserContextValue {
  user: User | null;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  console.log('[UserProvider] render');
  const { data, setData, loading, persistOne } = useEntitySync<User>(
    db.STORES.user,
    [seedUser]
  );

  const user = data[0] ?? null;

  const updateUser = useCallback(
    async (updated: User) => {
      console.log('[UserProvider] updateUser', updated.id);
      setData([updated]);
      await persistOne(updated);
    },
    [setData, persistOne]
  );

  return (
    <UserContext.Provider value={{ user, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};
