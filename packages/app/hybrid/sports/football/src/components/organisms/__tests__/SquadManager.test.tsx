import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { SquadManager } from '@/components/organisms/SquadManager';
import { encodeLineup, encodeSquad } from '@/lib/share';
import { makePlayer, makeSquad } from '@/test/fixtures';
import { Squad } from '@/types/football';

const exampleSquad = (): Squad => ({
  id: 'example',
  name: 'Liverpool 2019-2020',
  formationId: '433',
  players: [
    makePlayer({ id: 'alisson', name: 'Alisson', number: 1, role: 'GK' }),
    makePlayer({ id: 'salah', name: 'Salah', number: 11, role: 'FWD' }),
  ],
  assignments: { '433-0-0': ['alisson'], '433-3-10': ['salah'] },
  presets: [],
  lineups: [],
  mirrored: false,
  primaryColor: '#dc2626',
});

const barcelonaSquad = (): Squad => ({
  id: 'example',
  name: 'Barcelona 2008-2009',
  formationId: '433',
  players: [
    makePlayer({ id: 'valdes', name: 'Valdés', number: 1, role: 'GK' }),
    makePlayer({ id: 'messi', name: 'Messi', number: 10, role: 'FWD' }),
    makePlayer({ id: 'eto', name: "Eto'o", number: 9, role: 'FWD' }),
  ],
  assignments: {
    '433-0-0': ['valdes'],
    '433-3-8': ['messi'],
    '433-3-9': ['eto'],
  },
  presets: [],
  lineups: [],
  mirrored: false,
  primaryColor: '#dc2626',
});

const mockExampleFetch = (): (() => void) => {
  const original = globalThis.fetch;
  globalThis.fetch = jest.fn(
    async () => ({ ok: true, json: async () => exampleSquad() }) as Response
  ) as unknown as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
};

const openTab = (label: string): void => {
  fireEvent.click(screen.getByRole('tab', { name: label }));
};

describe('SquadManager', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the formation and pitch', () => {
    render(<SquadManager />);
    expect(screen.getByText('11-a-side · 4-4-2')).toBeInTheDocument();
    expect(screen.getByTestId('pitch')).toBeInTheDocument();
    expect(screen.getByLabelText('Position GK 1')).toBeInTheDocument();
  });

  it('prompts to pick a position before showing the picker', () => {
    render(<SquadManager />);
    openTab('Position');
    expect(screen.getByText(/Select a position/)).toBeInTheDocument();
  });

  it('selects a position and manages players end to end', () => {
    render(<SquadManager />);
    openTab('Roster');

    fireEvent.click(screen.getByLabelText('Position ST 9'));
    expect(screen.getAllByText('shirt #9').length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));
    fireEvent.click(screen.getByLabelText('Assign Ada'));

    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent('Ada');

    fireEvent.click(screen.getByLabelText('Unassign Ada'));
    expect(screen.getByLabelText('Position ST 9')).not.toHaveTextContent('Ada');
  });

  it('auto-places a new player into a matching empty position', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));
    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent('Ada');
  });

  it('shows the selected position details on the pitch', () => {
    render(<SquadManager />);
    fireEvent.click(screen.getByLabelText('Position GK 1'));
    const overlay = screen.getByTestId('pitch-selection');
    expect(within(overlay).getByText('shirt #1')).toBeInTheDocument();
    expect(
      within(overlay).getByText('No players assigned yet')
    ).toBeInTheDocument();
  });

  it('removes a player from the roster', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));
    fireEvent.click(screen.getByLabelText('Remove Bob'));
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('edits a player and auto-places them at the preferred position', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '7' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'DEF' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    fireEvent.click(screen.getByLabelText('Position RB 2'));
    fireEvent.click(screen.getByLabelText('Unassign Bob'));

    fireEvent.click(screen.getByLabelText('Edit Bob'));
    fireEvent.change(screen.getByLabelText('Edit player name'), {
      target: { value: 'Bob C.' },
    });
    fireEvent.change(screen.getByLabelText('Edit preferred position'), {
      target: { value: 'ST' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save player' }));

    expect(screen.getAllByText('Bob C.').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent('Bob C.');
  });

  it('blocks adding a player with a duplicate shirt number', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    expect(screen.getByText(/already used by Ada/)).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('switches formations and clears assignments', () => {
    render(<SquadManager />);
    fireEvent.change(screen.getByLabelText('Formation'), {
      target: { value: '433' },
    });
    expect(screen.getByText('11-a-side · 4-3-3')).toBeInTheDocument();
    expect(screen.getByLabelText('Position LW 11')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('5 players'));
    expect(screen.getByText('5-a-side · 2-2')).toBeInTheDocument();
    expect(screen.queryByLabelText('Position LW 11')).not.toBeInTheDocument();
  });

  it('loads the example squad and reflects it on the pitch', async () => {
    const restore = mockExampleFetch();
    render(<SquadManager />);
    openTab('Roster');

    fireEvent.click(screen.getByLabelText('Load example squad'));

    expect(await screen.findByText('11-a-side · 4-3-3')).toBeInTheDocument();
    expect(screen.getAllByText('Alisson').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Position GK 1')).toHaveTextContent('Alisson');
    restore();
  });

  it('loads a different example squad selected from the dropdown', async () => {
    const restore = mockExampleFetch();
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => barcelonaSquad(),
    });
    render(<SquadManager />);
    openTab('Roster');

    fireEvent.change(screen.getByLabelText('Example squad to load'), {
      target: { value: 'barcelona-2008-2009' },
    });
    fireEvent.click(screen.getByLabelText('Load example squad'));

    expect(
      await screen.findByText(
        (content, element) => element?.textContent === 'Squad · 3 / 26'
      )
    ).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/data/json/squads/11/barcelona-2008-2009.json'
    );
    expect(screen.getByLabelText('Position RW 7')).toHaveTextContent('Messi');
    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent("Eto'o");
    restore();
  });

  it('reports an error when the example squad cannot be loaded', async () => {
    const restore = mockExampleFetch();
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => null,
    });
    render(<SquadManager />);
    openTab('Roster');

    fireEvent.click(screen.getByLabelText('Load example squad'));

    await waitFor(() =>
      expect(
        screen.getByText('Could not load the example squad.')
      ).toBeInTheDocument()
    );
    restore();
  });

  it('adds a squad to the library and makes it active', () => {
    render(<SquadManager />);
    openTab('Library');
    fireEvent.change(screen.getByLabelText('New squad name'), {
      target: { value: 'Second Squad' },
    });
    fireEvent.click(screen.getByLabelText('Add squad'));
    expect(screen.getByText('Squads · 2')).toBeInTheDocument();
    expect(screen.getByText(/Active squad: Second Squad/)).toBeInTheDocument();
  });

  it('switches back to another squad', () => {
    render(<SquadManager />);
    openTab('Library');
    fireEvent.change(screen.getByLabelText('New squad name'), {
      target: { value: 'Second Squad' },
    });
    fireEvent.click(screen.getByLabelText('Add squad'));
    fireEvent.click(screen.getByRole('button', { name: 'My Squad' }));
    expect(screen.getByText(/Active squad: My Squad/)).toBeInTheDocument();
  });

  it('renames the active squad', () => {
    render(<SquadManager />);
    openTab('Library');
    fireEvent.click(screen.getByLabelText('Rename My Squad'));
    fireEvent.change(screen.getByLabelText('Squad name'), {
      target: { value: 'Renamed' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText(/Active squad: Renamed/)).toBeInTheDocument();
  });

  it('duplicates the active squad', () => {
    render(<SquadManager />);
    openTab('Library');
    fireEvent.click(screen.getByLabelText('Duplicate My Squad'));
    expect(screen.getAllByText('My Squad (Copy)').length).toBeGreaterThan(0);
    expect(screen.getByText('Squads · 2')).toBeInTheDocument();
  });

  it('removes a squad from the library', () => {
    render(<SquadManager />);
    openTab('Library');
    fireEvent.change(screen.getByLabelText('New squad name'), {
      target: { value: 'Temp' },
    });
    fireEvent.click(screen.getByLabelText('Add squad'));
    fireEvent.click(screen.getByLabelText('Delete Temp'));
    expect(screen.queryByText('Temp')).not.toBeInTheDocument();
  });

  it('imports players from a CSV file', async () => {
    const { container } = render(<SquadManager />);
    openTab('Export');
    const input = container.querySelector('input[type="file"]');
    const content = 'Name,Number,Role,Position\nAda,10,MID,AM';
    const file = new File([content], 'squad.csv', { type: 'text/csv' });
    Object.defineProperty(file, 'text', {
      value: jest.fn(async () => content),
    });
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    expect(await screen.findByText(/Imported 1 player\./)).toBeInTheDocument();
    expect(screen.getAllByText('Ada').length).toBeGreaterThan(0);
  });

  it('loads a shared squad from the URL query param', async () => {
    const shared = makeSquad({
      name: 'Shared Lineup',
      formationId: '433',
      players: [
        makePlayer({ id: 'salah', name: 'Salah', number: 11, role: 'FWD' }),
      ],
      assignments: { '433-3-8': ['salah'] },
    });
    const originalSearch = window.location.search;
    window.history.replaceState({}, '', `/?squad=${encodeSquad(shared)}`);
    render(<SquadManager />);

    await waitFor(() => {
      expect(screen.getByLabelText('Position RW 7')).toHaveTextContent('Salah');
    });

    window.history.replaceState({}, '', originalSearch || '/');
  });

  it('loads a shared lineup-only URL into the active squad', async () => {
    const shared = makeSquad({
      name: 'Shared Lineup',
      formationId: '433',
      players: [
        makePlayer({ id: 'salah', name: 'Salah', number: 11, role: 'FWD' }),
      ],
      assignments: { '433-3-8': ['salah'] },
    });
    const originalSearch = window.location.search;
    window.history.replaceState({}, '', `/?squad=${encodeLineup(shared)}`);
    render(<SquadManager />);

    await waitFor(() => {
      expect(screen.getByLabelText('Position RW 7')).toHaveTextContent('Salah');
    });

    window.history.replaceState({}, '', originalSearch || '/');
  });

  it('mirrors the pitch for the second half', () => {
    render(<SquadManager />);
    const mirror = screen.getByRole('button', { name: 'Mirror the pitch' });
    expect(mirror).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(mirror);
    expect(
      screen.getByRole('button', { name: 'Mirror the pitch' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('shifts a whole line sideways in one move', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));
    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent('Ada');

    fireEvent.click(
      screen.getByRole('button', { name: 'Shift Attack line left' })
    );
    expect(screen.getByLabelText('Position ST 10')).toHaveTextContent('Ada');
    expect(screen.getByLabelText('Position ST 9')).not.toHaveTextContent('Ada');
  });

  it('saves and re-applies a lineup as a plan', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    openTab('Plans');
    fireEvent.change(screen.getByLabelText('Lineup name'), {
      target: { value: 'Plan A' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save lineup' }));
    expect(screen.getByText('Plan A')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Formation'), {
      target: { value: '433' },
    });
    expect(screen.getByLabelText('Formation')).toHaveValue('433');
    expect(screen.getByLabelText('Position ST 9')).not.toHaveTextContent('Ada');

    openTab('Plans');
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply lineup Plan A' })
    );
    expect(screen.getByLabelText('Formation')).toHaveValue('442');
    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent('Ada');
  });

  it('renames and removes a saved lineup', () => {
    render(<SquadManager />);
    openTab('Plans');
    fireEvent.change(screen.getByLabelText('Lineup name'), {
      target: { value: 'Plan A' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save lineup' }));

    fireEvent.click(
      screen.getByRole('button', { name: 'Rename lineup Plan A' })
    );
    fireEvent.change(screen.getByLabelText('Rename lineup Plan A'), {
      target: { value: 'Plan B' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save lineup name' }));
    expect(screen.getByText('Plan B')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Remove lineup Plan B' })
    );
    expect(screen.queryByText('Plan B')).not.toBeInTheDocument();
  });

  it('saves, applies, and removes a formation preset', () => {
    render(<SquadManager />);
    openTab('Plans');
    fireEvent.change(screen.getByLabelText('Preset name'), {
      target: { value: 'Counter' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Save formation preset' })
    );
    expect(screen.getByText('Counter')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Formation'), {
      target: { value: '433' },
    });
    openTab('Plans');
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply preset Counter' })
    );
    expect(screen.getByLabelText('Formation')).toHaveValue('442');

    fireEvent.click(
      screen.getByRole('button', { name: 'Remove preset Counter' })
    );
    expect(screen.queryByText('Counter')).not.toBeInTheDocument();
  });

  it('suggests formations that fit the current starters', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    openTab('Stats');
    expect(screen.getByText('Formation suggestions')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /Apply formation/ }).length
    ).toBeGreaterThan(0);
  });

  it('scores a goal from the match center', () => {
    render(<SquadManager />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase goals for' }));
    expect(screen.getByLabelText('Goals for')).toHaveTextContent('1');
    expect(
      within(screen.getByTestId('match-events')).getByText('Goal')
    ).toBeInTheDocument();
  });

  it('records a substitution from the position picker', () => {
    render(<SquadManager />);
    openTab('Roster');

    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '7' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add player' }));

    fireEvent.click(screen.getByLabelText('Bench Bob'));
    fireEvent.click(screen.getByLabelText('Position ST 9'));
    openTab('Position');
    fireEvent.click(screen.getByRole('button', { name: 'Bring on Bob' }));

    openTab('Overview');
    expect(screen.getByLabelText('Substitutions used')).toHaveTextContent(
      '1/5'
    );
    expect(
      within(screen.getByTestId('match-events')).getByText('Substitution')
    ).toBeInTheDocument();
  });

  it('applies the team colour to the pitch markers', () => {
    const { container } = render(<SquadManager />);
    openTab('Team');
    fireEvent.click(screen.getByLabelText('Kit colour blue'));
    const badges = container.querySelectorAll(
      '[data-testid="pitch"] [aria-hidden="true"]'
    );
    const coloured = Array.from(badges).find(
      (badge) => badge.textContent?.trim() === '1'
    );
    expect((coloured as HTMLElement).style.backgroundColor).toBe(
      'rgb(37, 99, 235)'
    );
  });

  it('imports a roster pasted as name, number, role lines', () => {
    render(<SquadManager />);
    openTab('Roster');
    fireEvent.change(screen.getByLabelText('Roster text'), {
      target: { value: 'Ada,10,MID\nBob,7,FWD' },
    });
    fireEvent.click(screen.getByLabelText('Import roster'));
    expect(screen.getByText('Imported 2 players.')).toBeInTheDocument();
    expect(screen.getAllByText('Ada').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Position ST 9')).toHaveTextContent('Bob');
  });

  it('previews the team sheet header with opponent and date', () => {
    render(<SquadManager />);
    openTab('Team');
    fireEvent.change(screen.getByLabelText('Opponent'), {
      target: { value: 'United' },
    });
    fireEvent.change(screen.getByLabelText('Match date'), {
      target: { value: '2026-08-15' },
    });
    expect(screen.getAllByText('vs United').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2026-08-15').length).toBeGreaterThan(0);
  });

  it('disables printing the team sheet when there are no players', () => {
    render(<SquadManager />);
    openTab('Team');
    expect(screen.getByLabelText('Print team sheet')).toBeDisabled();
  });
});
