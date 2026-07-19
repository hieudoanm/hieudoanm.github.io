'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Heyawake } from '@/games/nikoli/Heyawake';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/heyawake/'
);

const HeyawakePage: NextPage = () => (
  <GameContainer
    title="Heyawake"
    description="Shade rooms to match clues and avoid 2×2."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Heyawake />
  </GameContainer>
);

export default HeyawakePage;
