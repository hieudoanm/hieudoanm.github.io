import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '@/app/error';

describe('ErrorPage', () => {
  it('renders error message and try again button', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('test')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});
