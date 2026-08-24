import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import ErrorPage from '@/app/error';
import FlashcardsPage from '@/app/flashcards/page';
import ForbiddenPage from '@/app/forbidden';
import GlobalError from '@/app/global-error';
import HomePage from '@/app/page';
import LoadingPage from '@/app/loading';
import NotFoundPage from '@/app/not-found';
import UnauthorizedPage from '@/app/unauthorized';
import AboutPage from '@/app/(info)/about/page';
import DownloadsPage from '@/app/(info)/downloads/page';
import VersionPage from '@/app/(info)/version/page';

const mockCreate = jest.fn();
jest.mock('onnxruntime-web', () => ({
  InferenceSession: { create: (...args: unknown[]) => mockCreate(...args) },
  Tensor: jest.fn(),
}));

jest.mock('@mediapipe/hands', () => ({
  Hands: jest.fn(() => ({
    setOptions: jest.fn(),
    onResults: jest.fn(),
    send: jest.fn(),
  })),
  HAND_CONNECTIONS: [],
}));

jest.mock('@mediapipe/camera_utils', () => ({
  Camera: jest.fn(() => ({
    start: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn(),
  })),
}));

jest.mock('@mediapipe/drawing_utils', () => ({
  drawConnectors: jest.fn(),
  drawLandmarks: jest.fn(),
}));

global.fetch = jest.fn() as unknown as typeof global.fetch;

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('HomePage', () => {
  it('renders the app heading and course cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Lingo'
    );
    ['flashcards', 'english', 'sign'].forEach((slug) => {
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
  it('flashcards page renders the deck selector', async () => {
    render(
      <Wrapper>
        <FlashcardsPage />
      </Wrapper>
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Language')).toBeInTheDocument()
    );
  });
});

describe('Info pages', () => {
  it('about page lists stack details', () => {
    render(<AboutPage />);
    expect(
      screen.getAllByRole('heading', { name: 'Lingo' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Framework')).toBeInTheDocument();
  });

  it('downloads page lists installers', () => {
    render(<DownloadsPage />);
    expect(screen.getByText('Installers')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download .dmg' })).toHaveAttribute(
      'href',
      expect.stringContaining('lingo_aarch64.dmg')
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
