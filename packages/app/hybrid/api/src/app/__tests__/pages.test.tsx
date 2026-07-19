import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '../error';
import NotFoundPage from '../not-found';
import AboutPage from '../about/page';
import VersionPage from '../version/page';
import HomePage from '../page';

describe('ErrorPage', () => {
  it('renders 500 with reset action', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('NotFoundPage', () => {
  it('renders 404 with home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toHaveAttribute('href', '/');
  });
});

describe('AboutPage', () => {
  it('renders about info', () => {
    render(<AboutPage />);
    expect(screen.getByText('API Client')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
  });
});

describe('VersionPage', () => {
  it('renders the current build version', () => {
    render(<VersionPage />);
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });
});

describe('HomePage', () => {
  it('renders the api client ready to use', () => {
    render(<HomePage />);
    expect(screen.getByLabelText('HTTP method')).toHaveValue('GET');
    expect(screen.getByLabelText('Request URL')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('No requests yet')).toBeInTheDocument();
  });

  it('renders navigation links to info pages', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
      'href',
      '/settings'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version'
    );
  });
});
