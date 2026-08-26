import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';
import ForbiddenPage from '@/app/forbidden';
import GlobalError from '@/app/global-error';
import HomePage from '@/app/page';
import LoadingPage from '@/app/loading';
import NotFoundPage from '@/app/not-found';
import UnauthorizedPage from '@/app/unauthorized';

global.fetch = jest.fn() as unknown as typeof global.fetch;

describe('HomePage', () => {
  it('renders the app heading and tool cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'History'
    );
    ['through-the-years', 'myth-vs-fact'].forEach((slug) => {
      expect(screen.getByTestId(`tool-card-${slug}`)).toBeInTheDocument();
    });
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
