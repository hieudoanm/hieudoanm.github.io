'use client';

import { type FC, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RestaurantDashboard from '@/components/menu/RestaurantDashboard';
import CustomerMenu from '@/components/menu/CustomerMenu';
import { useMenuStore } from '@/hooks/menu/useMenuStore';

const MenuPageContent: FC = () => {
  const searchParams = useSearchParams();
  const store = useMenuStore();
  const hasDataParam = searchParams.has('d');

  return (
    <Suspense fallback={<div className="p-8">Loading menu…</div>}>
      {hasDataParam ? <CustomerMenu /> : <RestaurantDashboard store={store} />}
    </Suspense>
  );
};

const MenuPage: FC = () => <MenuPageContent />;

export default MenuPage;
