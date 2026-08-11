import { fireEvent, render, screen } from '@testing-library/react';
import { OpeningTab } from '../OpeningTab';
import { newSchedule, selectSampleOpenings } from '../../utils/opening';

describe('OpeningTab', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows a due opening card', () => {
    render(<OpeningTab />);
    expect(screen.getByText(/Openings \(spaced repetition\)/)).toBeInTheDocument();
    expect(screen.getByText('Reveal')).toBeInTheDocument();
  });

  it('reveals the move sequence and records a review', () => {
    render(<OpeningTab />);
    fireEvent.click(screen.getByText('Reveal'));
    expect(screen.getByText(/1\./)).toBeInTheDocument();
    fireEvent.click(screen.getByText('5'));
    const summary = screen.getByText(/Reviewed this session/);
    expect(summary.textContent).toContain('1');
  });

  it('loads a persisted schedule with no due cards', () => {
    const cards = selectSampleOpenings(32);
    const fresh = newSchedule(cards);
    const future = fresh.map((s) => ({
      ...s,
      due: Date.now() + 100000,
    }));
    localStorage.setItem('chess-openings-schedule', JSON.stringify(future));
    render(<OpeningTab />);
    expect(screen.getByText(/All caught up/)).toBeInTheDocument();
  });
});
