import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { SquadManager } from '@/components/organisms/SquadManager';
import { encodeSquad } from '@/lib/share';
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
      '/data/json/11/barcelona-2008-2009.json'
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
    expect(screen.getByText('My Squad (Copy)')).toBeInTheDocument();
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
});
