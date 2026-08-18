import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';
import GlobalError from '@/app/global-error';

describe('ErrorPage', () => {
  it('renders the 500 template and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('GlobalError', () => {
  it('renders the 500 template inside an html document', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});
