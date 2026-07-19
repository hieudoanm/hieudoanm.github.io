import { fireEvent, render, screen } from '@testing-library/react';
import { MatchDetailTemplate } from '../MatchDetailTemplate';

describe('MatchDetailTemplate', () => {
  it('renders match details with venue, date and events', () => {
    render(<MatchDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Match' })).toBeInTheDocument();
    expect(screen.getAllByText('FC Riverside')).toHaveLength(3);
    expect(screen.getAllByText('Atlas United')).toHaveLength(3);
    expect(screen.getByText('2 — 1')).toBeInTheDocument();
    expect(screen.getByText('Riverside Arena')).toBeInTheDocument();
    expect(screen.getByText('Aug 7, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('Goal')).toHaveLength(3);
    expect(screen.getAllByText('Card')).toHaveLength(1);
    expect(screen.getByText('Mateo Silva')).toBeInTheDocument();
  });

  it('toggles the follow match button to Following', () => {
    render(<MatchDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Follow match' }));
    expect(
      screen.getByRole('button', { name: 'Following' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Following')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Following' }));
    expect(
      screen.getByRole('button', { name: 'Follow match' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Following')).not.toBeInTheDocument();
  });
});
