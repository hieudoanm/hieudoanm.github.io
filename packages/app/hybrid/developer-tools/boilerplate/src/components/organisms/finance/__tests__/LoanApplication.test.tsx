import { fireEvent, render, screen } from '@testing-library/react';
import { LoanApplication } from '../LoanApplication';

describe('LoanApplication', () => {
  it('submits the loan request when all fields are filled', () => {
    const onSubmit = jest.fn();
    render(<LoanApplication onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId('full-name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByTestId('amount'), {
      target: { value: '10000' },
    });
    fireEvent.change(screen.getByTestId('term'), { target: { value: '24' } });
    fireEvent.change(screen.getByTestId('purpose'), {
      target: { value: 'home' },
    });
    fireEvent.click(screen.getByText('Submit application'));

    expect(onSubmit).toHaveBeenCalledWith({
      fullName: 'Jane Doe',
      amount: 10000,
      termMonths: 24,
      purpose: 'home',
    });
  });

  it('shows a validation error when required fields are missing', () => {
    const onSubmit = jest.fn();
    render(<LoanApplication onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Submit application'));
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Please fill in all required fields.'
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders the default title', () => {
    render(<LoanApplication onSubmit={jest.fn()} />);
    expect(screen.getByText('Loan application')).toBeInTheDocument();
  });
});
