import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorPage } from '../ErrorPage';

describe('ErrorPage', () => {
  it('renders a 404 state with a home link', () => {
    render(<ErrorPage statusCode={404} />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
  });

  it('renders a 500 state with error message and reset', () => {
    const reset = jest.fn();
    render(
      <ErrorPage statusCode={500} error={new Error('failure')} reset={reset} />
    );
    expect(screen.getByText('Internal server error')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Something went wrong on our end. Please try again later.'
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(reset).toHaveBeenCalled();
  });

  it('renders a custom title and message', () => {
    render(<ErrorPage title="Custom" message="Message" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('renders the error digest', () => {
    const error = new Error('x') as Error & { digest?: string };
    error.digest = 'abc123';
    render(<ErrorPage error={error} />);
    expect(screen.getByText('Error ID: abc123')).toBeInTheDocument();
  });

  it('falls back to the default title', () => {
    render(<ErrorPage />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred.')
    ).toBeInTheDocument();
  });
});
