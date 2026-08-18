import { fireEvent, render, screen } from '@testing-library/react';
import { LiveMatchesTemplate } from '../LiveMatchesTemplate';

describe('LiveMatchesTemplate', () => {
  it('renders live matches with scores, arenas and live badges', () => {
    render(<LiveMatchesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live Matches' })
    ).toBeInTheDocument();
    expect(screen.getByText('Matches happening now.')).toBeInTheDocument();
    expect(screen.getByText('4 live matches')).toBeInTheDocument();
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
    expect(screen.getByText('Team Nova')).toBeInTheDocument();
    expect(screen.getByText('3 — 1')).toBeInTheDocument();
    expect(screen.getByText('Crimson Arena')).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(4);
  });

  it('toggles a match to watching', () => {
    render(<LiveMatchesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Watch' })[0]);
    expect(
      screen.getByRole('button', { name: 'Watching' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Watching')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(3);
    expect(screen.getAllByText('Live')).toHaveLength(4);
  });
});
