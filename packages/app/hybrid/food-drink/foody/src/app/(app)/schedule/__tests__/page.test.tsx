import { render, screen } from '@testing-library/react';
import SchedulePage from '@/app/(app)/schedule/page';

describe('SchedulePage', () => {
  it('renders the food schedule and heading', () => {
    render(<SchedulePage />);
    expect(screen.getByTestId('schedule-table')).toBeInTheDocument();
    expect(screen.getByText(/food schedule/i)).toBeInTheDocument();
  });
});
