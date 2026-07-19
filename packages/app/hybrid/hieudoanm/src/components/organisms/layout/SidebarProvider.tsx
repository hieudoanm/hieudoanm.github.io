'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { APP_SECTIONS } from '@hieudoanm.github.io/components/routes/apps/apps-data';
import { Tool } from '@hieudoanm.github.io/components/atoms';
import type { SidebarTab } from '@hieudoanm.github.io/components/organisms/layout/types';

interface SidebarContextValue {
  sidebarTab: SidebarTab | null;
  toggleSidebar: (tab: SidebarTab) => void;
  toolSections: Record<string, Tool[]>;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab | null>(null);

  const toggleSidebar = useCallback(
    (tab: SidebarTab) => setSidebarTab((prev) => (prev === tab ? null : tab)),
    []
  );

  const toolSections = useMemo(() => {
    const navigable: Record<string, Tool[]> = {};
    for (const { id, items } of APP_SECTIONS) {
      navigable[id] = items.map((t) => ({
        label: t.label,
        description: t.description,
        icon: t.icon,
        href: `/apps/${id}/${t.toolId}`,
      }));
    }
    return navigable;
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        sidebarTab,
        toggleSidebar,
        toolSections,
      }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
};
