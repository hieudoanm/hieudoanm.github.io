import { fireEvent, render, screen } from '@testing-library/react';
import { GlobalErrorTemplate } from '../GlobalErrorTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('GlobalErrorTemplate', () => {
  it('renders reset button and calls reset', () => {
    const reset = jest.fn();
    render(<GlobalErrorTemplate error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
