import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickPayForm from '../QuickPayForm';

describe('QuickPayForm', () => {
  const defaultProps = {
    amount: '',
    onAmountChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('renders Quick Pay title', () => {
    render(<QuickPayForm {...defaultProps} />);
    expect(screen.getByText('Quick Pay')).toBeInTheDocument();
  });

  it('renders preset buttons', () => {
    render(<QuickPayForm {...defaultProps} />);
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('renders Send Payment button', () => {
    render(<QuickPayForm {...defaultProps} />);
    expect(screen.getByText('Send Payment')).toBeInTheDocument();
  });

  it('disables Send Payment when amount is empty', () => {
    render(<QuickPayForm {...defaultProps} />);
    expect(screen.getByText('Send Payment')).toBeDisabled();
  });

  it('calls onAmountChange when preset is clicked', async () => {
    const onAmountChange = jest.fn();
    render(<QuickPayForm {...defaultProps} onAmountChange={onAmountChange} />);
    await userEvent.click(screen.getByText('$10'));
    expect(onAmountChange).toHaveBeenCalledWith('10');
  });
});
