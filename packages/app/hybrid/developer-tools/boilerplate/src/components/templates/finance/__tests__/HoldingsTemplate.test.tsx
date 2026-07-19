import { fireEvent, render, screen, within } from '@testing-library/react';
import { HoldingsTemplate } from '../HoldingsTemplate';

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
