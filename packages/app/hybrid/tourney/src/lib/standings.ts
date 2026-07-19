import type { Match, Standing } from '@/types';

export const getGoalDifference = (
  matches: Match[],
  participantId: string
): number => {
  let diff = 0;

  for (const match of matches) {
    if (match.status !== 'completed') continue;
    if (
      match.participant1Id !== participantId &&
      match.participant2Id !== participantId
    )
      continue;
    if (match.participant1Score === null || match.participant2Score === null)
      continue;

    if (match.participant1Id === participantId) {
      diff += match.participant1Score - match.participant2Score;
    } else {
      diff += match.participant2Score - match.participant1Score;
    }
  }

  return diff;
};

export const getHeadToHead = (
  matches: Match[],
  p1Id: string,
  p2Id: string
): { p1Wins: number; p2Wins: number; draws: number } => {
  let p1Wins = 0;
  let p2Wins = 0;
  let draws = 0;

  for (const match of matches) {
    if (match.status !== 'completed') continue;

    const hasP1 =
      match.participant1Id === p1Id || match.participant2Id === p1Id;
    const hasP2 =
      match.participant1Id === p2Id || match.participant2Id === p2Id;

    if (!hasP1 || !hasP2) continue;

    if (match.participant1Score === match.participant2Score) {
      draws += 1;
    } else if (match.winnerId === p1Id) {
      p1Wins += 1;
    } else if (match.winnerId === p2Id) {
      p2Wins += 1;
    }
  }

  return { p1Wins, p2Wins, draws };
};

export const calculateStandings = (
  matches: Match[],
  participantIds: string[],
  tournamentId: string
): Standing[] => {
  const standingsMap = new Map<string, Standing>();

  for (const id of participantIds) {
    standingsMap.set(id, {
      participantId: id,
      tournamentId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      points: 0,
      position: 0,
    });
  }

  const completedMatches = matches.filter(
    (m) =>
      m.status === 'completed' &&
      m.participant1Id !== null &&
      m.participant2Id !== null &&
      m.participant1Score !== null &&
      m.participant2Score !== null
  );

  for (const match of completedMatches) {
    const p1 = standingsMap.get(match.participant1Id!);
    const p2 = standingsMap.get(match.participant2Id!);
    if (!p1 || !p2) continue;

    p1.played += 1;
    p2.played += 1;

    if (match.participant1Score === match.participant2Score) {
      p1.drawn += 1;
      p2.drawn += 1;
      p1.points += 1;
      p2.points += 1;
    } else if (match.winnerId === match.participant1Id) {
      p1.won += 1;
      p1.points += 3;
      p2.lost += 1;
    } else if (match.winnerId === match.participant2Id) {
      p2.won += 1;
      p2.points += 3;
      p1.lost += 1;
    }
  }

  const standings = Array.from(standingsMap.values());

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.won !== a.won) return b.won - a.won;

    const aGD = getGoalDifference(completedMatches, a.participantId);
    const bGD = getGoalDifference(completedMatches, b.participantId);
    if (bGD !== aGD) return bGD - aGD;

    const h2h = getHeadToHead(
      completedMatches,
      a.participantId,
      b.participantId
    );
    if (h2h.p1Wins !== h2h.p2Wins) return h2h.p2Wins - h2h.p1Wins;

    return 0;
  });

  return standings.map((s, i) => ({ ...s, position: i + 1 }));
};
