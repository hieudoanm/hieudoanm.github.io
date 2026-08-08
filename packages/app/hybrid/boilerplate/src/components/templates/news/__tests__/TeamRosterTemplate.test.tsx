import { fireEvent, render, screen, within } from '@testing-library/react';
import { TeamRosterTemplate } from '../TeamRosterTemplate';

describe('TeamRosterTemplate', () => {
  it('renders the roster table with player details', () => {
    render(<TeamRosterTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Team Roster' })
    ).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getByText('8 players')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Rafael Cruz')).toBeInTheDocument();
    expect(within(table).getByText('Goalkeeper')).toBeInTheDocument();
    expect(within(table).getAllByText('Defender')).toHaveLength(2);
    expect(within(table).getAllByText('Midfielder')).toHaveLength(2);
    expect(within(table).getAllByText('Forward')).toHaveLength(3);
  });

  it('filters players by position tab', () => {
    render(<TeamRosterTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Defenders' }));
    expect(screen.getByText('2 players')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Omar Haddad')).toBeInTheDocument();
    expect(within(table).queryByText('Rafael Cruz')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Midfielders' }));
    expect(screen.getByText('2 players')).toBeInTheDocument();
    expect(within(table).getByText('Lukas Meyer')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Forwards' }));
    expect(screen.getByText('3 players')).toBeInTheDocument();
    expect(within(table).getAllByText('Forward')).toHaveLength(3);
  });
});
