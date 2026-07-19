import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Percentile } from '../Percentile';
import type { ComparisonTab } from '../../types';

const tabs: ComparisonTab[] = [
  {
    key: 'all',
    label: 'All',
    description: 'All titled players',
    results: [
      {
        format: 'bullet',
        rating: 1500,
        percentile: 50,
        betterThan: 500,
        total: 1000,
      },
      {
        format: 'blitz',
        rating: 1600,
        percentile: 75,
        betterThan: 750,
        total: 1000,
      },
      { format: 'rapid', rating: 0, percentile: 0, betterThan: 0, total: 1000 },
    ],
  },
  {
    key: 'gm',
    label: 'GM',
    description: 'Grandmasters',
    results: [
      {
        format: 'bullet',
        rating: 2700,
        percentile: 99,
        betterThan: 990,
        total: 1000,
      },
    ],
  },
  {
    key: 'wgm',
    label: 'WGM',
    description: 'Women Grandmasters',
    results: [
      {
        format: 'bullet',
        rating: 2300,
        percentile: 90,
        betterThan: 900,
        total: 1000,
      },
    ],
  },
];

describe('Percentile', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    HTMLDialogElement.prototype.showModal = jest.fn(function () {
      (this as HTMLDialogElement).open = true;
    });
    HTMLDialogElement.prototype.close = jest.fn(function () {
      (this as HTMLDialogElement).open = false;
    });
  });

  it('renders username and description', () => {
    render(<Percentile username="alice" tabs={tabs} onClose={onClose} />);
    expect(screen.getByText('alice')).toBeTruthy();
    expect(screen.getByText('All titled players')).toBeTruthy();
  });

  it('shows rating data for bullet', () => {
    render(<Percentile username="alice" tabs={tabs} onClose={onClose} />);
    expect(screen.getByText('1500')).toBeTruthy();
    expect(screen.getByText(/Better than 50%/)).toBeTruthy();
  });

  it('shows no rating data when rating is 0', () => {
    render(<Percentile username="alice" tabs={tabs} onClose={onClose} />);
    expect(screen.getByText('No rating data')).toBeTruthy();
  });

  it('closes when close button is clicked', async () => {
    render(<Percentile username="alice" tabs={tabs} onClose={onClose} />);
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(closeBtn);
  });

  it('switches tabs via button text', async () => {
    render(<Percentile username="alice" tabs={tabs} onClose={onClose} />);
    const gmBtn = screen.getByRole('tab', { name: 'GM' });
    await userEvent.click(gmBtn);
    expect(screen.getByText('Grandmasters')).toBeTruthy();
  });

  it('switches to women title tab', async () => {
    render(<Percentile username="alice" tabs={tabs} onClose={onClose} />);
    const wgmBtn = screen.getByRole('tab', { name: 'WGM' });
    await userEvent.click(wgmBtn);
    expect(screen.getByText('Women Grandmasters')).toBeTruthy();
  });
});
