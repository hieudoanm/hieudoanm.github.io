import { fireEvent, render, screen } from '@testing-library/react';
import GlobalErrorPage from '../global-error';

describe('GlobalErrorPage', () => {
  it('renders global error and resets', () => {
    const reset = jest.fn();
    render(<GlobalErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
