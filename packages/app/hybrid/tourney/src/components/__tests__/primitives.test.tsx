import { act, fireEvent, render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/atoms/EmptyState';
import { ContextMenu } from '@/components/atoms/ContextMenu';
import { FormatBadge } from '@/components/molecules/FormatBadge';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { SearchBar } from '@/components/molecules/SearchBar';
import { StatusFilter } from '@/components/molecules/StatusFilter';

describe('FormatBadge', () => {
  it('renders a label for each tournament format', () => {
    render(<FormatBadge format="single-elimination" />);
    expect(screen.getByText('Single Elimination')).toBeInTheDocument();
  });

  it('renders the swiss label', () => {
    render(<FormatBadge format="swiss" />);
    expect(screen.getByText('Swiss')).toBeInTheDocument();
  });
});

describe('StatusBadge', () => {
  it.each([
    ['draft', 'Draft'],
    ['in-progress', 'In Progress'],
    ['completed', 'Completed'],
    ['cancelled', 'Cancelled'],
    ['scheduled', 'Scheduled'],
    ['walkover', 'Walkover'],
  ] as const)('renders %s status', (status, label) => {
    render(<StatusBadge status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders title without optional sections', () => {
    render(<EmptyState icon={<span>i</span>} title="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders description and action when provided', () => {
    render(
      <EmptyState
        icon={<span>i</span>}
        title="No data"
        description="Nothing here yet"
        action={<button>Create</button>}
      />
    );
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });
});

describe('SearchBar', () => {
  it('forwards the input value', () => {
    const onChange = jest.fn();
    render(<SearchBar value="cup" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Search tournaments...');
    expect(input).toHaveValue('cup');
    fireEvent.change(input, { target: { value: 'league' } });
    expect(onChange).toHaveBeenCalledWith('league');
  });
});

describe('StatusFilter', () => {
  it('renders all filters and marks the active one', () => {
    const onChange = jest.fn();
    render(<StatusFilter value="all" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(onChange).toHaveBeenCalledWith('completed');
  });
});

describe('ContextMenu', () => {
  const item = { label: 'Delete', destructive: true, onClick: jest.fn() };

  it('stays closed until opened', () => {
    render(
      <ContextMenu items={[item]}>
        <span>target</span>
      </ContextMenu>
    );
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('opens on context menu and triggers the item action', () => {
    render(
      <ContextMenu items={[item]}>
        <span>target</span>
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText('target'), {
      clientX: 100,
      clientY: 100,
    });
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    expect(item.onClick).toHaveBeenCalled();
  });

  it('closes when clicking outside', () => {
    render(
      <ContextMenu items={[item]}>
        <span>target</span>
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText('target'), {
      clientX: 100,
      clientY: 100,
    });
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(
      <ContextMenu items={[item]}>
        <span>target</span>
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText('target'), {
      clientX: 100,
      clientY: 100,
    });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('opens on a long touch and clears the timer on touch end', () => {
    jest.useFakeTimers();
    render(
      <ContextMenu items={[item]}>
        <span>target</span>
      </ContextMenu>
    );
    fireEvent.touchStart(screen.getByText('target'), {
      touches: [{ clientX: 50, clientY: 60 }],
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.touchEnd(screen.getByText('target'));
    jest.useRealTimers();
  });

  it('renders non-destructive items without the destructive style', () => {
    const normal = { label: 'Rename', onClick: jest.fn() };
    render(
      <ContextMenu items={[normal]}>
        <span>target</span>
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText('target'), {
      clientX: 100,
      clientY: 100,
    });
    expect(screen.getByText('Rename')).toBeInTheDocument();
  });
});
