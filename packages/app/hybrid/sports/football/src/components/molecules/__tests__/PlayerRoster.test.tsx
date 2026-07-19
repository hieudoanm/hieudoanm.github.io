import { fireEvent, render, screen } from '@testing-library/react';
import { PlayerRoster } from '@/components/molecules/PlayerRoster';
import { EXAMPLE_SQUADS } from '@/lib/examples';
import { makePlayer } from '@/test/fixtures';

const baseProps = {
  onAdd: jest.fn(),
  onUpdate: jest.fn(),
  onRemove: jest.fn(),
};

describe('PlayerRoster', () => {
  it('shows the squad size', () => {
    render(<PlayerRoster players={[makePlayer()]} {...baseProps} />);
    expect(screen.getByText(/Squad · 1/)).toBeInTheDocument();
  });

  it('shows per-role and per-status counts', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', role: 'GK' }),
          makePlayer({ id: 'p2', name: 'Bob', role: 'FWD', bench: true }),
        ]}
        {...baseProps}
      />
    );
    expect(screen.getByText('GK 1')).toBeInTheDocument();
    expect(screen.getByText('FWD 1')).toBeInTheDocument();
    expect(screen.getByText('Starters 1')).toBeInTheDocument();
    expect(screen.getByText('Bench 1')).toBeInTheDocument();
  });

  it('filters players by role', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', role: 'GK' }),
          makePlayer({ id: 'p2', name: 'Bob', role: 'FWD' }),
        ]}
        {...baseProps}
      />
    );
    fireEvent.click(screen.getByLabelText('Filter by FWD'));
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('clears a role filter when toggled again', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', role: 'GK' }),
          makePlayer({ id: 'p2', name: 'Bob', role: 'FWD' }),
        ]}
        {...baseProps}
      />
    );
    fireEvent.click(screen.getByLabelText('Filter by GK'));
    fireEvent.click(screen.getByLabelText('Filter by GK'));
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('filters players by bench status', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada' }),
          makePlayer({ id: 'p2', name: 'Bob', bench: true }),
        ]}
        {...baseProps}
      />
    );
    fireEvent.click(screen.getByLabelText('Show bench players only'));
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('shows a no-match message when a filter excludes all players', () => {
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada', role: 'GK' })]}
        {...baseProps}
      />
    );
    fireEvent.click(screen.getByLabelText('Filter by FWD'));
    expect(
      screen.getByText('No players match the filters.')
    ).toBeInTheDocument();
  });

  it('adds a player with name, number, and role', () => {
    const onAdd = jest.fn();
    render(<PlayerRoster players={[]} {...baseProps} onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: '  Ada  ' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('Player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add/ }));
    expect(onAdd).toHaveBeenCalledWith('Ada', 10, 'FWD', undefined);
  });

  it('adds a player with a preferred position', () => {
    const onAdd = jest.fn();
    render(
      <PlayerRoster
        players={[]}
        {...baseProps}
        onAdd={onAdd}
        positionOptions={['GK', 'CB', 'ST']}
      />
    );
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '9' },
    });
    fireEvent.change(screen.getByLabelText('Preferred position'), {
      target: { value: 'ST' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add/ }));
    expect(onAdd).toHaveBeenCalledWith('Bob', 9, 'MID', 'ST');
  });

  it('ignores invalid submissions', () => {
    const onAdd = jest.fn();
    render(<PlayerRoster players={[]} {...baseProps} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /Add/ }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('blocks adding a duplicate shirt number', () => {
    const onAdd = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ number: 10 })]}
        {...baseProps}
        onAdd={onAdd}
      />
    );
    fireEvent.change(screen.getByLabelText('Player name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Shirt number'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add/ }));
    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByText(/already used by Ada/)).toBeInTheDocument();
  });

  it('warns about existing duplicate shirt numbers', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', number: 7 }),
          makePlayer({ id: 'p2', number: 7 }),
        ]}
        {...baseProps}
      />
    );
    expect(screen.getByText(/Duplicate shirt numbers: 7/)).toBeInTheDocument();
    expect(screen.getAllByLabelText('Duplicate number for Ada')).toHaveLength(
      2
    );
  });

  it('removes a player by name', () => {
    const onRemove = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
        onRemove={onRemove}
      />
    );
    fireEvent.click(screen.getByLabelText('Remove Ada'));
    expect(onRemove).toHaveBeenCalledWith('p1');
  });

  it('edits a player name, number, role, and preferred position', () => {
    const onUpdate = jest.fn();
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', number: 10, role: 'MID' }),
        ]}
        {...baseProps}
        onUpdate={onUpdate}
        positionOptions={['GK', 'ST']}
      />
    );
    fireEvent.click(screen.getByLabelText('Edit Ada'));
    fireEvent.change(screen.getByLabelText('Edit player name'), {
      target: { value: 'Ada L.' },
    });
    fireEvent.change(screen.getByLabelText('Edit shirt number'), {
      target: { value: '11' },
    });
    fireEvent.change(screen.getByLabelText('Edit player role'), {
      target: { value: 'FWD' },
    });
    fireEvent.change(screen.getByLabelText('Edit preferred position'), {
      target: { value: 'ST' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save player' }));
    expect(onUpdate).toHaveBeenCalledWith('p1', {
      name: 'Ada L.',
      number: 11,
      role: 'FWD',
      position: 'ST',
    });
  });

  it('cancels editing without saving', () => {
    const onUpdate = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Edit Ada'));
    fireEvent.change(screen.getByLabelText('Edit player name'), {
      target: { value: 'Changed' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel edit' }));
    expect(onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('blocks saving a duplicate shirt number while editing', () => {
    const onUpdate = jest.fn();
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', number: 10 }),
          makePlayer({ id: 'p2', name: 'Bob', number: 9 }),
        ]}
        {...baseProps}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Edit Bob'));
    fireEvent.change(screen.getByLabelText('Edit shirt number'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save player' }));
    expect(onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText(/already used by Ada/)).toBeInTheDocument();
  });

  it('triggers the example squad loader', () => {
    const onLoadExample = jest.fn();
    render(
      <PlayerRoster
        players={[]}
        {...baseProps}
        examples={EXAMPLE_SQUADS}
        exampleId={EXAMPLE_SQUADS[0].id}
        onLoadExample={onLoadExample}
      />
    );
    fireEvent.click(screen.getByLabelText('Load example squad'));
    expect(onLoadExample).toHaveBeenCalled();
  });

  it('selects an example squad from the dropdown', () => {
    const onSelectExample = jest.fn();
    render(
      <PlayerRoster
        players={[]}
        {...baseProps}
        examples={EXAMPLE_SQUADS}
        exampleId={EXAMPLE_SQUADS[0].id}
        onSelectExample={onSelectExample}
        onLoadExample={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText('Example squad to load'), {
      target: { value: 'barcelona-2008-2009' },
    });
    expect(onSelectExample).toHaveBeenCalledWith('barcelona-2008-2009');
  });

  it('disables the example squad button while loading', () => {
    render(
      <PlayerRoster
        players={[]}
        {...baseProps}
        examples={EXAMPLE_SQUADS}
        exampleId={EXAMPLE_SQUADS[0].id}
        onLoadExample={jest.fn()}
        exampleStatus="loading"
      />
    );
    expect(screen.getByLabelText('Load example squad')).toBeDisabled();
  });

  it('shows an error when the example squad fails to load', () => {
    render(
      <PlayerRoster
        players={[]}
        {...baseProps}
        examples={EXAMPLE_SQUADS}
        exampleId={EXAMPLE_SQUADS[0].id}
        onLoadExample={jest.fn()}
        exampleStatus="error"
      />
    );
    expect(
      screen.getByText('Could not load the example squad.')
    ).toBeInTheDocument();
  });

  it('toggles a player between the pitch and the bench', () => {
    const onToggleBench = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
        onToggleBench={onToggleBench}
      />
    );
    fireEvent.click(screen.getByLabelText('Bench Ada'));
    expect(onToggleBench).toHaveBeenCalledWith('p1');
  });

  it('promotes a benched player back to the pitch', () => {
    const onToggleBench = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada', bench: true })]}
        {...baseProps}
        onToggleBench={onToggleBench}
      />
    );
    expect(screen.getByText('Bench')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Promote Ada'));
    expect(onToggleBench).toHaveBeenCalledWith('p1');
  });

  it('hides bench controls without a callback', () => {
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
      />
    );
    expect(screen.queryByLabelText('Bench Ada')).not.toBeInTheDocument();
  });

  it('searches players by name', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada' }),
          makePlayer({ id: 'p2', name: 'Bob' }),
        ]}
        {...baseProps}
      />
    );
    fireEvent.change(screen.getByLabelText('Search players'), {
      target: { value: 'Ada' },
    });
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('shows a no-match message when the search misses', () => {
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
      />
    );
    fireEvent.change(screen.getByLabelText('Search players'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No players match.')).toBeInTheDocument();
  });

  it('sorts players by shirt number', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', number: 10 }),
          makePlayer({ id: 'p2', name: 'Bob', number: 1 }),
        ]}
        {...baseProps}
      />
    );
    fireEvent.change(screen.getByLabelText('Sort players'), {
      target: { value: 'number' },
    });
    const numbers = screen.getAllByText(/^[0-9]+$/);
    expect(numbers).toHaveLength(2);
    expect(numbers[0]).toHaveTextContent('1');
    expect(numbers[1]).toHaveTextContent('10');
  });

  it('groups players into role sections in position order', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', role: 'FWD' }),
          makePlayer({ id: 'p2', name: 'Bob', role: 'GK' }),
          makePlayer({ id: 'p3', name: 'Cid', role: 'MID' }),
        ]}
        {...baseProps}
      />
    );
    expect(screen.getByText('GK · 1')).toBeInTheDocument();
    expect(screen.getByText('MID · 1')).toBeInTheDocument();
    expect(screen.getByText('FWD · 1')).toBeInTheDocument();
    const names = screen.getAllByText(/Ada|Bob|Cid/);
    expect(names[0]).toHaveTextContent('Bob');
    expect(names[1]).toHaveTextContent('Cid');
    expect(names[2]).toHaveTextContent('Ada');
  });

  it('shows dividers between role sections', () => {
    const { container } = render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', role: 'FWD' }),
          makePlayer({ id: 'p2', name: 'Bob', role: 'GK' }),
        ]}
        {...baseProps}
      />
    );
    expect(
      container.querySelectorAll('ul li[aria-hidden="true"]')
    ).toHaveLength(1);
  });

  it('shows player notes under the name', () => {
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada', notes: 'Injured' })]}
        {...baseProps}
      />
    );
    expect(screen.getByText('Injured')).toBeInTheDocument();
  });

  it('edits a player notes field', () => {
    const onUpdate = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Edit Ada'));
    fireEvent.change(screen.getByLabelText('Edit player notes'), {
      target: { value: 'Fit for Sunday' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save player' }));
    expect(onUpdate).toHaveBeenCalledWith(
      'p1',
      expect.objectContaining({ notes: 'Fit for Sunday' })
    );
  });

  it('hides leadership controls without a callback', () => {
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
      />
    );
    expect(screen.queryByLabelText('Make Ada captain')).not.toBeInTheDocument();
  });

  it('toggles a player as captain', () => {
    const onToggleLeadership = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
        onToggleLeadership={onToggleLeadership}
      />
    );
    fireEvent.click(screen.getByLabelText('Make Ada captain'));
    expect(onToggleLeadership).toHaveBeenCalledWith('p1', 'captain');
  });

  it('toggles a player as vice-captain', () => {
    const onToggleLeadership = jest.fn();
    render(
      <PlayerRoster
        players={[makePlayer({ id: 'p1', name: 'Ada' })]}
        {...baseProps}
        onToggleLeadership={onToggleLeadership}
      />
    );
    fireEvent.click(screen.getByLabelText('Make Ada vice-captain'));
    expect(onToggleLeadership).toHaveBeenCalledWith('p1', 'vice');
  });

  it('shows captain and vice-captain badges', () => {
    render(
      <PlayerRoster
        players={[
          makePlayer({ id: 'p1', name: 'Ada', captain: true }),
          makePlayer({ id: 'p2', name: 'Bob', viceCaptain: true }),
        ]}
        {...baseProps}
      />
    );
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('VC')).toBeInTheDocument();
  });
});
