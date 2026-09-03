import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../error';

describe('ErrorBoundary', () => {
  it('renders 500 and try again button', () => {
    const reset = jest.fn();
    render(<ErrorBoundary error={new Error('test')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    const reset = jest.fn();
    render(<ErrorBoundary error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(reset).toHaveBeenCalled();
  });
});
