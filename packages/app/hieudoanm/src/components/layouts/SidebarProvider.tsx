'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { PiSoccerBall, PiInstagramLogo } from 'react-icons/pi';

import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { makeTools } from '@hieudoanm.github.io/components/pages/start/components/sidebars/tabs/AppsTab/makeTools';
import type {
  ModalId,
  SidebarTab,
} from '@hieudoanm.github.io/components/pages/start/types';

interface SidebarContextValue {
  sidebarTab: SidebarTab | null;
  toggleSidebar: (tab: SidebarTab) => void;
  activeApp: ModalId | null;
  openApp: (id: ModalId) => () => void;
  closeApp: () => void;
  toolSections: Record<string, Tool[]>;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [sidebarTab, setSidebarTab] = useState<SidebarTab | null>(null);
  const [activeApp, setActiveApp] = useState<ModalId | null>(null);

  const closeApp = useCallback(() => setActiveApp(null), []);
  const openApp = useCallback((id: ModalId) => () => setActiveApp(id), []);
  const toggleSidebar = useCallback(
    (tab: SidebarTab) => setSidebarTab((prev) => (prev === tab ? null : tab)),
    []
  );

  const toolSections = useMemo(() => {
    const sections = makeTools(openApp);

    const navigable: Record<string, Tool[]> = {};
    for (const [key, tools] of Object.entries(sections)) {
      navigable[key] = tools.map((t) => ({
        ...t,
        onClick: () =>
          router.push(t.toolId ? `/app/${key}/${t.toolId}` : `/app/${key}`),
      }));
    }

    const standaloneApps: Tool[] = [
      {
        label: 'Football',
        description: 'Tournaments & data',
        icon: PiSoccerBall,
        onClick: () => router.push('/app/football'),
      },
      {
        label: 'Instagram',
        description: 'Infographic Creator',
        icon: PiInstagramLogo,
        onClick: () => router.push('/app/instagram'),
      },
    ];

    if (standaloneApps.length > 0) {
      navigable.apps = standaloneApps;
    }

    return navigable;
  }, [openApp, router]);

  return (
    <SidebarContext.Provider
      value={{
        sidebarTab,
        toggleSidebar,
        activeApp,
        openApp,
        closeApp,
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
