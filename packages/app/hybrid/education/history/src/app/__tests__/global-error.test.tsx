import { fireEvent, render, screen } from '@testing-library/react';
import GlobalError from '@/app/global-error';

describe('GlobalError', () => {
  it('renders the global error document shell', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});
