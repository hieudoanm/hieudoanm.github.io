import { fireEvent, render, screen, within } from '@testing-library/react';
import { AnalyticsTemplate } from '../AnalyticsTemplate';
import { CalendarTemplate } from '../CalendarTemplate';
import { KanbanTemplate } from '../KanbanTemplate';
import { InboxTemplate } from '../InboxTemplate';
import { TasksTemplate } from '../TasksTemplate';
import { NotesTemplate } from '../NotesTemplate';
import { FilesTemplate } from '../FilesTemplate';
import AnalyticsPage from '@/app/(main)/(app)/analytics/page';
import CalendarPage from '@/app/(main)/(app)/calendar/page';
import KanbanPage from '@/app/(main)/(app)/kanban/page';
import InboxPage from '@/app/(main)/(app)/inbox/page';
import TasksPage from '@/app/(main)/(app)/tasks/page';
import NotesPage from '@/app/(main)/(app)/notes/page';
import FilesPage from '@/app/(main)/(app)/files/page';

describe('AnalyticsTemplate', () => {
  it('renders stat cards, bar chart and top pages table', () => {
    render(<AnalyticsTemplate />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Conversion')).toBeInTheDocument();
    expect(screen.getByText('$12,480')).toBeInTheDocument();
    expect(screen.getByText('+18.2%')).toBeInTheDocument();
    expect(screen.getByText('-2.1%')).toBeInTheDocument();
    expect(screen.getByLabelText('Day 1: 42')).toBeInTheDocument();
    expect(screen.getByLabelText('Day 7: 55')).toBeInTheDocument();
    expect(screen.getByText('/home')).toBeInTheDocument();
    expect(screen.getAllByText('Growing')).toHaveLength(2);
    expect(screen.getByText('Declining')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('switches the bar chart dataset between 7 and 30 days', () => {
    render(<AnalyticsTemplate />);
    expect(screen.getByLabelText('Day 1: 42')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '30 days' }));
    expect(screen.getByLabelText('Day 1: 48')).toBeInTheDocument();
    expect(screen.getByLabelText('Day 7: 60')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '7 days' }));
    expect(screen.getByLabelText('Day 1: 42')).toBeInTheDocument();
  });
});

describe('CalendarTemplate', () => {
  const now = new Date();
  const initialLabel = `${now.toLocaleString('en-US', {
    month: 'long',
  })} ${now.getFullYear()}`;

  it('renders the current month with today highlighted', () => {
    render(<CalendarTemplate />);
    expect(screen.getByText(initialLabel)).toBeInTheDocument();
    const todayButton = screen.getByRole('button', {
      name: `Select day ${now.getDate()}`,
    });
    expect(todayButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('navigates to the previous and next month', () => {
    render(<CalendarTemplate />);
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextLabel = `${next.toLocaleString('en-US', {
      month: 'long',
    })} ${next.getFullYear()}`;
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText(nextLabel)).toBeInTheDocument();
    expect(screen.queryByText(initialLabel)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText(initialLabel)).toBeInTheDocument();
  });

  it('shows events when selecting a day that has them', () => {
    render(<CalendarTemplate />);
    const isTodayFive = now.getDate() === 5;
    const eventDay = isTodayFive ? 12 : 5;
    fireEvent.click(
      screen.getByRole('button', { name: `Select day ${eventDay}` })
    );
    expect(
      screen.getByRole('button', { name: `Select day ${eventDay}` })
    ).toHaveAttribute('aria-pressed', 'true');
    if (isTodayFive) {
      expect(screen.getByText('Client call')).toBeInTheDocument();
    } else {
      expect(screen.getByText('Team standup')).toBeInTheDocument();
      expect(screen.getByText('Design review')).toBeInTheDocument();
    }
    expect(screen.getByText(`Events for day ${eventDay}`)).toBeInTheDocument();
  });

  it('shows the empty state when selecting a day without events', () => {
    render(<CalendarTemplate />);
    const noEventDay = now.getDate() === 2 ? 3 : 2;
    fireEvent.click(
      screen.getByRole('button', { name: `Select day ${noEventDay}` })
    );
    expect(screen.getByText('No events')).toBeInTheDocument();
    expect(screen.queryByText('Team standup')).not.toBeInTheDocument();
  });
});

describe('KanbanTemplate', () => {
  it('renders four columns with initial cards and task counts', () => {
    render(<KanbanTemplate />);
    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Todo column')).getByText(
        'Design landing page'
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Done column')).getByText(
        'Set up CI pipeline'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('2 tasks')).toBeInTheDocument();
    expect(screen.getAllByText('1 task')).toHaveLength(3);
  });

  it('adds a card to a column', () => {
    render(<KanbanTemplate />);
    fireEvent.change(screen.getByLabelText('New task for Todo'), {
      target: { value: 'Ship v1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add to Todo' }));
    expect(
      within(screen.getByLabelText('Todo column')).getByText('Ship v1')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('New task for Todo')).toHaveValue('');
  });

  it('adds a card with a fallback title when the input is empty', () => {
    render(<KanbanTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add to Review' }));
    expect(
      within(screen.getByLabelText('Review column')).getByText('Untitled task')
    ).toBeInTheDocument();
  });

  it('moves a card right then left across columns', () => {
    render(<KanbanTemplate />);
    fireEvent.change(screen.getByLabelText('New task for Todo'), {
      target: { value: 'Ship v1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add to Todo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move Ship v1 right' }));
    expect(
      within(screen.getByLabelText('In Progress column')).getByText('Ship v1')
    ).toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Todo column')).queryByText('Ship v1')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Move Ship v1 left' }));
    expect(
      within(screen.getByLabelText('Todo column')).getByText('Ship v1')
    ).toBeInTheDocument();
  });

  it('ignores moves at the board edges', () => {
    render(<KanbanTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Move Set up CI pipeline right' })
    );
    expect(
      within(screen.getByLabelText('Done column')).getByText(
        'Set up CI pipeline'
      )
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Move Design landing page left' })
    );
    expect(
      within(screen.getByLabelText('Todo column')).getByText(
        'Design landing page'
      )
    ).toBeInTheDocument();
  });

  it('deletes a card from its column', () => {
    render(<KanbanTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Set up CI pipeline' })
    );
    expect(
      within(screen.getByLabelText('Done column')).queryByText(
        'Set up CI pipeline'
      )
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Done column')).getByText('0 tasks')
    ).toBeInTheDocument();
  });
});

describe('InboxTemplate', () => {
  it('renders messages with unread indicators', () => {
    render(<InboxTemplate />);
    expect(screen.getByText('Q3 planning')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.getByText('10:24')).toBeInTheDocument();
    expect(screen.getAllByTitle('Unread')).toHaveLength(2);
    expect(screen.getByText('No message selected')).toBeInTheDocument();
  });

  it('filters messages by sender and subject', () => {
    render(<InboxTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search mail...'), {
      target: { value: 'stripe' },
    });
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.queryByText('Q3 planning')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search mail...'), {
      target: { value: 'Build' },
    });
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.queryByText('Payment received')).not.toBeInTheDocument();
  });

  it('shows an empty state when no messages match the search', () => {
    render(<InboxTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search mail...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No messages')).toBeInTheDocument();
  });

  it('opens a message and marks it as read', () => {
    render(<InboxTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open message from Alice Chen' })
    );
    expect(
      screen.getByText('Can you review the roadmap before our call?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/From alice@acme.com to me@acme.com/)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));
    expect(screen.getAllByTitle('Unread')).toHaveLength(1);
    expect(
      screen.queryByRole('button', { name: 'Mark as read' })
    ).not.toBeInTheDocument();
  });

  it('omits the mark-as-read button for an already-read message', () => {
    render(<InboxTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open message from Stripe' })
    );
    expect(
      screen.getByText('We received your payment of $49.00.')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Mark as read' })
    ).not.toBeInTheDocument();
  });

  it('deletes a message and falls back to the placeholder', () => {
    render(<InboxTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Open message from Alice Chen' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Q3 planning')).not.toBeInTheDocument();
    expect(screen.getByText('No message selected')).toBeInTheDocument();
  });

  it('shows the empty state after deleting every message', () => {
    render(<InboxTemplate />);
    [
      'Open message from Alice Chen',
      'Open message from GitHub',
      'Open message from Stripe',
    ].forEach((name) => {
      fireEvent.click(screen.getByRole('button', { name }));
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });
    expect(screen.getByText('No messages')).toBeInTheDocument();
    expect(screen.getByText('No message selected')).toBeInTheDocument();
  });
});

describe('TasksTemplate', () => {
  it('renders the task list with a done summary', () => {
    render(<TasksTemplate />);
    expect(screen.getByText('Write onboarding docs')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.getByText('Deploy staging')).toBeInTheDocument();
    expect(screen.getByText('1 of 3 done')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toHaveClass('line-through');
    expect(screen.getByText('Write onboarding docs')).not.toHaveClass(
      'line-through'
    );
  });

  it('adds a task and falls back to a default title for empty input', () => {
    render(<TasksTemplate />);
    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Deploy to prod' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Deploy to prod')).toBeInTheDocument();
    expect(screen.getByText('1 of 4 done')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getAllByText('Untitled task').length).toBeGreaterThan(0);
    expect(screen.getByText('1 of 5 done')).toBeInTheDocument();
  });

  it('toggles a task between done and active', () => {
    render(<TasksTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Toggle Write onboarding docs' })
    );
    expect(screen.getByText('Write onboarding docs')).toHaveClass(
      'line-through'
    );
    expect(screen.getByText('2 of 3 done')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Toggle Write onboarding docs' })
    );
    expect(screen.getByText('1 of 3 done')).toBeInTheDocument();
  });

  it('filters tasks by status', () => {
    render(<TasksTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('Write onboarding docs')).toBeInTheDocument();
    expect(screen.queryByText('Fix login bug')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.queryByText('Write onboarding docs')).not.toBeInTheDocument();
  });

  it('deletes tasks and shows the empty state per filter', () => {
    render(<TasksTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Fix login bug' })
    );
    expect(screen.getByText('No tasks')).toBeInTheDocument();
  });
});

describe('NotesTemplate', () => {
  it('renders note cards', () => {
    render(<NotesTemplate />);
    expect(screen.getByText('Launch checklist')).toBeInTheDocument();
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    expect(screen.getByText('Meeting notes')).toBeInTheDocument();
    expect(screen.getByText('Aug 04')).toBeInTheDocument();
  });

  it('creates a new note', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'New note' }));
    expect(screen.getByText('Untitled note')).toBeInTheDocument();
    expect(screen.getByText('Start writing...')).toBeInTheDocument();
  });

  it('edits a note inline and saves the changes', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ideas' }));
    fireEvent.change(screen.getByLabelText('Note title'), {
      target: { value: 'Brainstorm' },
    });
    fireEvent.change(screen.getByLabelText('Note body'), {
      target: { value: 'Write more ideas.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(screen.getByText('Brainstorm')).toBeInTheDocument();
    expect(screen.getByText('Write more ideas.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Note title')).not.toBeInTheDocument();
  });

  it('cancels an edit and keeps the original values', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ideas' }));
    fireEvent.change(screen.getByLabelText('Note title'), {
      target: { value: 'Changed' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel edit' }));
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    expect(screen.queryByText('Changed')).not.toBeInTheDocument();
  });

  it('falls back to a default title when saving an empty title', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ideas' }));
    fireEvent.change(screen.getByLabelText('Note title'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(screen.getAllByText('Untitled note').length).toBeGreaterThan(0);
    expect(screen.queryByText('Ideas')).not.toBeInTheDocument();
  });

  it('deletes a note', () => {
    render(<NotesTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Meeting notes' })
    );
    expect(screen.queryByText('Meeting notes')).not.toBeInTheDocument();
  });

  it('filters notes by title or body and shows an empty state', () => {
    render(<NotesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search notes...'), {
      target: { value: 'launch' },
    });
    expect(screen.getByText('Launch checklist')).toBeInTheDocument();
    expect(screen.queryByText('Ideas')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search notes...'), {
      target: { value: 'dark mode' },
    });
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search notes...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No notes')).toBeInTheDocument();
  });
});

describe('FilesTemplate', () => {
  it('renders the file table sorted by name', () => {
    render(<FilesTemplate />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
    expect(rows[1]).toHaveTextContent('invoice.pdf');
    expect(rows[1]).toHaveTextContent('file');
    expect(rows[1]).toHaveTextContent('245 KB');
    expect(rows[4]).toHaveTextContent('reports');
    expect(rows[4]).toHaveTextContent('—');
  });

  it('uploads a new file row', () => {
    render(<FilesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    expect(screen.getByText('uploaded.txt')).toBeInTheDocument();
    expect(screen.getByText('12 KB')).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(6);
  });

  it('filters files by name and shows an empty state', () => {
    render(<FilesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search files...'), {
      target: { value: 'readme' },
    });
    expect(screen.getByText('readme.txt')).toBeInTheDocument();
    expect(screen.queryByText('invoice.pdf')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search files...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No files')).toBeInTheDocument();
  });

  it('sorts files by size then back to name', () => {
    render(<FilesTemplate />);
    fireEvent.change(screen.getByLabelText('Sort by'), {
      target: { value: 'size' },
    });
    let rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('readme.txt');
    expect(rows[2]).toHaveTextContent('invoice.pdf');
    expect(rows[4]).toHaveTextContent('reports');
    fireEvent.change(screen.getByLabelText('Sort by'), {
      target: { value: 'name' },
    });
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('invoice.pdf');
  });
});

describe('App workspace pages', () => {
  it('renders the AnalyticsPage', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders the CalendarPage', () => {
    render(<CalendarPage />);
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('renders the KanbanPage', () => {
    render(<KanbanPage />);
    expect(screen.getByText('Kanban board')).toBeInTheDocument();
  });

  it('renders the InboxPage', () => {
    render(<InboxPage />);
    expect(screen.getByText('Q3 planning')).toBeInTheDocument();
  });

  it('renders the TasksPage', () => {
    render(<TasksPage />);
    expect(screen.getByText('1 of 3 done')).toBeInTheDocument();
  });

  it('renders the NotesPage', () => {
    render(<NotesPage />);
    expect(screen.getByText('Launch checklist')).toBeInTheDocument();
  });

  it('renders the FilesPage', () => {
    render(<FilesPage />);
    expect(screen.getByText('invoice.pdf')).toBeInTheDocument();
  });
});
