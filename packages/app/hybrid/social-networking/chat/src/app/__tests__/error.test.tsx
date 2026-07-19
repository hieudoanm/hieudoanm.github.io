import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '../error';

describe('ErrorPage', () => {
  it('renders the error template and calls reset', () => {
    const reset = jest.fn();
    const error = new Error('boom') as Error & { digest?: string };
    render(<ErrorPage error={error} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});
