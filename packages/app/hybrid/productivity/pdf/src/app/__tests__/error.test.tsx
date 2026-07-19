import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '../error';

describe('ErrorPage', () => {
  it('renders the 500 code and description', () => {
    render(<ErrorPage error={new Error('boom')} reset={jest.fn()} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders the try again button', () => {
    render(<ErrorPage error={new Error('boom')} reset={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});
