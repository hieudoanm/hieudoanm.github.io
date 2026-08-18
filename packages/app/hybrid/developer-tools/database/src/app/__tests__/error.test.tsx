import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '@/app/error';

describe('ErrorPage', () => {
  it('renders the 500 template', () => {
    render(<ErrorPage error={new Error('boom')} reset={() => {}} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('calls reset when Try again is clicked', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
