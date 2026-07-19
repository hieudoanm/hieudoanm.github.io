'use client';

import { Keno } from '@/games/gambling/Keno';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/keno/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Keno"
    description="Pick up to five spots from eighty, then watch twenty numbers draw."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <Keno />
  </GameContainer>
);

export default Page;
