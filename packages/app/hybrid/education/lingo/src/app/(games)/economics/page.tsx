'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { ECONOMICS_CATEGORIES } from '@/games/economics/data';
import { NextPage } from 'next';
import { PiCoins } from 'react-icons/pi';

const ITEMS: GameItem[] = ECONOMICS_CATEGORIES.map(
  ({ label, description, href }) => ({
    name: label,
    description,
    icon: PiCoins,
    href,
  })
);

const EconomicsPage: NextPage = () => (
  <GamesTemplate
    title="Economics"
    subtitle="Explore game theory, markets, behavioral economics, and macro concepts."
    items={ITEMS}
  />
);

export default EconomicsPage;
