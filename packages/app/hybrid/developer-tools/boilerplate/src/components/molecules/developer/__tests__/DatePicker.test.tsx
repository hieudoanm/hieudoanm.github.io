import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
  it('shows the placeholder when no value is selected', () => {
    render(<DatePicker onChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Select date' })
    ).toBeInTheDocument();
  });

  it('shows the formatted value when selected', () => {
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: /Aug 15, 2026/ })
    ).toBeInTheDocument();
  });

  it('opens the calendar and selects a date', () => {
    const onChange = jest.fn();
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Aug 15, 2026/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mon Aug 17 2026' }));
    expect(onChange).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates months', () => {
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Aug 15, 2026/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('September 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('August 2026')).toBeInTheDocument();
  });

  it('disables dates outside the min and max bounds', () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        value={new Date(2026, 7, 15)}
        onChange={onChange}
        minDate={new Date(2026, 7, 20)}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Aug 15, 2026/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Mon Aug 17 2026' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
