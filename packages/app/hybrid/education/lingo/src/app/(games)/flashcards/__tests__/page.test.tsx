import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import FlashcardsPage from '@/app/(games)/flashcards/page';

const WORDS = [
  { language: 'korean', front: '안녕', back: 'hello' },
  { language: 'spanish', front: 'hola', back: 'hello' },
  { language: 'myanmar_(burmese)', front: 'မင်္ဂလာပါ', back: 'hello' },
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

describe('FlashcardsPage', () => {
  it('renders a Duolingo-style list of languages with flag links', async () => {
    render(
      <Wrapper>
        <FlashcardsPage />
      </Wrapper>
    );
    expect(screen.getByText('Choose a language')).toBeInTheDocument();

    const korean = await screen.findByTestId('language-korean');
    expect(korean).toHaveTextContent('Korean');
    expect(korean.getAttribute('href')).toContain('/flashcards/korean');

    expect(screen.getByTestId('language-spanish')).toHaveTextContent('Spanish');
    expect(screen.getByTestId('language-myanmar_(burmese)')).toHaveTextContent(
      'Myanmar (Burmese)'
    );
  });

  it('filters languages by search query', async () => {
    render(
      <Wrapper>
        <FlashcardsPage />
      </Wrapper>
    );
    const search = await screen.findByTestId('language-search');
    fireEvent.change(search, { target: { value: 'span' } });

    await waitFor(() => {
      expect(screen.queryByTestId('language-korean')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('language-spanish')).toBeInTheDocument();
  });

  it('shows an empty message for an unmatched search', async () => {
    render(
      <Wrapper>
        <FlashcardsPage />
      </Wrapper>
    );
    const search = await screen.findByTestId('language-search');
    fireEvent.change(search, { target: { value: 'zzz' } });

    await waitFor(() => {
      expect(screen.getByText(/No languages match/)).toBeInTheDocument();
    });
  });
});
