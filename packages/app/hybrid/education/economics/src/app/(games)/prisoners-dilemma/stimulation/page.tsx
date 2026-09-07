'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { RankingTable } from '@/components/molecules/RankingTable';
import { STRATEGIES } from '@/games/prisoners-dilemma/constants';
import {
  DEFAULT_ROUNDS,
  MAX_ROUNDS,
  runTournament,
} from '@/games/prisoners-dilemma/tournament';
import type { Standing } from '@/games/prisoners-dilemma/tournament';

const TOTAL_MATCHES = (STRATEGIES.length * (STRATEGIES.length - 1)) / 2;

const SimulationPage: NextPage = () => {
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS);
  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    setStandings(runTournament(DEFAULT_ROUNDS));
  }, []);

  const handleRun = () => {
    const clamped = Math.min(
      Math.max(Math.trunc(Number(rounds)) || DEFAULT_ROUNDS, 1),
      MAX_ROUNDS
    );
    setRounds(clamped);
    setStandings(runTournament(clamped));
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
      <Link
        href="/prisoners-dilemma"
        className="text-primary text-sm hover:underline">
        ← Back to Game
      </Link>
      <h1 className="text-primary text-2xl font-bold tracking-tight">
        Tournament Simulation
      </h1>
      <p className="text-base-content/60 text-sm">
        {STRATEGIES.length} bots · {TOTAL_MATCHES} matches per round-robin
        tournament. Every bot plays every other bot exactly once, symmetrically,
        then ranks by total score.
      </p>

      <div className="card bg-base-200 border-base-content/10 flex flex-row items-center gap-3 border p-4">
        <label
          htmlFor="rounds-input"
          className="text-base-content/80 text-sm font-normal">
          Rounds per match
        </label>
        <input
          id="rounds-input"
          type="number"
          min={1}
          max={MAX_ROUNDS}
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          data-testid="rounds-input"
          className="input input-sm input-bordered w-28"
        />
        <button
          type="button"
          onClick={handleRun}
          data-testid="run-tournament"
          className="btn btn-primary btn-sm">
          Run Tournament
        </button>
      </div>

      {standings.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-primary text-lg font-bold tracking-tight">
            Rankings
          </h2>
          <RankingTable standings={standings} />
        </section>
      )}
    </div>
  );
};

export default SimulationPage;
