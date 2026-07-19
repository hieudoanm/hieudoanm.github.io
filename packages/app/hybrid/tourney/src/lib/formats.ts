import type { Match, TournamentFormat } from '@/types';

const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const createMatch = (data: Omit<Match, 'id'>): Match => ({
  ...data,
  id: generateId(),
});

const padToPowerOfTwo = (ids: (string | null)[]): (string | null)[] => {
  const target = Math.pow(2, Math.ceil(Math.log2(ids.length || 1)));
  return [...ids, ...Array(target - ids.length).fill(null)];
};

export const generateSingleEliminationBracket = (
  tournamentId: string,
  participantIds: string[]
): Match[] => {
  const matches: Match[] = [];
  const padded = padToPowerOfTwo([...participantIds]);
  const roundCount = Math.log2(padded.length);

  let currentSlots: (string | null)[] = [...padded];

  for (let round = 1; round <= roundCount; round++) {
    const nextSlots: (string | null)[] = [];

    for (let i = 0; i < currentSlots.length; i += 2) {
      const match = createMatch({
        tournamentId,
        round,
        participant1Id: currentSlots[i] ?? null,
        participant2Id: currentSlots[i + 1] ?? null,
        participant1Score: null,
        participant2Score: null,
        winnerId: null,
        status: 'scheduled',
      });
      matches.push(match);
      nextSlots.push(match.id);
    }

    currentSlots = nextSlots;
  }

  return matches;
};

export const generateDoubleEliminationBracket = (
  tournamentId: string,
  participantIds: string[]
): Match[] => {
  const matches: Match[] = [];
  const padded = padToPowerOfTwo([...participantIds]);
  const winnersRounds = Math.log2(padded.length);

  const winnersRoundMatchIds: string[][] = [];
  let winnersSlots: (string | null)[] = [...padded];

  for (let round = 1; round <= winnersRounds; round++) {
    const roundIds: string[] = [];
    const nextSlots: (string | null)[] = [];

    for (let i = 0; i < winnersSlots.length; i += 2) {
      const match = createMatch({
        tournamentId,
        round,
        bracket: 'winners',
        participant1Id: winnersSlots[i] ?? null,
        participant2Id: winnersSlots[i + 1] ?? null,
        participant1Score: null,
        participant2Score: null,
        winnerId: null,
        status: 'scheduled',
      });
      matches.push(match);
      roundIds.push(match.id);
      nextSlots.push(match.id);
    }

    winnersRoundMatchIds.push(roundIds);
    winnersSlots = nextSlots;
  }

  const losersRoundCount = winnersRounds === 1 ? 0 : (winnersRounds - 1) * 2;
  let losersSlots: string[] = [];

  for (let round = 1; round <= losersRoundCount; round++) {
    const isDropRound = round % 2 === 1;

    if (isDropRound) {
      const winnersRoundIdx = Math.ceil(round / 2) - 1;
      if (
        winnersRoundIdx >= 0 &&
        winnersRoundIdx < winnersRoundMatchIds.length
      ) {
        const dropped = winnersRoundMatchIds[winnersRoundIdx].map(
          (_, i) => `W${winnersRoundIdx + 1}-L${i}`
        );
        losersSlots.push(...dropped);
      }
    }

    const roundMatchIds: string[] = [];

    for (let i = 0; i < losersSlots.length; i += 2) {
      if (i + 1 >= losersSlots.length) {
        roundMatchIds.push(losersSlots[i]);
        break;
      }

      const match = createMatch({
        tournamentId,
        round: winnersRounds + round,
        bracket: 'losers',
        participant1Id: null,
        participant2Id: null,
        participant1Score: null,
        participant2Score: null,
        winnerId: null,
        status: 'scheduled',
      });
      matches.push(match);
      roundMatchIds.push(match.id);
    }

    losersSlots = [...roundMatchIds];
  }

  if (losersRoundCount > 0) {
    matches.push(
      createMatch({
        tournamentId,
        round: winnersRounds + losersRoundCount + 1,
        bracket: 'final',
        participant1Id: null,
        participant2Id: null,
        participant1Score: null,
        participant2Score: null,
        winnerId: null,
        status: 'scheduled',
      })
    );
  }

  return matches;
};

export const generateRoundRobinSchedule = (
  tournamentId: string,
  participantIds: string[]
): Match[] => {
  const matches: Match[] = [];
  const ids = [...participantIds];
  const hasBye = ids.length % 2 !== 0;

  if (hasBye) {
    ids.push('BYE');
  }

  const roundCount = ids.length - 1;
  const fixed = ids[0];
  const rotating = ids.slice(1);

  for (let round = 0; round < roundCount; round++) {
    const pairing = [fixed, ...rotating];

    for (let i = 0; i < pairing.length / 2; i++) {
      const p1 = pairing[i];
      const p2 = pairing[pairing.length - 1 - i];

      if (p1 === 'BYE' || p2 === 'BYE') continue;

      matches.push(
        createMatch({
          tournamentId,
          round: round + 1,
          participant1Id: p1,
          participant2Id: p2,
          participant1Score: null,
          participant2Score: null,
          winnerId: null,
          status: 'scheduled',
        })
      );
    }

    if (rotating.length > 0) {
      const last = rotating.pop()!;
      rotating.unshift(last);
    }
  }

  return matches;
};

export const generateSwissRounds = (
  tournamentId: string,
  participantIds: string[],
  roundCount?: number
): Match[] => {
  const matches: Match[] = [];
  const rounds = roundCount ?? Math.ceil(Math.log2(participantIds.length));
  const hasBye = participantIds.length % 2 !== 0;
  const slots: (string | null)[] = hasBye
    ? [...participantIds, null]
    : [...participantIds];

  for (let round = 1; round <= rounds; round++) {
    const roundSlots: (string | null)[] =
      round === 1 ? [...slots] : [...slots].sort(() => Math.random() - 0.5);

    for (let i = 0; i < roundSlots.length; i += 2) {
      const p1 = roundSlots[i];
      const p2 = roundSlots[i + 1];

      if (p1 === null || p2 === null) continue;

      matches.push(
        createMatch({
          tournamentId,
          round,
          participant1Id: p1,
          participant2Id: p2,
          participant1Score: null,
          participant2Score: null,
          winnerId: null,
          status: 'scheduled',
        })
      );
    }
  }

  return matches;
};

export const generateGroupStageKnockout = (
  tournamentId: string,
  participantIds: string[],
  groupCount: number = 4
): Match[] => {
  const matches: Match[] = [];
  const shuffled = [...participantIds].sort(() => Math.random() - 0.5);
  const groupSize = Math.ceil(shuffled.length / groupCount);

  const groups: string[][] = [];

  for (let i = 0; i < groupCount; i++) {
    const members = shuffled.slice(i * groupSize, (i + 1) * groupSize);
    if (members.length >= 2) {
      groups.push(members);
    }
  }

  for (let g = 0; g < groups.length; g++) {
    const groupMatches = generateRoundRobinSchedule(tournamentId, groups[g]);

    for (const match of groupMatches) {
      matches.push({
        ...match,
        round: match.round + g * 1000,
      });
    }
  }

  const qualifyingTeams = Math.min(groups.length * 2, participantIds.length);
  const bracketSize = Math.pow(2, Math.ceil(Math.log2(qualifyingTeams)));
  const knockoutRoundBase = (groups.length + 1) * 1000;

  const bracketSlots: (string | null)[] = Array(bracketSize).fill(null);

  for (let g = 0; g < groups.length; g++) {
    const pos1Idx = g * 2;
    const pos2Idx = g * 2 + 1;

    if (pos1Idx < bracketSlots.length) {
      bracketSlots[pos1Idx] = null;
    }
    if (pos2Idx < bracketSlots.length) {
      bracketSlots[pos2Idx] = null;
    }
  }

  const knockoutRounds = Math.log2(bracketSize);
  let currentSlots: (string | null)[] = [...bracketSlots];

  for (let r = 0; r < knockoutRounds; r++) {
    const nextSlots: (string | null)[] = [];

    for (let i = 0; i < currentSlots.length; i += 2) {
      const match = createMatch({
        tournamentId,
        round: knockoutRoundBase + r + 1,
        bracket: 'final',
        participant1Id: currentSlots[i] ?? null,
        participant2Id: currentSlots[i + 1] ?? null,
        participant1Score: null,
        participant2Score: null,
        winnerId: null,
        status: 'scheduled',
      });
      matches.push(match);
      nextSlots.push(match.id);
    }

    currentSlots = nextSlots;
  }

  return matches;
};

export const generateLeagueSchedule = (
  tournamentId: string,
  participantIds: string[]
): Match[] => {
  const firstLeg = generateRoundRobinSchedule(tournamentId, participantIds);

  const returnLeg = firstLeg.map((match) =>
    createMatch({
      tournamentId,
      round: match.round + 1000,
      participant1Id: match.participant2Id,
      participant2Id: match.participant1Id,
      participant1Score: null,
      participant2Score: null,
      winnerId: null,
      status: 'scheduled',
    })
  );

  return [...firstLeg, ...returnLeg];
};

export const generateBracket = (
  format: TournamentFormat,
  tournamentId: string,
  participantIds: string[]
): Match[] => {
  switch (format) {
    case 'single-elimination':
      return generateSingleEliminationBracket(tournamentId, participantIds);
    case 'double-elimination':
      return generateDoubleEliminationBracket(tournamentId, participantIds);
    case 'round-robin':
      return generateRoundRobinSchedule(tournamentId, participantIds);
    case 'swiss':
      return generateSwissRounds(tournamentId, participantIds);
    case 'group-stage':
      return generateGroupStageKnockout(tournamentId, participantIds);
    case 'league':
      return generateLeagueSchedule(tournamentId, participantIds);
    default:
      return [];
  }
};
