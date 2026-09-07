'use client';

import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { RankingTable } from '@/components/molecules/RankingTable';
import { STRATEGIES } from '@/games/prisoners-dilemma/constants';
import {
  DEFAULT_PAYOFF,
  DEFAULT_ROUNDS,
  MAX_ROUNDS,
  runTournament,
} from '@/games/prisoners-dilemma/tournament';
import type {
  MatchupResult,
  PayoffConfig,
} from '@/games/prisoners-dilemma/tournament';

const TOTAL_MATCHES = (STRATEGIES.length * (STRATEGIES.length - 1)) / 2;

const payoffFields: { key: keyof PayoffConfig; label: string }[] = [
  { key: 'bothCooperate', label: 'Both Co-operate' },
  { key: 'youDefectTheyCooperate', label: 'You Defect, They Co-operate' },
  { key: 'youCooperateTheyDefect', label: 'You Co-operate, They Defect' },
  { key: 'bothDefect', label: 'Both Defect' },
];

type Tab = 'rankings' | 'matchups';

const MatchupMatrix: FC<{ matchups: MatchupResult[] }> = ({ matchups }) => {
  const lookup = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of matchups) {
      map.set(`${m.aId}:${m.bId}`, m.aScore);
      map.set(`${m.bId}:${m.aId}`, m.bScore);
    }
    return map;
  }, [matchups]);

  return (
    <div className="overflow-auto">
      <table className="border-base-300 table-xs border-collapse border text-xs">
        <thead>
          <tr>
            <th className="bg-base-200 sticky left-0 z-10 p-1" />
            {STRATEGIES.map((s) => (
              <th
                key={s.id}
                className="bg-base-200 p-1 whitespace-nowrap"
                title={s.label}>
                {s.emoji}
              </th>
            ))}
          </tr>
          <tr>
            <th className="bg-base-200 sticky left-0 z-10 p-1" />
            {STRATEGIES.map((s) => (
              <th
                key={s.id}
                className="bg-base-200 p-1 whitespace-nowrap"
                title={s.label}>
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STRATEGIES.map((row) => (
            <tr key={row.id}>
              <td
                className="bg-base-200 sticky left-0 z-10 p-1 font-bold whitespace-nowrap"
                title={row.label}>
                {row.emoji} {row.label}
              </td>
              {STRATEGIES.map((col) => {
                if (row.id === col.id) {
                  return (
                    <td key={col.id} className="bg-base-300 p-1 text-center">
                      —
                    </td>
                  );
                }
                const score = lookup.get(`${row.id}:${col.id}`) ?? 0;
                const cls =
                  score > 0 ? 'text-success' : score < 0 ? 'text-error' : '';
                return (
                  <td
                    key={col.id}
                    className={`p-1 text-center tabular-nums ${cls}`}>
                    {score > 0 ? `+${score}` : score}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SimulationPage: NextPage = () => {
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS);
  const [payoff, setPayoff] = useState<PayoffConfig>(DEFAULT_PAYOFF);
  const [standings, setStandings] = useState<
    {
      strategyId: string;
      score: number;
      wins: number;
      losses: number;
      draws: number;
      played: number;
    }[]
  >([]);
  const [matchups, setMatchups] = useState<MatchupResult[]>([]);
  const [tab, setTab] = useState<Tab>('rankings');

  useEffect(() => {
    const result = runTournament(DEFAULT_ROUNDS, DEFAULT_PAYOFF);
    setStandings(result.standings);
    setMatchups(result.matchups);
  }, []);

  const handleRun = () => {
    const clamped = Math.min(
      Math.max(Math.trunc(Number(rounds)) || DEFAULT_ROUNDS, 1),
      MAX_ROUNDS
    );
    setRounds(clamped);
    const result = runTournament(clamped, payoff);
    setStandings(result.standings);
    setMatchups(result.matchups);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
      <Link
        href="/prisoners-dilemma"
        className="text-primary text-sm hover:underline">
        ← Back to Theory
      </Link>
      <h1 className="text-primary text-2xl font-bold tracking-tight">
        Tournament Simulation
      </h1>
      <p className="text-base-content/60 text-sm">
        {STRATEGIES.length} bots · {TOTAL_MATCHES} matches per round-robin
        tournament. Every bot plays every other bot exactly once, symmetrically,
        then ranks by total score.
      </p>

      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <div className="flex flex-row items-center gap-3">
          <label
            htmlFor="rounds-input"
            className="text-base-content/60 w-64 text-xs sm:w-72">
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
        </div>

        <div className="flex flex-col gap-2">
          {payoffFields.map(({ key, label }) => (
            <div key={key} className="flex flex-row items-center gap-3">
              <label
                htmlFor={key}
                className="text-base-content/60 w-64 text-xs sm:w-72">
                {label}
              </label>
              <input
                id={key}
                type="number"
                className="input input-sm input-bordered w-28"
                value={payoff[key]}
                onChange={(e) =>
                  setPayoff((p) => ({
                    ...p,
                    [key]: Number(e.target.value),
                  }))
                }
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleRun}
          data-testid="run-tournament"
          className="btn btn-primary btn-sm self-start">
          Run Tournament
        </button>
      </div>

      {standings.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="tabs tabs-boxed self-start">
            <button
              type="button"
              className={`tab ${tab === 'rankings' ? 'tab-active' : ''}`}
              onClick={() => setTab('rankings')}>
              Rankings
            </button>
            <button
              type="button"
              className={`tab ${tab === 'matchups' ? 'tab-active' : ''}`}
              onClick={() => setTab('matchups')}>
              Match-ups
            </button>
          </div>

          {tab === 'rankings' && <RankingTable standings={standings} />}
          {tab === 'matchups' && <MatchupMatrix matchups={matchups} />}
        </section>
      )}
    </div>
  );
};

export default SimulationPage;
