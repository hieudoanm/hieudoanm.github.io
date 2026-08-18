import { fireEvent, render, screen } from '@testing-library/react';
import { OpenHousesTemplate } from '../OpenHousesTemplate';

describe('OpenHousesTemplate', () => {
  it('renders open house events', () => {
    render(<OpenHousesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Open Houses' })
    ).toBeInTheDocument();
    expect(screen.getByText('Tour homes this week.')).toBeInTheDocument();
    expect(screen.getByText('5 open houses this week')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(
      screen.getByText('Sat, Aug 15 · 10:00 AM - 12:00 PM')
    ).toBeInTheDocument();
    expect(screen.getByText('12 Maple Lane, Maple Grove')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Add to calendar' })
    ).toHaveLength(5);
  });

  it('adds an event to the calendar and toggles back', () => {
    render(<OpenHousesTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Add to calendar' })[0]
    );
    expect(screen.getAllByText('Added')).toHaveLength(1);
    expect(screen.getByText('Added')).toHaveClass('badge-success');
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Add to calendar' })[0]
    );
    expect(screen.queryAllByText('Added')).toHaveLength(0);
  });
});
