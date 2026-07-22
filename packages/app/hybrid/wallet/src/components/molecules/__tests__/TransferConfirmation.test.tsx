import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransferConfirmation from '../TransferConfirmation';

describe('TransferConfirmation', () => {
  const defaultProps = {
    recipient: 'John Doe',
    amount: '100',
    note: 'Lunch',
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
  };

  it('renders confirm title', () => {
    render(<TransferConfirmation {...defaultProps} />);
    expect(screen.getByText('Confirm Transfer')).toBeInTheDocument();
  });

  it('renders recipient name', () => {
    render(<TransferConfirmation {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders formatted amount', () => {
    render(<TransferConfirmation {...defaultProps} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('renders note when provided', () => {
    render(<TransferConfirmation {...defaultProps} />);
    expect(screen.getByText('Lunch')).toBeInTheDocument();
  });

  it('does not render note when empty', () => {
    render(<TransferConfirmation {...defaultProps} note="" />);
    expect(screen.queryByText('Lunch')).not.toBeInTheDocument();
  });

  it('calls onCancel when Cancel is clicked', async () => {
    const onCancel = jest.fn();
    render(<TransferConfirmation {...defaultProps} onCancel={onCancel} />);
    await userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onConfirm when Confirm is clicked', async () => {
    const onConfirm = jest.fn();
    render(<TransferConfirmation {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();
  });
});
