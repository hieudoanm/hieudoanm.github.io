import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('exposes expected metadata', () => {
    expect(metadata.title).toBe('Password - Password Manager');
    expect(metadata.description).toBe('A secure password manager');
    expect(metadata.manifest).toBe('/manifest.json');
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Password',
    });
  });

  it('renders the html shell with theme and children', () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'password-light');
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.body.textContent).toContain('page content');
  });
});
