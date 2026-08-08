import { fireEvent, render, screen, within } from '@testing-library/react';
import { InboxTemplate } from '../InboxTemplate';
import { ComposeTemplate } from '../ComposeTemplate';
import { ThreadTemplate } from '../ThreadTemplate';
import { SentTemplate } from '../SentTemplate';
import { DraftsTemplate } from '../DraftsTemplate';
import { LabelsTemplate } from '../LabelsTemplate';
import { MailSearchTemplate } from '../MailSearchTemplate';
import { SpamTemplate } from '../SpamTemplate';
import InboxPage from '@/app/(templates)/mail/inbox/page';
import ComposePage from '@/app/(templates)/mail/compose/page';
import ThreadPage from '@/app/(templates)/mail/thread/page';
import SentPage from '@/app/(templates)/mail/sent/page';
import DraftsPage from '@/app/(templates)/mail/drafts/page';
import LabelsPage from '@/app/(templates)/mail/labels/page';
import MailSearchPage from '@/app/(templates)/mail/search/page';
import SpamPage from '@/app/(templates)/mail/spam/page';

describe('InboxTemplate', () => {
  it('renders all messages with the summary', () => {
    render(<InboxTemplate />);
    expect(screen.getByRole('heading', { name: 'Inbox' })).toBeInTheDocument();
    expect(screen.getByText('6 messages')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('Recruiter')).toBeInTheDocument();
  });

  it('filters unread messages', () => {
    render(<InboxTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Unread' }));
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.queryByText('This week in design')).not.toBeInTheDocument();
  });

  it('deletes selected messages', () => {
    render(<InboxTemplate />);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete selected (0)',
    });
    expect(deleteButton).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Select Build passed'));
    fireEvent.click(screen.getByLabelText('Select Payment received'));
    expect(
      screen.getByRole('button', { name: 'Delete selected (2)' })
    ).toBeEnabled();
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete selected (2)' })
    );
    expect(screen.getByText('4 messages')).toBeInTheDocument();
    expect(screen.queryByText('Build passed')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete selected (0)' })
    ).toBeDisabled();
  });
});

describe('ComposeTemplate', () => {
  it('renders the compose form', () => {
    render(<ComposeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Compose' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('shows an error when submitting without a recipient', () => {
    render(<ComposeTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a recipient');
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument();
  });

  it('saves a draft as the body is typed', () => {
    render(<ComposeTemplate />);
    fireEvent.change(screen.getByLabelText('Body'), {
      target: { value: 'Hello there' },
    });
    expect(screen.getByText('Draft saved')).toBeInTheDocument();
  });

  it('sends a message with a recipient', () => {
    render(<ComposeTemplate />);
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: 'ada@acme.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('Message sent')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('ThreadTemplate', () => {
  it('renders the conversation and summary', () => {
    render(<ThreadTemplate />);
    expect(screen.getByRole('heading', { name: 'Thread' })).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    expect(
      screen.getByText('GitHub: Build passed for the latest commit.')
    ).toBeInTheDocument();
    expect(screen.getByText('You: Thanks for the update.')).toBeInTheDocument();
  });

  it('sends a reply and ignores empty replies', () => {
    render(<ThreadTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Reply'), {
      target: { value: 'Great work team.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    expect(screen.getByText('You: Great work team.')).toBeInTheDocument();
    expect(screen.getByText('4 messages')).toBeInTheDocument();
  });
});

describe('SentTemplate', () => {
  it('renders sent messages with status badges', () => {
    render(<SentTemplate />);
    expect(screen.getByRole('heading', { name: 'Sent' })).toBeInTheDocument();
    expect(screen.getByText('5 sent messages')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Q3 roadmap review')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Read')).toHaveLength(3);
    expect(within(table).getAllByText('Delivered')).toHaveLength(2);
  });
});

describe('DraftsTemplate', () => {
  it('renders drafts and the summary', () => {
    render(<DraftsTemplate />);
    expect(screen.getByRole('heading', { name: 'Drafts' })).toBeInTheDocument();
    expect(screen.getByText('4 drafts')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Budget proposal')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);
  });

  it('deletes all drafts and shows the empty state', () => {
    render(<DraftsTemplate />);
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    deleteButtons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('No drafts')).toBeInTheDocument();
    expect(screen.getByText('0 drafts')).toBeInTheDocument();
  });
});

describe('LabelsTemplate', () => {
  it('renders labels and the summary', () => {
    render(<LabelsTemplate />);
    expect(screen.getByRole('heading', { name: 'Labels' })).toBeInTheDocument();
    expect(screen.getByText('4 labels')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
  });

  it('adds a label', () => {
    render(<LabelsTemplate />);
    fireEvent.change(screen.getByLabelText('Label name'), {
      target: { value: 'Travel' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add label' }));
    expect(screen.getByText('Travel')).toBeInTheDocument();
    expect(screen.getByText('5 labels')).toBeInTheDocument();
    expect(screen.getByText('Label added')).toBeInTheDocument();
  });

  it('rejects empty and duplicate labels', () => {
    render(<LabelsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add label' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a label name');
    fireEvent.change(screen.getByLabelText('Label name'), {
      target: { value: 'Work' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add label' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Label already exists');
    expect(screen.getByText('4 labels')).toBeInTheDocument();
  });

  it('removes a label', () => {
    render(<LabelsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Personal' }));
    expect(screen.queryByText('Personal')).not.toBeInTheDocument();
    expect(screen.getByText('3 labels')).toBeInTheDocument();
  });
});

describe('MailSearchTemplate', () => {
  it('renders all results by default', () => {
    render(<MailSearchTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Mail Search' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 results')).toBeInTheDocument();
    expect(screen.getByText('GitHub: Build passed')).toBeInTheDocument();
  });

  it('filters results by query', () => {
    render(<MailSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search mail'), {
      target: { value: 'stripe' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Stripe: Payment received')).toBeInTheDocument();
    expect(screen.queryByText('GitHub: Build passed')).not.toBeInTheDocument();
  });

  it('shows the no-results state', () => {
    render(<MailSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search mail'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "zzz"')).toBeInTheDocument();
  });
});

describe('SpamTemplate', () => {
  it('renders spam messages and the summary', () => {
    render(<SpamTemplate />);
    expect(screen.getByRole('heading', { name: 'Spam' })).toBeInTheDocument();
    expect(screen.getByText('4 spam messages')).toBeInTheDocument();
    expect(screen.getByText('Lottery Winner')).toBeInTheDocument();
    expect(screen.getByText('You have won a prize!')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Not spam' })).toHaveLength(4);
  });

  it('removes all spam and shows the empty state', () => {
    render(<SpamTemplate />);
    const buttons = screen.getAllByRole('button', { name: 'Not spam' });
    buttons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('No spam messages')).toBeInTheDocument();
    expect(screen.getByText('0 spam messages')).toBeInTheDocument();
  });
});

describe('Mail pages', () => {
  it('renders the InboxPage', () => {
    render(<InboxPage />);
    expect(screen.getByText('6 messages')).toBeInTheDocument();
  });

  it('renders the ComposePage', () => {
    render(<ComposePage />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('renders the ThreadPage', () => {
    render(<ThreadPage />);
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });

  it('renders the SentPage', () => {
    render(<SentPage />);
    expect(screen.getByText('5 sent messages')).toBeInTheDocument();
  });

  it('renders the DraftsPage', () => {
    render(<DraftsPage />);
    expect(screen.getByText('4 drafts')).toBeInTheDocument();
  });

  it('renders the LabelsPage', () => {
    render(<LabelsPage />);
    expect(screen.getByText('4 labels')).toBeInTheDocument();
  });

  it('renders the MailSearchPage', () => {
    render(<MailSearchPage />);
    expect(screen.getByText('6 results')).toBeInTheDocument();
  });

  it('renders the SpamPage', () => {
    render(<SpamPage />);
    expect(screen.getByText('4 spam messages')).toBeInTheDocument();
  });
});
