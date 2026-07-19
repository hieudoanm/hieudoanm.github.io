'use client';

import { CardCounter } from '@/games/gambling/CardCounter';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/card-counter/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Card Counter"
    description="Practice Hi-Lo card counting through a full 52-card deck, then reveal your count."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <CardCounter />
  </GameContainer>
);

export default Page;
