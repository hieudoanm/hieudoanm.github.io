import { act, renderHook, waitFor } from '@testing-library/react';
import { isDesktop, onDeepLink, takePendingDeepLinks } from '@/lib/desktop';
import { encodeSquad } from '@/lib/share';
import { useSquad } from '@/hooks/useSquad';
import { makeSquad } from '@/test/fixtures';

jest.mock('@/lib/desktop', () => ({
  isDesktop: jest.fn(),
  onDeepLink: jest.fn(),
  takePendingDeepLinks: jest.fn(),
}));

const mockIsDesktop = isDesktop as jest.Mock;
const mockOnDeepLink = onDeepLink as jest.Mock;
const mockTakePendingDeepLinks = takePendingDeepLinks as jest.Mock;

const deepLinkFor = (name: string): string =>
  `football://squad?squad=${encodeSquad(
    makeSquad({
      name,
      players: [{ id: 'p1', name, number: 10, role: 'MID' as const }],
    })
  )}`;

const captureHandler = (): ((url: string) => Promise<void>) => {
  let handler: ((url: string) => void) | undefined;
  mockOnDeepLink.mockImplementation(async (callback: (url: string) => void) => {
    handler = callback;
    return jest.fn();
  });
  return async (url: string): Promise<void> => {
    await waitFor(() => expect(handler).toBeDefined());
    await act(async () => {
      handler!(url);
    });
  };
};

describe('useSquad deep links', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockIsDesktop.mockReturnValue(false);
    mockOnDeepLink.mockImplementation(async () => jest.fn());
    mockTakePendingDeepLinks.mockResolvedValue([]);
  });

  it('imports a pending deep link while running in Tauri', async () => {
    mockIsDesktop.mockReturnValue(true);
    mockTakePendingDeepLinks.mockResolvedValue([deepLinkFor('Pending')]);
    const { result } = renderHook(() => useSquad());
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    expect(result.current.squad.players[0]).toMatchObject({
      name: 'Pending',
      number: 10,
    });
  });

  it('imports a squad from a live deep-link event', async () => {
    mockIsDesktop.mockReturnValue(true);
    const fire = captureHandler();
    const { result } = renderHook(() => useSquad());
    await fire(deepLinkFor('Live'));
    expect(result.current.squad.players).toHaveLength(1);
    expect(result.current.squad.players[0].name).toBe('Live');
  });

  it('skips duplicate deep links', async () => {
    mockIsDesktop.mockReturnValue(true);
    const fire = captureHandler();
    const { result } = renderHook(() => useSquad());
    const url = deepLinkFor('Twice');
    await fire(url);
    await fire(url);
    expect(result.current.squad.players).toHaveLength(1);
  });

  it('ignores deep links without a squad param', async () => {
    mockIsDesktop.mockReturnValue(true);
    const fire = captureHandler();
    const { result } = renderHook(() => useSquad());
    await fire('football://squad?other=1');
    expect(result.current.squad.players).toHaveLength(0);
  });

  it('does not listen for deep links in the browser', async () => {
    mockIsDesktop.mockReturnValue(false);
    renderHook(() => useSquad());
    await waitFor(() => expect(mockOnDeepLink).not.toHaveBeenCalled());
    expect(mockTakePendingDeepLinks).not.toHaveBeenCalled();
  });
});
