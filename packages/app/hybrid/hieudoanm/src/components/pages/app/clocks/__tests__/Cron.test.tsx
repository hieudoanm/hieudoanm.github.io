import { render, fireEvent, screen } from '@testing-library/react';
import { Cron } from '../CronModal';

describe('Cron', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 0, 15, 10, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders modal title', () => {
    render(<Cron onClose={onClose} />);
    expect(screen.getByText('Cron')).toBeInTheDocument();
  });

  it('renders all preset buttons', () => {
    render(<Cron onClose={onClose} />);
    expect(screen.getByText('Every min')).toBeInTheDocument();
    expect(screen.getByText('Every 5m')).toBeInTheDocument();
    expect(screen.getByText('Every hour')).toBeInTheDocument();
    expect(screen.getByText('Every day')).toBeInTheDocument();
  });

  it('renders the expression part labels', () => {
    render(<Cron onClose={onClose} />);
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('DOW')).toBeInTheDocument();
  });

  it('shows Every minute description', () => {
    render(<Cron onClose={onClose} />);
    expect(screen.getByText('Every minute')).toBeInTheDocument();
  });

  it('applies Every hour preset and shows updated expression', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Every hour'));
    const minuteParts = screen.getAllByText('0');
    expect(minuteParts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Hour')).toBeInTheDocument();
  });

  it('applies Every day preset', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Every day'));
    const minuteParts = screen.getAllByText('0');
    const hourParts = screen.getAllByText('0');
    expect(minuteParts.length).toBeGreaterThanOrEqual(1);
    expect(hourParts.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles edit mode and shows input fields', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(5);
  });

  it('changes expression when edit field is modified', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '0' } });
    expect(inputs[0]).toHaveValue('0');
  });

  it('switches back to view mode after cancel', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('shows Invalid expression when empty field produces bad expression', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[4], { target: { value: '' } });
    expect(screen.getByText('Invalid expression')).toBeInTheDocument();
  });

  it('shows subtitle description for Every hour preset', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Every hour'));
    const everyHourEls = screen.getAllByText('Every hour');
    expect(everyHourEls.length).toBeGreaterThanOrEqual(2);
  });

  it('shows edit mode with range hints', () => {
    render(<Cron onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('0-59')).toBeInTheDocument();
    expect(screen.getByText('0-23')).toBeInTheDocument();
    expect(screen.getByText('1-31')).toBeInTheDocument();
    expect(screen.getByText('1-12')).toBeInTheDocument();
    expect(screen.getByText('0-7')).toBeInTheDocument();
  });

  it('renders footer note', () => {
    render(<Cron onClose={onClose} />);
    expect(screen.getByText(/Click outside to close/)).toBeInTheDocument();
  });
});
