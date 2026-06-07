jest.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      toDataURL: jest.fn(() => 'data:image/png;base64,'),
      toBlob: jest.fn((cb: (b: Blob | null) => void) => cb(new Blob())),
    })
  ),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { SplitBillModal } from '../index';

describe('SplitBillModal', () => {
  it('renders equal split tab by default', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    expect(screen.getByText('Split Bill')).toBeInTheDocument();
    expect(
      screen.getByText('Equal Split').classList.contains('tab-active')
    ).toBe(true);
  });

  it('switches to settle tab', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    expect(
      screen.getByText('Who Owes Who').classList.contains('tab-active')
    ).toBe(true);
  });

  it('computes settlements', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const settleButton = screen.getAllByText('Settle Up')[0];
    fireEvent.click(settleButton);
    expect(screen.getAllByText(/pays/).length).toBeGreaterThan(0);
  });

  it('adds a person', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    fireEvent.click(screen.getByText('+ Add Person'));
    const nameInputs = screen.getAllByPlaceholderText('Name');
    expect(nameInputs).toHaveLength(4);
  });

  it('removes a person', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const removeButtons = screen.getAllByText('✕');
    fireEvent.click(removeButtons[removeButtons.length - 1]);
    const nameInputs = screen.getAllByPlaceholderText('Name');
    expect(nameInputs).toHaveLength(2);
  });

  it('shows all settled when no debts remain', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const nameInputs = screen.getAllByPlaceholderText('Name');
    const paidInputs = screen.getAllByPlaceholderText('Paid');
    fireEvent.change(nameInputs[0], { target: { value: 'Alice' } });
    fireEvent.change(paidInputs[0], { target: { value: '0' } });
    fireEvent.change(nameInputs[1], { target: { value: 'Bob' } });
    fireEvent.change(paidInputs[1], { target: { value: '0' } });
    fireEvent.change(nameInputs[2], { target: { value: 'Carol' } });
    fireEvent.change(paidInputs[2], { target: { value: '0' } });
    const settleButton = screen.getAllByText('Settle Up')[0];
    fireEvent.click(settleButton);
    expect(screen.getByText('All settled ✓')).toBeInTheDocument();
  });

  it('updates bill amount', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const billInput = screen.getByDisplayValue('100');
    fireEvent.change(billInput, { target: { value: '200' } });
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();
  });

  it('updates number of people', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const peopleInput = screen.getByDisplayValue('2');
    fireEvent.change(peopleInput, { target: { value: '5' } });
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('does not set people below 1', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const peopleInput = screen.getByDisplayValue('2');
    fireEvent.change(peopleInput, { target: { value: '0' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('updates tip percentage', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const tipInput = screen.getByDisplayValue('10');
    fireEvent.change(tipInput, { target: { value: '15' } });
    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
  });

  it('updates tax percentage', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const taxInput = screen.getByDisplayValue('0');
    fireEvent.change(taxInput, { target: { value: '8' } });
    expect(screen.getByDisplayValue('8')).toBeInTheDocument();
  });

  it('updates person name in settle tab', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const nameInput = screen.getByDisplayValue('Alice');
    fireEvent.change(nameInput, { target: { value: 'Alicia' } });
    expect(screen.getByDisplayValue('Alicia')).toBeInTheDocument();
  });

  it('updates person paid amount', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const paidInputs = screen.getAllByPlaceholderText('Paid');
    fireEvent.change(paidInputs[0], { target: { value: '150' } });
    expect(screen.getByDisplayValue('150')).toBeInTheDocument();
  });

  it('toggles split equally checkbox', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('changes currency', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const currencySelect = screen.getByDisplayValue('VND');
    fireEvent.change(currencySelect, { target: { value: 'USD' } });
    expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<SplitBillModal onClose={onClose} />);
    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows owes input when split equally is unchecked', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    const owesInputs = screen.getAllByPlaceholderText('Owes');
    expect(owesInputs.length).toBeGreaterThan(0);
  });

  it('updates owes value when split equally is off', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Who Owes Who'));
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    const owesInputs = screen.getAllByPlaceholderText('Owes');
    fireEvent.change(owesInputs[0], { target: { value: '50' } });
    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
  });

  it('clicks download PNG button', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const downloadBtn = screen.getByText('⬇ PNG');
    fireEvent.click(downloadBtn);
  });

  it('clicks copy button', () => {
    render(<SplitBillModal onClose={jest.fn()} />);
    const copyBtn = screen.getByText('📋 Copy');
    fireEvent.click(copyBtn);
  });
});
