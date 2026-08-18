import { renderHook } from '@testing-library/react';
import { useUpdater } from '@/hooks/useUpdater';

jest.mock('@/lib/native', () => ({
  isTauri: jest.fn(),
}));

jest.mock('@tauri-apps/plugin-updater', () => ({
  check: jest.fn(),
}));

jest.mock('@tauri-apps/plugin-dialog', () => ({
  ask: jest.fn(),
  message: jest.fn(),
}));

const { isTauri } = jest.requireMock('@/lib/native') as {
  isTauri: jest.Mock;
};
const updater = jest.requireMock('@tauri-apps/plugin-updater') as {
  check: jest.Mock;
};
const dialog = jest.requireMock('@tauri-apps/plugin-dialog') as {
  ask: jest.Mock;
  message: jest.Mock;
};

describe('useUpdater', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing outside Tauri', () => {
    isTauri.mockReturnValue(false);
    renderHook(() => useUpdater());
    expect(updater.check).not.toHaveBeenCalled();
  });

  it('downloads and installs an accepted update', async () => {
    isTauri.mockReturnValue(true);
    const update = {
      version: '1.2.3',
      downloadAndInstall: jest.fn().mockResolvedValue(undefined),
    };
    updater.check.mockResolvedValue(update);
    dialog.ask.mockResolvedValue(true);
    dialog.message.mockResolvedValue(undefined);

    renderHook(() => useUpdater());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(update.downloadAndInstall).toHaveBeenCalled();
    expect(dialog.message).toHaveBeenCalledWith(
      'Update installed. Restart Brainbow to apply it.',
      expect.objectContaining({ title: 'Brainbow update' })
    );
  });

  it('stops when no update is available', async () => {
    isTauri.mockReturnValue(true);
    updater.check.mockResolvedValue(null);

    renderHook(() => useUpdater());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dialog.ask).not.toHaveBeenCalled();
  });

  it('stops when the user declines the update', async () => {
    isTauri.mockReturnValue(true);
    updater.check.mockResolvedValue({ version: '1.2.3' });
    dialog.ask.mockResolvedValue(false);

    renderHook(() => useUpdater());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dialog.message).not.toHaveBeenCalled();
  });
});
