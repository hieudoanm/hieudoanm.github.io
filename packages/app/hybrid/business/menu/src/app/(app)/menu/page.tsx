import { FC, Suspense } from 'react';
import CustomerMenu from '@/components/organisms/CustomerMenu';

const MenuPage: FC = () => (
  <Suspense fallback={<div className="p-8">Loading menu…</div>}>
    <CustomerMenu />
  </Suspense>
);

export default MenuPage;