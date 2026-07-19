import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import LanguagePage, { generateStaticParams } from '../page';

const WORDS = [
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

describe('LanguagePage', () => {
  it('generates a static path for every language in words.json', () => {
    const params = generateStaticParams();
    expect(params.length).toBeGreaterThanOrEqual(100);
    expect(params).toContainEqual({ language: 'korean' });
    expect(params).toContainEqual({ language: 'spanish' });
  });

  it('renders the flashcard deck for the requested language', async () => {
    const element = await LanguagePage({
      params: Promise.resolve({ language: 'korean' }),
    });
    render(<Wrapper>{element}</Wrapper>);

    await waitFor(() => {
      expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();
    });
    expect(screen.getByTestId('flashcard').textContent).toMatch(/안녕|감사/);
  });

  it('renders an empty deck for an unknown language', async () => {
    const element = await LanguagePage({
      params: Promise.resolve({ language: 'atlantean' }),
    });
    render(<Wrapper>{element}</Wrapper>);

    await waitFor(() => {
      expect(
        screen.getByText('No flashcards available for atlantean.')
      ).toBeInTheDocument();
    });
  });
});
