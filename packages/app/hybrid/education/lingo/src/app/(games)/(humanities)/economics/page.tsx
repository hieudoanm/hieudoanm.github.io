'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { ECONOMICS_CATEGORIES } from '@/games/humanities/economics/data';
import { NextPage } from 'next';
import { PiCoins } from 'react-icons/pi';

const SUBFIELD: Record<string, string> = {
  'adverse-selection': 'Markets & Public Policy',
  'aggregate-demand-supply': 'Macroeconomics',
  arbitrage: 'Markets & Public Policy',
  'auction-theory': 'Game Theory',
  'backward-induction': 'Game Theory',
  'bargaining-theory': 'Game Theory',
  'bayesian-updating': 'Game Theory',
  'behavioral-finance': 'Behavioral Economics',
  'behavioral-heuristics': 'Behavioral Economics',
  'business-cycles': 'Macroeconomics',
  'capm-and-risk': 'Markets & Public Policy',
  'causal-inference': 'Microeconomics',
  'consumer-theory': 'Microeconomics',
  'coordination-games': 'Game Theory',
  'development-rcts': 'Macroeconomics',
  'economic-inequality': 'Macroeconomics',
  'efficient-market-hypothesis': 'Markets & Public Policy',
  elasticity: 'Microeconomics',
  'endowment-effect': 'Behavioral Economics',
  'evolutionary-game-theory': 'Game Theory',
  externalities: 'Markets & Public Policy',
  'fiscal-policy': 'Macroeconomics',
  'game-theory-basics': 'Game Theory',
  'gdp-and-national-accounts': 'Macroeconomics',
  'human-capital': 'Microeconomics',
  'imperfect-competition': 'Microeconomics',
  'institutions-and-growth': 'Macroeconomics',
  'is-lm-model': 'Macroeconomics',
  'keynesian-economics': 'Macroeconomics',
  'labor-markets': 'Microeconomics',
  'marginal-utility': 'Microeconomics',
  'market-failures': 'Markets & Public Policy',
  'market-microstructure': 'Markets & Public Policy',
  'mechanism-design': 'Game Theory',
  'mental-accounting': 'Behavioral Economics',
  'migration-economics': 'Macroeconomics',
  'monetary-policy': 'Macroeconomics',
  'monopoly-and-market-power': 'Microeconomics',
  'moral-hazard': 'Markets & Public Policy',
  'nash-equilibrium': 'Game Theory',
  'nudge-and-behavioral-economics': 'Behavioral Economics',
  oligopoly: 'Microeconomics',
  'opportunity-cost': 'Microeconomics',
  'overconfidence-bias': 'Behavioral Economics',
  'perfect-competition': 'Microeconomics',
  'phillips-curve': 'Macroeconomics',
  'portfolio-theory': 'Markets & Public Policy',
  'poverty-traps': 'Macroeconomics',
  'price-discrimination': 'Microeconomics',
  'prisoners-dilemma': 'Game Theory',
  'production-and-costs': 'Microeconomics',
  'prospect-theory': 'Behavioral Economics',
  'public-choice': 'Markets & Public Policy',
  'public-goods-dilemma': 'Markets & Public Policy',
  'repeated-games': 'Game Theory',
  signaling: 'Game Theory',
  'social-preferences': 'Behavioral Economics',
  'supply-and-demand': 'Microeconomics',
  'time-inconsistency': 'Behavioral Economics',
  'time-value-of-money': 'Markets & Public Policy',
  'trade-and-tariffs': 'Macroeconomics',
  'tragedy-of-the-commons': 'Markets & Public Policy',
  'unemployment-okuns-law': 'Macroeconomics',
  'zero-sum-games': 'Game Theory',
};

const GROUP_ORDER = [
  'Microeconomics',
  'Macroeconomics',
  'Game Theory',
  'Behavioral Economics',
  'Markets & Public Policy',
];

const ITEMS: GameItem[] = GROUP_ORDER.flatMap((group) =>
  ECONOMICS_CATEGORIES.filter(
    ({ category }) => SUBFIELD[category] === group
  ).map(({ label, description, href, category }) => ({
    name: label,
    description,
    icon: PiCoins,
    href,
    group: SUBFIELD[category] ?? 'Economics',
  }))
);

const EconomicsPage: NextPage = () => (
  <GamesTemplate
    title="Economics"
    subtitle="Explore game theory, markets, behavioral economics, and macro concepts."
    items={ITEMS}
    searchable
  />
);

export default EconomicsPage;
