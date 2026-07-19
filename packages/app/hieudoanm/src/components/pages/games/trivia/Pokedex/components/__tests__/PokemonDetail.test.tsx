jest.mock('../../constants', () => ({
  getTypeColor: jest.fn(() => 'badge-info'),
}));

jest.mock('react-chartjs-2', () => ({
  Radar: () => <div />,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDetail } from '../PokemonDetail';
import { Pokemon } from '../../types';

const pokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  type: 'electric',
  hp: 35,
  attack: 55,
  defense: 40,
  special_attack: 50,
  special_defense: 50,
  speed: 90,
};

describe('PokemonDetail', () => {
  it('renders pokemon name and id', () => {
    render(<PokemonDetail p={pokemon} onClose={jest.fn()} />);
    expect(screen.getByText('#25')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('renders type badge', () => {
    render(<PokemonDetail p={pokemon} onClose={jest.fn()} />);
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('renders stat bars', () => {
    render(<PokemonDetail p={pokemon} onClose={jest.fn()} />);
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('ATK')).toBeInTheDocument();
    expect(screen.getByText('DEF')).toBeInTheDocument();
    expect(screen.getByText('SPD')).toBeInTheDocument();
  });

  it('renders total stats', () => {
    render(<PokemonDetail p={pokemon} onClose={jest.fn()} />);
    expect(screen.getByText('320')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<PokemonDetail p={pokemon} onClose={onClose} />);
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });

  it('replaces hyphens in name', () => {
    const p = { ...pokemon, name: 'ho-oh' };
    render(<PokemonDetail p={p} onClose={jest.fn()} />);
    expect(screen.getByText('ho oh')).toBeInTheDocument();
  });
});
