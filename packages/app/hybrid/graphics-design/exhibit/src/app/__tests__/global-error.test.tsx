import { render, screen, fireEvent } from '@testing-library/react';
import GlobalErrorPage from '@/app/global-error';

describe('GlobalErrorPage', () => {
  it('renders 500 and try again button', () => {
    const reset = jest.fn();
    render(<GlobalErrorPage error={new Error('test')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    const reset = jest.fn();
    render(<GlobalErrorPage error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});
