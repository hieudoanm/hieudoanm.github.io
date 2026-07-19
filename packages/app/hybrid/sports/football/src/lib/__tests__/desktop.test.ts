jest.mock('@tauri-apps/api/core', () => ({ invoke: jest.fn() }));
jest.mock('@tauri-apps/api/event', () => ({ listen: jest.fn() }));

import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import {
  isDesktop,
  onDeepLink,
  openSquadFile,
  saveSquadFile,
  takePendingDeepLinks,
} from '@/lib/desktop';

const internalsKey = '__TAURI_INTERNALS__';

const setInternals = (): void => {
  (window as unknown as Record<string, unknown>)[internalsKey] = {};
};

const clearInternals = (): void => {
  delete (window as unknown as Record<string, unknown>)[internalsKey];
};

describe('desktop bridge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearInternals();
  });

  afterAll(clearInternals);

  it('reports whether the app runs inside Tauri', () => {
    expect(isDesktop()).toBe(false);
    setInternals();
    expect(isDesktop()).toBe(true);
  });

  it('opens a squad file through the native dialog', async () => {
    setInternals();
    (invoke as jest.Mock).mockResolvedValue({
      name: 'team.squad.json',
      content: '{}',
    });
    await expect(openSquadFile()).resolves.toEqual({
      name: 'team.squad.json',
      content: '{}',
    });
    expect(invoke).toHaveBeenCalledWith('open_squad_file');
  });

  it('returns null from openSquadFile when not in Tauri', async () => {
    await expect(openSquadFile()).resolves.toBeNull();
    expect(invoke).not.toHaveBeenCalled();
  });

  it('saves a squad file through the native dialog', async () => {
    setInternals();
    (invoke as jest.Mock).mockResolvedValue(true);
    await expect(saveSquadFile('my.squad.json', '{}')).resolves.toBe(true);
    expect(invoke).toHaveBeenCalledWith('save_squad_file', {
      defaultName: 'my.squad.json',
      content: '{}',
    });
  });

  it('returns false from saveSquadFile when not in Tauri', async () => {
    await expect(saveSquadFile('my.squad.json', '{}')).resolves.toBe(false);
    expect(invoke).not.toHaveBeenCalled();
  });

  it('returns pending deep links from the backend', async () => {
    setInternals();
    (invoke as jest.Mock).mockResolvedValue(['football://squad?squad=abc']);
    await expect(takePendingDeepLinks()).resolves.toEqual([
      'football://squad?squad=abc',
    ]);
    expect(invoke).toHaveBeenCalledWith('take_pending_deep_links');
  });

  it('returns an empty list when not in Tauri', async () => {
    await expect(takePendingDeepLinks()).resolves.toEqual([]);
  });

  it('listens for deep-link events and forwards each payload URL', async () => {
    const stop = jest.fn();
    (listen as jest.Mock).mockResolvedValue(stop as UnlistenFn);
    const handler = jest.fn();
    const unlisten = await onDeepLink(handler);
    expect(listen).toHaveBeenCalledWith(
      'deep-link://new-url',
      expect.any(Function)
    );
    const callback = (listen as jest.Mock).mock.calls[0][1];
    callback({ payload: ['football://a', 'football://b'] });
    callback({ payload: 'football://c' });
    callback({ payload: ['football://a'] });
    callback({ payload: 42 });
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenNthCalledWith(1, 'football://a');
    expect(handler).toHaveBeenNthCalledWith(2, 'football://b');
    expect(handler).toHaveBeenNthCalledWith(3, 'football://c');
    expect(handler).toHaveBeenNthCalledWith(4, 'football://a');
    unlisten();
    expect(stop).toHaveBeenCalled();
  });
});
