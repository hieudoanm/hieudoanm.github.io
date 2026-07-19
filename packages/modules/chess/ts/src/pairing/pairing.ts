export interface PairingPlayer {
  name: string;
  points: number;
  opponents: string[];
}

export interface RoundRobinRound {
  round: number;
  pairings: [string, string][];
}

export const roundRobinSchedule = (players: string[]): RoundRobinRound[] => {
  const list = [...players];
  if (list.length % 2 === 1) list.push('BYE');
  const rounds = list.length - 1;
  const result: RoundRobinRound[] = [];
  for (let round = 0; round < rounds; round++) {
    const pairings: [string, string][] = [];
    for (let i = 0; i < list.length / 2; i++) {
      const first = list[i];
      const second = list[list.length - 1 - i];
      if (first === undefined || second === undefined) continue;
      pairings.push([first, second]);
    }
    result.push({ round: round + 1, pairings });
    const last = list.pop();
    if (last) list.splice(1, 0, last);
  }
  return result;
};

export const swissPair = (players: PairingPlayer[]): [string, string][] => {
  const sorted = [...players].sort((a, b) => b.points - a.points);
  const paired = new Set<number>();
  const result: [string, string][] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (paired.has(i)) continue;
    const first = sorted[i];
    if (first === undefined) continue;
    for (let j = i + 1; j < sorted.length; j++) {
      if (paired.has(j)) continue;
      const second = sorted[j];
      if (second === undefined) continue;
      if (first.opponents.includes(second.name)) continue;
      result.push([first.name, second.name]);
      paired.add(i);
      paired.add(j);
      break;
    }
  }
  return result;
};

export const calculateBuchholz = (
  players: PairingPlayer[]
): Record<string, number> => {
  const output: Record<string, number> = {};
  for (const player of players) {
    const sum = player.opponents.reduce((acc, opponent) => {
      if (opponent === 'BYE') return acc + 1;
      const points = players.find((p) => p.name === opponent)?.points ?? 0;
      return acc + points;
    }, 0);
    output[player.name] = sum;
  }
  return output;
};

export const calculateSonnebornBerger = (
  players: PairingPlayer[],
  results: Record<string, Record<string, number>>
): Record<string, number> => {
  const output: Record<string, number> = {};
  for (const player of players) {
    const sum = player.opponents.reduce((acc, opponent) => {
      const score = results[player.name]?.[opponent] ?? 0;
      const points = players.find((p) => p.name === opponent)?.points ?? 0;
      return acc + score * points;
    }, 0);
    output[player.name] = sum;
  }
  return output;
};

export const calculateStandings = (
  players: PairingPlayer[],
  results: Record<string, Record<string, number>>
): {
  name: string;
  points: number;
  buchholz: number;
  sonnebornBerger: number;
}[] => {
  const buchholz = calculateBuchholz(players);
  const sonnebornBerger = calculateSonnebornBerger(players, results);
  return [...players]
    .sort(
      (a, b) =>
        b.points - a.points ||
        (buchholz[b.name] ?? 0) - (buchholz[a.name] ?? 0) ||
        (sonnebornBerger[b.name] ?? 0) - (sonnebornBerger[a.name] ?? 0)
    )
    .map((player) => ({
      name: player.name,
      points: player.points,
      buchholz: buchholz[player.name] ?? 0,
      sonnebornBerger: sonnebornBerger[player.name] ?? 0,
    }));
};
