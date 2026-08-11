import { FC, useMemo, useState } from 'react';
import type { Match, MatchResult, PairingMode, Player, Round } from './types';
import {
  computeStandings,
  pairRoundRobin,
  pairSwiss,
  setResult,
  sortStandings,
  uid,
} from './utils/pairing';

const ResultButton: FC<{
  value: MatchResult;
  label: string;
  active: MatchResult;
  onPick: (r: MatchResult) => void;
}> = ({ value, label, active, onPick }) => (
  <button
    onClick={() => onPick(active === value ? null : value)}
    className={`btn btn-xs ${active === value ? 'btn-primary' : 'btn-ghost'}`}>
    {label}
  </button>
);

const MatchRow: FC<{
  match: Match;
  players: Player[];
  onResult: (id: string, result: MatchResult) => void;
}> = ({ match, players, onResult }) => {
  const name = (id: string) => players.find((p) => p.id === id)?.name ?? '?';
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded border border-base-300 bg-base-100 p-2">
      <span className="text-sm">
        <span className="font-semibold">{name(match.white)}</span>
        <span className="opacity-50"> vs </span>
        <span className="font-semibold">{name(match.black)}</span>
      </span>
      <span className="flex gap-1">
        <ResultButton value="1-0" label="1-0" active={match.result} onPick={(r) => onResult(match.id, r)} />
        <ResultButton value="½-½" label="½-½" active={match.result} onPick={(r) => onResult(match.id, r)} />
        <ResultButton value="0-1" label="0-1" active={match.result} onPick={(r) => onResult(match.id, r)} />
      </span>
    </li>
  );
};

const StandingsTable: FC<{ rounds: Round[]; players: Player[]; mode: PairingMode }> = ({
  rounds,
  players,
  mode,
}) => {
  const matches = rounds.flatMap((r) => r.matches);
  const rows = sortStandings(computeStandings(players, matches), mode);
  return (
    <div className="card bg-base-200 p-3">
      <h2 className="mb-2 text-sm font-semibold">
        Standings{' '}
        <span className="font-normal opacity-60">
          {mode === 'rr' ? '(Sonnerborn-Berger tiebreak)' : '(Buchholz then Sonneborn-Berger)'}
        </span>
      </h2>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left opacity-60">
            <th className="py-1 pr-2">#</th>
            <th className="py-1 pr-2">Player</th>
            <th className="py-1 pr-2 text-right">Rating</th>
            <th className="py-1 pr-2 text-right">W-D-L</th>
            <th className="py-1 pr-2 text-right">Pts</th>
            <th className="py-1 pr-2 text-right">Buchholz</th>
            <th className="py-1 text-right">SB</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.player.id} className="border-t border-base-300">
              <td className="py-1 pr-2">{i + 1}</td>
              <td className="py-1 pr-2 font-semibold">{row.player.name}</td>
              <td className="py-1 pr-2 text-right tabular-nums">{row.player.rating}</td>
              <td className="py-1 pr-2 text-right tabular-nums">
                {row.wins}-{row.draws}-{row.losses}
              </td>
              <td className="py-1 pr-2 text-right font-bold tabular-nums">
                {row.points.toFixed(1)}
              </td>
              <td className="py-1 pr-2 text-right tabular-nums">{row.buchholz.toFixed(1)}</td>
              <td className="py-1 text-right tabular-nums">{row.sb.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ChessPairing: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1500);
  const [mode, setMode] = useState<PairingMode>('rr');
  const [matches, setMatches] = useState<Match[]>([]);
  const [round, setRound] = useState(1);

  const rrRounds = useMemo(() => pairRoundRobin(players), [players]);
  const shownRounds: Round[] = useMemo(() => {
    if (mode === 'rr') return rrRounds;
    if (matches.length === 0) return [];
    const maxRound = Math.max(...matches.map((m) => m.round));
    const current = pairSwiss(players, matches, maxRound + 1);
    return [{ number: maxRound, matches: matches.filter((m) => m.round === maxRound), byes: [] }, current];
  }, [mode, rrRounds, players, matches]);

  const addPlayer = () => {
    if (!name.trim()) return;
    setPlayers((prev) => [
      ...prev,
      { id: uid(), name: name.trim(), rating: Number(rating) || 1500 },
    ]);
    setName('');
  };

  const onResult = (id: string, result: MatchResult) =>
    setMatches((prev) => setResult(prev, id, result));

  const pairNextSwiss = () => {
    const next = pairSwiss(players, matches, (matches.at(-1)?.round ?? 0) + 1);
    setMatches((prev) => [...prev, ...next.matches]);
    setRound(next.number);
  };

  const reset = () => {
    setMatches([]);
    setRound(1);
  };

  const activeRound = shownRounds.find((r) => r.number === (mode === 'rr' ? round : (matches.at(-1)?.round ?? 0)));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4">
      <div className="card bg-base-200 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as PairingMode);
              reset();
            }}
            className="select select-bordered select-sm w-36"
            aria-label="Pairing mode">
            <option value="rr">Round-robin</option>
            <option value="swiss">Swiss</option>
          </select>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Player name"
            className="input input-bordered input-sm w-40"
          />
          <input
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            type="number"
            placeholder="Rating"
            className="input input-bordered input-sm w-24"
          />
          <button onClick={addPlayer} className="btn btn-primary btn-sm">
            Add player
          </button>
        </div>
        <ul className="mt-2 flex flex-wrap gap-1">
          {players.map((p) => (
            <li key={p.id} className="badge badge-lg gap-1">
              {p.name} ({p.rating})
              <button
                onClick={() => setPlayers((prev) => prev.filter((x) => x.id !== p.id))}
                className="btn btn-ghost btn-xs px-1"
                aria-label={`Remove ${p.name}`}>
                ✕
              </button>
            </li>
          ))}
          {players.length === 0 && (
            <li className="text-xs opacity-60">Add at least two players.</li>
          )}
        </ul>
      </div>

      <div className="card bg-base-200 p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">
            {mode === 'rr' ? 'Round-robin pairing' : 'Swiss pairing'}
          </h2>
          {mode === 'rr' && rrRounds.length > 0 && (
            <div className="flex gap-1">
              {rrRounds.map((r) => (
                <button
                  key={r.number}
                  onClick={() => setRound(r.number)}
                  className={`btn btn-xs ${round === r.number ? 'btn-primary' : 'btn-ghost'}`}>
                  R{r.number}
                </button>
              ))}
            </div>
          )}
          {mode === 'swiss' && (
            <button onClick={pairNextSwiss} disabled={players.length < 2} className="btn btn-sm">
              Pair next round
            </button>
          )}
        </div>

        {shownRounds.map((r) => (
          <div key={`${r.number}-${r.matches.length}`} className="mb-3">
            <p className="mb-1 text-xs font-semibold opacity-70">Round {r.number}</p>
            <ul className="space-y-1">
              {r.matches.map((m) => (
                <MatchRow key={m.id} match={m} players={players} onResult={onResult} />
              ))}
              {r.byes.map((b) => (
                <li key={b} className="rounded border border-base-300 bg-base-100 p-2 text-xs opacity-60">
                  {players.find((p) => p.id === b)?.name ?? '?'} — bye
                </li>
              ))}
            </ul>
          </div>
        ))}
        {players.length < 2 && (
          <p className="py-2 text-center text-xs opacity-60">
            Add players to generate pairings.
          </p>
        )}
      </div>

      {mode === 'rr' && (
        <div className="flex justify-center gap-1">
          <button onClick={reset} className="btn btn-ghost btn-xs">
            Clear results
          </button>
        </div>
      )}

      <StandingsTable rounds={shownRounds} players={players} mode={mode} />
    </div>
  );
};
ChessPairing.displayName = 'ChessPairing';
