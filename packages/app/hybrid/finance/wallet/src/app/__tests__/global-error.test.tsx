import { render, screen } from '@testing-library/react';

import GlobalError from '../global-error';

describe('GlobalError', () => {
  it('renders error UI', () => {
    render(<GlobalError error={new Error('test')} reset={() => {}} />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('renders reset button', () => {
    render(<GlobalError error={new Error('test')} reset={() => {}} />);
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls reset when button is clicked', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('test')} reset={reset} />);
    screen.getByRole('button', { name: /try again/i }).click();
    expect(reset).toHaveBeenCalled();
  });
});
