import { fireEvent, render, screen, within } from '@testing-library/react';
import { ShiftScheduleTemplate } from '../ShiftScheduleTemplate';

describe('ShiftScheduleTemplate', () => {
  it('renders all shifts and the summary', () => {
    render(<ShiftScheduleTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Shift Schedule' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 shifts this week')).toBeInTheDocument();
    expect(screen.getByText('Priya')).toBeInTheDocument();
    expect(screen.getAllByText('9:00-17:00')).toHaveLength(3);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Morning')).toHaveLength(3);
    expect(within(table).getAllByText('Evening')).toHaveLength(2);
  });

  it('filters shifts by day', () => {
    render(<ShiftScheduleTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Mon' }));
    expect(screen.getByText('2 shifts this week')).toBeInTheDocument();
    expect(screen.getByText('Omar')).toBeInTheDocument();
    expect(screen.queryByText('Lena')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fri' }));
    expect(screen.getByText('2 shifts this week')).toBeInTheDocument();
    expect(screen.getByText('Tom')).toBeInTheDocument();
    expect(screen.queryByText('Priya')).not.toBeInTheDocument();
  });
});
