'use client';

import { RockPaperScissors } from '@/games/8-bit/RockPaperScissors';
import { EIGHT_BIT_GAMES } from '@/games/8-bit/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = EIGHT_BIT_GAMES.filter(
  (game) => game.href !== '/8-bit/rock-paper-scissors/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Rock Paper Scissors"
    description="Versus the computer."
    relatedGames={RELATED_GAMES}
    backHref="/8-bit/">
    <RockPaperScissors />
  </GameContainer>
);

export default Page;
