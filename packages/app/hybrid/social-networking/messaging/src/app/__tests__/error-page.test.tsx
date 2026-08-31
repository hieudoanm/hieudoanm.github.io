import { render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';

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
