import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';
import DownloadsPage from '@/app/(info)/downloads/page';
import VersionPage from '@/app/(info)/version/page';
import NotFoundPage from '@/app/not-found';
import ErrorPage from '@/app/error';

describe('AboutPage', () => {
  it('renders the about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText(/End-to-end style privacy/)).toBeInTheDocument();
    expect(screen.getByText('Phase 1 complete')).toBeInTheDocument();
  });
});

describe('DownloadsPage', () => {
  it('lists all platforms with download links', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Web (PWA)')).toBeInTheDocument();
    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('Android')).toBeInTheDocument();
    expect(screen.getByText('iOS')).toBeInTheDocument();
    expect(screen.getAllByText('Download').length).toBeGreaterThan(0);
  });
});

describe('VersionPage', () => {
  it('renders the version details', () => {
    render(<VersionPage />);
    expect(screen.getAllByText('Version').length).toBeGreaterThan(0);
    expect(screen.getByText('0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Phase 1 complete')).toBeInTheDocument();
    expect(
      screen.getByText('app-hybrid-social-networking-messaging-latest')
    ).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('offers a way back to the app', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to chats')).toBeInTheDocument();
  });
});

describe('ErrorPage', () => {
  it('shows the error message and retries', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('boom')).toBeInTheDocument();
    screen.getByText('Try again').click();
    expect(reset).toHaveBeenCalled();
  });

  it('falls back to a generic message', () => {
    render(<ErrorPage error={new Error('')} reset={jest.fn()} />);
    expect(
      screen.getByText(/An unexpected error occurred/)
    ).toBeInTheDocument();
  });
});
