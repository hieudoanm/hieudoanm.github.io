'use client';

import { useCallback, useEffect, useState } from 'react';
import type { MenuState } from '@/types/menu';
import { emptyMenu } from '@/lib/menu';
import { seedMenuData } from '@/lib/seed';
import { storage } from '@/lib/storage';

const STATE_KEY = 'state';

export const useMenuStore = () => {
  const [state, setState] = useState<MenuState>(() => {
    return storage.get<MenuState>(STATE_KEY) ?? seedMenuData();
  });

  useEffect(() => {
    storage.set(STATE_KEY, state);
  }, [state]);

  const reset = useCallback(() => {
    setState(emptyMenu());
  }, []);

  return { state, setState, reset };
};