import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '../global-error';

describe('GlobalError', () => {
  it('renders error template', () => {
    render(<GlobalError error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<GlobalError error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls reset on button click', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });

  it('renders description', () => {
    render(<GlobalError error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
