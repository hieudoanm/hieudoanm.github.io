import { fireEvent, render, screen, within } from '@testing-library/react';
import { TicketsTemplate } from '../TicketsTemplate';
import { TicketDetailTemplate } from '../TicketDetailTemplate';
import { KnowledgeBaseTemplate } from '../KnowledgeBaseTemplate';
import { LiveChatTemplate } from '../LiveChatTemplate';
import { FaqTemplate } from '../FaqTemplate';
import { FeedbackTemplate } from '../FeedbackTemplate';
import { AnnouncementsTemplate } from '../AnnouncementsTemplate';
import { ServiceStatusTemplate } from '../ServiceStatusTemplate';
import TicketsPage from '@/app/(main)/support/tickets/page';
import TicketDetailPage from '@/app/(main)/support/ticket-detail/page';
import KnowledgeBasePage from '@/app/(main)/support/knowledge-base/page';
import LiveChatPage from '@/app/(main)/support/live-chat/page';
import FaqPage from '@/app/(main)/support/faqs/page';
import FeedbackPage from '@/app/(main)/support/feedback/page';
import AnnouncementsPage from '@/app/(main)/support/announcements/page';
import ServiceStatusPage from '@/app/(main)/support/status/page';

describe('TicketsTemplate', () => {
  it('renders tickets with priority and status badges', () => {
    render(<TicketsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Support Tickets' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 tickets')).toBeInTheDocument();
    expect(screen.getByText('T-1001')).toBeInTheDocument();
    expect(screen.getByText('Cannot reset password')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(2);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
    expect(within(table).getAllByText('Resolved')).toHaveLength(1);
    expect(within(table).getAllByText('Closed')).toHaveLength(2);
  });

  it('claims an open ticket and moves it to pending', () => {
    render(<TicketsTemplate />);
    expect(screen.getAllByRole('button', { name: 'Claim' })).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Claim' })[0]);
    expect(screen.getAllByRole('button', { name: 'Claim' })).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(1);
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
  });

  it('filters tickets by status', () => {
    render(<TicketsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Resolved' }));
    expect(screen.getByText('Login issue on mobile')).toBeInTheDocument();
    expect(screen.queryByText('Cannot reset password')).not.toBeInTheDocument();
    expect(screen.getByText('1 tickets')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Cannot reset password')).toBeInTheDocument();
    expect(screen.queryByText('Login issue on mobile')).not.toBeInTheDocument();
  });
});

describe('TicketDetailTemplate', () => {
  it('renders the ticket conversation and summary', () => {
    render(<TicketDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Ticket Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('Cannot reset password')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    expect(
      screen.getByText('Jane Doe: I cannot reset my password.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('You: Hi Jane, let me look into that.')
    ).toBeInTheDocument();
  });

  it('resolves the ticket', () => {
    render(<TicketDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Resolve ticket' }));
    expect(
      screen.queryByRole('button', { name: 'Resolve ticket' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Resolved')).toBeInTheDocument();
    expect(screen.queryByText('Open')).not.toBeInTheDocument();
  });

  it('sends a reply and ignores empty replies', () => {
    render(<TicketDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Reply to customer'), {
      target: { value: 'Let me reset that for you.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(
      screen.getByText('You: Let me reset that for you.')
    ).toBeInTheDocument();
    expect(screen.getByText('4 messages')).toBeInTheDocument();
  });
});

describe('KnowledgeBaseTemplate', () => {
  it('renders articles with read times and the summary', () => {
    render(<KnowledgeBaseTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Knowledge Base' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 articles')).toBeInTheDocument();
    expect(
      screen.getByText('Getting started with your account')
    ).toBeInTheDocument();
    expect(screen.getByText('4 min read')).toBeInTheDocument();
    expect(
      screen.getByText('Manage notification preferences')
    ).toBeInTheDocument();
    expect(screen.getByText('7 min read')).toBeInTheDocument();
  });

  it('filters articles by category', () => {
    render(<KnowledgeBaseTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Billing' }));
    expect(screen.getByText('Understanding your invoice')).toBeInTheDocument();
    expect(screen.getByText('How refunds work')).toBeInTheDocument();
    expect(
      screen.queryByText('Getting started with your account')
    ).not.toBeInTheDocument();
    expect(screen.getByText('2 articles')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Account' }));
    expect(screen.getByText('Update your profile')).toBeInTheDocument();
    expect(screen.queryByText('How refunds work')).not.toBeInTheDocument();
  });

  it('searches articles and shows the empty state', () => {
    render(<KnowledgeBaseTemplate />);
    fireEvent.change(screen.getByLabelText('Search articles'), {
      target: { value: 'refunds' },
    });
    expect(screen.getByText('How refunds work')).toBeInTheDocument();
    expect(screen.queryByText('Update your profile')).not.toBeInTheDocument();
    expect(screen.getByText('1 articles')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search articles'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No articles found')).toBeInTheDocument();
    expect(screen.getByText('0 articles')).toBeInTheDocument();
  });
});

describe('LiveChatTemplate', () => {
  it('renders the initial support messages and summary', () => {
    render(<LiveChatTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live Chat' })
    ).toBeInTheDocument();
    expect(screen.getByText('2 messages')).toBeInTheDocument();
    expect(
      screen.getByText('Support: Hi! How can we help you today?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Support: Let us know your issue and we will take a look.'
      )
    ).toBeInTheDocument();
  });

  it('sends a typed message', () => {
    render(<LiveChatTemplate />);
    fireEvent.change(screen.getByLabelText('Type a message'), {
      target: { value: 'I am locked out' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('You: I am locked out')).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });

  it('sends a quick reply', () => {
    render(<LiveChatTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reset password' }));
    expect(screen.getByText('You: Reset password')).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });
});

describe('FaqTemplate', () => {
  it('renders all questions and the summary', () => {
    render(<FaqTemplate />);
    expect(screen.getByRole('heading', { name: 'FAQs' })).toBeInTheDocument();
    expect(screen.getByText('5 FAQs')).toBeInTheDocument();
    expect(screen.getByText('How do I reset my password?')).toBeInTheDocument();
    expect(screen.getByText('How do I contact support?')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Show answer' })).toHaveLength(
      5
    );
  });

  it('expands an answer', () => {
    render(<FaqTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Show answer' })[0]);
    expect(
      screen.getByText('Go to the login page and click Forgot password.')
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Hide answer' })).toHaveLength(
      1
    );
  });

  it('collapses an answer when toggled again', () => {
    render(<FaqTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Show answer' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Hide answer' }));
    expect(
      screen.queryByText('Go to the login page and click Forgot password.')
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Show answer' })).toHaveLength(
      5
    );
  });
});

describe('FeedbackTemplate', () => {
  it('renders the rating buttons and default summary', () => {
    render(<FeedbackTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Feedback' })
    ).toBeInTheDocument();
    expect(screen.getByText('Rating —/5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rate 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rate 5' })).toBeInTheDocument();
  });

  it('shows an error when submitting without a rating', () => {
    render(<FeedbackTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Select a rating first'
    );
    expect(
      screen.queryByText('Thanks for your feedback')
    ).not.toBeInTheDocument();
  });

  it('submits feedback with a rating', () => {
    render(<FeedbackTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Rate 4' }));
    expect(screen.getByText('Rating 4/5')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Thanks for your feedback')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('AnnouncementsTemplate', () => {
  it('renders all announcements and the summary', () => {
    render(<AnnouncementsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Announcements' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 announcements')).toBeInTheDocument();
    expect(screen.getByText('Dark mode is here')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026')).toBeInTheDocument();
  });

  it('filters announcements by type', () => {
    render(<AnnouncementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Maintenance' }));
    expect(
      screen.getByText('Scheduled maintenance on August 9')
    ).toBeInTheDocument();
    expect(screen.getByText('Payment processing upgrade')).toBeInTheDocument();
    expect(screen.queryByText('Dark mode is here')).not.toBeInTheDocument();
    expect(screen.getByText('2 announcements')).toBeInTheDocument();
  });

  it('shows new feature announcements', () => {
    render(<AnnouncementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'New feature' }));
    expect(screen.getByText('Dark mode is here')).toBeInTheDocument();
    expect(screen.getByText('New keyboard shortcuts')).toBeInTheDocument();
    expect(
      screen.queryByText('Improved search performance')
    ).not.toBeInTheDocument();
  });
});

describe('ServiceStatusTemplate', () => {
  it('renders services with status badges and the summary', () => {
    render(<ServiceStatusTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Service Status' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 of 5 services operational')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Operational')).toHaveLength(3);
    expect(within(table).getAllByText('Degraded')).toHaveLength(1);
    expect(within(table).getAllByText('Outage')).toHaveLength(1);
  });

  it('filters services by status', () => {
    render(<ServiceStatusTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Degraded' }));
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.queryByText('API')).not.toBeInTheDocument();
    expect(screen.getByText('3 of 5 services operational')).toBeInTheDocument();
  });

  it('shows outage services', () => {
    render(<ServiceStatusTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Outage' }));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Email delivery')).not.toBeInTheDocument();
  });
});

describe('Support pages', () => {
  it('renders the TicketsPage', () => {
    render(<TicketsPage />);
    expect(screen.getByText('6 tickets')).toBeInTheDocument();
  });

  it('renders the TicketDetailPage', () => {
    render(<TicketDetailPage />);
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });

  it('renders the KnowledgeBasePage', () => {
    render(<KnowledgeBasePage />);
    expect(screen.getByText('6 articles')).toBeInTheDocument();
  });

  it('renders the LiveChatPage', () => {
    render(<LiveChatPage />);
    expect(screen.getByText('2 messages')).toBeInTheDocument();
  });

  it('renders the FaqPage', () => {
    render(<FaqPage />);
    expect(screen.getByText('5 FAQs')).toBeInTheDocument();
  });

  it('renders the FeedbackPage', () => {
    render(<FeedbackPage />);
    expect(screen.getByText('Rating —/5')).toBeInTheDocument();
  });

  it('renders the AnnouncementsPage', () => {
    render(<AnnouncementsPage />);
    expect(screen.getByText('5 announcements')).toBeInTheDocument();
  });

  it('renders the ServiceStatusPage', () => {
    render(<ServiceStatusPage />);
    expect(screen.getByText('3 of 5 services operational')).toBeInTheDocument();
  });
});
