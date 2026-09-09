import { fireEvent, render, screen } from '@testing-library/react';
import { PresetsMenu } from '@/components/molecules/PresetsMenu';
import type { BoardFilters } from '@/types/board-filters';

const baseFilters: BoardFilters = {
  activeLabel: 'lbl-1',
  activeMember: null,
  dueFilter: 'all',
  priorityFilter: 'high',
};

const renderMenu = (onChange = jest.fn()) =>
  render(
    <PresetsMenu boardId="board-1" filters={baseFilters} onChange={onChange} />
  );

describe('PresetsMenu', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loads presets from storage on mount', () => {
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
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    expect(screen.getByRole('button', { name: 'Saved' })).toBeInTheDocument();
  });

  it('applies a preset filter', () => {
    const onChange = jest.fn();
    window.localStorage.setItem(
      'board-filters:board-1',
      JSON.stringify([
        {
          id: 'p1',
          name: 'Hot',
          activeLabel: 'lbl-1',
          activeMember: null,
          dueFilter: 'overdue',
          priorityFilter: 'high',
        },
      ])
    );
    renderMenu(onChange);
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hot' }));
    expect(onChange).toHaveBeenCalledWith({
      activeLabel: 'lbl-1',
      activeMember: null,
      dueFilter: 'overdue',
      priorityFilter: 'high',
    });
  });

  it('deletes a preset and persists the change', () => {
    window.localStorage.setItem(
      'board-filters:board-1',
      JSON.stringify([
        {
          id: 'p1',
          name: 'To Delete',
          activeLabel: null,
          activeMember: null,
          dueFilter: 'all',
          priorityFilter: 'all',
        },
      ])
    );
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete preset To Delete' })
    );
    expect(screen.getByText('No saved presets')).toBeInTheDocument();
    const stored = window.localStorage.getItem('board-filters:board-1');
    expect(stored).toBe(JSON.stringify([]));
  });
});
