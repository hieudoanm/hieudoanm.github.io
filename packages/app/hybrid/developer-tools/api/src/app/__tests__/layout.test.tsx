import { render, screen, fireEvent } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('exports app metadata', () => {
    expect(metadata.title).toBe('API Client');
    expect(metadata.manifest).toBe('/manifest.json');
    expect((metadata.appleWebApp as { capable?: boolean }).capable).toBe(true);
  });

  it('renders children inside the themed html shell', () => {
    render(
      <RootLayout>
        <main>hello page</main>
      </RootLayout>
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'api-light');
    expect(screen.getByText('hello page')).toBeInTheDocument();
  });
});
