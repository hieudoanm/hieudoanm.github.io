import { fireEvent, render, screen } from '@testing-library/react';
import { Pitch } from '../index';

const mockPlayTone = jest.fn();
const mockStartGame = jest.fn();
const mockPlayPractice = jest.fn();
const mockPlayTwinkle = jest.fn();
const mockHandleGuess = jest.fn();
const mockWhiteKeyClass = jest.fn().mockReturnValue('');
const mockBlackKeyClass = jest.fn().mockReturnValue('');

const defaultMockState = {
  started: false,
  score: 0,
  highScore: 0,
  ripple: false,
  isPracticing: false,
  feedback: null,
  highlightedKey: null,
  level: 1,
  playTone: mockPlayTone,
  startGame: mockStartGame,
  playPractice: mockPlayPractice,
  playTwinkle: mockPlayTwinkle,
  handleGuess: mockHandleGuess,
  whiteKeyClass: mockWhiteKeyClass,
  blackKeyClass: mockBlackKeyClass,
};

let mockState = { ...defaultMockState };

jest.mock('../usePitchGameModal', () => ({
  usePitchGame: () => mockState,
}));

const onClose = jest.fn();

beforeEach(() => {
  mockState = { ...defaultMockState };
  jest.clearAllMocks();
});

it('renders title and level badge', () => {
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText('🎹 Pitch Trainer')).toBeInTheDocument();
  expect(screen.getByText('Level 1')).toBeInTheDocument();
});

it('shows score and high score badges', () => {
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
  expect(screen.getByText(/Best: 0/)).toBeInTheDocument();
});

it('shows start button when not started', () => {
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText('▶ Start')).toBeInTheDocument();
  expect(screen.getByText('🎵 Practice')).toBeInTheDocument();
  expect(screen.getByText('⭐ Twinkle')).toBeInTheDocument();
});

it('calls startGame when Start clicked', () => {
  render(<Pitch onClose={onClose} />);
  fireEvent.click(screen.getByText('▶ Start'));
  expect(mockStartGame).toHaveBeenCalledTimes(1);
});

it('calls playPractice when Practice clicked', () => {
  render(<Pitch onClose={onClose} />);
  fireEvent.click(screen.getByText('🎵 Practice'));
  expect(mockPlayPractice).toHaveBeenCalledTimes(1);
});

it('calls playTwinkle when Twinkle clicked', () => {
  render(<Pitch onClose={onClose} />);
  fireEvent.click(screen.getByText('⭐ Twinkle'));
  expect(mockPlayTwinkle).toHaveBeenCalledTimes(1);
});

it('renders all white keys', () => {
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText('C')).toBeInTheDocument();
  expect(screen.getByText('D')).toBeInTheDocument();
  expect(screen.getByText('E')).toBeInTheDocument();
  expect(screen.getByText('F')).toBeInTheDocument();
  expect(screen.getByText('G')).toBeInTheDocument();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});

it('calls playTone when white key clicked while not started', () => {
  render(<Pitch onClose={onClose} />);
  fireEvent.click(screen.getByText('C'));
  expect(mockPlayTone).toHaveBeenCalledWith('c');
});

it('renders black key labels', () => {
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText('C#')).toBeInTheDocument();
  expect(screen.getByText('D#')).toBeInTheDocument();
  expect(screen.getByText('F#')).toBeInTheDocument();
  expect(screen.getByText('G#')).toBeInTheDocument();
  expect(screen.getByText('A#')).toBeInTheDocument();
});

it('calls onClose when close button clicked', () => {
  render(<Pitch onClose={onClose} />);
  const closeBtn = screen.getByText('✕');
  fireEvent.click(closeBtn);
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('disables buttons when practicing', () => {
  mockState.isPracticing = true;
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText('▶ Start')).toBeDisabled();
  expect(screen.getByText('🎵 Practice')).toBeDisabled();
  expect(screen.getByText('⭐ Twinkle')).toBeDisabled();
});

it('shows guess prompt when started', () => {
  mockState.started = true;
  mockState.score = 5;
  mockState.highScore = 10;
  mockState.level = 2;
  render(<Pitch onClose={onClose} />);
  expect(screen.getByText('Guess the note!')).toBeInTheDocument();
  expect(screen.getByText('Level 2')).toBeInTheDocument();
  expect(screen.getByText(/Score: 5/)).toBeInTheDocument();
  expect(screen.getByText(/Best: 10/)).toBeInTheDocument();
});

it('calls handleGuess when key clicked while started', () => {
  mockState.started = true;
  render(<Pitch onClose={onClose} />);
  fireEvent.click(screen.getByText('C'));
  expect(mockHandleGuess).toHaveBeenCalledWith('c');
});

it('renders ripple effect when active', () => {
  mockState.started = true;
  mockState.ripple = true;
  const { container } = render(<Pitch onClose={onClose} />);
  const pingDiv = container.querySelector('.animate-ping');
  expect(pingDiv).toBeInTheDocument();
});
