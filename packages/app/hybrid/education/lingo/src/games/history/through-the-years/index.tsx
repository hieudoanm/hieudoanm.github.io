import { FC } from 'react';
import { SetupScreen } from './components/screens/SetupScreen';
import { GameScreen } from './components/screens/GameScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { BrowseScreen } from './components/screens/BrowseScreen';
import { useGameStore } from './store';

export const ThroughTheYears: FC = () => {
  const phase = useGameStore((s) => s.phase);

  if (phase === 'menu') {
    return <SetupScreen />;
  }

  if (phase === 'browse') {
    return <BrowseScreen />;
  }

  if (phase === 'gameover') {
    return <GameOverScreen />;
  }

  return <GameScreen />;
};

ThroughTheYears.displayName = 'ThroughTheYears';
