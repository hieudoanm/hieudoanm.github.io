import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../layout';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('RootLayout', () => {
  it('exports metadata with the expected shape', () => {
    expect(metadata.title).toBe('Colors');
    expect(metadata.manifest).toBe('/manifest.json');
    expect(metadata.description).toBe('A collection of practical color tools');
  });

  it('renders children', () => {
    render(
      <RootLayout>
        <span>page body</span>
      </RootLayout>
    );
    expect(screen.getByText('page body')).toBeInTheDocument();
  });

  it('renders the Header navigation', () => {
    render(
      <RootLayout>
        <span>body</span>
      </RootLayout>
    );
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });
});
