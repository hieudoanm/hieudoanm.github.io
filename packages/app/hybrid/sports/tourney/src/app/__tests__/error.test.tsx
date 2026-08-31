import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';

describe('ErrorPage', () => {
  it('renders the app error page and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('kaboom')} reset={reset} />);
    expect(screen.getByText('kaboom')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});
