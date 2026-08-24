import { render, screen } from '@testing-library/react';
import { StatusBar } from '../StatusBar';
import type { TeamInfo } from '@/data/touraments/types/bracket';

const teams: Record<string, TeamInfo> = {
  BRA: { id: 'BRA', name: 'Brazil', iso: 'br', flag: '' },
};

describe('StatusBar', () => {
  it('shows champion message when champ is set', () => {
    render(
      <StatusBar
        champ="BRA"
        currentLevel={null}
        maxLevel={3}
        decided={7}
        total={7}
        progress={100}
        teams={teams}
      />
    );
    expect(screen.getByText(/lifts the trophy/)).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('shows round info when no champ', () => {
    const { container } = render(
      <StatusBar
        champ={null}
        currentLevel={2}
        maxLevel={3}
        decided={3}
        total={7}
        progress={42}
        teams={teams}
      />
    );
    expect(screen.getByText(/matches decided/)).toBeInTheDocument();
    expect(container.textContent).toContain('3');
    expect(container.textContent).toContain('7');
  });

  it('shows dash when currentLevel is null and no champ', () => {
    render(
      <StatusBar
        champ={null}
        currentLevel={null}
        maxLevel={3}
        decided={0}
        total={7}
        progress={0}
        teams={teams}
      />
    );
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(
      <StatusBar
        champ={null}
        currentLevel={1}
        maxLevel={3}
        decided={5}
        total={10}
        progress={50}
        teams={teams}
      />
    );
    const bar = document.querySelector('.bg-gradient-to-r');
    expect(bar).toBeInTheDocument();
  });
});
