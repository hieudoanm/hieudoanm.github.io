import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import LanguagesPage from '@/app/(games)/languages/page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

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

describe('LanguagesPage', () => {
  it('renders a Duolingo-style list of languages with flag links', async () => {
    render(
      <Wrapper>
        <LanguagesPage />
      </Wrapper>
    );
    expect(screen.getByText('Choose a language')).toBeInTheDocument();

    const korean = await screen.findByTestId('language-korean');
    expect(korean).toHaveTextContent('Korean');
    expect(korean.getAttribute('href')).toContain('/languages/korean');

    const english = screen.getByTestId('language-english');
    expect(english).toHaveTextContent('English');
    expect(english.getAttribute('href')).toContain('/languages/english');

    const sign = screen.getByTestId('language-sign');
    expect(sign).toHaveTextContent('Sign');
    expect(sign.getAttribute('href')).toContain('/languages/sign');

    expect(screen.getByTestId('language-spanish')).toHaveTextContent('Spanish');
    expect(screen.getByTestId('language-myanmar_(burmese)')).toHaveTextContent(
      'Myanmar (Burmese)'
    );

    const learnButton = korean.closest('li')?.querySelector('button');
    expect(learnButton).toHaveTextContent('Learn');
    fireEvent.click(learnButton as HTMLElement);
    await waitFor(() =>
      expect(mockPush).toHaveBeenCalledWith('/languages/korean/')
    );
  });

  it('filters languages by search query', async () => {
    render(
      <Wrapper>
        <LanguagesPage />
      </Wrapper>
    );
    const search = await screen.findByTestId('language-search');
    fireEvent.change(search, { target: { value: 'span' } });

    await waitFor(() => {
      expect(screen.queryByTestId('language-korean')).not.toBeInTheDocument();
      expect(screen.queryByTestId('language-english')).not.toBeInTheDocument();
      expect(screen.queryByTestId('language-sign')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('language-spanish')).toBeInTheDocument();
  });

  it('shows an empty message for an unmatched search', async () => {
    render(
      <Wrapper>
        <LanguagesPage />
      </Wrapper>
    );
    const search = await screen.findByTestId('language-search');
    fireEvent.change(search, { target: { value: 'zzz' } });

    await waitFor(() => {
      expect(screen.getByText(/No languages match/)).toBeInTheDocument();
    });
  });
});
