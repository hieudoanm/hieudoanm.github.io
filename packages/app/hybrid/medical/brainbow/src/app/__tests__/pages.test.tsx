import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';
import GlobalError from '@/app/global-error';
import NotFoundPage from '@/app/not-found';
import RootLayout, { metadata, viewport } from '@/app/layout';

jest.mock('@/hooks/useSWRegister', () => ({
  useSWRegister: jest.fn(),
}));

jest.mock('@/hooks/useUpdater', () => ({
  useUpdater: jest.fn(),
}));

jest.mock('@/hooks/useOffline', () => ({
  useOffline: jest.fn(() => false),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('ErrorPage', () => {
  it('renders the 500 template and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('GlobalError', () => {
  it('renders the 500 template inside an html document', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('NotFoundPage', () => {
  it('renders the 404 template with a home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

describe('RootLayout', () => {
  it('exposes layout metadata', () => {
    expect(metadata).toMatchObject({
      title: 'Brainbow',
      description: 'Brainbow microscopy image viewer and annotator',
      manifest: '/manifest.json',
    });
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      title: 'Brainbow',
    });
  });

  it('exposes a fixed viewport', () => {
    expect(viewport).toEqual({
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    });
  });

  it('renders children inside the providers', () => {
    render(
      <RootLayout>
        <div data-testid="page">page content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
  });
});
