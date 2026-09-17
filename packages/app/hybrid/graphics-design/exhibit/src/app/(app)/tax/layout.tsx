import type { ReactNode } from 'react';
import { Providers } from '@/providers/tax/Providers';

const TaxLayout = ({ children }: { children: ReactNode }) => (
  <Providers>{children}</Providers>
);

export default TaxLayout;
