import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorPage from '../error';

describe('ErrorPage', () => {
  it('renders the 500 error code and description', () => {
    render(<ErrorPage error={new Error('boom')} reset={jest.fn()} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('calls reset when the Try again button is clicked', async () => {
    const reset = jest.fn();
    const user = userEvent.setup();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);

    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});
