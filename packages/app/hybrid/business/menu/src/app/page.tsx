'use client';

import { FC } from 'react';
import RestaurantDashboard from '@/components/organisms/RestaurantDashboard';
import { useMenuStore } from '@/hooks/useMenuStore';

const HomePage: FC = () => {
  const store = useMenuStore();
  return (
    <main className="flex-1">
      <RestaurantDashboard store={store} />
    </main>
  );
};

export default HomePage;
