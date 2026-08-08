import { fireEvent, render, screen } from '@testing-library/react';
import PricingPage from '../pricing/page';
import ContactPage from '../contact/page';
import CareersPage from '../careers/page';
import TeamPage from '../team/page';
import ChangelogPage from '../changelog/page';

describe('PricingPage', () => {
  it('renders monthly pricing by default', () => {
    render(<PricingPage />);
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Manage plan' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose Pro' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose Enterprise' })
    ).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
  });

  it('switches to annual pricing', () => {
    render(<PricingPage />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Billing annually' }));
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();
    expect(screen.getAllByText(/billed yearly/).length).toBeGreaterThan(0);
  });
});

describe('ContactPage', () => {
  it('renders contact blocks and the form', () => {
    render(<ContactPage />);
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(screen.getByText('hello@boilerplate.com')).toBeInTheDocument();
    expect(screen.getByText('+1 555-0132')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Your name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('General');
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('shows an error when fields are empty', () => {
    render(<ContactPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please fill in all fields'
    );
  });

  it('sends the message when valid', () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Your name' }), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText('Message sent')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Send message' })
    ).not.toBeInTheDocument();
  });
});

describe('CareersPage', () => {
  it('renders departments and open positions', () => {
    render(<CareersPage />);
    expect(screen.getByText('Work with us')).toBeInTheDocument();
    expect(screen.getByText(/6 open positions/)).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
  });

  it('marks a job as applied', () => {
    render(<CareersPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Apply' })[0]);
    expect(screen.getByText('Application sent')).toBeInTheDocument();
    expect(screen.getByText(/5 open positions/)).toBeInTheDocument();
  });
});

describe('TeamPage', () => {
  it('renders all team members', () => {
    render(<TeamPage />);
    expect(screen.getByText('Meet the team')).toBeInTheDocument();
    expect(screen.getByText('6 team members')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });

  it('filters members by department', () => {
    render(<TeamPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('3 team members')).toBeInTheDocument();
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
  });

  it('connects to a member', () => {
    render(<TeamPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Connect' })[0]);
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });
});

describe('ChangelogPage', () => {
  it('renders releases and changes', () => {
    render(<ChangelogPage />);
    expect(screen.getByText("What's new")).toBeInTheDocument();
    expect(screen.getByText('v1.4.0')).toBeInTheDocument();
    expect(screen.getByText('v1.3.1')).toBeInTheDocument();
    expect(
      screen.getByText('Dark mode for the dashboard.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Fixed a crash when editing comments.')
    ).toBeInTheDocument();
  });

  it('filters changes by type', () => {
    render(<ChangelogPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Fixed' }));
    expect(
      screen.getByText('Fixed a crash when editing comments.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Dark mode for the dashboard.')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('v1.3.0')).not.toBeInTheDocument();
  });
});
