import { fireEvent, render, screen, within } from '@testing-library/react';
import { MonitorsTemplate } from '../MonitorsTemplate';

describe('MonitorsTemplate', () => {
  it('renders monitors with the average uptime summary', () => {
    render(<MonitorsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Monitors' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Uptime')).toHaveLength(2);
    expect(screen.getByText('99.61%')).toBeInTheDocument();
    expect(screen.getByText('Production API')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Up')).toHaveLength(3);
    expect(within(table).getAllByText('Down')).toHaveLength(1);
    expect(within(table).getAllByText('Paused')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Pause' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Resume' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Retry' })).toHaveLength(1);
  });

  it('pauses and resumes a monitor', () => {
    render(<MonitorsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Pause' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Up')).toHaveLength(2);
    expect(within(table).getAllByText('Paused')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Resume' })).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Resume' })[0]);
    expect(within(table).getAllByText('Up')).toHaveLength(3);
    expect(within(table).getAllByText('Paused')).toHaveLength(1);
  });

  it('retries a down monitor', () => {
    render(<MonitorsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Retry' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Up')).toHaveLength(4);
    expect(within(table).queryAllByText('Down')).toHaveLength(0);
    expect(screen.queryAllByRole('button', { name: 'Retry' })).toHaveLength(0);
  });
});
