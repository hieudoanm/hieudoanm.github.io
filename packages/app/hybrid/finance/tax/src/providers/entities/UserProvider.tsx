'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useEntitySync } from '@/hooks/useEntitySync';
import { db } from '@/lib/db';
import type { User } from '@/types';

interface UserContextValue {
  user: User | null;
  loading: boolean;
  updateUser: (user: User) => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  console.log('[UserProvider] render');
  const { data, loading, persistOne } = useEntitySync<User>(db.STORES.user);

  const value: UserContextValue = {
    user: data[0] ?? null,
    loading,
    updateUser: persistOne,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};
