import { fireEvent, render, screen } from '@testing-library/react';

import { NBack } from '..';
import { DEFAULT_N, N_OPTIONS, TOTAL_STIMULI } from '../constants';
import { useNBack } from '../useNBack';

jest.mock('../useNBack');

const mockedHook = jest.mocked(useNBack);

const buildState = (overrides = {}) => ({
  n: 2,
  setN: jest.fn(),
  trials: [],
  currentIdx: -1,
  phase: 'ready' as 'ready' | 'running' | 'result',
  hits: 0,
  misses: 0,
  falseAlarms: 0,
  showStimulus: false,
  totalTargets: 0,
  accuracy: 0,
  start: jest.fn(),
  respond: jest.fn(),
  onKeyDown: jest.fn(),
  ...overrides,
});

const makeTrials = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    stimulus: { position: index % 9, letter: 'A' },
    isTarget: index > 2 && index % 3 === 0,
  }));

let state = buildState();

beforeEach(() => {
  state = buildState();
  mockedHook.mockImplementation(() => state);
});

describe('NBack ready phase', () => {
  it('names the task', () => {
    render(<NBack />);

    expect(screen.getByText('N-back')).toBeInTheDocument();
  });

  it('offers every n option and marks the active one', () => {
    render(<NBack />);

    for (const option of N_OPTIONS) {
      expect(
        screen.getByRole('button', { name: String(option) })
      ).toBeInTheDocument();
    }

    expect(screen.getByRole('button', { name: '2' })).toHaveClass(
      'btn-primary'
    );
  });

  it('states the rule for the chosen n', () => {
    render(<NBack />);

    expect(
      screen.getByText(new RegExp(`${DEFAULT_N} steps ago`))
    ).toBeInTheDocument();
  });

  it('starts the run from the Start button', () => {
    render(<NBack />);

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(state.start).toHaveBeenCalledTimes(1);
  });

  it('changes n from the header', () => {
    render(<NBack />);

    fireEvent.click(screen.getByRole('button', { name: '3' }));

    expect(state.setN).toHaveBeenCalledWith(3);
  });
});

describe('NBack running phase', () => {
  beforeEach(() => {
    state = buildState({
      phase: 'running',
      trials: makeTrials(TOTAL_STIMULI),
      currentIdx: 0,
      hits: 3,
    });
  });

  it('shows progress through the trial list', () => {
    render(<NBack />);

    expect(screen.getByText(`1/${TOTAL_STIMULI}`)).toBeInTheDocument();
    expect(screen.getByText('Hits: 3')).toBeInTheDocument();
  });

  it('lights the active grid cell with its letter', () => {
    state = buildState({ ...state, showStimulus: true });

    render(<NBack />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('blanks the grid between stimuli', () => {
    render(<NBack />);

    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('responds with a match from the button', () => {
    render(<NBack />);

    fireEvent.click(screen.getByRole('button', { name: 'Match (A)' }));

    expect(state.respond).toHaveBeenCalledWith('match');
  });

  it('responds with a no-match from the button', () => {
    render(<NBack />);

    fireEvent.click(screen.getByRole('button', { name: 'No Match (L)' }));

    expect(state.respond).toHaveBeenCalledWith('no-match');
  });

  it('forwards key presses to the hook', () => {
    render(<NBack />);

    fireEvent.keyDown(screen.getByText('N-back'), { key: 'a' });

    expect(state.onKeyDown).toHaveBeenCalled();
  });
});

describe('NBack result phase', () => {
  it('praises a strong run', () => {
    state = buildState({
      phase: 'result',
      hits: 9,
      totalTargets: 10,
      accuracy: 0.9,
    });

    render(<NBack />);

    expect(screen.getByText('Great!')).toBeInTheDocument();
  });

  it('encourages a weak run', () => {
    state = buildState({
      phase: 'result',
      hits: 3,
      totalTargets: 10,
      accuracy: 0.3,
    });

    render(<NBack />);

    expect(screen.getByText('Keep practicing')).toBeInTheDocument();
  });

  it('breaks the scoreboard down by outcome', () => {
    state = buildState({
      phase: 'result',
      hits: 6,
      totalTargets: 8,
      misses: 2,
      falseAlarms: 1,
      accuracy: 0.75,
    });

    render(<NBack />);

    expect(screen.getByText('6/8')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('replays from the Play Again button', () => {
    state = buildState({ phase: 'result' });

    render(<NBack />);

    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));

    expect(state.start).toHaveBeenCalledTimes(1);
  });
});
