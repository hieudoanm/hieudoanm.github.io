import {
  MEDIAN_SCENARIOS,
  MODE_ORDER,
  PARADOX_OPTION_SETS,
  POLICY_MAX,
  POLICY_MIN,
  PRIZE,
  RENT_BOT_SPENDS,
  TOTAL_ROUNDS,
} from './constants';
import {
  cycleRankings,
  drawWin,
  expectedPayoff,
  medianOf,
  rentProbability,
  runTournament,
  simulateElection,
  votersFrom,
} from './game';
import type {
  MedianResult,
  Mode,
  ParadoxOption,
  ParadoxResult,
  Phase,
  RentResult,
  RoundResult,
  Voter,
} from './types';

export interface GameState {
  phase: Phase;
  round: number;
  mode: Mode;
  wins: number;
  voters: Voter[];
  median: number;
  playerPlatform: number;
  botPlatform: number;
  paradoxOptions: ParadoxOption[];
  supported: string | null;
  firstPair: [string, string] | null;
  rentPlayerSpend: number;
  rentBotSpend: number;
  totalWaste: number;
  results: RoundResult[];
  lastResult: RoundResult | null;
}

export type GameAction =
  | { type: 'SET_PLATFORM'; value: number }
  | { type: 'SET_SPEND'; value: number }
  | { type: 'SET_SUPPORTED'; optionId: string }
  | { type: 'SET_FIRST_PAIR'; pair: [string, string] }
  | { type: 'CHECK' }
  | { type: 'NEXT' }
  | { type: 'RESET' };

const scenarioIndex = (round: number): number => Math.floor((round - 1) / 3);

const modeOptions = (index: number): ParadoxOption[] =>
  PARADOX_OPTION_SETS[index].map((option, i) => ({
    id: String.fromCharCode(65 + i),
    name: option.name,
    emoji: option.emoji,
  }));

const startRoundState = (
  round: number,
  wins: number,
  totalWaste: number,
  results: RoundResult[],
  lastResult: RoundResult | null
): GameState => {
  const index = scenarioIndex(round);
  const voters = votersFrom(MEDIAN_SCENARIOS[index].voters);
  const median = medianOf(voters.map((voter) => voter.ideal));
  return {
    phase: 'plan',
    round,
    mode: MODE_ORDER[round - 1],
    wins,
    voters,
    median,
    playerPlatform: median,
    botPlatform: MEDIAN_SCENARIOS[index].bot,
    paradoxOptions: modeOptions(index),
    supported: null,
    firstPair: null,
    rentPlayerSpend: 0,
    rentBotSpend: RENT_BOT_SPENDS[index],
    totalWaste,
    results,
    lastResult,
  };
};

export const createInitialState = (): GameState =>
  startRoundState(1, 0, 0, [], null);

const resolveMedian = (state: GameState): RoundResult => {
  const detail = simulateElection(
    state.voters,
    state.playerPlatform,
    state.botPlatform
  );
  return {
    round: state.round,
    mode: 'median',
    won: detail.winner === 'player',
    detail,
  };
};

const resolveParadox = (state: GameState): RoundResult | null => {
  if (!state.firstPair || !state.supported) return null;
  const rankings = cycleRankings(state.paradoxOptions);
  const { steps, finalWinner } = runTournament(
    state.paradoxOptions,
    rankings,
    state.firstPair
  );
  const detail: ParadoxResult = {
    firstPair: state.firstPair,
    supported: state.supported,
    steps,
    finalWinner,
  };
  return {
    round: state.round,
    mode: 'paradox',
    won: finalWinner === state.supported,
    detail,
  };
};

const resolveRent = (state: GameState): RoundResult => {
  const probability = rentProbability(
    state.rentPlayerSpend,
    state.rentBotSpend
  );
  const realized = drawWin(probability);
  const detail: RentResult = {
    playerSpend: state.rentPlayerSpend,
    botSpend: state.rentBotSpend,
    winProbability: probability,
    won: realized,
    netPayoff: realized
      ? PRIZE - state.rentPlayerSpend
      : -state.rentPlayerSpend,
    expectedPayoff: expectedPayoff(
      state.rentPlayerSpend,
      state.rentBotSpend,
      PRIZE
    ),
  };
  return { round: state.round, mode: 'rent', won: realized, detail };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_PLATFORM': {
      if (state.phase !== 'plan' || state.mode !== 'median') return state;
      const value = Math.min(
        POLICY_MAX,
        Math.max(POLICY_MIN, Math.round(action.value))
      );
      return { ...state, playerPlatform: value };
    }
    case 'SET_SPEND': {
      if (state.phase !== 'plan' || state.mode !== 'rent') return state;
      const value = Math.min(PRIZE, Math.max(0, Math.round(action.value)));
      return { ...state, rentPlayerSpend: value };
    }
    case 'SET_SUPPORTED': {
      if (state.phase !== 'plan' || state.mode !== 'paradox') return state;
      return { ...state, supported: action.optionId };
    }
    case 'SET_FIRST_PAIR': {
      if (state.phase !== 'plan' || state.mode !== 'paradox') return state;
      return { ...state, firstPair: action.pair };
    }
    case 'CHECK': {
      if (state.phase !== 'plan') return state;
      if (state.mode === 'median') {
        return { ...state, phase: 'check', lastResult: resolveMedian(state) };
      }
      if (state.mode === 'paradox') {
        const lastResult = resolveParadox(state);
        if (!lastResult) return state;
        return { ...state, phase: 'check', lastResult };
      }
      const lastResult = resolveRent(state);
      const waste = state.rentPlayerSpend + state.rentBotSpend;
      return {
        ...state,
        phase: 'check',
        totalWaste: state.totalWaste + waste,
        lastResult,
      };
    }
    case 'NEXT': {
      if (state.phase !== 'check' || !state.lastResult) return state;
      const results = [...state.results, state.lastResult];
      const wins = state.wins + (state.lastResult.won ? 1 : 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', wins, results };
      }
      return startRoundState(
        state.round + 1,
        wins,
        state.totalWaste,
        results,
        null
      );
    }
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
