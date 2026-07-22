import dynamic from 'next/dynamic';
import { FC } from 'react';

import { ModalId } from '../../types';
import { AppsView } from './AppsView';

const MainContent = dynamic(
  () => import('./BookmarksView/MainContent').then((m) => m.MainContent),
  { ssr: false }
);

interface MainScreenProps {
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
  activeApp: ModalId | null;
  onAppClose: () => void;
}

export const MainScreen: FC<MainScreenProps> = ({
  today,
  query,
  onQueryChange,
  activeApp,
  onAppClose,
}) => {
  if (activeApp) {
    return <AppsView appId={activeApp} onBack={onAppClose} />;
  }

  return (
    <MainContent today={today} query={query} onQueryChange={onQueryChange} />
  );
};

MainScreen.displayName = 'MainScreen';
