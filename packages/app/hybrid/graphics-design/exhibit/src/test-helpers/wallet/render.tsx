import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { DataProvider } from '@/providers/wallet/DataProvider';
import { ToastProvider } from '@/providers/wallet/ToastProvider';

export const renderWithProviders = (ui: ReactNode) =>
  render(
    <DataProvider>
      <ToastProvider>{ui}</ToastProvider>
    </DataProvider>
  );
