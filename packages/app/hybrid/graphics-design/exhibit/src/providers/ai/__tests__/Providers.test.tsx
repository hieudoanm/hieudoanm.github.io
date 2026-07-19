import { render, screen } from '@testing-library/react';
import { Providers } from '../Providers';

jest.mock('@/providers/ai/DataProvider', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="data-provider">{children}</div>
  ),
}));

jest.mock('@/providers/ai/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="toast-provider">{children}</div>
  ),
}));

jest.mock('@/components/ai/organisms/ToastContainer', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe('Providers', () => {
  it('wraps children in toast, data, and toast container', () => {
    render(
      <Providers>
        <div>content</div>
      </Providers>
    );
    expect(screen.getByTestId('toast-provider')).toBeInTheDocument();
    expect(screen.getByTestId('data-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
