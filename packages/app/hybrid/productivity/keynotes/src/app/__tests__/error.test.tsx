import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '@/app/error';

describe('ErrorPage', () => {
  it('renders error message', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('test')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('test')} reset={reset} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(reset).toHaveBeenCalled();
  });
});
