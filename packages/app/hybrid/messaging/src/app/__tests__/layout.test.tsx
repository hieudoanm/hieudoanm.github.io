import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('@/components/SWProvider', () => ({
  SWProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/styles/globals.css', () => ({}), { virtual: true });

describe('RootLayout', () => {
  it('renders children through the provider chain', () => {
    render(
      <RootLayout>
        <p>Hello</p>
      </RootLayout>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
