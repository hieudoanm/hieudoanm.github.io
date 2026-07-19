import { render, screen } from '@testing-library/react';
import { PiGridNine, PiNumberOne } from 'react-icons/pi';
import { GameContainer } from '@/components/organisms/GameContainer';
import type { GameItem } from '@/components/templates/GamesTemplate';

const RELATED: GameItem[] = [
  {
    name: 'Classic',
    description: 'X and O on a 3×3 grid — line up three to win.',
    icon: PiGridNine,
    href: '/tic-tac-toe/classic/',
  },
  {
    name: 'Wild',
    description: 'Pick X or O every turn.',
    icon: PiNumberOne,
    href: '/tic-tac-toe/wild/',
  },
];

describe('GameContainer', () => {
  it('renders a back link to the category', () => {
    render(
      <GameContainer
        title="Duck"
        description="Move the duck."
        relatedGames={RELATED}
        backHref="/tic-tac-toe/">
        <div>board</div>
      </GameContainer>
    );
    expect(screen.getByTestId('game-back').getAttribute('href')).toContain(
      '/tic-tac-toe'
    );
  });

  it('renders the game title and description', () => {
    render(
      <GameContainer
        title="Duck"
        description="Move the duck to block your opponent."
        relatedGames={RELATED}
        backHref="/tic-tac-toe/">
        <div>board</div>
      </GameContainer>
    );
    expect(screen.getByRole('heading', { name: 'Duck' })).toBeInTheDocument();
    expect(
      screen.getByText('Move the duck to block your opponent.')
    ).toBeInTheDocument();
  });

  it('renders the game children', () => {
    render(
      <GameContainer
        title="Duck"
        description="Move the duck."
        relatedGames={RELATED}
        backHref="/tic-tac-toe/">
        <div>board</div>
      </GameContainer>
    );
    expect(screen.getByText('board')).toBeInTheDocument();
  });

  it('renders related game links', () => {
    render(
      <GameContainer
        title="Duck"
        description="Move the duck."
        relatedGames={RELATED}
        backHref="/tic-tac-toe/">
        <div>board</div>
      </GameContainer>
    );
    expect(
      screen.getByRole('link', { name: /Wild/ }).getAttribute('href')
    ).toContain('/tic-tac-toe/wild');
    expect(
      screen.getByRole('link', { name: /Classic/ }).getAttribute('href')
    ).toContain('/tic-tac-toe/classic');
  });
});
