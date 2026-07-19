import { create } from 'zustand';
import type {
  HistoricalEvent,
  GameMode,
  GamePhase,
  PlacementResult,
  GameStats,
} from './types';
import {
  checkPlacement,
  calculateScore,
  getComboMultiplier,
  getHintLevel,
  getHintText,
  shuffleArray,
  INITIAL_EVENT_IDS,
} from './engine';
import { EVENTS } from './events';

interface ThroughTheYearsState {
  mode: GameMode | null;
  phase: GamePhase;
  timeline: HistoricalEvent[];
  currentCard: HistoricalEvent | null;
  remainingDeck: HistoricalEvent[];
  stats: GameStats;
  hintsUsedThisRound: number;
  lastResult: PlacementResult | null;
  totalRounds: number;
  maxRounds: number;
  roundStartTime: number;

  startGame: (mode: GameMode) => void;
  placeCard: (playerIndex: number) => void;
  useHint: () => void;
  getHintText: () => string;
  nextRound: () => void;
  reset: () => void;
}

export const useGameStore = create<ThroughTheYearsState>((set, get) => ({
  mode: null,
  phase: 'menu',
  timeline: [],
  currentCard: null,
  remainingDeck: [],
  stats: {
    totalEvents: 0,
    correctCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    score: 0,
    hintsUsed: 0,
  },
  hintsUsedThisRound: 0,
  lastResult: null,
  totalRounds: 0,
  maxRounds: 20,
  roundStartTime: 0,

  startGame: (mode: GameMode) => {
    const initialEvents = INITIAL_EVENT_IDS.map((id) =>
      EVENTS.find((e) => e.id === id)!
    );
    const pool = EVENTS.filter((e) => !INITIAL_EVENT_IDS.includes(e.id));
    const shuffled = shuffleArray(pool);
    const maxRounds =
      mode === 'classic'
        ? 20
        : mode === 'practice'
          ? shuffled.length
          : Infinity;

    const card = shuffled[0];
    const remaining = shuffled.slice(1);

    set({
      mode,
      phase: 'playing',
      timeline: [...initialEvents],
      currentCard: card,
      remainingDeck: remaining,
      stats: {
        totalEvents: 0,
        correctCount: 0,
        currentStreak: 0,
        bestStreak: 0,
        score: 0,
        hintsUsed: 0,
      },
      hintsUsedThisRound: 0,
      lastResult: null,
      totalRounds: 1,
      maxRounds: mode === 'endless' ? Infinity : maxRounds,
      roundStartTime: Date.now(),
    });
  },

  placeCard: (playerIndex: number) => {
    const {
      currentCard,
      timeline,
      stats,
      mode,
      totalRounds,
      maxRounds,
      hintsUsedThisRound,
      roundStartTime,
    } = get();
    if (!currentCard) return;

    const result = checkPlacement(timeline, currentCard, playerIndex);
    const timeMs = Date.now() - roundStartTime;

    const points = calculateScore({
      correct: result.correct,
      streak: stats.currentStreak,
      hintUsed: hintsUsedThisRound > 0,
      timeMs,
    });

    const newStreak = result.correct ? stats.currentStreak + 1 : 0;
    const combo = getComboMultiplier(newStreak);

    set({
      phase: 'reveal',
      lastResult: result,
      stats: {
        ...stats,
        correctCount: stats.correctCount + (result.correct ? 1 : 0),
        currentStreak: newStreak,
        bestStreak: Math.max(stats.bestStreak, newStreak),
        totalEvents: stats.totalEvents + 1,
        score: stats.score + points,
        hintsUsed: stats.hintsUsed + hintsUsedThisRound,
      },
    });
  },

  useHint: () => {
    const { hintsUsedThisRound, currentCard } = get();
    if (!currentCard) return;
    set({ hintsUsedThisRound: hintsUsedThisRound + 1 });
  },

  getHintText: () => {
    const { hintsUsedThisRound, currentCard } = get();
    if (!currentCard) return '';
    const level = getHintLevel(hintsUsedThisRound + 1);
    return getHintText(currentCard, level);
  },

  nextRound: () => {
    const {
      remainingDeck,
      currentCard,
      timeline,
      lastResult,
      mode,
      totalRounds,
      maxRounds,
      stats,
    } = get();
    if (!currentCard || !lastResult) return;

    let newTimeline: HistoricalEvent[];
    if (lastResult.correct) {
      newTimeline = [...timeline];
      newTimeline.splice(lastResult.correctIndex, 0, currentCard);
    } else {
      newTimeline = [...timeline];
      newTimeline.splice(lastResult.correctIndex, 0, currentCard);
    }

    const isGameOver =
      (mode === 'endless' && !lastResult.correct) ||
      (mode === 'classic' && totalRounds >= maxRounds) ||
      remainingDeck.length === 0;

    if (isGameOver) {
      set({
        phase: 'gameover',
        timeline: newTimeline,
        currentCard: null,
        lastResult: null,
      });
      return;
    }

    const nextCard = remainingDeck[0];
    const newRemaining = remainingDeck.slice(1);

    set({
      phase: 'playing',
      timeline: newTimeline,
      currentCard: nextCard,
      remainingDeck: newRemaining,
      lastResult: null,
      hintsUsedThisRound: 0,
      totalRounds: totalRounds + 1,
      roundStartTime: Date.now(),
    });
  },

  reset: () => {
    set({
      mode: null,
      phase: 'menu',
      timeline: [],
      currentCard: null,
      remainingDeck: [],
      stats: {
        totalEvents: 0,
        correctCount: 0,
        currentStreak: 0,
        bestStreak: 0,
        score: 0,
        hintsUsed: 0,
      },
      hintsUsedThisRound: 0,
      lastResult: null,
      totalRounds: 0,
      maxRounds: 20,
      roundStartTime: 0,
    });
  },
}));
