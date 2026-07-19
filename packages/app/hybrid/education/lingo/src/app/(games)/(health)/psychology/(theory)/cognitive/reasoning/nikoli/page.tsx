'use client';

import Link from 'next/link';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { NIKOLI_GAMES } from '@/games/health/psychology/cognitive/reasoning/nikoli/_shared/games';
import { NextPage } from 'next';

const NikoliPage: NextPage = () => (
  <GamesTemplate
    title="Nikoli"
    subtitle="Classic Japanese logic puzzles, one grid at a time."
    items={NIKOLI_GAMES}
    searchable>
    <Link
      href="/psychology/cognitive/reasoning"
      className="text-primary text-sm hover:underline">
      ← Back to Reasoning
    </Link>
  </GamesTemplate>
);

export default NikoliPage;
