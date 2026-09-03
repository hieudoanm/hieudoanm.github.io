import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';
import ErrorBoundary from '../error';
import NotFound from '../not-found';
import AboutPage from '../(info)/about/page';
import VersionPage from '../(info)/version/page';

describe('app shell', () => {
  it('renders the root layout with children', () => {
    render(
      <RootLayout>
        <p>child</p>
      </RootLayout>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders the error boundary with reset', () => {
    const reset = jest.fn();
    render(<ErrorBoundary error={new global.Error('boom')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('renders the not-found page', () => {
    render(<NotFound />);
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
  });

  it('renders the about page', () => {
    render(<AboutPage />);
    expect(screen.getByText('Free Resume Builder')).toBeInTheDocument();
    expect(screen.getByText('32 Free Templates')).toBeInTheDocument();
    expect(screen.getByText('A3 · A4 · A5 · A6 · B5')).toBeInTheDocument();
  });

  it('renders the version page', async () => {
    render(<VersionPage />);
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /copy version/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/\d{4}\.\d{2}\.\d{2}/)).toBeInTheDocument();
  });
});
