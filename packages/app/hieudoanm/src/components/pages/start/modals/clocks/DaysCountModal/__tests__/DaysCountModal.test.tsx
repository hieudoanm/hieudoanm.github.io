import { fireEvent, render, screen } from '@testing-library/react';
import { DaysCountModal } from '../index';

describe('DaysCountModal', () => {
  it('renders with two date inputs and Today buttons', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    expect(screen.getAllByText('Today')).toHaveLength(2);
    expect(screen.getAllByDisplayValue('')).toHaveLength(2);
  });

  it('updates from date on input change and shows result', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '2024-01-01' } });
    fireEvent.change(inputs[1], { target: { value: '2024-01-05' } });
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('4 d')).toBeInTheDocument();
  });

  it('shows result with years, months, days for large span', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '2020-01-15' } });
    fireEvent.change(inputs[1], { target: { value: '2024-06-23' } });
    expect(screen.getByText('4 y 5 m 8 d')).toBeInTheDocument();
  });

  it('fills from date with today on Today button click', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const todayStr = new Date().toISOString().split('T')[0];
    const buttons = screen.getAllByText('Today');
    fireEvent.click(buttons[0]);
    expect(screen.getByDisplayValue(todayStr)).toBeInTheDocument();
  });

  it('fills to date with today on Today button click', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const todayStr = new Date().toISOString().split('T')[0];
    const buttons = screen.getAllByText('Today');
    fireEvent.click(buttons[1]);
    expect(screen.getByDisplayValue(todayStr)).toBeInTheDocument();
  });

  it('shows 0 days when both dates are the same', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '2024-01-01' } });
    fireEvent.change(inputs[1], { target: { value: '2024-01-01' } });
    expect(screen.getByText('0 d')).toBeInTheDocument();
  });

  it('shows only days when span is less than a month', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '2024-06-01' } });
    fireEvent.change(inputs[1], { target: { value: '2024-06-15' } });
    expect(screen.getByText('14 d')).toBeInTheDocument();
    expect(screen.queryByText('0 y')).not.toBeInTheDocument();
    expect(screen.queryByText('0 m')).not.toBeInTheDocument();
  });

  it('does not show result when only from date is set', () => {
    render(<DaysCountModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '2024-01-01' } });
    expect(screen.queryByText('Total Days')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<DaysCountModal onClose={onClose} />);
    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
