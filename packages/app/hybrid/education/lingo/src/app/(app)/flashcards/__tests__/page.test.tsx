import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import FlashcardsPage from '@/app/(app)/flashcards/page';

const mockCreate = jest.fn();
jest.mock('onnxruntime-web', () => ({
  InferenceSession: { create: (...args: unknown[]) => mockCreate(...args) },
  Tensor: jest.fn(),
}));

global.fetch = jest.fn() as unknown as typeof global.fetch;

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('FlashcardsPage', () => {
  it('renders the deck selector', async () => {
    render(
      <Wrapper>
        <FlashcardsPage />
      </Wrapper>
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Language')).toBeInTheDocument()
    );
  });
});
