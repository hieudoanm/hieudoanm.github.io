import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

jest.mock('@/styles/globals.css', () => ({}));
jest.mock('@/components/pos/organisms', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

describe('RootLayout', () => {
  it('renders children', () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders header', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders main element with flex-1', () => {
    const { container } = render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    );
    const main = container.querySelector('main');
    expect(main).toBeTruthy();
    expect(main?.className).toContain('flex-1');
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Exibit - UI Exhibition');
  });

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string };
    expect(app.capable).toBe(true);
    expect(app.title).toBe('Exibit');
  });
});
