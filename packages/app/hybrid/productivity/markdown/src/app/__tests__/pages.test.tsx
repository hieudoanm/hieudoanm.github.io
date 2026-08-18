import { fireEvent, render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ variable: '--font-sans' })),
  JetBrains_Mono: jest.fn(() => ({ variable: '--font-mono' })),
  Lora: jest.fn(() => ({ variable: '--font-serif' })),
}));

jest.mock('@/components/markdown/VaultApp', () => ({
  VaultApp: () => <div>vault-app-mock</div>,
}));

import RootLayout, { metadata } from '@/app/layout';
import HomePage from '@/app/page';
import ErrorPage from '@/app/error';
import LoadingPage from '@/app/loading';
import NotFoundPage from '@/app/not-found';

describe('RootLayout', () => {
  it('exports app metadata', () => {
    expect(metadata.title).toBe('Markdown - Minimal Obsidian');
    expect(metadata.manifest).toBe('/manifest.json');
    expect((metadata.appleWebApp as { capable?: boolean }).capable).toBe(true);
  });

  it('renders children inside the themed html shell', () => {
    render(
      <RootLayout>
        <main>hello page</main>
      </RootLayout>
    );
    const html = document.documentElement;
    expect(html).toHaveAttribute('data-theme', 'nothing');
    expect(html!.className).toContain('--font-sans');
    expect(html!.className).toContain('--font-mono');
    expect(html!.className).toContain('--font-serif');
    expect(screen.getByText('hello page')).toBeInTheDocument();
  });
});

describe('HomePage', () => {
  it('renders the vault app', () => {
    render(<HomePage />);
    expect(screen.getByText('vault-app-mock')).toBeInTheDocument();
  });
});

describe('ErrorPage', () => {
  it('shows the error message and resets on click', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('boom')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});

describe('LoadingPage', () => {
  it('renders a loading spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('links back to the vault', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Back to vault' });
    expect(link).toHaveAttribute('href', '/');
  });
});

describe('SWProvider', () => {
  it('renders children', () => {
    render(
      <SWProvider>
        <div>sw child</div>
      </SWProvider>
    );
    expect(screen.getByText('sw child')).toBeInTheDocument();
  });
});
