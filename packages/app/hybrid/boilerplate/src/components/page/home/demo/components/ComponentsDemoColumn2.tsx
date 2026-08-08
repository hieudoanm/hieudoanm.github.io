import { FC } from 'react';
import { MediaPlayerCard } from './components/MediaPlayerCard';
import { PricingCard } from './components/PricingCard';
import { TimelineDemo } from './components/TimelineDemo';

export const ComponentsDemoColumn2: FC = () => (
  <div className="flex flex-col gap-4">
    <TimelineDemo />
    <PricingCard />
    <MediaPlayerCard />
  </div>
);

ComponentsDemoColumn2.displayName = 'ComponentsDemoColumn2';
