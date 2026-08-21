import { fireEvent, render, screen } from '@testing-library/react';
import DefaultPage from '@/app/default';
import ErrorPage from '@/app/error';
import ForbiddenPage from '@/app/forbidden';
import GlobalError from '@/app/global-error';
import LoadingPage from '@/app/loading';
import NotFoundPage from '@/app/not-found';
import UnauthorizedPage from '@/app/unauthorized';
import PageTransitionTemplate from '@/app/template';
import RootLayout, { metadata, viewport } from '@/app/layout';

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

describe('ForbiddenPage', () => {
  it('renders the 403 template', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(
      screen.getByText('You do not have permission to access this page.')
    ).toBeInTheDocument();
  });
});

describe('UnauthorizedPage', () => {
  it('renders the 401 template', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(
      screen.getByText('You must be authenticated to access this page.')
    ).toBeInTheDocument();
  });
});

describe('DefaultPage', () => {
  it('renders nothing', () => {
    const { container } = render(<DefaultPage />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    render(<LoadingPage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });
});

describe('PageTransitionTemplate', () => {
  it('renders children with the page-in animation class', () => {
    render(
      <PageTransitionTemplate>
        <div data-testid="page">page content</div>
      </PageTransitionTemplate>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(screen.getByTestId('page').parentElement).toHaveClass(
      'animate-page-in'
    );
  });

  it('removes the animation class on animationend', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div>page content</div>
      </PageTransitionTemplate>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('animate-page-in');
    fireEvent.animationEnd(wrapper);
    expect(wrapper).not.toHaveClass('animate-page-in');
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
      title: 'MRI',
      description: 'MRI research workspace and orchestration layer',
      manifest: '/manifest.json',
    });
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      title: 'MRI',
    });
  });

  it('exposes a fixed viewport', () => {
    expect(viewport).toEqual({
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    });
  });

  it('renders children inside the theme shell', () => {
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
