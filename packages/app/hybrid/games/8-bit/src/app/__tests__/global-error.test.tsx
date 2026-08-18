import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '../global-error';

describe('GlobalError', () => {
  it('renders error code 500', () => {
    render(<GlobalError error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<GlobalError error={new Error('test')} reset={jest.fn()} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('calls reset when Try again clicked', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
