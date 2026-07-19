import type { ReactNode } from 'react';
import { WalletProviders } from '@/providers/wallet/WalletProviders';

const WalletLayout = ({ children }: { children: ReactNode }) => (
  <WalletProviders>{children}</WalletProviders>
);

export default WalletLayout;
