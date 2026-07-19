import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { LanguagesEnglish } from '../index';

const WORD_DATA = {
  word: 'hello',
  results: [
    {
      definition: 'a greeting',
      partOfSpeech: 'noun',
      synonyms: ['hi', 'hey'],
      anonyms: ['bye'],
      usageOf: [],
      typeOf: [],
    },
  ],
};

const fetchMock = jest.fn();

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
  jest.clearAllMocks();
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => WORD_DATA,
  });
});

const renderDictionary = () =>
  render(
    <Wrapper>
      <LanguagesEnglish />
    </Wrapper>
  );

it('renders input with default word', () => {
  renderDictionary();
  expect(screen.getByDisplayValue('example')).toBeInTheDocument();
});

it('accepts word input change', async () => {
  renderDictionary();
  const input = screen.getByDisplayValue('example');
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
});

it('shows loading while fetching', () => {
  fetchMock.mockReturnValue(new Promise(() => undefined));
  renderDictionary();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('renders word data grouped by part of speech', async () => {
  renderDictionary();
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'hello' })).toBeInTheDocument();
  });
  expect(screen.getByText('noun')).toBeInTheDocument();
  expect(screen.getByText('a greeting')).toBeInTheDocument();
});

it('clicks a synonym to search it', async () => {
  renderDictionary();
  await waitFor(() => {
    expect(screen.getByText('hi')).toBeInTheDocument();
  });
  fetchMock.mockClear();
  fireEvent.click(screen.getByText('hi'));
  await waitFor(() => {
    expect(screen.getByDisplayValue('hi')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
  });
});

it('clicks an antonym to search it', async () => {
  renderDictionary();
  await waitFor(() => {
    expect(screen.getByText('bye')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText('bye'));
  await waitFor(() => {
    expect(screen.getByDisplayValue('bye')).toBeInTheDocument();
  });
});

it('shows Word not found on fetch failure', async () => {
  fetchMock.mockRejectedValue(new TypeError('network'));
  renderDictionary();
  await waitFor(() => {
    expect(screen.getByText('Word not found')).toBeInTheDocument();
  });
});

it('shows JSON Error when response is not json', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => {
      throw new SyntaxError('bad json');
    },
  });
  renderDictionary();
  await waitFor(() => {
    expect(screen.getByText('JSON Error')).toBeInTheDocument();
  });
});
