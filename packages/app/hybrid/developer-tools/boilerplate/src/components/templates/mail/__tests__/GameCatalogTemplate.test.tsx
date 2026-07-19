import { fireEvent, render, screen, within } from '@testing-library/react';
import { GameCatalogTemplate } from '../GameCatalogTemplate';

describe('GameCatalogTemplate', () => {
  it('renders the catalog with a count summary and game details', () => {
    render(<GameCatalogTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Game Catalog' })
    ).toBeInTheDocument();
    expect(screen.getByText('Browse every title.')).toBeInTheDocument();
    expect(screen.getByText('6 games')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Search games' })
    ).toBeInTheDocument();
    expect(screen.getByText('Stellar Vanguard')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getByText('2.4M players')).toBeInTheDocument();
    const card = screen
      .getByText('Stellar Vanguard')
      .closest('.card') as HTMLElement;
    expect(within(card).getByText('Action')).toBeInTheDocument();
  });

  it('filters games by genre tab', () => {
    render(<GameCatalogTemplate />);
    const main = screen.getByRole('main');
    fireEvent.click(within(main).getByRole('button', { name: 'RPG' }));
    expect(screen.getByText('2 games')).toBeInTheDocument();
    expect(screen.getByText('Ironforge Realms')).toBeInTheDocument();
    expect(screen.getByText('Nova Online')).toBeInTheDocument();
    expect(screen.queryByText('Stellar Vanguard')).not.toBeInTheDocument();
    fireEvent.click(within(main).getByRole('button', { name: 'All' }));
    expect(screen.getByText('6 games')).toBeInTheDocument();
  });

  it('searches games and shows the empty state', () => {
    render(<GameCatalogTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search games' });
    fireEvent.change(input, { target: { value: 'nova' } });
    expect(screen.getByText('1 games')).toBeInTheDocument();
    expect(screen.getByText('Nova Online')).toBeInTheDocument();
    expect(screen.queryByText('Stellar Vanguard')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('0 games')).toBeInTheDocument();
    expect(screen.getByText('No games found')).toBeInTheDocument();
  });
});
