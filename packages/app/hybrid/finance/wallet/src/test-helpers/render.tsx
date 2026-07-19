import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export const renderWithProviders = (ui: ReactNode) =>
  render(
    <DataProvider>
      <ToastProvider>{ui}</ToastProvider>
    </DataProvider>
  );
