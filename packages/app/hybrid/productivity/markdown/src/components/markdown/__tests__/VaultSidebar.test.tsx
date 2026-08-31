import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VaultSidebar } from '@/components/markdown/VaultSidebar';
import { seedNotes } from '@/data/seed';

describe('VaultSidebar', () => {
  it('filters notes by search query', () => {
    const notes = seedNotes();
    render(
      <VaultSidebar
        notes={notes}
        activeId={notes[0].id}
        search="football"
        onSearchChange={() => undefined}
        onSelect={() => undefined}
        onNew={() => undefined}
        mobile={false}
      />
    );

    expect(screen.getByText('Football')).toBeInTheDocument();
    expect(screen.queryByText('Chess')).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', () => {
    render(
      <VaultSidebar
        notes={seedNotes()}
        activeId={null}
        search="zzz"
        onSearchChange={() => undefined}
        onSelect={() => undefined}
        onNew={() => undefined}
        mobile={false}
      />
    );

    expect(screen.getByText('No notes found.')).toBeInTheDocument();
  });

  it('reports search input changes and closes from mobile', async () => {
    const user = userEvent.setup();
    const onSearchChange = jest.fn();
    const onClose = jest.fn();
    render(
      <VaultSidebar
        notes={seedNotes()}
        activeId={null}
        search=""
        onSearchChange={onSearchChange}
        onSelect={() => undefined}
        onNew={() => undefined}
        onClose={onClose}
        mobile
      />
    );

    await user.type(screen.getByLabelText('Search notes'), 'abc');
    expect(onSearchChange).toHaveBeenCalledWith('a');

    await user.click(screen.getByLabelText('Close sidebar'));
    expect(onClose).toHaveBeenCalled();
  });
});
