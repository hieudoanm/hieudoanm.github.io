import { fireEvent, render, screen } from '@testing-library/react';
import RootLayout from '../layout';
import HomePage from '../page';
import ErrorPage from '../error';
import GlobalErrorPage from '../global-error';
import NotFoundPage from '../not-found';
import { ThemeEditorLayout } from '@/layout';

describe('RootLayout', () => {
  it('renders html with lang and theme attributes', () => {
    render(
      <RootLayout>
        <p>child content</p>
      </RootLayout>
    );
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('exports metadata and viewport', async () => {
    const { metadata, viewport } = await import('../layout');
    expect(metadata.title).toBe('Boilerplate');
    expect(metadata.manifest).toBe('/manifest.json');
    expect(viewport.width).toBe('device-width');
  });
});

describe('HomePage', () => {
  it('renders the components template', () => {
    render(
      <ThemeEditorLayout>
        <HomePage />
      </ThemeEditorLayout>
    );
    expect(screen.getByRole('button', { name: 'Components' })).toHaveClass(
      'tab-active'
    );
    expect(
      screen.getByRole('button', { name: 'Color Palette' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pages' })).toBeInTheDocument();
  });
});

describe('ErrorPage', () => {
  it('renders 500 error with reset action', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});

describe('GlobalErrorPage', () => {
  it('renders global error boundary and triggers reset', () => {
    const reset = jest.fn();
    render(<GlobalErrorPage error={new Error('fatal')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});

describe('NotFoundPage', () => {
  it('renders 404 with go home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
