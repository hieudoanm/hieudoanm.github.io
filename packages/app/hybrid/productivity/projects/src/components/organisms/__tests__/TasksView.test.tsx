import { render, screen, fireEvent, act } from '@testing-library/react';
import { TasksView } from '@/components/organisms/TasksView';

const mockUseAuth = jest.fn();
const mockUseData = jest.fn();

jest.mock('@/providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

const member = {
  id: 'mem-1',
  name: 'Alice',
  email: 'a@x.com',
  avatar: 'A',
};

const baseTasks = () => [
  {
    id: 'task-1',
    userId: 'mem-1',
    text: 'Ship it',
    completed: false,
    createdAt: 1,
    updatedAt: 3,
  },
  {
    id: 'task-2',
    userId: 'mem-1',
    text: 'Ship it done',
    completed: true,
    createdAt: 1,
    updatedAt: 4,
  },
  {
    id: 'task-3',
    userId: 'mem-5',
    text: 'Private',
    completed: false,
    createdAt: 1,
    updatedAt: 5,
  },
];

const tasks = () => {
  const state = {
    tasks: baseTasks(),
    addTask: jest.fn().mockResolvedValue(undefined),
    toggleTask: jest.fn().mockResolvedValue(undefined),
    deleteTask: jest.fn().mockResolvedValue(undefined),
  };
  mockUseData.mockReturnValue(state);
  return state;
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue({
    tasks: [],
    addTask: jest.fn().mockResolvedValue(undefined),
    toggleTask: jest.fn().mockResolvedValue(undefined),
    deleteTask: jest.fn().mockResolvedValue(undefined),
  });
});

describe('TasksView', () => {
  it('renders nothing when no user is signed in', () => {
    mockUseAuth.mockReturnValue({ currentUser: null });
    const { container } = render(<TasksView />);
    expect(container.firstChild).toBeNull();
  });

  it('shows an empty state for the signed-in user', () => {
    mockUseAuth.mockReturnValue({ currentUser: member });
    render(<TasksView />);
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument();
    expect(screen.getByText('0 pending · 0 total')).toBeInTheDocument();
  });

  it('lists only the signed-in user tasks with pending first', () => {
    mockUseAuth.mockReturnValue({ currentUser: member });
    tasks();
    render(<TasksView />);
    expect(screen.getByText('Ship it')).toBeInTheDocument();
    expect(screen.getByText('Ship it done')).toBeInTheDocument();
    expect(screen.queryByText('Private')).not.toBeInTheDocument();
    expect(screen.getByText('1 pending · 2 total')).toBeInTheDocument();
    const items = screen.getAllByRole('checkbox');
    expect(items[0]).toHaveAttribute('aria-label', 'Toggle Ship it');
    expect(items[1]).toHaveAttribute('aria-label', 'Toggle Ship it done');
  });

  it('adds a task for the signed-in user and clears the input', async () => {
    mockUseAuth.mockReturnValue({ currentUser: member });
    const data = tasks();
    render(<TasksView />);
    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Write docs' },
    });
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Add task'));
    });
    expect(data.addTask).toHaveBeenCalledWith('mem-1', 'Write docs');
    expect(screen.getByLabelText('New task')).toHaveValue('');
  });

  it('does not add an empty task', () => {
    mockUseAuth.mockReturnValue({ currentUser: member });
    const data = tasks();
    render(<TasksView />);
    fireEvent.click(screen.getByLabelText('Add task'));
    expect(data.addTask).not.toHaveBeenCalled();
  });

  it('toggles and deletes tasks', () => {
    mockUseAuth.mockReturnValue({ currentUser: member });
    const data = tasks();
    render(<TasksView />);
    fireEvent.click(screen.getByLabelText('Toggle Ship it'));
    expect(data.toggleTask).toHaveBeenCalledWith('task-1');
    fireEvent.click(screen.getByLabelText('Delete Ship it'));
    expect(data.deleteTask).toHaveBeenCalledWith('task-1');
  });
});
