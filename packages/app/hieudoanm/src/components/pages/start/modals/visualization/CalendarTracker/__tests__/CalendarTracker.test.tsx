import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { CalendarTrackerModal } from '..';

jest.mock('../components/DailyView', () => ({
  DailyView: () => <div>Daily View</div>,
}));
jest.mock('../components/WeeklyView', () => ({
  WeeklyView: () => <div>Weekly View</div>,
}));
jest.mock('../components/MonthlyView', () => ({
  MonthlyView: () => <div>Monthly View</div>,
}));
jest.mock('../components/QuarterlyView', () => ({
  QuarterlyView: () => <div>Quarterly View</div>,
  HalfView: () => <div>Half View</div>,
}));

describe('CalendarTrackerModal', () => {
  const onClose = jest.fn();

  it('renders modal title', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    expect(screen.getByText('Calendar Tracker')).toBeInTheDocument();
  });

  it('renders Daily view by default', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    expect(screen.getByText('Daily View')).toBeInTheDocument();
  });

  it('renders Weekday toggle', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    expect(screen.getByText('Weekday')).toBeInTheDocument();
  });

  it('toggles Weekday', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Weekday'));
    expect(screen.getByText('Weekday')).toBeInTheDocument();
  });

  it('shows view dropdown', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    expect(screen.getByText('Daily')).toBeInTheDocument();
  });

  it('renders Previous and Next buttons', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders year select', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    expect(document.querySelector('select[name="year"]')).toBeInTheDocument();
  });

  it('switches to Weekly view', async () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Daily'));
    fireEvent.click(screen.getByText('weekly'));
    await waitFor(() => {
      expect(screen.getByText('Weekly View')).toBeInTheDocument();
    });
  });

  it('switches to Monthly view', async () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Daily'));
    fireEvent.click(screen.getByText('monthly'));
    await waitFor(() => {
      expect(screen.getByText('Monthly View')).toBeInTheDocument();
    });
  });

  it('switches to Quarterly view', async () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Daily'));
    fireEvent.click(screen.getByText('quarterly'));
    await waitFor(() => {
      expect(screen.getByText('Quarterly View')).toBeInTheDocument();
    });
  });

  it('switches to Half view', async () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Daily'));
    fireEvent.click(screen.getByText('half'));
    await waitFor(() => {
      expect(screen.getByText('Half View')).toBeInTheDocument();
    });
  });

  it('hides Weekday button for non-daily/weekly views', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Daily'));
    fireEvent.click(screen.getByText('monthly'));
    expect(screen.queryByText('Weekday')).not.toBeInTheDocument();
  });

  it('changes year with Previous button', () => {
    const currentYear = new Date().getFullYear();
    render(<CalendarTrackerModal onClose={onClose} />);
    const select = document.querySelector(
      'select[name="year"]'
    ) as HTMLSelectElement;
    expect(select.value).toBe(String(currentYear));
    fireEvent.click(screen.getByText('Previous'));
    expect(select.value).toBe(String(currentYear - 1));
  });

  it('changes year with Next button', () => {
    const currentYear = new Date().getFullYear();
    render(<CalendarTrackerModal onClose={onClose} />);
    const select = document.querySelector(
      'select[name="year"]'
    ) as HTMLSelectElement;
    fireEvent.click(screen.getByText('Next'));
    expect(select.value).toBe(String(currentYear + 1));
  });

  it('changes year via select', () => {
    render(<CalendarTrackerModal onClose={onClose} />);
    const select = document.querySelector(
      'select[name="year"]'
    ) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '2000' } });
    expect(select.value).toBe('2000');
  });
});
