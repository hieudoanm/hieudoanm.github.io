import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../ErrorPage';

describe('ErrorPage', () => {
  it('renders 404 status code', () => {
    render(<ErrorPage statusCode={404} />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders 500 status code', () => {
    render(<ErrorPage statusCode={500} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders default 404 title and message', () => {
    render(<ErrorPage statusCode={404} />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The page you are looking for does not exist or has been moved.'
      )
    ).toBeInTheDocument();
  });

  it('renders default 500 title and message', () => {
    render(<ErrorPage statusCode={500} />);
    expect(screen.getByText('Internal server error')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Something went wrong on our end. Please try again later.'
      )
    ).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(
      <ErrorPage
        statusCode={418}
        title="Custom error"
        message="Custom message"
      />
    );
    expect(screen.getByText('418')).toBeInTheDocument();
    expect(screen.getByText('Custom error')).toBeInTheDocument();
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('renders generic error when no status code provided', () => {
    render(<ErrorPage />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
  });

  it('renders a link to home page', () => {
    render(<ErrorPage statusCode={404} />);
    const link = screen.getByRole('link', { name: /Go home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
