import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';
import GlobalError from '@/app/global-error';
import HomePage from '@/app/page';
import LoadingPage from '@/app/loading';
import LogMARPage from '@/app/logmar/page';
import ForbiddenPage from '@/app/forbidden';
import NotFoundPage from '@/app/not-found';
import SnellenPage from '@/app/snellen/page';
import TumblingEPage from '@/app/tumbling-e/page';
import UnauthorizedPage from '@/app/unauthorized';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('HomePage', () => {
  it('renders the app heading and chart cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Eyes');
    expect(screen.getByTestId('chart-card-snellen')).toBeInTheDocument();
    expect(screen.getByTestId('chart-card-logmar')).toBeInTheDocument();
    expect(screen.getByTestId('chart-card-tumbling-e')).toBeInTheDocument();
  });
});

describe('Chart pages', () => {
  it.each([
    ['snellen', SnellenPage],
    ['logmar', LogMARPage],
    ['tumbling-e', TumblingEPage],
  ])('%s page renders a fullscreen chart modal', (_slug, Page) => {
    render(<Page />);
    expect(document.querySelector('dialog.modal-open')).not.toBeNull();
  });
});

describe('ErrorPage', () => {
  it('renders the 500 template and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
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

describe('Forbidden and unauthorized pages', () => {
  it('renders the 403 template', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
  });

  it('renders the 401 template', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading-spinner')).not.toBeNull();
  });
});
