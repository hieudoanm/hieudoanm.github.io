import { fireEvent, render, screen } from '@testing-library/react';
import { RecallModal } from '../index';

const mockStart = jest.fn();
const mockSubmit = jest.fn();
const mockNext = jest.fn();
const mockSetInput = jest.fn();
const mockSetMask = jest.fn();
const mockOnKeyDown = jest.fn();

const defaultMockState = {
  phase: 'ready' as const,
  level: 1,
  number: '1234',
  input: '',
  setInput: mockSetInput,
  message: '',
  countdown: 5,
  mask: false,
  setMask: mockSetMask,
  highStreak: 0,
  inputRef: { current: document.createElement('input') },
  containerRef: { current: document.createElement('div') },
  lastRoundFailed: false,
  start: mockStart,
  submit: mockSubmit,
  next: mockNext,
  onKeyDown: mockOnKeyDown,
};

let mockState = { ...defaultMockState };

jest.mock('../useRecall', () => ({
  useRecall: () => mockState,
}));

const onClose = jest.fn();

beforeEach(() => {
  mockState = { ...defaultMockState };
  jest.clearAllMocks();
});

it('renders title and level badge', () => {
  render(<RecallModal onClose={onClose} />);
  expect(screen.getByText('Memory Recall')).toBeInTheDocument();
  expect(screen.getByText('Level 1')).toBeInTheDocument();
});

it('shows ready phase with start button', () => {
  render(<RecallModal onClose={onClose} />);
  expect(
    screen.getByText(/Memorize the number and type it back/)
  ).toBeInTheDocument();
  expect(screen.getByText('Start')).toBeInTheDocument();
  expect(screen.getByText('Press Enter')).toBeInTheDocument();
});

it('calls start when Start button clicked', () => {
  render(<RecallModal onClose={onClose} />);
  fireEvent.click(screen.getByText('Start'));
  expect(mockStart).toHaveBeenCalledTimes(1);
});

it('shows number in show phase', () => {
  mockState.phase = 'show';
  render(<RecallModal onClose={onClose} />);
  const chunked = screen.getByText('1,234');
  expect(chunked).toBeInTheDocument();
  expect(screen.getByText(/⏱/)).toBeInTheDocument();
});

it('shows input form in input phase', () => {
  mockState.phase = 'input';
  mockState.level = 2;
  mockState.input = '56';
  mockState.highStreak = 5;
  render(<RecallModal onClose={onClose} />);
  expect(screen.getByText(/2.*4/)).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
  expect(screen.getByText('🏆 Best 5')).toBeInTheDocument();
});

it('submit button is not disabled when input length matches', () => {
  mockState.phase = 'input';
  mockState.input = '1234';
  render(<RecallModal onClose={onClose} />);
  const submitBtn = screen.getByText('Submit');
  expect(submitBtn).not.toBeDisabled();
});

it('shows result phase with correct message', () => {
  mockState.phase = 'result';
  mockState.level = 2;
  mockState.message = 'Correct! Level up 🎉';
  mockState.highStreak = 2;
  render(<RecallModal onClose={onClose} />);
  expect(screen.getByText(/Correct! Level up/)).toBeInTheDocument();
  expect(screen.getByText('Next')).toBeInTheDocument();
});

it('shows Start Over when last round failed', () => {
  mockState.phase = 'result';
  mockState.message = 'Wrong message';
  mockState.lastRoundFailed = true;
  render(<RecallModal onClose={onClose} />);
  expect(screen.getByText('Start Over')).toBeInTheDocument();
});

it('calls next when Next button clicked', () => {
  mockState.phase = 'result';
  mockState.message = 'Correct!';
  render(<RecallModal onClose={onClose} />);
  fireEvent.click(screen.getByText('Next'));
  expect(mockNext).toHaveBeenCalledTimes(1);
});

it('calls onClose when close button clicked', () => {
  render(<RecallModal onClose={onClose} />);
  fireEvent.click(screen.getByText('✕'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('key down event triggers onKeyDown', () => {
  render(<RecallModal onClose={onClose} />);
  const container = screen.getByText('Level 1').closest('div[tabindex]');
  if (container) {
    fireEvent.keyDown(container, { key: 'Enter' });
  }
  expect(mockOnKeyDown).toHaveBeenCalled();
});
