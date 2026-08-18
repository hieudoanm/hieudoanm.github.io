import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('exposes expected metadata', () => {
    expect(metadata.title).toBe('Video Tools');
    expect(metadata.description).toBe(
      'Browser-based video and audio processing tools'
    );
  });

  it('renders the html shell with theme and children', () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.body.textContent).toContain('page content');
  });
});
