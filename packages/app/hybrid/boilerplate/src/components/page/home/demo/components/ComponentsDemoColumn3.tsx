import { FC } from 'react';
import { ProductCard } from './components/ProductCard';
import { WritePostCard } from './components/WritePostCard';
import { ChatCard } from './components/ChatCard';
import { BarChartCard } from './components/BarChartCard';
import { StatsRadialCard } from './components/StatsRadialCard';
import { PriceRangeCard } from './components/PriceRangeCard';
import { AlertSoftError } from './components/AlertSoftError';
import {
  RevenueStatsCard,
  DockDemo,
  AlertSolidInfo,
  AlertDashWarning,
} from './components';

export const ComponentsDemoColumn3: FC = () => (
  <div className="flex flex-col gap-4">
    <ProductCard />
    <WritePostCard />
    <ChatCard />
    <BarChartCard />
    <StatsRadialCard />
    <PriceRangeCard />
    <AlertSoftError />
    <RevenueStatsCard />
    <DockDemo />
    <AlertSolidInfo />
    <AlertDashWarning />
  </div>
);

ComponentsDemoColumn3.displayName = 'ComponentsDemoColumn3';
