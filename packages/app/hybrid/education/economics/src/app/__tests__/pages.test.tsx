import { fireEvent, render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import ErrorPage from '@/app/error';
import PrisonerDilemmaPage from '@/app/prisoners-dilemma/page';
import ForbiddenPage from '@/app/forbidden';
import GlobalError from '@/app/global-error';
import HomePage from '@/app/page';
import LoadingPage from '@/app/loading';
import NotFoundPage from '@/app/not-found';
import UnauthorizedPage from '@/app/unauthorized';
import AboutPage from '@/app/(info)/about/page';
import DownloadsPage from '@/app/(info)/downloads/page';
import VersionPage from '@/app/(info)/version/page';

global.fetch = jest.fn() as unknown as typeof global.fetch;

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => children;

describe('HomePage', () => {
  it('renders the app heading and tool cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Economics'
    );
    ['prisoners-dilemma'].forEach((slug) => {
      expect(screen.getByTestId(`tool-card-${slug}`)).toBeInTheDocument();
    });
  });

  it('links to info pages in the footer', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/downloads'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version'
    );
  });
});

describe('Tool pages', () => {
  it('Tool page renders inside a tool shell', () => {
    render(
      <Wrapper>
        <PrisonerDilemmaPage />
      </Wrapper>
    );
    expect(screen.getByText('Cooperate')).toBeInTheDocument();
  });
});

describe('Info pages', () => {
  it('about page lists stack details', () => {
    render(<AboutPage />);
    expect(
      screen.getAllByRole('heading', { name: 'Economics' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Framework')).toBeInTheDocument();
  });

  it('downloads page lists installers', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('economics_aarch64.dmg')
    );
  });

  it('version page renders segments', () => {
    render(<VersionPage />);
    expect(screen.getByText('Year')).toBeInTheDocument();
  });
});

describe('Error pages', () => {
  it('renders the 500 template and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });

  it('renders the global error document shell', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });

  it('renders the 404 template with a home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders forbidden and unauthorized templates', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });

  it('renders a loading spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading-spinner')).not.toBeNull();
  });
});
