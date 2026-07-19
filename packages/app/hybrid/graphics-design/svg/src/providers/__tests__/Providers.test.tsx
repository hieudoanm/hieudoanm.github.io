import { render, screen } from '@testing-library/react';
import { Providers } from '@/providers/Providers';

jest.mock('@/providers/DataProvider', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="data">{children}</div>
  ),
}));

jest.mock('@/providers/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="toast">{children}</div>
  ),
}));

jest.mock('@/components/organisms/ToastContainer', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe('Providers', () => {
  it('renders children inside the provider stack', () => {
    render(
      <Providers>
        <p>child</p>
      </Providers>
    );
    expect(screen.getByTestId('data')).toBeInTheDocument();
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
