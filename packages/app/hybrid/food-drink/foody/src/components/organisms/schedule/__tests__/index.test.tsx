import { render, screen } from '@testing-library/react';
import { SHELDON_SCHEDULE } from '@/data';
import { FoodSchedule } from '../index';

describe('FoodSchedule', () => {
  it('renders one row per weekday with the Sheldon quote', () => {
    render(<FoodSchedule today="Monday" />);
    expect(screen.getByTestId('schedule-table')).toBeInTheDocument();
    expect(screen.getAllByTestId('schedule-row')).toHaveLength(
      SHELDON_SCHEDULE.length
    );
    expect(
      screen.getByText(/fluctuating weekly dining schedule/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Sheldon Cooper/)).toBeInTheDocument();
  });

  it('highlights the active day when it matches today', () => {
    render(<FoodSchedule today="Wednesday" />);
    const rows = screen.getAllByTestId('schedule-row');
    expect(rows).toHaveLength(SHELDON_SCHEDULE.length);
    const wednesday = rows.find(
      (row) => row.getAttribute('data-today') !== null
    );
    expect(wednesday).toBeDefined();
    expect(wednesday?.textContent).toContain('Wednesday');
  });

  it('shows the canonical meal for each day', () => {
    render(<FoodSchedule today="Thursday" />);
    expect(screen.getByText(/Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/Thai/)).toBeInTheDocument();
    expect(screen.getByText(/Chinese/)).toBeInTheDocument();
    expect(screen.getByText(/Siam Palace/)).toBeInTheDocument();
  });
});
