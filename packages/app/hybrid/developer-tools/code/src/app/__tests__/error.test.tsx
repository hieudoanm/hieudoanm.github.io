import { render, screen, fireEvent } from '@testing-library/react';
import AppErrorPage from '../error';

describe('Error page', () => {
  it('renders 500 with the default message', () => {
    const reset = jest.fn();
    render(<AppErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Internal server error')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Something went wrong on our end. Please try again later.'
      )
    ).toBeInTheDocument();
  });

  it('renders the error digest when present', () => {
    const error = new Error('boom') as Error & { digest?: string };
    error.digest = 'digest-123';
    render(<AppErrorPage error={error} reset={jest.fn()} />);
    expect(screen.getByText(/digest-123/)).toBeInTheDocument();
  });

  it('calls reset when Try again is clicked', () => {
    const reset = jest.fn();
    render(<AppErrorPage error={new Error('boom')} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));
    expect(reset).toHaveBeenCalled();
  });
});
