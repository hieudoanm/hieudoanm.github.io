import { fireEvent, render, screen } from '@testing-library/react';
import { TeamTemplate } from '../TeamTemplate';

describe('TeamTemplate', () => {
  it('renders the heading and team members', () => {
    render(<TeamTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Meet the team' })
    ).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Linus Torvalds')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Engineering' })
    ).toBeInTheDocument();
  });

  it('filters members by department', () => {
    render(<TeamTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
    expect(screen.getByText('Linus Torvalds')).toBeInTheDocument();
  });

  it('marks a member as connected after clicking Connect', () => {
    render(<TeamTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Connect' })[0]);
    expect(screen.getAllByText('Connected').length).toBeGreaterThan(0);
  });
});
