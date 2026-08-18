import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '../error';

describe('ErrorPage', () => {
  it('renders error code 500', () => {
    render(<ErrorPage error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ErrorPage error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('calls reset when Try again clicked', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
