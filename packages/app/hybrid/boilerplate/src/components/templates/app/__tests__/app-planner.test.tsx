import { fireEvent, render, screen, within } from '@testing-library/react';
import { ContactsTemplate } from '../ContactsTemplate';
import { ExpensesTemplate } from '../ExpensesTemplate';
import { GoalsTemplate } from '../GoalsTemplate';
import { ImportTemplate } from '../ImportTemplate';
import { MeetingsTemplate } from '../MeetingsTemplate';
import { PermissionsTemplate } from '../PermissionsTemplate';
import { ReportsTemplate } from '../ReportsTemplate';
import { RoadmapTemplate } from '../RoadmapTemplate';
import { ShortcutsTemplate } from '../ShortcutsTemplate';
import { SprintsTemplate } from '../SprintsTemplate';
import { TimesheetsTemplate } from '../TimesheetsTemplate';
import { WebhooksTemplate } from '../WebhooksTemplate';
import { WhiteboardTemplate } from '../WhiteboardTemplate';
import ContactsPage from '@/app/(templates)/(app)/contacts/page';
import ExpensesPage from '@/app/(templates)/(app)/expenses/page';
import GoalsPage from '@/app/(templates)/(app)/goals/page';
import ImportPage from '@/app/(templates)/(app)/import/page';
import MeetingsPage from '@/app/(templates)/(app)/meetings/page';
import PermissionsPage from '@/app/(templates)/(app)/permissions/page';
import ReportsPage from '@/app/(templates)/(app)/reports/page';
import RoadmapPage from '@/app/(templates)/(app)/roadmap/page';
import ShortcutsPage from '@/app/(templates)/(app)/shortcuts/page';
import SprintsPage from '@/app/(templates)/(app)/sprints/page';
import TimesheetsPage from '@/app/(templates)/(app)/timesheets/page';
import WebhooksPage from '@/app/(templates)/(app)/webhooks/page';
import WhiteboardPage from '@/app/(templates)/(app)/whiteboard/page';

describe('ExpensesTemplate', () => {
  it('renders expenses with amounts, statuses and the summary line', () => {
    render(<ExpensesTemplate />);
    expect(screen.getByText('Flight to NYC')).toBeInTheDocument();
    expect(screen.getByText('$450.00')).toBeInTheDocument();
    expect(screen.getByText('1 of 4 approved')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Approved')).toHaveLength(1);
    expect(within(table).getAllByText('Rejected')).toHaveLength(1);
  });

  it('filters expenses by status', () => {
    render(<ExpensesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Approved' }));
    expect(screen.getByText('Client dinner')).toBeInTheDocument();
    expect(screen.queryByText('Flight to NYC')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Rejected' }));
    expect(screen.getByText('Office supplies')).toBeInTheDocument();
    expect(screen.queryByText('Client dinner')).not.toBeInTheDocument();
  });

  it('approves and rejects expenses and updates the summary', () => {
    render(<ExpensesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Approve' })[0]);
    expect(screen.getByText('2 of 4 approved')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Reject' })[0]);
    expect(screen.getByText('1 of 4 approved')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Rejected')).toHaveLength(2);
  });
});

describe('TimesheetsTemplate', () => {
  it('renders weekly entries and the total hours', () => {
    render(<TimesheetsTemplate />);
    expect(screen.getAllByText('Website redesign').length).toBeGreaterThan(0);
    expect(screen.getByText('Mobile app')).toBeInTheDocument();
    expect(screen.getByText('API integration')).toBeInTheDocument();
    expect(screen.getAllByText('Mon').length).toBeGreaterThan(0);
    expect(screen.getByText('Total 14h')).toBeInTheDocument();
  });

  it('logs a new time entry and updates the total', () => {
    render(<TimesheetsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Log time/ }));
    expect(screen.getByLabelText('Project')).toBeInTheDocument();
    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Hours'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add entry' }));
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Total 16h')).toBeInTheDocument();
  });
});

describe('GoalsTemplate', () => {
  it('renders goal cards with progress and an overall summary', () => {
    render(<GoalsTemplate />);
    expect(screen.getByText('Grow monthly revenue')).toBeInTheDocument();
    expect(screen.getByText('Ship the new dashboard')).toBeInTheDocument();
    expect(screen.getByText('48%')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '+ 10%' })).toHaveLength(4);
  });

  it('advances goal progress with a cap at 100%', () => {
    render(<GoalsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: '+ 10%' })[0]);
    expect(screen.getAllByText('50%')).toHaveLength(2);
    const highGoal = screen.getAllByRole('button', { name: '+ 10%' })[1];
    fireEvent.click(highGoal);
    fireEvent.click(highGoal);
    fireEvent.click(highGoal);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});

describe('RoadmapTemplate', () => {
  it('renders three phases with item counts', () => {
    render(<RoadmapTemplate />);
    expect(screen.getByText('Now')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Later')).toBeInTheDocument();
    expect(screen.getAllByText('2 items')).toHaveLength(3);
  });

  it('moves roadmap items between phases', () => {
    render(<RoadmapTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: /Move Launch billing v2 right/ })
    );
    expect(screen.getByText('3 items')).toBeInTheDocument();
    expect(screen.getAllByText('1 item')).toHaveLength(1);
    fireEvent.click(
      screen.getByRole('button', { name: /Move AI assistant left/ })
    );
    expect(screen.getAllByText('1 item')).toHaveLength(2);
    expect(screen.getByText('4 items')).toBeInTheDocument();
  });
});

describe('SprintsTemplate', () => {
  it('renders sprints with status badges and story points', () => {
    render(<SprintsTemplate />);
    expect(screen.getByText('Sprint 12')).toBeInTheDocument();
    expect(screen.getByText('Sprint 13')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(1);
    expect(screen.getAllByText('Planned')).toHaveLength(2);
  });

  it('starts a planned sprint', () => {
    render(<SprintsTemplate />);
    expect(
      screen.getAllByRole('button', { name: 'Start sprint' })
    ).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start sprint' })[0]);
    expect(
      screen.getAllByRole('button', { name: 'Start sprint' })
    ).toHaveLength(1);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Planned')).toHaveLength(1);
  });
});

describe('ReportsTemplate', () => {
  it('switches the generated date range', () => {
    render(<ReportsTemplate />);
    expect(
      screen.getByText('Generated for the last 30 days')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '7d' }));
    expect(
      screen.getByText('Generated for the last 7 days')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '90d' }));
    expect(
      screen.getByText('Generated for the last 90 days')
    ).toBeInTheDocument();
  });

  it('renders report cards with export buttons', () => {
    render(<ReportsTemplate />);
    expect(screen.getByText('Revenue summary')).toBeInTheDocument();
    expect(screen.getByText('User growth')).toBeInTheDocument();
    expect(screen.getByText('Feature usage')).toBeInTheDocument();
    expect(screen.getByText('Support performance')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Export' })).toHaveLength(4);
  });
});

describe('ContactsTemplate', () => {
  it('renders contact rows with avatar initials', () => {
    render(<ContactsTemplate />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('BM')).toBeInTheDocument();
  });

  it('favorites and unfavorites a contact', () => {
    render(<ContactsTemplate />);
    expect(screen.getAllByText('Favorited')).toHaveLength(1);
    fireEvent.click(
      screen.getAllByRole('button', { name: /Toggle favorite for/ })[0]
    );
    expect(screen.getAllByText('Favorited')).toHaveLength(2);
    fireEvent.click(
      screen.getAllByRole('button', { name: /Toggle favorite for/ })[0]
    );
    expect(screen.getAllByText('Favorited')).toHaveLength(1);
  });

  it('filters contacts by search', () => {
    render(<ContactsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search contacts...'), {
      target: { value: 'Acme' },
    });
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.queryByText('Bob Martinez')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search contacts...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No contacts found')).toBeInTheDocument();
  });
});

describe('WhiteboardTemplate', () => {
  it('selects a color and paints cells', () => {
    render(<WhiteboardTemplate />);
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('0 marks')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Select Red' }));
    expect(screen.getByText('Red')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cell 1' }));
    expect(screen.getByText('1 marks')).toBeInTheDocument();
  });

  it('clears the whiteboard', () => {
    render(<WhiteboardTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Select Blue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cell 2' }));
    expect(screen.getByText('1 marks')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByText('0 marks')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
  });
});

describe('MeetingsTemplate', () => {
  it('renders upcoming meetings with participants', () => {
    render(<MeetingsTemplate />);
    expect(screen.getByText('Product sync')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    expect(screen.getByText('6 participants')).toBeInTheDocument();
  });

  it('filters meetings by day', () => {
    render(<MeetingsTemplate />);
    expect(screen.getByText('Product sync')).toBeInTheDocument();
    expect(screen.queryByText('Roadmap planning')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'This week' }));
    expect(screen.getByText('Roadmap planning')).toBeInTheDocument();
    expect(screen.queryByText('Product sync')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Product sync')).toBeInTheDocument();
    expect(screen.getByText('All-hands')).toBeInTheDocument();
  });
});

describe('ShortcutsTemplate', () => {
  it('renders shortcuts grouped by category', () => {
    render(<ShortcutsTemplate />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Editing')).toBeInTheDocument();
    expect(screen.getAllByText('Actions').length).toBeGreaterThan(0);
    expect(screen.getByText('Go to home')).toBeInTheDocument();
    expect(screen.getByText('G + H')).toBeInTheDocument();
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('shows copied feedback', () => {
    render(<ShortcutsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Copy' })).toHaveLength(6);
  });

  it('filters shortcuts by description or keys', () => {
    render(<ShortcutsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search shortcuts...'), {
      target: { value: 'palette' },
    });
    expect(screen.getByText('Open command palette')).toBeInTheDocument();
    expect(screen.queryByText('Go to home')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search shortcuts...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No shortcuts found')).toBeInTheDocument();
  });
});

describe('ImportTemplate', () => {
  it('walks through the import wizard steps', () => {
    render(<ImportTemplate />);
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(
      screen.getByRole('heading', { name: 'Map columns' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Back/ }));
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Import complete')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start over' }));
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
  });

  it('shows the selected file name', () => {
    render(<ImportTemplate />);
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [new File(['a,b'], 'contacts.csv')] },
    });
    expect(screen.getByText('contacts.csv')).toBeInTheDocument();
    expect(
      screen.queryByText('Choose a CSV file to get started.')
    ).not.toBeInTheDocument();
  });
});

describe('WebhooksTemplate', () => {
  it('renders webhook endpoints with status badges', () => {
    render(<WebhooksTemplate />);
    expect(screen.getByText('Deployments')).toBeInTheDocument();
    expect(
      screen.getByText('https://hooks.example.com/deployments')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Disabled')).toHaveLength(1);
  });

  it('toggles webhooks between active and disabled', () => {
    render(<WebhooksTemplate />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Toggle Members' }));
    expect(screen.getAllByText('Active')).toHaveLength(3);
    expect(screen.queryByText('Disabled')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Toggle Deployments' })
    );
    expect(screen.getAllByText('Disabled')).toHaveLength(1);
    expect(screen.getAllByText('Active')).toHaveLength(2);
  });

  it('shows test sent feedback', () => {
    render(<WebhooksTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Test' })[0]);
    expect(screen.getByText('Test sent')).toBeInTheDocument();
  });
});

describe('PermissionsTemplate', () => {
  it('renders the matrix with an all-enabled admin column', () => {
    render(<PermissionsTemplate />);
    expect(screen.getByText('6 of 6 permissions granted')).toBeInTheDocument();
    expect(screen.getByText('Manage members')).toBeInTheDocument();
    const adminBoxes = screen.getAllByRole('checkbox', { name: /for Admin/ });
    expect(adminBoxes).toHaveLength(6);
    adminBoxes.forEach((box) => expect(box).toBeChecked());
    adminBoxes.forEach((box) => expect(box).toBeDisabled());
  });

  it('toggles editor and viewer permissions', () => {
    render(<PermissionsTemplate />);
    expect(screen.getByText('3 granted')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Grant Edit projects for Editor' })
    );
    expect(screen.getByText('2 granted')).toBeInTheDocument();
    expect(screen.queryByText('3 granted')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Grant View projects for Viewer' })
    );
    expect(screen.queryByText('1 granted')).not.toBeInTheDocument();
    expect(screen.getByText('0 granted')).toBeInTheDocument();
  });
});

describe('Planner pages', () => {
  it('renders the ExpensesPage', () => {
    render(<ExpensesPage />);
    expect(screen.getByText('1 of 4 approved')).toBeInTheDocument();
  });

  it('renders the TimesheetsPage', () => {
    render(<TimesheetsPage />);
    expect(screen.getByText('Total 14h')).toBeInTheDocument();
  });

  it('renders the GoalsPage', () => {
    render(<GoalsPage />);
    expect(screen.getByText('48%')).toBeInTheDocument();
  });

  it('renders the RoadmapPage', () => {
    render(<RoadmapPage />);
    expect(screen.getByText('Launch billing v2')).toBeInTheDocument();
  });

  it('renders the SprintsPage', () => {
    render(<SprintsPage />);
    expect(screen.getByText('Sprint 12')).toBeInTheDocument();
  });

  it('renders the ReportsPage', () => {
    render(<ReportsPage />);
    expect(
      screen.getByText('Generated for the last 30 days')
    ).toBeInTheDocument();
  });

  it('renders the ContactsPage', () => {
    render(<ContactsPage />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
  });

  it('renders the WhiteboardPage', () => {
    render(<WhiteboardPage />);
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  it('renders the MeetingsPage', () => {
    render(<MeetingsPage />);
    expect(screen.getByText('Product sync')).toBeInTheDocument();
  });

  it('renders the ShortcutsPage', () => {
    render(<ShortcutsPage />);
    expect(screen.getByText('Go to home')).toBeInTheDocument();
  });

  it('renders the ImportPage', () => {
    render(<ImportPage />);
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
  });

  it('renders the WebhooksPage', () => {
    render(<WebhooksPage />);
    expect(screen.getByText('Deployments')).toBeInTheDocument();
  });

  it('renders the PermissionsPage', () => {
    render(<PermissionsPage />);
    expect(screen.getByText('6 of 6 permissions granted')).toBeInTheDocument();
  });
});
