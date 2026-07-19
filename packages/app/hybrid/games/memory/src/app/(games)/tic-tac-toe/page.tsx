import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';

const TicTacToePage: FC = () => (
  <GamesTemplate
    title="Tic-Tac-Toe"
    subtitle="Six ways to play the classic grid duel."
    items={TIC_TAC_TOE_GAMES}
  />
);

export default TicTacToePage;
