import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  AccordionTemplate,
  AlertsTemplate,
  TabsTemplate,
  PaginationTemplate,
  TooltipsTemplate,
  StepperTemplate,
  UploadTemplate,
  EmptyStatesTemplate,
} from '../';
import AccordionPage from '@/app/(main)/(app)/accordion/page';
import AlertsPage from '@/app/(main)/(app)/alerts/page';
import TabsPage from '@/app/(main)/(app)/tabs/page';
import PaginationPage from '@/app/(main)/(app)/pagination/page';
import TooltipsPage from '@/app/(main)/(app)/tooltips/page';
import StepperPage from '@/app/(main)/(app)/stepper/page';
import UploadPage from '@/app/(main)/(app)/upload/page';
import EmptyStatesPage from '@/app/(main)/(app)/empty-states/page';

describe('AccordionTemplate', () => {
  it('renders four accordion items in the closed state', () => {
    render(<AccordionTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Accordion showcase' })
    ).toBeInTheDocument();
    expect(screen.getByText('What is this boilerplate?')).toBeInTheDocument();
    expect(screen.getByText('How do I add a new route?')).toBeInTheDocument();
    expect(
      screen.getByText('Can I use these templates in the desktop app?')
    ).toBeInTheDocument();
    expect(screen.getByText('How are tests organized?')).toBeInTheDocument();
    expect(screen.getAllByText('Closed')).toHaveLength(4);
    expect(screen.getByText('0 of 4 open')).toBeInTheDocument();
  });

  it('opens and closes an item when clicked', () => {
    render(<AccordionTemplate />);
    fireEvent.click(screen.getByText('What is this boilerplate?'));
    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getByText('1 of 4 open')).toBeInTheDocument();
    fireEvent.click(screen.getByText('What is this boilerplate?'));
    expect(screen.getAllByText('Closed')).toHaveLength(4);
    expect(screen.getByText('0 of 4 open')).toBeInTheDocument();
  });

  it('toggles a specific item with the control button', () => {
    render(<AccordionTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle question 2' }));
    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getByText('1 of 4 open')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle question 2' }));
    expect(screen.getAllByText('Closed')).toHaveLength(4);
  });
});

describe('AlertsTemplate', () => {
  it('renders all four alert variants', () => {
    render(<AlertsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Alerts showcase' })
    ).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('4 of 4 alerts visible')).toBeInTheDocument();
  });

  it('dismisses an alert', () => {
    render(<AlertsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Success' }));
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.getByText('3 of 4 alerts visible')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('resets all alerts after dismissal', () => {
    render(<AlertsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Success' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Info' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Warning' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Error' }));
    expect(screen.getByText('0 of 4 alerts visible')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset alerts' }));
    expect(screen.getByText('4 of 4 alerts visible')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

describe('TabsTemplate', () => {
  it('renders the overview tab by default', () => {
    render(<TabsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Tabs showcase' })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(
      screen.getByText('A quick look at your workspace metrics and activity.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('You have 3 unread notifications.')
    ).not.toBeInTheDocument();
  });

  it('switches to the activity tab', () => {
    render(<TabsTemplate />);
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(
      screen.getByText('You have 3 unread notifications.')
    ).toBeInTheDocument();
    expect(screen.getByText('Alice updated the roadmap')).toBeInTheDocument();
  });

  it('marks notifications as read on the activity tab only', () => {
    render(<TabsTemplate />);
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(
      screen.getByText('All caught up. No unread notifications.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('You have 3 unread notifications.')
    ).not.toBeInTheDocument();
  });

  it('shows the details tab', () => {
    render(<TabsTemplate />);
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));
    expect(
      screen.getByText('Workspace version 2.4.1, plan Pro, owner Alice Smith.')
    ).toBeInTheDocument();
  });
});

describe('PaginationTemplate', () => {
  it('renders the first page of records', () => {
    render(<PaginationTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Pagination' })
    ).toBeInTheDocument();
    expect(screen.getByText('Showing 1-5 of 25')).toBeInTheDocument();
    expect(screen.getByText('Record 1')).toBeInTheDocument();
    expect(screen.getByText('Record 5')).toBeInTheDocument();
    expect(screen.queryByText('Record 6')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeDisabled();
  });

  it('navigates with page number buttons', () => {
    render(<PaginationTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(screen.getByText('Showing 6-10 of 25')).toBeInTheDocument();
    expect(screen.getByText('Record 6')).toBeInTheDocument();
    expect(screen.queryByText('Record 1')).not.toBeInTheDocument();
  });

  it('navigates with next and previous buttons', () => {
    render(<PaginationTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Showing 6-10 of 25')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('Showing 1-5 of 25')).toBeInTheDocument();
  });

  it('disables next on the last page', () => {
    render(<PaginationTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to page 5' }));
    expect(screen.getByText('Showing 21-25 of 25')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });
});

describe('TooltipsTemplate', () => {
  it('renders tooltip buttons and the popover trigger', () => {
    render(<TooltipsTemplate />);
    expect(
      screen.getAllByRole('heading', { name: 'Tooltips' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute(
      'data-tip',
      'Copy to clipboard'
    );
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute(
      'data-tip',
      'Download file'
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute(
      'data-tip',
      'Delete item'
    );
    expect(
      screen.getByRole('button', { name: 'Show popover' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Quick actions')).not.toBeInTheDocument();
  });

  it('opens and closes the controlled popover', () => {
    render(<TooltipsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Show popover' }));
    expect(screen.getByText('Quick actions')).toBeInTheDocument();
    expect(
      screen.getByText('This popover is toggled by React state.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close popover' }));
    expect(screen.queryByText('Quick actions')).not.toBeInTheDocument();
  });
});

describe('StepperTemplate', () => {
  it('starts on the first step', () => {
    render(<StepperTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Stepper' })
    ).toBeInTheDocument();
    expect(screen.getByText('Step 1: Account')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    expect(screen.queryByText('All steps complete')).not.toBeInTheDocument();
  });

  it('advances and goes back between steps', () => {
    render(<StepperTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 2: Profile')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 3: Preferences')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Step 2: Profile')).toBeInTheDocument();
  });

  it('shows the completion state on the final step', () => {
    render(<StepperTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 4: Done')).toBeInTheDocument();
    expect(screen.getByText('All steps complete')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Back' })).toBeEnabled();
  });
});

describe('UploadTemplate', () => {
  it('renders the dropzone with no file selected', () => {
    render(<UploadTemplate />);
    expect(screen.getByRole('heading', { name: 'Upload' })).toBeInTheDocument();
    expect(screen.getByText('Drop a file here')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose file')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Upload' })
    ).not.toBeInTheDocument();
  });

  it('shows the selected file name and size', () => {
    render(<UploadTemplate />);
    const file = new File([new Array(1025).join('a')], 'report.pdf');
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [file] },
    });
    expect(screen.getAllByText('report.pdf').length).toBeGreaterThan(0);
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
  });

  it('uploads the file and resets', () => {
    jest.useFakeTimers();
    try {
      render(<UploadTemplate />);
      const file = new File([new Array(1025).join('a')], 'report.pdf');
      fireEvent.change(screen.getByLabelText('Choose file'), {
        target: { files: [file] },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
      expect(
        screen.getByRole('button', { name: 'Uploading...' })
      ).toBeDisabled();
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(
        screen.getByRole('button', { name: 'Upload complete' })
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.queryByText('report.pdf')).not.toBeInTheDocument();
      expect(screen.getByText('Drop a file here')).toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('EmptyStatesTemplate', () => {
  it('renders a gallery of empty states', () => {
    render(<EmptyStatesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Empty states' })
    ).toBeInTheDocument();
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('You are all caught up')).toBeInTheDocument();
    expect(screen.getByText('No files yet')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('No recent activity to show.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Upload a file' })).toHaveAttribute(
      'href',
      '/upload'
    );
  });

  it('simulates and clears data', () => {
    render(<EmptyStatesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Simulate data' }));
    expect(screen.getByText('Alice created the Q3 report')).toBeInTheDocument();
    expect(
      screen.queryByText('No recent activity to show.')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear data' }));
    expect(
      screen.queryByText('Alice created the Q3 report')
    ).not.toBeInTheDocument();
    expect(screen.getByText('No recent activity to show.')).toBeInTheDocument();
  });
});

describe('AccordionPage', () => {
  it('renders the accordion page', () => {
    render(<AccordionPage />);
    expect(
      screen.getByRole('heading', { name: 'Accordion showcase' })
    ).toBeInTheDocument();
  });
});

describe('AlertsPage', () => {
  it('renders the alerts page', () => {
    render(<AlertsPage />);
    expect(
      screen.getByRole('heading', { name: 'Alerts showcase' })
    ).toBeInTheDocument();
  });
});

describe('TabsPage', () => {
  it('renders the tabs page', () => {
    render(<TabsPage />);
    expect(
      screen.getByRole('heading', { name: 'Tabs showcase' })
    ).toBeInTheDocument();
  });
});

describe('PaginationPage', () => {
  it('renders the pagination page', () => {
    render(<PaginationPage />);
    expect(
      screen.getByRole('heading', { name: 'Pagination' })
    ).toBeInTheDocument();
  });
});

describe('TooltipsPage', () => {
  it('renders the tooltips page', () => {
    render(<TooltipsPage />);
    expect(
      screen.getAllByRole('heading', { name: 'Tooltips' }).length
    ).toBeGreaterThan(0);
  });
});

describe('StepperPage', () => {
  it('renders the stepper page', () => {
    render(<StepperPage />);
    expect(
      screen.getByRole('heading', { name: 'Stepper' })
    ).toBeInTheDocument();
  });
});

describe('UploadPage', () => {
  it('renders the upload page', () => {
    render(<UploadPage />);
    expect(screen.getByRole('heading', { name: 'Upload' })).toBeInTheDocument();
  });
});

describe('EmptyStatesPage', () => {
  it('renders the empty states page', () => {
    render(<EmptyStatesPage />);
    expect(
      screen.getByRole('heading', { name: 'Empty states' })
    ).toBeInTheDocument();
  });
});
