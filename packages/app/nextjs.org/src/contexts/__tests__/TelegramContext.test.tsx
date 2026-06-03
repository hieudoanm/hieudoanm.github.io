import { render, screen, waitFor } from '@testing-library/react';
import { TelegramProvider, useTelegram } from '../TelegramContext';

jest.mock(
  '@hieudoanm/try-catch',
  () => ({
    tryCatch: jest.fn().mockResolvedValue({ data: null, error: null }),
  }),
  { virtual: true }
);

describe('TelegramContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete (globalThis as any).window?.Telegram;
  });

  it('renders children', async () => {
    render(
      <TelegramProvider>
        <div data-testid="child">Hello</div>
      </TelegramProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('child')).toHaveTextContent('Hello');
    });
  });

  it('provides default unauthenticated state', async () => {
    render(
      <TelegramProvider>
        <Consumer />
      </TelegramProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });
    expect(screen.getByTestId('user')).toHaveTextContent('');
  });

  it('getPlatform returns Web when Telegram is not available', async () => {
    render(
      <TelegramProvider>
        <Consumer />
      </TelegramProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('platform')).toHaveTextContent('web');
    });
  });

  it('requestFullscreen does not throw when Telegram is not available', async () => {
    render(
      <TelegramProvider>
        <Consumer />
      </TelegramProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('fullscreen-result')).toHaveTextContent(
        'called'
      );
    });
  });
});

function Consumer() {
  const { isAuthenticated, user, getPlatform, requestFullscreen } =
    useTelegram();

  let fullscreenResult: string | undefined;
  try {
    requestFullscreen();
    fullscreenResult = 'called';
  } catch {
    fullscreenResult = 'error';
  }

  return (
    <div>
      <span data-testid="is-authenticated">{String(isAuthenticated)}</span>
      <span data-testid="user">{user === null ? '' : user.first_name}</span>
      <span data-testid="platform">{getPlatform()}</span>
      <span data-testid="fullscreen-result">{fullscreenResult}</span>
    </div>
  );
}
