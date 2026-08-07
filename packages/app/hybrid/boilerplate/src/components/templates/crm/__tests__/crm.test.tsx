import { fireEvent, render, screen, within } from '@testing-library/react';
import { PipelineTemplate } from '../PipelineTemplate';
import { LeadsTemplate } from '../LeadsTemplate';
import { DealsTemplate } from '../DealsTemplate';
import { AccountsTemplate } from '../AccountsTemplate';
import { CrmContactsTemplate } from '../CrmContactsTemplate';
import { CampaignsTemplate } from '../CampaignsTemplate';
import { SalesReportsTemplate } from '../SalesReportsTemplate';
import { QuoteBuilderTemplate } from '../QuoteBuilderTemplate';
import PipelinePage from '@/app/(main)/crm/pipeline/page';
import LeadsPage from '@/app/(main)/crm/leads/page';
import DealsPage from '@/app/(main)/crm/deals/page';
import AccountsPage from '@/app/(main)/crm/accounts/page';
import CrmContactsPage from '@/app/(main)/crm/contacts/page';
import CampaignsPage from '@/app/(main)/crm/campaigns/page';
import SalesReportsPage from '@/app/(main)/crm/reports/page';
import QuoteBuilderPage from '@/app/(main)/crm/quote-builder/page';

describe('PipelineTemplate', () => {
  it('renders deals grouped by stage and the summary', () => {
    render(<PipelineTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Pipeline' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 deals')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Onboarding')).toBeInTheDocument();
    expect(screen.getByText('$48,000')).toBeInTheDocument();
    expect(screen.getByText('$35,000')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });

  it('advances a deal to the next stage', () => {
    render(<PipelineTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Advance' })[0]);
    expect(screen.getByText('7 deals')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Onboarding')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });
});

describe('LeadsTemplate', () => {
  it('renders all leads and the summary', () => {
    render(<LeadsTemplate />);
    expect(screen.getByRole('heading', { name: 'Leads' })).toBeInTheDocument();
    expect(screen.getByText('6 leads')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getAllByText('Acme Corp')).toHaveLength(2);
    expect(
      screen.getAllByRole('button', { name: 'Mark contacted' })
    ).toHaveLength(2);
  });

  it('filters leads by status', () => {
    render(<LeadsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Qualified' }));
    expect(screen.getByText('2 leads')).toBeInTheDocument();
    expect(screen.getByText('Emma Wilson')).toBeInTheDocument();
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
  });

  it('marks a lead as contacted', () => {
    render(<LeadsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Mark contacted' })[0]
    );
    expect(
      screen.getAllByRole('button', { name: 'Mark contacted' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Contacted')).toHaveLength(3);
    expect(within(table).getAllByText('New')).toHaveLength(1);
  });
});

describe('DealsTemplate', () => {
  it('renders deals with the total value', () => {
    render(<DealsTemplate />);
    expect(screen.getByRole('heading', { name: 'Deals' })).toBeInTheDocument();
    expect(screen.getByText('6 deals')).toBeInTheDocument();
    expect(screen.getByText('$125,850')).toBeInTheDocument();
    expect(screen.getAllByText('Sarah Jones')).toHaveLength(2);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(2);
    expect(within(table).getAllByText('Won')).toHaveLength(2);
    expect(within(table).getAllByText('Lost')).toHaveLength(2);
  });

  it('marks an open deal as won', () => {
    render(<DealsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark won' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(1);
    expect(within(table).getAllByText('Won')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Mark won' })).toHaveLength(1);
  });

  it('marks an open deal as lost', () => {
    render(<DealsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark lost' })[1]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(1);
    expect(within(table).getAllByText('Lost')).toHaveLength(3);
  });
});

describe('AccountsTemplate', () => {
  it('renders accounts and the summary', () => {
    render(<AccountsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Accounts' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 accounts')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getAllByText('2 contacts')).toHaveLength(2);
    expect(
      screen.getAllByRole('button', { name: 'Show contacts' })
    ).toHaveLength(4);
  });

  it('shows and hides account contacts', () => {
    render(<AccountsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Show contacts' })[0]
    );
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Hide contacts' })
    ).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Hide contacts' }));
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
  });
});

describe('CrmContactsTemplate', () => {
  it('renders all contacts and the summary', () => {
    render(<CrmContactsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Contacts' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 contacts')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Sales Manager at Acme Corp')).toBeInTheDocument();
    expect(screen.getAllByText('Sales')).toHaveLength(4);
  });

  it('filters contacts by team', () => {
    render(<CrmContactsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('2 contacts')).toBeInTheDocument();
    expect(screen.getByText('David Lee')).toBeInTheDocument();
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
  });

  it('searches contacts and shows the empty state', () => {
    render(<CrmContactsTemplate />);
    fireEvent.change(screen.getByLabelText('Search contacts'), {
      target: { value: 'grace' },
    });
    expect(screen.getByText('1 contacts')).toBeInTheDocument();
    expect(screen.getByText('Grace Kim')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search contacts'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No contacts found')).toBeInTheDocument();
    expect(screen.getByText('0 contacts')).toBeInTheDocument();
  });
});

describe('CampaignsTemplate', () => {
  it('renders all campaigns and the summary', () => {
    render(<CampaignsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Campaigns' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 campaigns')).toBeInTheDocument();
    expect(screen.getByText('12,400 sent')).toBeInTheDocument();
    expect(screen.getByText('23,000 sent')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Launch' })).toHaveLength(2);
  });

  it('filters campaigns by status', () => {
    render(<CampaignsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('2 campaigns')).toBeInTheDocument();
    expect(screen.getByText('Brand Awareness')).toBeInTheDocument();
    expect(screen.queryByText('Spring Newsletter')).not.toBeInTheDocument();
  });

  it('launches a draft campaign', () => {
    render(<CampaignsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Launch' })[0]);
    expect(screen.getAllByRole('button', { name: 'Launch' })).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Running')).toHaveLength(2);
    expect(within(table).getAllByText('Draft')).toHaveLength(1);
  });
});

describe('SalesReportsTemplate', () => {
  it('renders the monthly report stats', () => {
    render(<SalesReportsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sales Reports' })
    ).toBeInTheDocument();
    expect(screen.getByText('$84,200')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('34%')).toBeInTheDocument();
    expect(screen.getByText('$210,000')).toBeInTheDocument();
    expect(screen.getByText('This month report')).toBeInTheDocument();
  });

  it('switches to the quarterly report', () => {
    render(<SalesReportsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This quarter' }));
    expect(screen.getByText('$312,500')).toBeInTheDocument();
    expect(screen.getByText('61')).toBeInTheDocument();
    expect(screen.getByText('38%')).toBeInTheDocument();
    expect(screen.getByText('$640,000')).toBeInTheDocument();
    expect(screen.getByText('This quarter report')).toBeInTheDocument();
  });

  it('switches to the yearly report', () => {
    render(<SalesReportsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This year' }));
    expect(screen.getByText('$1,180,000')).toBeInTheDocument();
    expect(screen.getByText('214')).toBeInTheDocument();
    expect(screen.getByText('41%')).toBeInTheDocument();
    expect(screen.getByText('$1,500,000')).toBeInTheDocument();
  });
});

describe('QuoteBuilderTemplate', () => {
  it('renders the empty state with a zero total', () => {
    render(<QuoteBuilderTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Quote Builder' })
    ).toBeInTheDocument();
    expect(screen.getByText('No items yet')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('shows errors for missing name and invalid price', () => {
    render(<QuoteBuilderTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter an item name');
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: { value: 'Setup fee' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid price');
  });

  it('adds and removes a line item', () => {
    render(<QuoteBuilderTemplate />);
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: { value: 'Setup fee' },
    });
    fireEvent.change(screen.getByLabelText('Item price'), {
      target: { value: '500' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByText('Item added')).toBeInTheDocument();
    expect(screen.getByText('Setup fee — $500')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.getByText('No items yet')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });
});

describe('CRM pages', () => {
  it('renders the PipelinePage', () => {
    render(<PipelinePage />);
    expect(screen.getByText('7 deals')).toBeInTheDocument();
  });

  it('renders the LeadsPage', () => {
    render(<LeadsPage />);
    expect(screen.getByText('6 leads')).toBeInTheDocument();
  });

  it('renders the DealsPage', () => {
    render(<DealsPage />);
    expect(screen.getByText('$125,850')).toBeInTheDocument();
  });

  it('renders the AccountsPage', () => {
    render(<AccountsPage />);
    expect(screen.getByText('4 accounts')).toBeInTheDocument();
  });

  it('renders the CrmContactsPage', () => {
    render(<CrmContactsPage />);
    expect(screen.getByText('7 contacts')).toBeInTheDocument();
  });

  it('renders the CampaignsPage', () => {
    render(<CampaignsPage />);
    expect(screen.getByText('5 campaigns')).toBeInTheDocument();
  });

  it('renders the SalesReportsPage', () => {
    render(<SalesReportsPage />);
    expect(screen.getByText('$84,200')).toBeInTheDocument();
  });

  it('renders the QuoteBuilderPage', () => {
    render(<QuoteBuilderPage />);
    expect(screen.getByText('No items yet')).toBeInTheDocument();
  });
});
