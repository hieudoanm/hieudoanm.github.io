import { render, screen, fireEvent } from '@solidjs/testing-library';
import { LeftSidebar } from '../index';

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar/tabs/FreeModelsTab',
  () => ({
    FreeModelsTab: () => <div data-testid="tab-free">FreeModelsTab</div>,
  })
);

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar/tabs/StatusTab',
  () => ({
    StatusTab: () => <div data-testid="tab-status">StatusTab</div>,
  })
);

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar/tabs/TasksTab',
  () => ({
    TasksTab: () => <div data-testid="tab-tasks">TasksTab</div>,
  })
);

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/LeftSidebar/tabs/TimeTab',
  () => ({
    TimeTab: () => <div data-testid="tab-time">TimeTab</div>,
  })
);

describe('LeftSidebar', () => {
  it('renders all four tab buttons', () => {
    render(() => <LeftSidebar />);
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('renders Tasks tab by default', () => {
    render(() => <LeftSidebar />);
    expect(screen.getByText('TasksTab')).toBeInTheDocument();
  });

  it('applies active class to the default tab', () => {
    render(() => <LeftSidebar />);
    const tasksBtn = screen.getByText('Tasks');
    expect(tasksBtn.className).toContain('border-primary');
  });
});
