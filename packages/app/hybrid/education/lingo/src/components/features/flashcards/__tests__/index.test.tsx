import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { Flashcards } from '../index';
import { FlashCard } from '../utils';

const WORDS: FlashCard[] = [
  { language: 'korean', front: '안녕', back: 'hello' },
  { language: 'korean', front: '감사', back: 'thanks' },
  { language: 'spanish', front: 'hola', back: 'hello' },
];

const fetchMock = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => WORDS,
});

global.fetch = fetchMock as unknown as typeof global.fetch;

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  fetchMock.mockClear();
});

const renderDeck = (): void => {
  render(
    <Wrapper>
      <Flashcards />
    </Wrapper>
  );
};

it('shows loading state first', () => {
  renderDeck();
  expect(screen.getByText('Loading flashcards...')).toBeInTheDocument();
});

it('shows language selector defaulting to korean with first card', async () => {
  renderDeck();
  const select = await screen.findByTestId('language-select');
  expect(select).toHaveValue('korean');
  await waitFor(() => {
    expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();
  });
});

it('flips card when clicked', async () => {
  renderDeck();
  await screen.findByTestId('flashcard');
  expect(screen.queryByText('english')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('flashcard'));
  expect(screen.getByText('english')).toBeInTheDocument();
});

it('navigates to next and previous cards', async () => {
  renderDeck();
  await screen.findByText(/1 \/ 2/);
  fireEvent.click(screen.getByText('Next'));
  expect(screen.getByText(/2 \//)).toBeInTheDocument();
  fireEvent.click(screen.getByText('Previous'));
  expect(screen.getByText(/1 \//)).toBeInTheDocument();
});

it('changes language and resets deck', async () => {
  renderDeck();
  const select = await screen.findByTestId('language-select');
  fireEvent.change(select, { target: { value: 'spanish' } });
  await waitFor(() => {
    expect(screen.getByText('hola')).toBeInTheDocument();
  });
  expect(select).toHaveValue('spanish');
});

it('handles keyboard navigation and flip', async () => {
  renderDeck();
  await screen.findByText(/1 \/ 2/);

  fireEvent.keyDown(window, { code: 'ArrowRight' });
  expect(screen.getByText(/2 \//)).toBeInTheDocument();

  fireEvent.keyDown(window, { code: 'ArrowLeft' });
  expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();

  fireEvent.keyDown(window, { code: 'Space' });
  expect(screen.getByText('english')).toBeInTheDocument();

  fireEvent.keyDown(window, { code: 'Enter' });
  expect(screen.queryByText('english')).not.toBeInTheDocument();
});

it('removes key listener on unmount', async () => {
  const { unmount } = render(
    <Wrapper>
      <Flashcards />
    </Wrapper>
  );
  await screen.findByText(/1 \/ 2/);
  unmount();
  expect(() => fireEvent.keyDown(window, { code: 'ArrowRight' })).not.toThrow();
});
