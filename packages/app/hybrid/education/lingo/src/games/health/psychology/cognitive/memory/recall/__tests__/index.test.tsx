import { fireEvent, render, screen } from '@testing-library/react';

import { Recall } from '..';
import { useRecall } from '../useRecall';

jest.mock('../useRecall');

const mockedHook = jest.mocked(useRecall);

const buildState = (overrides = {}) => ({
  phase: 'ready' as 'ready' | 'show' | 'input' | 'result',
  level: 1,
  number: '1234',
  input: '',
  setInput: jest.fn(),
  countdown: 2,
  mask: false,
  setMask: jest.fn(),
  highStreak: 3,
  inputRef: { current: null },
  containerRef: { current: null },
  lastRoundFailed: false,
  start: jest.fn(),
  submit: jest.fn(),
  next: jest.fn(),
  onKeyDown: jest.fn(),
  ...overrides,
});

let state = buildState();

beforeEach(() => {
  state = buildState();
  mockedHook.mockImplementation(() => state);
});

describe('Recall ready phase', () => {
  it('shows the level, the best streak and the rules', () => {
    render(<Recall />);

    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('🏆 Best 3')).toBeInTheDocument();
    expect(screen.getByText(/Memorize the number/)).toBeInTheDocument();
  });

  it('starts from the Start button', () => {
    render(<Recall />);

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(state.start).toHaveBeenCalledTimes(1);
  });

  it('hides the input until a round starts', () => {
    render(<Recall />);

    expect(screen.queryByPlaceholderText('Type here')).not.toBeInTheDocument();
  });
});

describe('Recall show phase', () => {
  beforeEach(() => {
    state = buildState({ phase: 'show', number: '1234567' });
  });

  it('shows the number in spaced thousands', () => {
    render(<Recall />);

    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });

  it('shows the countdown badge', () => {
    render(<Recall />);

    expect(screen.getByText('⏱ 2s')).toBeInTheDocument();
  });

  it('hides the Start button', () => {
    render(<Recall />);

    expect(
      screen.queryByRole('button', { name: 'Start' })
    ).not.toBeInTheDocument();
  });
});

describe('Recall input phase', () => {
  beforeEach(() => {
    state = buildState({ phase: 'input', input: '12' });
  });

  it('counts typed digits against the number length', () => {
    render(<Recall />);

    expect(screen.getByText('2/4 digits')).toBeInTheDocument();
  });

  it('keeps Submit disabled until every digit is typed', () => {
    render(<Recall />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('enables Submit on a complete answer', () => {
    state = buildState({ phase: 'input', input: '1234' });

    render(<Recall />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('reports keystrokes to the hook', () => {
    render(<Recall />);

    fireEvent.change(screen.getByPlaceholderText('Type here'), {
      target: { value: '1299' },
    });

    expect(state.setInput).toHaveBeenCalledWith('1299');
  });

  it('caps the answer at the number length', () => {
    render(<Recall />);

    expect(screen.getByPlaceholderText('Type here')).toHaveAttribute(
      'maxLength',
      '4'
    );
  });

  it('submits a complete answer', () => {
    state = buildState({ phase: 'input', input: '1234' });

    render(<Recall />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(state.submit).toHaveBeenCalledTimes(1);
  });

  it('does not submit an empty answer', () => {
    state = buildState({ phase: 'input', input: '' });

    render(<Recall />);

    fireEvent.submit(
      screen
        .getByPlaceholderText('Type here')
        .closest('form') as HTMLFormElement
    );

    expect(state.submit).not.toHaveBeenCalled();
  });

  it('masks the answer behind the eye toggle', () => {
    render(<Recall />);

    fireEvent.click(screen.getByRole('button', { name: '👁' }));

    expect(state.setMask).toHaveBeenCalledTimes(1);
  });

  it('unmasks the answer behind the toggle', () => {
    state = buildState({ phase: 'input', mask: true });

    render(<Recall />);

    fireEvent.click(screen.getByRole('button', { name: '🙈' }));

    expect(state.setMask).toHaveBeenCalledTimes(1);
  });

  it('shows the answer as plain text while unmasked', () => {
    render(<Recall />);

    expect(screen.getByPlaceholderText('Type here')).toHaveAttribute(
      'type',
      'text'
    );
  });

  it('shows the answer as a password while masked', () => {
    state = buildState({ phase: 'input', mask: true });

    render(<Recall />);

    expect(screen.getByPlaceholderText('Type here')).toHaveAttribute(
      'type',
      'password'
    );
  });
});

describe('Recall result phase', () => {
  it('celebrates a solved round', () => {
    state = buildState({ phase: 'result', level: 2, input: '1234' });

    render(<Recall />);

    expect(screen.getByText(/Correct!/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('reveals the number after a failed round', () => {
    state = buildState({
      phase: 'result',
      lastRoundFailed: true,
      number: '1234',
      input: '1299',
    });

    render(<Recall />);

    expect(screen.getByText(/Wrong/)).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('offers a restart after a failed round', () => {
    state = buildState({
      phase: 'result',
      lastRoundFailed: true,
      input: '1299',
    });

    render(<Recall />);

    expect(
      screen.getByRole('button', { name: 'Start Over' })
    ).toBeInTheDocument();
  });

  it('highlights only the wrong digits', () => {
    state = buildState({
      phase: 'result',
      lastRoundFailed: true,
      number: '1234',
      input: '1299',
    });

    const { container } = render(<Recall />);

    expect(container.querySelectorAll('.text-red-500')).toHaveLength(2);
  });

  it('advances from the result button', () => {
    state = buildState({ phase: 'result' });

    render(<Recall />);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(state.next).toHaveBeenCalledTimes(1);
  });
});

describe('Recall keyboard', () => {
  it('forwards key presses from the focusable container', () => {
    const { container } = render(<Recall />);

    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Enter' });

    expect(state.onKeyDown).toHaveBeenCalled();
  });
});
