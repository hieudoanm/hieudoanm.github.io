'use client';

import { FC } from 'react';
import Header from '@/components/organisms/Header';
import RestaurantDashboard from '@/components/organisms/RestaurantDashboard';
import { useMenuStore } from '@/hooks/useMenuStore';

const HomePage: FC = () => {
  const store = useMenuStore();
  return (
    <>
      <Header />
      <main className="flex-1">
        <RestaurantDashboard store={store} />
      </main>
    </>
  );
};

export default HomePage;