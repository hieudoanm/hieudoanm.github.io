import { fireEvent, render, screen } from '@testing-library/react';
import TeamPage from '@/app/(templates)/landing/team/page';

describe('TeamPage', () => {
  it('renders all team members', () => {
    render(<TeamPage />);
    expect(screen.getByText('Meet the team')).toBeInTheDocument();
    expect(screen.getByText('6 team members')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });

  it('filters members by department', () => {
    render(<TeamPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('3 team members')).toBeInTheDocument();
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
  });

  it('connects to a member', () => {
    render(<TeamPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Connect' })[0]);
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });
});
