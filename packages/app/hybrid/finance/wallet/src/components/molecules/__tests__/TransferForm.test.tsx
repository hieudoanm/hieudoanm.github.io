import { render, screen } from '@testing-library/react';
import TransferForm from '../TransferForm';
import { accounts } from '@/data/mock';

describe('TransferForm', () => {
  const defaultProps = {
    accounts,
    fromAccount: accounts[0].id,
    recipient: '',
    amount: '',
    note: '',
    onFromAccountChange: jest.fn(),
    onRecipientChange: jest.fn(),
    onAmountChange: jest.fn(),
    onNoteChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('renders all form fields', () => {
    render(<TransferForm {...defaultProps} />);
    expect(screen.getByText('From Account')).toBeInTheDocument();
    expect(screen.getByText('Recipient')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Note (optional)')).toBeInTheDocument();
  });

  it('renders account options in select', () => {
    render(<TransferForm {...defaultProps} />);
    expect(screen.getByText(/Main Checking/)).toBeInTheDocument();
    expect(screen.getByText(/Savings/)).toBeInTheDocument();
  });

  it('renders Continue button', () => {
    render(<TransferForm {...defaultProps} />);
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<TransferForm {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: /Continue/ })
    ).toBeInTheDocument();
  });
});
