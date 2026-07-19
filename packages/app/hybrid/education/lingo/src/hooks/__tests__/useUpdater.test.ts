import { act, renderHook, waitFor } from '@testing-library/react';
import { useUpdater } from '../useUpdater';

const check = jest.fn();
const downloadAndInstall = jest.fn();
const ask = jest.fn();
const message = jest.fn();

jest.mock('@tauri-apps/plugin-updater', () => ({
  check: (...args: unknown[]) => check(...args),
}));

jest.mock('@tauri-apps/plugin-dialog', () => ({
  ask: (...args: unknown[]) => ask(...args),
  message: (...args: unknown[]) => message(...args),
}));

describe('useUpdater', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    downloadAndInstall.mockResolvedValue(undefined);
    delete (window as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__;
  });

  const withTauri = (): void => {
    (window as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__ = {};
  };

  it('does nothing outside Tauri', async () => {
    renderHook(() => useUpdater());
    await act(async () => {
      await Promise.resolve();
    });
    expect(check).not.toHaveBeenCalled();
  });

  it('installs an update when the user accepts', async () => {
    withTauri();
    check.mockResolvedValue({ version: '1.2.3', downloadAndInstall });
    ask.mockResolvedValue(true);

    renderHook(() => useUpdater());

    await waitFor(
      () => {
        expect(downloadAndInstall).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );
    await waitFor(() => {
      expect(message).toHaveBeenCalled();
    });
  });

  it('skips install when the user declines', async () => {
    withTauri();
    check.mockResolvedValue({ version: '1.2.3' });
    ask.mockResolvedValue(false);

    renderHook(() => useUpdater());

    await waitFor(
      () => {
        expect(ask).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );
    expect(downloadAndInstall).not.toHaveBeenCalled();
  });

  it('does nothing when no update is available', async () => {
    withTauri();
    check.mockResolvedValue(null);

    renderHook(() => useUpdater());

    await waitFor(
      () => {
        expect(check).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );
    expect(ask).not.toHaveBeenCalled();
  });
});
