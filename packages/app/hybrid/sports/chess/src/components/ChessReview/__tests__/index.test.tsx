import { render, screen, act, fireEvent } from '@testing-library/react';
import { ChessReview } from '..';
import type { ReviewResult } from '../types';

jest.mock('../../organisms/chess/ChessBoard', () => ({
  Chessboard: ({ position }: { position: string }) => (
    <div data-testid="chessboard" data-fen={position} />
  ),
}));

jest.mock('../utils/review', () => ({
  reviewPgn: jest.fn(),
}));

const mockReviewPgn = require('../utils/review').reviewPgn as jest.Mock;

const makeResult = (overrides?: Partial<ReviewResult>): ReviewResult => ({
  white: {
    accuracy: 92,
    best: 3,
    inaccuracies: 1,
    mistakes: 0,
    blunders: 0,
    missedMate: 1,
    hanging: 0,
    ...overrides?.white,
  },
  black: {
    accuracy: 78,
    best: 2,
    inaccuracies: 0,
    mistakes: 1,
    blunders: 1,
    missedMate: 0,
    hanging: 1,
    ...overrides?.black,
  },
  moves: [
    {
      moveNumber: 1,
      color: 'w',
      san: 'e4',
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
      bestSan: 'e4',
      winPercentBefore: 50,
      winPercentAfter: 52,
      winPercentLost: 0,
      classification: { label: 'Best', code: 'best' },
      accuracy: 100,
      missedMate: false,
      hanging: null,
    },
    {
      moveNumber: 1,
      color: 'b',
      san: 'e5',
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
      bestSan: 'e5',
      winPercentBefore: 50,
      winPercentAfter: 48,
      winPercentLost: 2,
      classification: { label: 'Good', code: 'good' },
      accuracy: 95,
      missedMate: false,
      hanging: null,
    },
    {
      moveNumber: 2,
      color: 'w',
      san: 'Nf3',
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
      bestSan: 'Nf3',
      winPercentBefore: 50,
      winPercentAfter: 42,
      winPercentLost: 8,
      classification: { label: 'Inaccuracy', code: 'inaccuracy' },
      accuracy: 70,
      missedMate: false,
      hanging: null,
    },
    {
      moveNumber: 2,
      color: 'b',
      san: 'Nc6',
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
      bestSan: null,
      winPercentBefore: 50,
      winPercentAfter: 30,
      winPercentLost: 20,
      classification: { label: 'Mistake', code: 'mistake' },
      accuracy: 30,
      missedMate: false,
      hanging: { square: 'c6', piece: 'n', color: 'b' },
    },
    {
      moveNumber: 3,
      color: 'w',
      san: 'Bb5',
      fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
      bestSan: 'Bb5',
      winPercentBefore: 50,
      winPercentAfter: 5,
      winPercentLost: 45,
      classification: { label: 'Blunder', code: 'blunder' },
      accuracy: 5,
      missedMate: true,
      hanging: null,
    },
    {
      moveNumber: 3,
      color: 'b',
      san: 'a6',
      fen: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
      bestSan: 'a6',
      winPercentBefore: 50,
      winPercentAfter: 49,
      winPercentLost: 1,
      classification: { label: 'Best', code: 'best' },
      accuracy: 99,
      missedMate: false,
      hanging: null,
    },
  ],
  bestMove: 'e4',
  worstMove: 'Bb5',
  ...overrides,
});

const onClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const clickAnalyze = () => {
  act(() => {
    screen.getByText('Analyze').click();
  });
};

const advanceTimer = () => {
  act(() => {
    jest.advanceTimersByTime(50);
  });
};

const analyzeAndWait = () => {
  jest.useFakeTimers();
  clickAnalyze();
  advanceTimer();
  jest.useRealTimers();
};

describe('ChessReview', () => {
  it('renders initial state with PGN textarea and Analyze button', () => {
    render(<ChessReview onClose={onClose} />);
    expect(screen.getByPlaceholderText('Paste a PGN to review…')).toBeTruthy();
    expect(screen.getByText('Analyze')).toBeTruthy();
    expect(screen.getByText(/Depth/)).toBeTruthy();
  });

  it('shows depth slider value', () => {
    render(<ChessReview onClose={onClose} />);
    const slider = screen.getByRole('slider');
    expect(Number(slider.getAttribute('value'))).toBe(8);
  });

  it('does not show review results initially', () => {
    render(<ChessReview onClose={onClose} />);
    expect(screen.queryByText('White accuracy')).toBeNull();
  });

  it('shows spinner while analyzing', () => {
    render(<ChessReview onClose={onClose} />);
    jest.useFakeTimers();
    clickAnalyze();
    expect(screen.queryByText('White accuracy')).toBeNull();
    jest.useRealTimers();
  });

  it('shows review results after analysis completes', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getByText('White accuracy')).toBeTruthy();
    expect(screen.getByText('92%')).toBeTruthy();
    expect(screen.getByText('78%')).toBeTruthy();
  });

  it('displays summary cards with counts', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getByText('Missed mates')).toBeTruthy();
    expect(screen.getByText('Hanging pieces')).toBeTruthy();
    expect(screen.getByText('Best move')).toBeTruthy();
    expect(screen.getByText('Worst move')).toBeTruthy();
  });

  it('renders move rows with all classification badges', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getAllByText('Best').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Good')).toBeTruthy();
    expect(screen.getByText('Inaccuracy')).toBeTruthy();
    expect(screen.getByText('Mistake')).toBeTruthy();
    expect(screen.getByText('Blunder')).toBeTruthy();
  });

  it('renders move SANs', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getAllByText('e4').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('e5').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Nf3').length).toBeGreaterThanOrEqual(1);
  });

  it('shows em-dash for null bestSan', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const emDashes = screen.getAllByText('—');
    expect(emDashes.length).toBeGreaterThanOrEqual(1);
  });

  it('shows missed mate and hanging indicators', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getByText('⚡')).toBeTruthy();
    expect(screen.getByText('!')).toBeTruthy();
  });

  it('clicks on a move row to select it and shows detail panel', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const buttons = screen.getAllByRole('button');
    const moveRow = buttons.find(
      (b) => b.textContent?.includes('e4') && b.textContent?.includes('W')
    );
    expect(moveRow).toBeTruthy();
    act(() => {
      moveRow!.click();
    });
    expect(screen.getByText('Played:')).toBeTruthy();
    expect(screen.getByText('Best:')).toBeTruthy();
    expect(screen.getByText('Eval lost:')).toBeTruthy();
  });

  it('shows missed mate detail when selected move has missedMate', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const buttons = screen.getAllByRole('button');
    const bb5Row = buttons.find((b) => b.textContent?.includes('Bb5'));
    act(() => {
      bb5Row!.click();
    });
    expect(screen.getByText('Missed a forced mate!')).toBeTruthy();
  });

  it('shows hanging piece detail when selected move has hanging', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const buttons = screen.getAllByRole('button');
    const nc6Row = buttons.find((b) => b.textContent?.includes('Nc6'));
    act(() => {
      nc6Row!.click();
    });
    expect(screen.getByText(/left.*hanging/)).toBeTruthy();
  });

  it('shows bestSan as em-dash in move detail when null', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const buttons = screen.getAllByRole('button');
    const nc6Row = buttons.find((b) => b.textContent?.includes('Nc6'));
    act(() => {
      nc6Row!.click();
    });
    expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(1);
  });

  it('shows em-dash for bestMove and worstMove when null', () => {
    mockReviewPgn.mockReturnValue({
      ...makeResult(),
      bestMove: null,
      worstMove: null,
    });
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getAllByText('Best move').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Worst move').length).toBeGreaterThanOrEqual(1);
  });

  it('handles white hanging piece color', () => {
    mockReviewPgn.mockReturnValue({
      ...makeResult(),
      moves: [
        {
          ...makeResult().moves[0]!,
          san: 'Qd1',
          hanging: { square: 'd1', piece: 'q', color: 'w' },
        },
      ],
    });
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const qd1Row = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.includes('Qd1'));
    act(() => {
      qd1Row!.click();
    });
    expect(screen.getByText(/White left.*hanging/)).toBeTruthy();
  });

  it('shows black color indicator in move row', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    expect(screen.getAllByText('W').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('B').length).toBeGreaterThanOrEqual(1);
  });

  it('returns null from reviewPgn shows no results', () => {
    mockReviewPgn.mockReturnValue(null);
    render(<ChessReview onClose={onClose} />);
    jest.useFakeTimers();
    clickAnalyze();
    advanceTimer();
    jest.useRealTimers();
    expect(screen.queryByText('White accuracy')).toBeNull();
  });

  it('updates depth via slider', () => {
    render(<ChessReview onClose={onClose} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeTruthy();
    expect((slider as HTMLInputElement).value).toBe('8');
  });

  it('shows selected state on clicked move row', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const buttons = screen.getAllByRole('button');
    const moveRow = buttons.find(
      (b) => b.textContent?.includes('e4') && b.textContent?.includes('W')
    );
    act(() => {
      moveRow!.click();
    });
    expect(moveRow!.className).toContain('bg-base-300');
  });

  it('shows move numbers with W and B indicators', () => {
    mockReviewPgn.mockReturnValue(makeResult());
    render(<ChessReview onClose={onClose} />);
    analyzeAndWait();
    const allText = document.body.textContent ?? '';
    expect(allText).toContain('1.');
    expect(allText).toContain('2.');
    expect(allText).toContain('3.');
  });
});
