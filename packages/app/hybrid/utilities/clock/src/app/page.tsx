'use client';

import { Pomodoro } from '@/components/organisms/Pomodoro';
import { Stopwatch } from '@/components/organisms/Stopwatch';
import { Timer } from '@/components/organisms/Timer';
import { WatchFaces } from '@/components/organisms/WatchFaces';
import { ClockTab } from '@/components/organisms/ClockTab';
import { ClockApp } from '@/components/templates/ClockApp';
import { AppKey } from '@/data/constants';
import { useState } from 'react';

const AppContent = ({ activeApp }: { activeApp: AppKey }) => {
  switch (activeApp) {
    case 'pomodoro':
      return <Pomodoro />;
    case 'watchface':
      return <WatchFaces />;
    case 'world-clock':
      return <ClockTab />;
    case 'timer':
      return <Timer />;
    case 'stopwatch':
      return <Stopwatch />;
    default:
      return <WatchFaces />;
  }
};

const Home = () => {
  const [activeApp, setActiveApp] = useState<AppKey>('watchface');

  return (
    <ClockApp activeApp={activeApp} onNavigate={setActiveApp}>
      <AppContent activeApp={activeApp} />
    </ClockApp>
  );
};

export default Home;
