import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

describe('RootLayout', () => {
  it('exposes layout metadata', () => {
    expect(metadata).toMatchObject({
      title: 'Projects - Kanban Board',
      description: 'A kanban board for project management',
      manifest: '/manifest.json',
    });
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      title: 'Projects',
    });
  });

  it('renders children inside SWProvider', () => {
    render(
      <RootLayout>
        <div data-testid="page">page content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(screen.getByText('page content')).toBeInTheDocument();
  });
});
