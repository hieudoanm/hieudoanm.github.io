import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HistoryModal } from '@/components/molecules/HistoryModal';
import { createSnapshot } from '@/lib/history/history';
import type { Project } from '@/types/project';

const project: Project = {
  format: 'brainbow-project',
  version: 1,
  name: 'Neuron',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  images: [],
  channels: [],
  layers: [],
};

describe('HistoryModal', () => {
  it('shows an empty state when there are no snapshots', () => {
    render(
      <HistoryModal
        snapshots={[]}
        canCommit={true}
        onCommit={jest.fn()}
        onRestore={jest.fn()}
        onRemove={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/No snapshots yet/)).toBeInTheDocument();
  });

  it('commits a snapshot with the entered message', async () => {
    const user = userEvent.setup();
    const onCommit = jest.fn();
    render(
      <HistoryModal
        snapshots={[]}
        canCommit={true}
        onCommit={onCommit}
        onRestore={jest.fn()}
        onRemove={jest.fn()}
        onClose={jest.fn()}
      />
    );
    await user.type(screen.getByLabelText('Snapshot message'), 'First pass');
    await user.click(screen.getByRole('button', { name: 'Save snapshot' }));
    expect(onCommit).toHaveBeenCalledWith('First pass');
  });

  it('does not commit when message is blank or committing is unavailable', async () => {
    const user = userEvent.setup();
    const onCommit = jest.fn();
    render(
      <HistoryModal
        snapshots={[]}
        canCommit={false}
        onCommit={onCommit}
        onRestore={jest.fn()}
        onRemove={jest.fn()}
        onClose={jest.fn()}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Save snapshot' }));
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('lists snapshots and supports restore and delete', async () => {
    const user = userEvent.setup();
    const onRestore = jest.fn();
    const onRemove = jest.fn();
    const snapshot = createSnapshot(project, 'Branch v2');
    render(
      <HistoryModal
        snapshots={[snapshot]}
        canCommit={true}
        onCommit={jest.fn()}
        onRestore={onRestore}
        onRemove={onRemove}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Branch v2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Restore Branch v2' }));
    expect(onRestore).toHaveBeenCalledWith(snapshot.id);
    await user.click(screen.getByRole('button', { name: 'Delete Branch v2' }));
    expect(onRemove).toHaveBeenCalledWith(snapshot.id);
  });
});
