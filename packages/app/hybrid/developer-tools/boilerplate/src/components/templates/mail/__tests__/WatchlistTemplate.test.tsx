import { fireEvent, render, screen } from '@testing-library/react';
import { WatchlistTemplate } from '../WatchlistTemplate';

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
