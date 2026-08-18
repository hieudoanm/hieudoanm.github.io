import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '../error';

describe('ErrorPage', () => {
  it('renders error template', () => {
    render(<ErrorPage error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<ErrorPage error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls reset on button click', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});
