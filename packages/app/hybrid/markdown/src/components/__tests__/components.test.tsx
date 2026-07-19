import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatsBar } from '@/components/editor/StatsBar';
import { TocSidebar } from '@/components/editor/TocSidebar';
import { VaultSidebar } from '@/components/vault/VaultSidebar';
import { ViewControls } from '@/components/editor/ViewControls';
import { seedNotes } from '@/lib/seed';

describe('StatsBar', () => {
  it('shows computed stats and note counts', () => {
    render(
      <StatsBar
        content="# Hi\n\nTwo words"
        noteCount={3}
        linkCount={2}
        danglingCount={1}
      />
    );
    expect(screen.getByText('words')).toBeInTheDocument();
    expect(screen.getByText('notes')).toBeInTheDocument();
    expect(screen.getByText(/dangling link/)).toBeInTheDocument();
  });

  it('omits the dangling warning when there are none', () => {
    render(
      <StatsBar content="" noteCount={1} linkCount={0} danglingCount={0} />
    );
    expect(screen.queryByText(/dangling/)).not.toBeInTheDocument();
  });
});

describe('TocSidebar', () => {
  it('lists headings and scrolls to a heading on click', async () => {
    const user = userEvent.setup();
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    const heading = document.createElement('h2');
    heading.id = 'intro';
    document.body.appendChild(heading);

    render(
      <TocSidebar
        items={[
          { id: 'intro', text: 'Intro', level: 1 },
          { id: 'deep', text: 'Deep', level: 3 },
        ]}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Intro' }));
    expect(scrollIntoView).toHaveBeenCalled();
    heading.remove();
  });
});

describe('VaultSidebar', () => {
  it('filters notes by search query', () => {
    const notes = seedNotes();
    render(
      <VaultSidebar
        notes={notes}
        activeId={notes[0].id}
        search="todo"
        onSearchChange={() => undefined}
        onSelect={() => undefined}
        onNew={() => undefined}
        mobile={false}
      />
    );

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
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
});

describe('ViewControls', () => {
  it('calls back with the selected view mode', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<ViewControls value="split" onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Preview' }));
    expect(onChange).toHaveBeenCalledWith('preview');
  });
});
