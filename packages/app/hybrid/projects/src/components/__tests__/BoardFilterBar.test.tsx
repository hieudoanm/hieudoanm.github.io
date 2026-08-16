import { fireEvent, render, screen } from '@testing-library/react';
import BoardFilterBar, {
  type BoardFilters,
} from '@/components/organisms/BoardFilterBar';

const labels = [{ id: 'lbl-1', name: 'Bug', color: '#f00' }];
const members = [{ id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' }];

const baseFilters: BoardFilters = {
  activeLabel: null,
  activeMember: null,
  dueFilter: 'all',
  priorityFilter: 'all',
};

const renderBar = (filters: BoardFilters = baseFilters, onChange = jest.fn()) =>
  render(
    <BoardFilterBar
      boardId="board-1"
      labels={labels}
      members={members}
      filters={filters}
      onChange={onChange}
    />
  );

describe('BoardFilterBar', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loads saved presets from storage', () => {
    window.localStorage.setItem(
      'board-filters:board-1',
      JSON.stringify([
        {
          id: 'p1',
          name: 'Saved',
          activeLabel: null,
          activeMember: null,
          dueFilter: 'all',
          priorityFilter: 'all',
        },
      ])
    );
    renderBar();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    expect(screen.getByRole('button', { name: 'Saved' })).toBeInTheDocument();
  });

  it('does not save a preset without a name', () => {
    renderBar();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Save current filters…' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('No saved presets')).toBeInTheDocument();
  });

  it('saves a preset with the Enter key', () => {
    renderBar();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Save current filters…' })
    );
    fireEvent.change(screen.getByLabelText('Preset name'), {
      target: { value: 'Fav' },
    });
    fireEvent.keyDown(screen.getByLabelText('Preset name'), {
      key: 'Enter',
    });
    expect(screen.getByRole('button', { name: 'Fav' })).toBeInTheDocument();
  });

  it('deselects an active label and member', () => {
    const onChange = jest.fn();
    renderBar(
      { ...baseFilters, activeLabel: 'lbl-1', activeMember: 'mem-1' },
      onChange
    );
    fireEvent.click(screen.getByRole('button', { name: 'Bug' }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ activeLabel: null })
    );
    fireEvent.click(screen.getByTitle('A'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ activeMember: null })
    );
  });
});
