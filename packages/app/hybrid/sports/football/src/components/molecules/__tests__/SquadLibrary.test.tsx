import { fireEvent, render, screen } from '@testing-library/react';
import { SquadLibrary } from '@/components/molecules/SquadLibrary';
import { makeSquad } from '@/test/fixtures';
import { SquadLibrary as SquadLibraryType } from '@/types/football';

const library: SquadLibraryType = {
  activeId: 's1',
  squads: [
    makeSquad({ id: 's1', name: 'First' }),
    makeSquad({ id: 's2', name: 'Second' }),
  ],
};

const props = {
  library,
  activeSquadName: 'First',
  onSelect: jest.fn(),
  onAdd: jest.fn(),
  onRename: jest.fn(),
  onDuplicate: jest.fn(),
  onRemove: jest.fn(),
};

describe('SquadLibrary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the squad count and active squad name', () => {
    render(<SquadLibrary {...props} />);
    expect(screen.getByText('Squads · 2')).toBeInTheDocument();
    expect(screen.getByText(/Active squad: First/)).toBeInTheDocument();
  });

  it('selects a squad by name', () => {
    render(<SquadLibrary {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(props.onSelect).toHaveBeenCalledWith('s2');
  });

  it('adds a new squad with a trimmed name', () => {
    render(<SquadLibrary {...props} />);
    fireEvent.change(screen.getByLabelText('New squad name'), {
      target: { value: '  Third  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add/ }));
    expect(props.onAdd).toHaveBeenCalledWith('Third');
  });

  it('ignores adding an empty squad name', () => {
    render(<SquadLibrary {...props} />);
    fireEvent.click(screen.getByRole('button', { name: /Add/ }));
    expect(props.onAdd).not.toHaveBeenCalled();
  });

  it('renames a squad', () => {
    render(<SquadLibrary {...props} />);
    fireEvent.click(screen.getByLabelText('Rename First'));
    fireEvent.change(screen.getByLabelText('Squad name'), {
      target: { value: 'Renamed' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(props.onRename).toHaveBeenCalledWith('s1', 'Renamed');
  });

  it('duplicates a squad', () => {
    render(<SquadLibrary {...props} />);
    fireEvent.click(screen.getByLabelText('Duplicate First'));
    expect(props.onDuplicate).toHaveBeenCalledWith('s1');
  });

  it('removes a squad', () => {
    render(<SquadLibrary {...props} />);
    fireEvent.click(screen.getByLabelText('Delete Second'));
    expect(props.onRemove).toHaveBeenCalledWith('s2');
  });

  it('disables delete when only one squad remains', () => {
    render(
      <SquadLibrary
        {...props}
        library={{
          activeId: 's1',
          squads: [makeSquad({ id: 's1', name: 'First' })],
        }}
      />
    );
    expect(screen.getByLabelText('Delete First')).toBeDisabled();
  });
});
