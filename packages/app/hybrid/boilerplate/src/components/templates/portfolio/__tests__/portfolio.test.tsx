import { fireEvent, render, screen, within } from '@testing-library/react';
import { AlertsTemplate } from '../AlertsTemplate';
import { AllocationTemplate } from '../AllocationTemplate';
import { DividendIncomeTemplate } from '../DividendIncomeTemplate';
import { HoldingsTemplate } from '../HoldingsTemplate';
import { PerformanceTemplate } from '../PerformanceTemplate';
import { PortfolioOverviewTemplate } from '../PortfolioOverviewTemplate';
import { PortfolioSettingsTemplate } from '../PortfolioSettingsTemplate';
import { TransactionsTemplate } from '../TransactionsTemplate';
import { WatchlistTemplate } from '../WatchlistTemplate';
import AlertsPage from '@/app/(templates)/portfolio/alerts/page';
import AllocationPage from '@/app/(templates)/portfolio/allocation/page';
import DividendIncomePage from '@/app/(templates)/portfolio/dividends/page';
import HoldingsPage from '@/app/(templates)/portfolio/holdings/page';
import PerformancePage from '@/app/(templates)/portfolio/performance/page';
import PortfolioOverviewPage from '@/app/(templates)/portfolio/overview/page';
import PortfolioSettingsPage from '@/app/(templates)/portfolio/settings/page';
import TransactionsPage from '@/app/(templates)/portfolio/transactions/page';
import WatchlistPage from '@/app/(templates)/portfolio/watchlist/page';

describe('PortfolioOverviewTemplate', () => {
  it('renders summary stat cards and a holdings preview', () => {
    render(<PortfolioOverviewTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Overview' })
    ).toBeInTheDocument();
    expect(screen.getByText('$128,450')).toBeInTheDocument();
    expect(screen.getByText('6 holdings')).toBeInTheDocument();
    expect(screen.getByText('Total Gain')).toBeInTheDocument();
    expect(screen.getByText('Dividend Yield')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add funds' })
    ).toBeInTheDocument();
  });

  it('toggles between Add funds and Transfer scheduled', () => {
    render(<PortfolioOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add funds' }));
    expect(
      screen.getByRole('button', { name: 'Transfer scheduled' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Transfer scheduled' }));
    expect(
      screen.getByRole('button', { name: 'Add funds' })
    ).toBeInTheDocument();
  });
});

describe('HoldingsTemplate', () => {
  it('renders holdings with allocation bars and counts', () => {
    render(<HoldingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Holdings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 holdings')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('0.85')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(7);
    expect(within(table).getByText('$57,290')).toBeInTheDocument();
  });

  it('filters holdings by asset type', () => {
    render(<HoldingsTemplate />);
    const table = screen.getByRole('table');
    fireEvent.click(screen.getByRole('button', { name: 'Stocks' }));
    expect(screen.getByText('2 holdings')).toBeInTheDocument();
    expect(within(table).getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.queryByText('Bitcoin')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Crypto' }));
    expect(screen.getByText('2 holdings')).toBeInTheDocument();
    expect(within(table).getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.queryByText('Apple Inc.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('6 holdings')).toBeInTheDocument();
  });
});

describe('TransactionsTemplate', () => {
  it('renders transactions with action badges', () => {
    render(<TransactionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Transactions' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 transactions')).toBeInTheDocument();
    expect(screen.getByText('Aug 7, 2026')).toBeInTheDocument();
    expect(screen.getByText('$16,850.00')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Buy')).toHaveLength(3);
    expect(within(table).getAllByText('Sell')).toHaveLength(2);
  });

  it('toggles the new transaction confirmation', () => {
    render(<TransactionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'New transaction' }));
    expect(
      screen.getByRole('button', { name: 'Transaction added' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Transaction added' }));
    expect(
      screen.getByRole('button', { name: 'New transaction' })
    ).toBeInTheDocument();
  });
});

describe('PerformanceTemplate', () => {
  it('renders performance bars and stats', () => {
    render(<PerformanceTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Performance' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('Best month')).toBeInTheDocument();
    expect(screen.getByText('Worst month')).toBeInTheDocument();
    expect(screen.getByText('Annual return')).toBeInTheDocument();
    expect(screen.getByText('+2.4%')).toBeInTheDocument();
    expect(screen.getByText('+10.6%')).toBeInTheDocument();
  });

  it('changes the return label by time range tab', () => {
    render(<PerformanceTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '3M' }));
    expect(screen.getByText('Return over 3M')).toBeInTheDocument();
    expect(screen.getByText('+5.1%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Return over All')).toBeInTheDocument();
    expect(screen.getByText('+23.4%')).toBeInTheDocument();
  });
});

describe('AllocationTemplate', () => {
  it('renders the allocation breakdown and total', () => {
    render(<AllocationTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Allocation' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 asset classes')).toBeInTheDocument();
    expect(screen.getByText('100% allocated')).toBeInTheDocument();
    expect(screen.getByText('$61,656')).toBeInTheDocument();
    expect(screen.getByText('Real Estate')).toBeInTheDocument();
  });

  it('shows details for a selected asset', () => {
    render(<AllocationTemplate />);
    expect(screen.getByText('Details for Stocks')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Real Estate'));
    expect(screen.getByText('Details for Real Estate')).toBeInTheDocument();
  });
});

describe('WatchlistTemplate', () => {
  it('renders watched tickers with change badges', () => {
    render(<WatchlistTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Watchlist' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 symbols')).toBeInTheDocument();
    expect(screen.getByText('NVDA')).toBeInTheDocument();
    expect(screen.getByText('NVIDIA Corp.')).toBeInTheDocument();
    expect(screen.getByText('+1.9%')).toBeInTheDocument();
    expect(screen.getByText('-0.7%')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(3);
  });

  it('adds and removes a symbol', () => {
    render(<WatchlistTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Symbol ticker' }), {
      target: { value: 'GOOG' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add symbol' }));
    expect(screen.getByText('4 symbols')).toBeInTheDocument();
    expect(screen.getByText('GOOG')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[3]);
    expect(screen.getByText('3 symbols')).toBeInTheDocument();
    expect(screen.queryByText('GOOG')).not.toBeInTheDocument();
  });
});

describe('AlertsTemplate', () => {
  it('renders price alerts with status badges', () => {
    render(<AlertsTemplate />);
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
    expect(screen.getByText('4 alerts')).toBeInTheDocument();
    expect(screen.getByText('AAPL above $250')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(3);
    expect(screen.getAllByText('Triggered')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Pause' })).toHaveLength(3);
  });

  it('pauses and resumes an alert and toggles the new alert button', () => {
    render(<AlertsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Pause' })[0]);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Paused')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Resume' }));
    expect(screen.getAllByText('Active')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'New alert' }));
    expect(
      screen.getByRole('button', { name: 'Alert created' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Alert created' }));
    expect(
      screen.getByRole('button', { name: 'New alert' })
    ).toBeInTheDocument();
  });
});

describe('PortfolioSettingsTemplate', () => {
  it('renders the settings form fields', () => {
    render(<PortfolioSettingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 preferences')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Growth Portfolio')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Risk tolerance' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Currency' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Reinvest dividends' })
    ).not.toBeChecked();
  });

  it('toggles dividend reinvest and saves settings', () => {
    render(<PortfolioSettingsTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Reinvest dividends' })
    );
    expect(
      screen.getByRole('checkbox', { name: 'Reinvest dividends' })
    ).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Save settings' }));
    expect(
      screen.getByRole('button', { name: 'Settings saved' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Settings saved' }));
    expect(
      screen.getByRole('button', { name: 'Save settings' })
    ).toBeInTheDocument();
  });
});

describe('DividendIncomeTemplate', () => {
  it('renders dividend stats and the payout table', () => {
    render(<DividendIncomeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Dividend Income' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 stocks')).toBeInTheDocument();
    expect(screen.getByText('$874.10')).toBeInTheDocument();
    expect(screen.getByText('2.7%')).toBeInTheDocument();
    expect(screen.getByText('20 / year')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(6);
    expect(within(table).getByText('SCHD')).toBeInTheDocument();
    expect(within(table).getByText('$186.25')).toBeInTheDocument();
  });

  it('toggles dividend reinvestment', () => {
    render(<DividendIncomeTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reinvest dividends' }));
    expect(
      screen.getByRole('button', { name: 'Reinvesting on' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Dividends will be automatically reinvested.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reinvesting on' }));
    expect(
      screen.getByRole('button', { name: 'Reinvest dividends' })
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Dividends will be automatically reinvested.')
    ).not.toBeInTheDocument();
  });
});

describe('PortfolioPages', () => {
  it('renders the PortfolioOverviewPage', () => {
    render(<PortfolioOverviewPage />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Overview' })
    ).toBeInTheDocument();
    expect(screen.getByText('$128,450')).toBeInTheDocument();
  });

  it('renders the HoldingsPage', () => {
    render(<HoldingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Holdings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 holdings')).toBeInTheDocument();
  });

  it('renders the TransactionsPage', () => {
    render(<TransactionsPage />);
    expect(
      screen.getByRole('heading', { name: 'Transactions' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 transactions')).toBeInTheDocument();
  });

  it('renders the PerformancePage', () => {
    render(<PerformancePage />);
    expect(
      screen.getByRole('heading', { name: 'Performance' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
  });

  it('renders the AllocationPage', () => {
    render(<AllocationPage />);
    expect(
      screen.getByRole('heading', { name: 'Allocation' })
    ).toBeInTheDocument();
    expect(screen.getByText('100% allocated')).toBeInTheDocument();
  });

  it('renders the WatchlistPage', () => {
    render(<WatchlistPage />);
    expect(
      screen.getByRole('heading', { name: 'Watchlist' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 symbols')).toBeInTheDocument();
  });

  it('renders the AlertsPage', () => {
    render(<AlertsPage />);
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
    expect(screen.getByText('4 alerts')).toBeInTheDocument();
  });

  it('renders the PortfolioSettingsPage', () => {
    render(<PortfolioSettingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 preferences')).toBeInTheDocument();
  });

  it('renders the DividendIncomePage', () => {
    render(<DividendIncomePage />);
    expect(
      screen.getByRole('heading', { name: 'Dividend Income' })
    ).toBeInTheDocument();
    expect(screen.getByText('$874.10')).toBeInTheDocument();
  });
});
