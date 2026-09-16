import { useGameStore } from '../store';
import { EVENT_SETS } from '../data/constants';
import { makeEvent, EVENT_A, EVENT_B, EVENT_C } from '../testing/fixtures';
import type { HistoricalEvent } from '../types';

const resetStore = (): void => {
  useGameStore.getState().reset();
};

describe('startGame', () => {
  afterEach(resetStore);

  it('seeds the timeline with the earliest and latest events', () => {
    useGameStore.getState().startGame('classic', 'world');
    const state = useGameStore.getState();
    const deck = EVENT_SETS['world'];
    expect(state.timeline).toHaveLength(2);
    const years = state.timeline.map((event) => event.year);
    const sorted = deck.map((event) => event.year).sort((a, b) => a - b);
    expect(years[0]).toBe(sorted[0]);
    expect(years[1]).toBe(sorted[sorted.length - 1]);
    expect(state.currentCard).not.toBeNull();
    expect(state.phase).toBe('playing');
    expect(state.maxRounds).toBe(20);
    expect(state.totalRounds).toBe(1);
    expect(state.remainingDeck.length).toBeGreaterThan(0);
  });

  it('sets maxRounds to the pool size in practice mode', () => {
    useGameStore.getState().startGame('practice', 'world');
    const state = useGameStore.getState();
    expect(state.maxRounds).toBe(state.remainingDeck.length + 1);
  });

  it('never ends on rounds in endless mode', () => {
    useGameStore.getState().startGame('endless', 'world');
    expect(useGameStore.getState().maxRounds).toBe(Infinity);
  });
});

describe('placeCard', () => {
  beforeEach(() => {
    resetStore();
    useGameStore.setState({
      mode: 'classic',
      phase: 'playing',
      timeline: [EVENT_A],
      currentCard: EVENT_B,
      hintsUsedThisRound: 0,
      roundStartTime: Date.now(),
    });
  });
  afterEach(resetStore);

  it('records a correct placement and advances the streak', () => {
    useGameStore.getState().placeCard(1);
    const state = useGameStore.getState();
    expect(state.lastResult?.correct).toBe(true);
    expect(state.stats.correctCount).toBe(1);
    expect(state.stats.currentStreak).toBe(1);
    expect(state.stats.bestStreak).toBe(1);
    expect(state.stats.totalEvents).toBe(1);
    expect(state.phase).toBe('reveal');
  });

  it('resets the streak after an incorrect placement', () => {
    useGameStore.setState({
      stats: {
        totalEvents: 0,
        correctCount: 2,
        currentStreak: 4,
        bestStreak: 4,
        score: 400,
        hintsUsed: 0,
      },
    });
    useGameStore.getState().placeCard(0);
    const state = useGameStore.getState();
    expect(state.lastResult?.correct).toBe(false);
    expect(state.stats.correctCount).toBe(2);
    expect(state.stats.currentStreak).toBe(0);
    expect(state.phase).toBe('reveal');
  });

  it('ignores placement without a current card', () => {
    useGameStore.setState({ currentCard: null });
    useGameStore.getState().placeCard(0);
    expect(useGameStore.getState().phase).toBe('playing');
  });
});

describe('hints', () => {
  beforeEach(resetStore);
  afterEach(resetStore);

  it('increments the hint counter for the round', () => {
    useGameStore.setState({ currentCard: EVENT_A });
    useGameStore.getState().useHint();
    useGameStore.getState().useHint();
    expect(useGameStore.getState().hintsUsedThisRound).toBe(2);
  });

  it('returns hint text based on usage', () => {
    useGameStore.setState({ currentCard: EVENT_A, hintsUsedThisRound: 0 });
    expect(useGameStore.getState().getHintText()).toContain(
      '1900s'.slice(0, 4)
    );
  });

  it('returns empty text without a current card', () => {
    expect(useGameStore.getState().getHintText()).toBe('');
  });

  it('ignores hints without a current card', () => {
    useGameStore.getState().useHint();
    expect(useGameStore.getState().hintsUsedThisRound).toBe(0);
  });
});

describe('nextRound', () => {
  afterEach(resetStore);

  const startReveal = (
    overrides: Partial<Parameters<typeof useGameStore.setState>[0]> = {}
  ): void => {
    resetStore();
    useGameStore.setState({
      mode: 'classic',
      phase: 'reveal',
      totalRounds: 1,
      maxRounds: 20,
      lastResult: { correct: true, correctIndex: 1, event: EVENT_B },
      currentCard: EVENT_B,
      remainingDeck: [],
      ...overrides,
    });
  };

  it('inserts the placed card into the timeline at the correct index', () => {
    startReveal({
      timeline: [makeEvent('x', 1900)],
      lastResult: { correct: false, correctIndex: 0, event: EVENT_B },
    });
    useGameStore.getState().nextRound();
    const state = useGameStore.getState();
    expect(state.timeline.map((event) => event.id)).toEqual(['b', 'x']);
  });

  it('advances to the next card', () => {
    startReveal({ remainingDeck: [EVENT_C] });
    useGameStore.getState().nextRound();
    const state = useGameStore.getState();
    expect(state.phase).toBe('playing');
    expect(state.currentCard?.id).toBe(EVENT_C.id);
    expect(state.remainingDeck).toEqual([]);
    expect(state.totalRounds).toBe(2);
    expect(state.hintsUsedThisRound).toBe(0);
  });

  it('ends endless mode on a mistake', () => {
    startReveal({
      mode: 'endless',
      maxRounds: Infinity,
      remainingDeck: [EVENT_C],
      lastResult: { correct: false, correctIndex: 0, event: EVENT_B },
    });
    useGameStore.getState().nextRound();
    expect(useGameStore.getState().phase).toBe('gameover');
    expect(useGameStore.getState().currentCard).toBeNull();
  });

  it('ends classic mode after the final round', () => {
    startReveal({ totalRounds: 20, maxRounds: 20, remainingDeck: [EVENT_C] });
    useGameStore.getState().nextRound();
    expect(useGameStore.getState().phase).toBe('gameover');
  });

  it('does nothing without a revealed result', () => {
    startReveal({ lastResult: null, currentCard: null });
    useGameStore.getState().nextRound();
    expect(useGameStore.getState().totalRounds).toBe(1);
  });
});

describe('navigation actions', () => {
  beforeEach(resetStore);
  afterEach(resetStore);

  it('opens the browse screen for a deck', () => {
    useGameStore.getState().openBrowse('egypt');
    const state = useGameStore.getState();
    expect(state.phase).toBe('browse');
    expect(state.deckId).toBe('egypt');
  });

  it('restarts with the same mode and deck', () => {
    useGameStore.getState().startGame('classic', 'world');
    useGameStore.setState({ phase: 'gameover' });
    useGameStore.getState().restart();
    const state = useGameStore.getState();
    expect(state.mode).toBe('classic');
    expect(state.deckId).toBe('world');
    expect(state.phase).toBe('playing');
  });

  it('ignores restart before a game started', () => {
    useGameStore.getState().restart();
    expect(useGameStore.getState().phase).toBe('menu');
  });

  it('resets back to the menu', () => {
    useGameStore.getState().startGame('classic', 'world');
    useGameStore.getState().reset();
    const state = useGameStore.getState();
    expect(state.phase).toBe('menu');
    expect(state.mode).toBeNull();
    expect(state.timeline).toEqual([]);
    expect(state.stats.score).toBe(0);
    expect(state.maxRounds).toBe(20);
  });
});
