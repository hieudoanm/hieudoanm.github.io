import { fireEvent, render, screen, within } from '@testing-library/react';
import { AccountsTemplate } from '../AccountsTemplate';
import { BudgetsTemplate } from '../BudgetsTemplate';
import { InvoicesTemplate } from '../InvoicesTemplate';
import { PayrollTemplate } from '../PayrollTemplate';
import { StatementsTemplate } from '../StatementsTemplate';
import { SubscriptionsTemplate } from '../SubscriptionsTemplate';
import { TaxesTemplate } from '../TaxesTemplate';
import { TransactionsTemplate } from '../TransactionsTemplate';
import AccountsPage from '@/app/(templates)/finance/accounts/page';
import BudgetsPage from '@/app/(templates)/finance/budgets/page';
import InvoicesPage from '@/app/(templates)/finance/invoices/page';
import PayrollPage from '@/app/(templates)/finance/payroll/page';
import StatementsPage from '@/app/(templates)/finance/statements/page';
import SubscriptionsPage from '@/app/(templates)/finance/subscriptions/page';
import TaxesPage from '@/app/(templates)/finance/taxes/page';
import TransactionsPage from '@/app/(templates)/finance/transactions/page';

describe('InvoicesTemplate', () => {
  it('renders invoices with amounts, statuses and the summary', () => {
    render(<InvoicesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Invoices' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('$2,400')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Paid')).toHaveLength(3);
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Overdue')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Mark paid' })).toHaveLength(
      3
    );
  });

  it('filters invoices by status', () => {
    render(<InvoicesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Paid' }));
    expect(screen.getByText('3 invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-002')).toBeInTheDocument();
    expect(screen.queryByText('INV-001')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Overdue' }));
    expect(screen.getByText('1 invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-003')).toBeInTheDocument();
    expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
  });

  it('marks pending and overdue invoices as paid', () => {
    render(<InvoicesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark paid' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Paid')).toHaveLength(4);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
    expect(within(table).getAllByText('Overdue')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Mark paid' })).toHaveLength(
      2
    );
    expect(screen.getByText('6 invoices')).toBeInTheDocument();
  });
});

describe('BudgetsTemplate', () => {
  it('renders budgets with progress bars and the total summary', () => {
    render(<BudgetsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Budgets' })
    ).toBeInTheDocument();
    expect(screen.getByText('Total budget')).toBeInTheDocument();
    expect(screen.getByText('$26,000')).toBeInTheDocument();
    expect(screen.getByText('$6,400 of $8,000')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Progress for Marketing' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('On track')).toHaveLength(4);
    expect(screen.getAllByText('Over budget')).toHaveLength(1);
  });

  it('increases spend past the limit and flips the badge', () => {
    render(<BudgetsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase Office' }));
    expect(screen.getByText('$3,000 of $3,000')).toBeInTheDocument();
    expect(screen.getAllByText('On track')).toHaveLength(4);
    fireEvent.click(screen.getByRole('button', { name: 'Increase Office' }));
    expect(screen.getByText('$3,100 of $3,000')).toBeInTheDocument();
    expect(screen.getAllByText('Over budget')).toHaveLength(2);
    expect(screen.getAllByText('On track')).toHaveLength(3);
  });

  it('keeps an over-budget row over and leaves the total unchanged', () => {
    render(<BudgetsTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Increase Engineering tools' })
    );
    expect(screen.getByText('$5,300 of $5,000')).toBeInTheDocument();
    expect(screen.getAllByText('Over budget')).toHaveLength(1);
    expect(screen.getByText('$26,000')).toBeInTheDocument();
  });
});

describe('SubscriptionsTemplate', () => {
  it('renders subscriptions with amounts and status badges', () => {
    render(<SubscriptionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Subscriptions' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 active subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(3);
    expect(within(table).getAllByText('Past due')).toHaveLength(2);
    expect(within(table).getAllByText('Cancelled')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(3);
    expect(
      screen.getAllByRole('button', { name: 'Send reminder' })
    ).toHaveLength(2);
  });

  it('cancels an active subscription', () => {
    render(<SubscriptionsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' })[0]);
    expect(screen.getByText('2 active subscriptions')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(2);
    expect(within(table).getAllByText('Cancelled')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(2);
  });

  it('sends a reminder to a past due subscription', () => {
    render(<SubscriptionsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Send reminder' })[0]
    );
    expect(screen.getByText('4 active subscriptions')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(4);
    expect(within(table).getAllByText('Past due')).toHaveLength(1);
  });
});

describe('TransactionsTemplate', () => {
  it('renders transactions with a net balance and type badges', () => {
    render(<TransactionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Transactions' })
    ).toBeInTheDocument();
    expect(screen.getByText('Net balance')).toBeInTheDocument();
    expect(screen.getByText('$3,041')).toBeInTheDocument();
    expect(screen.getByText('Client payment')).toBeInTheDocument();
    expect(screen.getByText('$4,800')).toBeInTheDocument();
    expect(screen.getByText('$-2,400')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Income')).toHaveLength(3);
    expect(within(table).getAllByText('Expense')).toHaveLength(4);
  });

  it('filters transactions and recomputes the net balance', () => {
    render(<TransactionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Income' }));
    expect(screen.getByText('$7,350')).toBeInTheDocument();
    expect(screen.getByText('Client payment')).toBeInTheDocument();
    expect(screen.queryByText('Cloud hosting')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('$3,041')).toBeInTheDocument();
  });

  it('shows a negative net balance when filtered to expenses', () => {
    render(<TransactionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Expense' }));
    expect(screen.getByText('$-4,309')).toBeInTheDocument();
    expect(screen.getByText('Cloud hosting')).toBeInTheDocument();
    expect(screen.queryByText('Client payment')).not.toBeInTheDocument();
  });
});

describe('TaxesTemplate', () => {
  it('renders regions with rates and the enabled summary', () => {
    render(<TaxesTemplate />);
    expect(screen.getByRole('heading', { name: 'Taxes' })).toBeInTheDocument();
    expect(screen.getByText('4 regions enabled')).toBeInTheDocument();
    expect(screen.getByText('California')).toBeInTheDocument();
    expect(screen.getByText('7.25%')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Enable California' })
    ).toBeChecked();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Enabled')).toHaveLength(4);
    expect(within(table).getAllByText('Disabled')).toHaveLength(2);
  });

  it('toggles regions between enabled and disabled', () => {
    render(<TaxesTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable Washington' })
    );
    expect(screen.getByText('5 regions enabled')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Disabled')).toHaveLength(1);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Enable California' })
    );
    expect(screen.getByText('4 regions enabled')).toBeInTheDocument();
    expect(within(table).getAllByText('Disabled')).toHaveLength(2);
  });

  it('renders the rate percentage for every region', () => {
    render(<TaxesTemplate />);
    expect(screen.getByText('8.875%')).toBeInTheDocument();
    expect(screen.getByText('6.5%')).toBeInTheDocument();
    expect(screen.getByText('6%')).toBeInTheDocument();
    expect(screen.getAllByText('6.25%')).toHaveLength(2);
  });
});

describe('PayrollTemplate', () => {
  it('renders payroll runs with the paid summary', () => {
    render(<PayrollTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Payroll' })
    ).toBeInTheDocument();
    expect(screen.getByText('2 of 4 runs paid')).toBeInTheDocument();
    expect(screen.getByText('Aug 01, 2026')).toBeInTheDocument();
    expect(screen.getByText('$24,000')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Paid')).toHaveLength(2);
    expect(within(table).getAllByText('Draft')).toHaveLength(2);
  });

  it('runs payroll and shows the confirmation', () => {
    render(<PayrollTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Run payroll' }));
    expect(screen.getByText('3 of 5 runs paid')).toBeInTheDocument();
    expect(screen.getByText('Payroll run completed')).toBeInTheDocument();
    expect(screen.getByText('Aug 15, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('$24,000')).toHaveLength(2);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Draft')).toHaveLength(2);
  });

  it('appends a paid run on every click', () => {
    render(<PayrollTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Run payroll' }));
    fireEvent.click(screen.getByRole('button', { name: 'Run payroll' }));
    expect(screen.getByText('4 of 6 runs paid')).toBeInTheDocument();
    expect(screen.getAllByText('$24,000')).toHaveLength(3);
  });
});

describe('StatementsTemplate', () => {
  it('renders statement cards with balances and activity', () => {
    render(<StatementsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Statements' })
    ).toBeInTheDocument();
    expect(screen.getByText('July 2026')).toBeInTheDocument();
    expect(screen.getByText('$24,800')).toBeInTheDocument();
    expect(screen.getByText('142 transactions')).toBeInTheDocument();
    expect(screen.getByText('105 transactions')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(5);
  });

  it('downloads a statement and swaps the button for a badge', () => {
    render(<StatementsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[1]);
    expect(screen.getByText('Downloaded')).toBeInTheDocument();
    expect(screen.getByText('Statement downloaded')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(4);
  });

  it('keeps only the most recently downloaded statement marked', () => {
    render(<StatementsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(screen.getAllByText('Downloaded')).toHaveLength(1);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(screen.getAllByText('Downloaded')).toHaveLength(1);
  });
});

describe('AccountsTemplate', () => {
  it('renders accounts with type badges and masked balances', () => {
    render(<AccountsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Accounts' })
    ).toBeInTheDocument();
    expect(screen.getByText('Business Checking')).toBeInTheDocument();
    expect(screen.getByText('****4832')).toBeInTheDocument();
    expect(screen.getAllByText('Checking')).toHaveLength(2);
    expect(screen.getAllByText('Savings')).toHaveLength(1);
    expect(screen.getAllByText('Credit')).toHaveLength(1);
    expect(screen.getAllByText('••••')).toHaveLength(4);
    expect(
      screen.getByRole('button', { name: 'Show balances' })
    ).toBeInTheDocument();
  });

  it('toggles between masked and shown balances', () => {
    render(<AccountsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Show balances' }));
    expect(screen.queryByText('••••')).not.toBeInTheDocument();
    expect(screen.getAllByText(/\$\d/)).toHaveLength(4);
    expect(screen.getByText('$120,000')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide balances' }));
    expect(screen.getAllByText('••••')).toHaveLength(4);
  });

  it('cycles the toggle button label', () => {
    render(<AccountsTemplate />);
    expect(
      screen.getByRole('button', { name: 'Show balances' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show balances' }));
    expect(
      screen.getByRole('button', { name: 'Hide balances' })
    ).toBeInTheDocument();
  });
});

describe('Finance pages', () => {
  it('renders the InvoicesPage', () => {
    render(<InvoicesPage />);
    expect(screen.getByText('6 invoices')).toBeInTheDocument();
  });

  it('renders the BudgetsPage', () => {
    render(<BudgetsPage />);
    expect(screen.getByText('$26,000')).toBeInTheDocument();
  });

  it('renders the SubscriptionsPage', () => {
    render(<SubscriptionsPage />);
    expect(screen.getByText('3 active subscriptions')).toBeInTheDocument();
  });

  it('renders the TransactionsPage', () => {
    render(<TransactionsPage />);
    expect(screen.getByText('$3,041')).toBeInTheDocument();
  });

  it('renders the TaxesPage', () => {
    render(<TaxesPage />);
    expect(screen.getByText('4 regions enabled')).toBeInTheDocument();
  });

  it('renders the PayrollPage', () => {
    render(<PayrollPage />);
    expect(screen.getByText('2 of 4 runs paid')).toBeInTheDocument();
  });

  it('renders the StatementsPage', () => {
    render(<StatementsPage />);
    expect(screen.getByText('July 2026')).toBeInTheDocument();
  });

  it('renders the AccountsPage', () => {
    render(<AccountsPage />);
    expect(screen.getByText('Business Checking')).toBeInTheDocument();
  });
});
