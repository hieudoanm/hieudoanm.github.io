import { fireEvent, render, screen } from '@testing-library/react';
import { PiModal } from '../index';

const mockHandleKey = jest.fn();
const mockRetry = jest.fn();
const mockSetMode = jest.fn();
const mockSwitchToGame = jest.fn();
const mockOnKeyDown = jest.fn();

const defaultMockState = {
  digits: ['3', '.', '1', '4', '1', '5', '9', '2', '6', '5'],
  containerRef: { current: document.createElement('div') },
  index: 0 as number,
  mode: 'practice' as 'practice' | 'game',
  locked: false,
  lastResult: null as 'correct' | 'wrong' | null,
  revealedIndex: null as number | null,
  highScore: 0,
  retry: mockRetry,
  handleKey: mockHandleKey,
  onKeyDown: mockOnKeyDown,
  setMode: mockSetMode,
  switchToGame: mockSwitchToGame,
};

let mockState = { ...defaultMockState };

jest.mock('../usePiGame', () => ({
  usePiGame: () => mockState,
}));

const onClose = jest.fn();

beforeEach(() => {
  mockState = { ...defaultMockState };
  jest.clearAllMocks();
});

it('renders title and tabs', () => {
  render(<PiModal onClose={onClose} />);
  expect(screen.getByText('π Memory')).toBeInTheDocument();
  expect(screen.getByText('Practice')).toBeInTheDocument();
  expect(screen.getByText('Game')).toBeInTheDocument();
});

it('practice tab is active by default', () => {
  render(<PiModal onClose={onClose} />);
  const practiceTab = screen.getByText('Practice');
  expect(practiceTab.className).toContain('tab-active');
});

it('switches to Game tab when clicked', () => {
  render(<PiModal onClose={onClose} />);
  fireEvent.click(screen.getByText('Game'));
  expect(mockSwitchToGame).toHaveBeenCalledTimes(1);
});

it('shows practice navigation info', () => {
  render(<PiModal onClose={onClose} />);
  expect(screen.getByText(/← → arrow keys/)).toBeInTheDocument();
  expect(screen.getByText(/Index: 0/)).toBeInTheDocument();
});

it('shows score and best in game mode', () => {
  mockState.mode = 'game';
  mockState.index = 5;
  mockState.highScore = 10;
  render(<PiModal onClose={onClose} />);
  const scoreEl = screen.getByText(/Score:/);
  expect(scoreEl.textContent).toMatch(/5/);
  const bestEl = screen.getByText(/Best:/);
  expect(bestEl.textContent).toMatch(/10/);
});

it('shows digit buttons in game mode when unlocked', () => {
  mockState.mode = 'game';
  render(<PiModal onClose={onClose} />);
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('.')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  fireEvent.click(screen.getByText('3'));
  expect(mockHandleKey).toHaveBeenCalledWith('3');
});

it('shows retry button when locked in game mode', () => {
  mockState.mode = 'game';
  mockState.locked = true;
  mockState.lastResult = 'wrong';
  mockState.revealedIndex = 3;
  mockState.index = 3;
  mockState.highScore = 3;
  render(<PiModal onClose={onClose} />);
  expect(screen.getByText('Mistake!')).toBeInTheDocument();
  expect(screen.getByText(/You reached digit 3/)).toBeInTheDocument();
  fireEvent.click(screen.getByText('Retry'));
  expect(mockRetry).toHaveBeenCalledTimes(1);
});

it('calls setMode when practice tab clicked', () => {
  mockState.mode = 'game';
  render(<PiModal onClose={onClose} />);
  fireEvent.click(screen.getByText('Practice'));
  expect(mockSetMode).toHaveBeenCalledWith('practice');
});

it('renders all digit buttons in game mode', () => {
  mockState.mode = 'game';
  render(<PiModal onClose={onClose} />);
  const zeroBtns = screen.getAllByText('0');
  expect(zeroBtns.length).toBeGreaterThanOrEqual(1);
});

it('calls onClose when close button clicked', () => {
  render(<PiModal onClose={onClose} />);
  fireEvent.click(screen.getByText('✕'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('renders pi digits in viewport', () => {
  mockState.mode = 'game';
  mockState.locked = true;
  mockState.lastResult = 'wrong';
  render(<PiModal onClose={onClose} />);
  const digitElements = screen.getAllByText(/[0-9.]/);
  expect(digitElements.length).toBeGreaterThan(0);
});
