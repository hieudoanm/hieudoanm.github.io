import { fireEvent, render, screen } from '@testing-library/react';

import { RockPaperScissors } from '..';
import { summarize } from '../utils';
import { useReactionMatch } from '../useReactionMatch';

jest.mock('../useReactionMatch');

const mockedHook = jest.mocked(useReactionMatch);

const buildState = (overrides = {}) => ({
  phase: 'idle' as 'idle' | 'awaiting' | 'feedback' | 'done',
  bot: null,
  last: null,
  trials: [],
  summary: summarize([]),
  totalTrials: 20,
  setTotalTrials: jest.fn(),
  start: jest.fn(),
  respond: jest.fn(),
  advance: jest.fn(),
  reset: jest.fn(),
  onKeyDown: jest.fn(),
  ...overrides,
});

let state = buildState();

const mockState = (overrides = {}) => {
  state = buildState(overrides);
  mockedHook.mockImplementation(
    () => state as ReturnType<typeof useReactionMatch>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  mockState();
});

describe('RockPaperScissors', () => {
  it('explains the twist before the block starts', () => {
    render(<RockPaperScissors />);

    expect(
      screen.getByText(/The bot commits first\. You only counter\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Start block/i })
    ).toBeInTheDocument();
  });

  it('disables every counter until the bot has moved', () => {
    render(<RockPaperScissors />);

    screen.getAllByRole('button', { name: /PAPER/i }).forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('shows the bot move and prompts for a fast counter', () => {
    mockState({ phase: 'awaiting', bot: 'rock' });

    render(<RockPaperScissors />);

    expect(screen.getAllByText('ROCK').length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Counter it — as fast as you can\./i)
    ).toBeInTheDocument();
  });

  it('sends the chosen counter to the hook', () => {
    mockState({ phase: 'awaiting', bot: 'rock' });

    render(<RockPaperScissors />);

    fireEvent.click(screen.getByRole('button', { name: /PAPER/i }));

    expect(state.respond).toHaveBeenCalledWith('paper');
  });

  it('celebrates a correct counter with its reaction time', () => {
    mockState({
      phase: 'feedback',
      bot: 'rock',
      last: {
        index: 0,
        bot: 'rock',
        human: 'paper',
        reactionMs: 412,
        correct: true,
        anticipatory: false,
        lapse: false,
      },
    });

    render(<RockPaperScissors />);

    expect(screen.getByRole('status')).toHaveTextContent('Countered in 412ms');
  });

  it('reveals the answer after a miss', () => {
    mockState({
      phase: 'feedback',
      bot: 'rock',
      last: {
        index: 0,
        bot: 'rock',
        human: 'scissors',
        reactionMs: 900,
        correct: false,
        anticipatory: false,
        lapse: false,
      },
    });

    render(<RockPaperScissors />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Missed in 900ms — the answer was PAPER'
    );
  });

  it('marks a response that was too fast to see', () => {
    mockState({
      phase: 'feedback',
      bot: 'paper',
      last: {
        index: 0,
        bot: 'paper',
        human: 'scissors',
        reactionMs: 60,
        correct: false,
        anticipatory: true,
        lapse: false,
      },
    });

    render(<RockPaperScissors />);

    expect(screen.getByRole('status')).toHaveTextContent('too fast to see it');
  });

  it('highlights the right answer once feedback is showing', () => {
    mockState({
      phase: 'feedback',
      bot: 'rock',
      last: {
        index: 0,
        bot: 'rock',
        human: 'scissors',
        reactionMs: 800,
        correct: false,
        anticipatory: false,
        lapse: false,
      },
    });

    render(<RockPaperScissors />);

    expect(screen.getByRole('button', { name: /PAPER/i }).className).toContain(
      'btn-success'
    );
  });

  it('shows live accuracy and mean reaction time', () => {
    mockState({
      phase: 'awaiting',
      bot: 'rock',
      trials: [
        {
          index: 0,
          bot: 'rock',
          human: 'paper',
          reactionMs: 400,
          correct: true,
          anticipatory: false,
          lapse: false,
        },
      ],
      summary: summarize([
        {
          index: 0,
          bot: 'rock',
          human: 'paper',
          reactionMs: 400,
          correct: true,
          anticipatory: false,
          lapse: false,
        },
      ]),
    });

    render(<RockPaperScissors />);

    expect(screen.getAllByText('100%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('400ms').length).toBeGreaterThan(0);
  });

  it('draws one dot per trial in the history strip', () => {
    mockState({
      phase: 'awaiting',
      bot: 'rock',
      trials: [
        {
          index: 0,
          bot: 'rock',
          human: 'paper',
          reactionMs: 400,
          correct: true,
          anticipatory: false,
          lapse: false,
        },
        {
          index: 1,
          bot: 'rock',
          human: 'scissors',
          reactionMs: 700,
          correct: false,
          anticipatory: false,
          lapse: false,
        },
      ],
    });

    render(<RockPaperScissors />);

    const history = screen.getByLabelText('Trial history');

    expect(history.children).toHaveLength(2);
    expect(history.children[0].className).toContain('bg-success');
    expect(history.children[1].className).toContain('bg-error');
  });

  it('offers the next trial during feedback', () => {
    mockState({ phase: 'feedback', bot: 'rock' });

    render(<RockPaperScissors />);

    fireEvent.click(screen.getByRole('button', { name: /Next trial/i }));

    expect(state.advance).toHaveBeenCalled();
  });

  it('reports the full block when it is done', () => {
    mockState({
      phase: 'done',
      summary: summarize(
        Array.from({ length: 6 }, (_, index) => ({
          index,
          bot: 'rock' as const,
          human: 'paper' as const,
          reactionMs: index < 3 ? 400 : 600,
          correct: true,
          anticipatory: false,
          lapse: false,
        }))
      ),
    });

    render(<RockPaperScissors />);

    expect(screen.getAllByText('100%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('500ms').length).toBeGreaterThan(0);
    expect(screen.getByText('Fastest:')).toBeInTheDocument();
    expect(screen.getByText('Median RT:')).toBeInTheDocument();
    expect(screen.getByText('Drift:')).toBeInTheDocument();
    expect(screen.getByText(/slowed by 200ms/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Run again/i })
    ).toBeInTheDocument();
  });

  it('changes the block size', () => {
    render(<RockPaperScissors />);

    fireEvent.change(screen.getByLabelText('Block size'), {
      target: { value: '30' },
    });

    expect(state.setTotalTrials).toHaveBeenCalledWith(30);
  });

  it('locks the block size while a trial is live', () => {
    mockState({ phase: 'awaiting', bot: 'rock' });

    render(<RockPaperScissors />);

    expect(screen.getByLabelText('Block size')).toBeDisabled();
  });

  it('resets once trials are recorded', () => {
    mockState({
      phase: 'awaiting',
      bot: 'rock',
      trials: [
        {
          index: 0,
          bot: 'rock',
          human: 'paper',
          reactionMs: 400,
          correct: true,
          anticipatory: false,
          lapse: false,
        },
      ],
    });

    render(<RockPaperScissors />);

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

    expect(state.reset).toHaveBeenCalled();
  });

  it('forwards key presses to the hook', () => {
    render(<RockPaperScissors />);

    fireEvent.keyDown(screen.getByRole('button', { name: /Start block/i }), {
      key: '2',
    });

    expect(state.onKeyDown).toHaveBeenCalled();
  });
});
