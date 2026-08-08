import { fireEvent, render, screen } from '@testing-library/react';
import { ActivityLogTemplate } from '../ActivityLogTemplate';
import { BillingTemplate } from '../BillingTemplate';
import { HelpCenterTemplate } from '../HelpCenterTemplate';
import { IntegrationsTemplate } from '../IntegrationsTemplate';
import { MembersTemplate } from '../MembersTemplate';
import { NotificationsTemplate } from '../NotificationsTemplate';
import ActivityPage from '@/app/(templates)/(app)/activity/page';
import BillingPage from '@/app/(templates)/(app)/billing/page';
import HelpPage from '@/app/(templates)/(app)/help/page';
import IntegrationsPage from '@/app/(templates)/(app)/integrations/page';
import MembersPage from '@/app/(templates)/(app)/members/page';
import NotificationsPage from '@/app/(templates)/(app)/notifications/page';

describe('MembersTemplate', () => {
  it('renders the team member table', () => {
    render(<MembersTemplate />);
    expect(screen.getByText('Team members')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
    expect(screen.getByText('Carol Smith')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(3);
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('changes a member role', () => {
    render(<MembersTemplate />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: 'Admin' } });
    expect(selects[1]).toHaveValue('Admin');
    expect(selects[0]).toHaveValue('Admin');
  });

  it('removes a member', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
  });

  it('opens the invite modal and sends an invite', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Invite member/ }));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Dana Lee' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'dana@acme.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send invite' }));
    expect(screen.getByText('Dana Lee')).toBeInTheDocument();
    expect(screen.getByText('dana@acme.com')).toBeInTheDocument();
    expect(screen.getAllByText('Invited')).toHaveLength(1);
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  it('closes the invite modal without sending', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Invite member/ }));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  it('sends an invite with default values when fields are empty', () => {
    render(<MembersTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Invite member/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Send invite' }));
    expect(screen.getByText('New Member')).toBeInTheDocument();
    expect(screen.getByText('member@acme.com')).toBeInTheDocument();
    expect(screen.getAllByText('Invited')).toHaveLength(1);
  });
});

describe('NotificationsTemplate', () => {
  it('renders notifications with types, times and unread badges', () => {
    render(<NotificationsTemplate />);
    expect(screen.getByText('Welcome to the workspace')).toBeInTheDocument();
    expect(screen.getByText('Deploy completed')).toBeInTheDocument();
    expect(screen.getByText('Storage usage is high')).toBeInTheDocument();
    expect(screen.getByText('Payment failed')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
    expect(screen.getByText('1 day ago')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('filters to unread notifications', () => {
    render(<NotificationsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Unread/ }));
    expect(screen.queryByText('Storage usage is high')).not.toBeInTheDocument();
    expect(screen.getByText('Welcome to the workspace')).toBeInTheDocument();
  });

  it('marks all notifications as read', () => {
    render(<NotificationsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Mark all read/ }));
    fireEvent.click(screen.getByRole('button', { name: /Unread/ }));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Mark all read/ })
    ).toBeDisabled();
  });

  it('dismisses a single notification', () => {
    render(<NotificationsTemplate />);
    const dismissButtons = screen.getAllByTitle('Dismiss');
    fireEvent.click(dismissButtons[0]);
    expect(
      screen.queryByText('Welcome to the workspace')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Storage usage is high')).toBeInTheDocument();
  });

  it('shows the empty state when all notifications are dismissed', () => {
    render(<NotificationsTemplate />);
    const dismissButtons = screen.getAllByTitle('Dismiss');
    dismissButtons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Mark all read/ })
    ).toBeDisabled();
  });
});

describe('HelpCenterTemplate', () => {
  it('renders all category cards and the contact footer', () => {
    render(<HelpCenterTemplate />);
    expect(
      screen.getByRole('button', { name: /Getting Started/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Billing/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Account/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Troubleshooting/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Contact support/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Need more help?')).toBeInTheDocument();
  });

  it('opens and closes the FAQ accordion for a category', () => {
    render(<HelpCenterTemplate />);
    const card = screen.getByRole('button', { name: /Getting Started/ });
    fireEvent.click(card);
    const summary = screen.getByText('How do I create a workspace?');
    const details = summary.closest('details')!;
    expect(details).not.toHaveAttribute('open');
    fireEvent.click(summary);
    expect(details).toHaveAttribute('open');
    fireEvent.click(card);
    expect(
      screen.queryByText('How do I create a workspace?')
    ).not.toBeInTheDocument();
  });

  it('shows FAQs for the billing category', () => {
    render(<HelpCenterTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Billing/ }));
    const summary = screen.getByText('How do I change my plan?');
    expect(summary).toBeInTheDocument();
    fireEvent.click(summary);
    expect(summary.closest('details')).toHaveAttribute('open');
  });

  it('filters categories by search query against titles', () => {
    render(<HelpCenterTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search help topics...'), {
      target: { value: 'Billing' },
    });
    expect(screen.getByRole('button', { name: /Billing/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Getting Started/ })
    ).not.toBeInTheDocument();
  });

  it('matches search queries against descriptions', () => {
    render(<HelpCenterTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search help topics...'), {
      target: { value: 'invoices' },
    });
    expect(screen.getByRole('button', { name: /Billing/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Troubleshooting/ })
    ).not.toBeInTheDocument();
  });

  it('shows an empty state when search has no matches', () => {
    render(<HelpCenterTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search help topics...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });
});

describe('BillingTemplate', () => {
  it('renders current plan, usage bars and invoices', () => {
    render(<BillingTemplate />);
    expect(screen.getByText('Current plan')).toBeInTheDocument();
    expect(screen.getAllByText('Pro').length).toBeGreaterThan(0);
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Emails')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('12 / 50')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Jul 01, 2026')).toBeInTheDocument();
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });

  it('switches between plan tiers', () => {
    render(<BillingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Enterprise/ }));
    expect(screen.getAllByText('Enterprise').length).toBe(2);
    expect(screen.getByText('Current')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Free/ }));
    expect(screen.getAllByText('Free').length).toBe(2);
  });

  it('downloads an invoice', () => {
    render(<BillingTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(
      screen.getByRole('button', { name: 'Downloaded' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(2);
  });

  it('updates the payment method', () => {
    render(<BillingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(screen.getByLabelText('Card number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Card number'), {
      target: { value: '4242 4242 4242 1234' },
    });
    fireEvent.change(screen.getByLabelText('Expiry'), {
      target: { value: '01/30' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Save card/ }));
    expect(screen.queryByLabelText('Card number')).not.toBeInTheDocument();
    expect(screen.getByText('Visa ending in 1234')).toBeInTheDocument();
  });
});

describe('IntegrationsTemplate', () => {
  it('renders integration cards with connection state', () => {
    render(<IntegrationsTemplate />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getAllByText('Connected')).toHaveLength(2);
  });

  it('connects a disconnected integration', () => {
    render(<IntegrationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Connect' })[0]);
    expect(screen.getAllByText('Connected')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Disconnect' })).toHaveLength(
      3
    );
  });

  it('disconnects a connected integration', () => {
    render(<IntegrationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Disconnect' })[0]);
    expect(screen.getAllByText('Connected')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Connect' })).toHaveLength(4);
  });

  it('filters integrations by search query', () => {
    render(<IntegrationsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search integrations...'), {
      target: { value: 'Stripe' },
    });
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });

  it('shows an empty state when no integrations match', () => {
    render(<IntegrationsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search integrations...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No integrations found')).toBeInTheDocument();
  });
});

describe('ActivityLogTemplate', () => {
  it('renders the initial timeline', () => {
    render(<ActivityLogTemplate />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('created the project "Alpha"')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
    expect(screen.queryByText('rotated API keys')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Load more/ })
    ).toBeInTheDocument();
  });

  it('filters activity by admin type', () => {
    render(<ActivityLogTemplate />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'admin' },
    });
    expect(screen.getAllByText('Ops Team')).toHaveLength(3);
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
    expect(screen.getByText('End of activity')).toBeInTheDocument();
  });

  it('filters activity by system type', () => {
    render(<ActivityLogTemplate />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'system' },
    });
    expect(screen.getByText('ran an automated backup')).toBeInTheDocument();
    expect(
      screen.queryByText('created the project "Alpha"')
    ).not.toBeInTheDocument();
    expect(screen.getByText('End of activity')).toBeInTheDocument();
  });

  it('loads more activity until the end is reached', () => {
    render(<ActivityLogTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Load more/ }));
    expect(screen.getByText('rotated API keys')).toBeInTheDocument();
    expect(screen.getByText('updated billing details')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Load more/ }));
    expect(screen.getByText('End of activity')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Load more/ })
    ).not.toBeInTheDocument();
  });
});

describe('App pages', () => {
  it('renders the MembersPage', () => {
    render(<MembersPage />);
    expect(screen.getByText('Team members')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
  });

  it('renders the NotificationsPage', () => {
    render(<NotificationsPage />);
    expect(screen.getByText('Welcome to the workspace')).toBeInTheDocument();
  });

  it('renders the HelpPage', () => {
    render(<HelpPage />);
    expect(
      screen.getByRole('button', { name: /Getting Started/ })
    ).toBeInTheDocument();
  });

  it('renders the BillingPage', () => {
    render(<BillingPage />);
    expect(screen.getByText('Current plan')).toBeInTheDocument();
  });

  it('renders the IntegrationsPage', () => {
    render(<IntegrationsPage />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders the ActivityPage', () => {
    render(<ActivityPage />);
    expect(
      screen.getByRole('button', { name: /Load more/ })
    ).toBeInTheDocument();
  });
});
