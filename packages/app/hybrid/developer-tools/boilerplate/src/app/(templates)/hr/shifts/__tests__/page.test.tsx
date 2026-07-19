import { render, screen } from '@testing-library/react';
import ShiftSchedulePage from '@/app/(templates)/hr/shifts/page';

describe('ShiftSchedulePage', () => {
  it('renders the ShiftSchedulePage', () => {
    render(<ShiftSchedulePage />);
    expect(screen.getByText('7 shifts this week')).toBeInTheDocument();
  });
});
