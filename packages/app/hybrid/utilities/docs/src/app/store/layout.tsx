import { Header } from '@hieudoanm.github.io/components/organisms/Header';
import type { FC, ReactNode } from 'react';

const StoreLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    id="store-root"
    data-theme="store-dark"
    className="bg-base-100 text-base-content flex w-full flex-1 flex-col font-mono">
    <Header />
    <div className="flex-1">{children}</div>
  </div>
);

export default StoreLayout;
