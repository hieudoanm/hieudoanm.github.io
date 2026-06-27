import { fireEvent, render, screen } from '@testing-library/react';
import { DaysCountModal } from '../DaysCountModal';
import { daysBetween } from '../DaysCountModal/utils';

describe('daysBetween', () => {
  it('returns 0 for same date', () => {
    const d = new Date('2024-06-15');
    expect(daysBetween(d, d)).toEqual({
      totalDays: 0,
      years: 0,
      months: 0,
      days: 0,
    });
  });

  it('counts consecutive days', () => {
    const result = daysBetween(new Date('2024-01-01'), new Date('2024-01-02'));
    expect(result.totalDays).toBe(1);
    expect(result.days).toBe(1);
  });

  it('counts across month boundary', () => {
    const result = daysBetween(new Date('2024-01-31'), new Date('2024-02-01'));
    expect(result.totalDays).toBe(1);
    expect(result.days).toBe(1);
  });

  it('counts across year boundary', () => {
    const result = daysBetween(new Date('2023-12-31'), new Date('2024-01-01'));
    expect(result.totalDays).toBe(1);
    expect(result.days).toBe(1);
  });

  it('calculates exactly one year in leap year', () => {
    const result = daysBetween(new Date('2023-01-01'), new Date('2024-01-01'));
    expect(result.totalDays).toBe(365);
    expect(result.years).toBe(1);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
  });

  it('handles leap year Feb 28 to Mar 1', () => {
    const result = daysBetween(new Date('2024-02-28'), new Date('2024-03-01'));
    expect(result.totalDays).toBe(2);
    expect(result.days).toBe(2);
  });

  it('handles non-leap year Feb 28 to Mar 1', () => {
    const result = daysBetween(new Date('2023-02-28'), new Date('2023-03-01'));
    expect(result.totalDays).toBe(1);
    expect(result.days).toBe(1);
  });

  it('swaps from and to when from > to', () => {
    const result = daysBetween(new Date('2024-06-20'), new Date('2024-06-15'));
    expect(result.totalDays).toBe(5);
    expect(result.days).toBe(5);
  });

  it('returns years, months, and days for large range', () => {
    const result = daysBetween(new Date('2020-01-15'), new Date('2024-06-23'));
    expect(result.years).toBe(4);
    expect(result.months).toBe(5);
    expect(result.days).toBe(8);
    expect(result.totalDays).toBeGreaterThan(0);
  });

  it('handles end-of-month edge case Jan 31 to Feb 28 non-leap', () => {
    const result = daysBetween(new Date('2023-01-31'), new Date('2023-02-28'));
    expect(result.totalDays).toBe(28);
    expect(result.months).toBe(0);
    expect(result.days).toBe(28);
  });
});

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

  it('handles NaN dates gracefully', () => {
    const result = daysBetween(new Date('invalid'), new Date('2024-01-01'));
    expect(result.totalDays).toBeNaN();
    expect(result.years).toBeNaN();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<DaysCountModal onClose={onClose} />);
    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
