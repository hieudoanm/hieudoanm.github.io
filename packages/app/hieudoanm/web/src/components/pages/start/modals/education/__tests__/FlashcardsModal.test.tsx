import { act, fireEvent, render, screen } from '@testing-library/react';
import { FlashcardsModal } from '../FlashcardsModal';

const onClose = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should render with title', () => {
  const { container } = render(<FlashcardsModal onClose={onClose} />);
  expect(screen.getByText('Flash Cards')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it('shows language selector', () => {
  render(<FlashcardsModal onClose={onClose} />);
  const select = screen.getByRole('combobox');
  expect(select).toBeInTheDocument();
  expect(select).toHaveValue('korean');
});

it('shows first flashcard after language loads', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });
  const languageLabels = screen.getAllByText('korean');
  expect(languageLabels.length).toBeGreaterThanOrEqual(1);
});

it('flips card when clicked', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });
  const languageLabels = screen.getAllByText('korean');
  const cardContainer =
    languageLabels[languageLabels.length - 1].parentElement!;
  fireEvent.click(cardContainer);

  const englishLabel = screen.getByText('english');
  expect(englishLabel).toBeInTheDocument();
});

it('navigates to next card', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });
  const nextBtn = screen.getByText('Next');
  fireEvent.click(nextBtn);
  expect(screen.getByText(/2 \//)).toBeInTheDocument();
});

it('navigates to previous card', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });
  fireEvent.click(screen.getByText('Next'));
  fireEvent.click(screen.getByText('Previous'));
  expect(screen.getByText(/1 \//)).toBeInTheDocument();
});

it('changes language and shows new cards', () => {
  render(<FlashcardsModal onClose={onClose} />);
  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'spanish' } });
  expect(select).toHaveValue('spanish');

  act(() => {
    jest.advanceTimersByTime(0);
  });
  const spanishLabels = screen.getAllByText('spanish');
  expect(spanishLabels.length).toBeGreaterThanOrEqual(1);
});

it('handles keyboard navigation ArrowRight', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });
  const initialMatch = screen.getByText(/\d+ \/ \d+/).textContent;

  fireEvent.keyDown(window, { code: 'ArrowRight' });
  const newMatch = screen.getByText(/\d+ \/ \d+/).textContent;
  expect(newMatch).not.toBe(initialMatch);
});

it('handles keyboard navigation ArrowLeft', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });

  fireEvent.keyDown(window, { code: 'ArrowRight' });
  const afterRight = screen.getByText(/\d+ \/ \d+/).textContent;

  fireEvent.keyDown(window, { code: 'ArrowLeft' });
  const afterLeft = screen.getByText(/\d+ \/ \d+/).textContent;
  expect(afterLeft).not.toBe(afterRight);
});

it('handles keyboard flip with Space', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });

  expect(screen.queryByText('english')).not.toBeInTheDocument();
  fireEvent.keyDown(window, { code: 'Space' });
  expect(screen.getByText('english')).toBeInTheDocument();
});

it('handles keyboard flip with Enter', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });

  fireEvent.keyDown(window, { code: 'Enter' });
  expect(screen.getByText('english')).toBeInTheDocument();
});

it('handkes Escape keyboard to close', () => {
  render(<FlashcardsModal onClose={onClose} />);
  fireEvent.keyDown(window, { code: 'Escape' });
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('cleans up event listener on unmount', () => {
  const { unmount } = render(<FlashcardsModal onClose={onClose} />);
  unmount();
  fireEvent.keyDown(window, { code: 'Escape' });
  expect(onClose).not.toHaveBeenCalled();
});

it('flipCard function flips the card', () => {
  render(<FlashcardsModal onClose={onClose} />);
  act(() => {
    jest.advanceTimersByTime(0);
  });

  fireEvent.keyDown(window, { code: 'Space' });
  expect(screen.getByText('english')).toBeInTheDocument();

  fireEvent.keyDown(window, { code: 'Space' });
  expect(screen.queryByText('english')).not.toBeInTheDocument();
});
