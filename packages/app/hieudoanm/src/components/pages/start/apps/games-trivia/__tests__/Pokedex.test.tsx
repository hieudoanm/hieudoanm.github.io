jest.mock(
  '@hieudoanm.github.io/components/pages/start/apps/games-trivia/data/pokedex',
  () => ({
    pokedex: [
      {
        id: 1,
        name: 'bulbasaur',
        type: 'grass',
        hp: 45,
        attack: 49,
        speed: 45,
      },
      {
        id: 4,
        name: 'charmander',
        type: 'fire',
        hp: 39,
        attack: 52,
        speed: 65,
      },
      { id: 7, name: 'squirtle', type: 'water', hp: 44, attack: 48, speed: 43 },
    ],
  })
);

jest.mock('../PokedexModal/utils/search', () => ({
  fuzzyMatch: (name: string, search: string) => (name.includes(search) ? 1 : 0),
}));

jest.mock('../PokedexModal/constants', () => ({
  getTypeColor: () => 'badge-info',
}));

jest.mock('../PokedexModal/components/PokemonDetail', () => ({
  PokemonDetail: ({ p, onClose }: { p: any; onClose: () => void }) => (
    <div data-testid="pokemon-detail">{p.name}</div>
  ),
}));

import { render, fireEvent, screen } from '@testing-library/react';
import { PokedexModal } from '../PokedexModal';

describe('PokedexModal', () => {
  it('should render correctly', () => {
    const { container } = render(<PokedexModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('shows pokemon count', () => {
    render(<PokedexModal onClose={jest.fn()} />);
    expect(screen.getByText('3 Pokémon')).toBeInTheDocument();
  });

  it('filters by search', () => {
    render(<PokedexModal onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: 'bulba' } });
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('filters by type', () => {
    render(<PokedexModal onClose={jest.fn()} />);
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'fire' } });
    expect(screen.getByText('#4')).toBeInTheDocument();
  });

  it('sorts by clicking sort buttons', () => {
    render(<PokedexModal onClose={jest.fn()} />);
    const hpBtn = screen.getByText('HP');
    fireEvent.click(hpBtn);
    expect(
      screen.getByText(
        (_content, element) =>
          element?.tagName === 'BUTTON' && element.textContent === 'HP↑'
      )
    ).toBeInTheDocument();
    fireEvent.click(hpBtn);
    expect(
      screen.getByText(
        (_content, element) =>
          element?.tagName === 'BUTTON' && element.textContent === 'HP↓'
      )
    ).toBeInTheDocument();
  });

  it('shows empty state when no match', () => {
    render(<PokedexModal onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: 'zzzzz' } });
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('opens pokemon detail on click', () => {
    render(<PokedexModal onClose={jest.fn()} />);
    const pokemon = screen.getByText('bulbasaur');
    fireEvent.click(pokemon);
    expect(screen.getByTestId('pokemon-detail')).toBeInTheDocument();
  });
});
