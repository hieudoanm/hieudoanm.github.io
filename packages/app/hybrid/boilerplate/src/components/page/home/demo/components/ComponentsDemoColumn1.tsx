import { FC } from 'react';
import { CalendarCard } from './components/CalendarCard';
import { RegistrationCard } from './components/RegistrationCard';
import { FilterCard } from './components/FilterCard';
import { RecentOrdersCard } from './components/RecentOrdersCard';
import { TabsCard } from './components/TabsCard';
import { SearchJoin } from './components/SearchJoin';
import { AlertOutlineSuccess } from './components/AlertOutlineSuccess';
import { MockupCodeCard } from './components/MockupCodeCard';
import { AdminMenuCard } from './components';

export const ComponentsDemoColumn1: FC = () => (
  <div className="flex flex-col gap-4">
    <CalendarCard />
    <RegistrationCard />
    <FilterCard />
    <RecentOrdersCard />
    <TabsCard />
    <SearchJoin />
    <AlertOutlineSuccess />
    <MockupCodeCard />
    <AdminMenuCard />
  </div>
);

ComponentsDemoColumn1.displayName = 'ComponentsDemoColumn1';
