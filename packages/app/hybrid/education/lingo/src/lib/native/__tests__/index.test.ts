import {
  isTauri,
  nativeNotify,
  nativePickImages,
  nativePickProject,
  nativeSaveProject,
  readLaunchProject,
} from '../index';

const invoke = jest.fn();

jest.mock('@tauri-apps/api/core', () => ({
  invoke: (...args: unknown[]) => invoke(...args),
}));

const isPermissionGranted = jest.fn();
const requestPermission = jest.fn();
const sendNotification = jest.fn();

jest.mock('@tauri-apps/plugin-notification', () => ({
  isPermissionGranted: () => isPermissionGranted(),
  requestPermission: () => requestPermission(),
  sendNotification: (options: unknown) => sendNotification(options),
}));

describe('native bridge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete (window as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__;
  });

  const withTauri = (): void => {
    (window as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__ = {};
  };

  it('detects the tauri runtime', () => {
    expect(isTauri()).toBe(false);
    withTauri();
    expect(isTauri()).toBe(true);
  });

  it('no-ops pickers outside tauri', async () => {
    await expect(nativePickProject()).resolves.toBeNull();
    await expect(nativePickImages()).resolves.toEqual([]);
    expect(await readLaunchProject()).toBeNull();
    await expect(nativeSaveProject('a', 'b')).resolves.toBe(false);
    expect(invoke).not.toHaveBeenCalled();
  });

  it('invokes commands inside tauri', async () => {
    withTauri();
    invoke
      .mockResolvedValueOnce({ name: 'deck.json', content: '{}' })
      .mockResolvedValueOnce([{ name: 'a.png', data: '...' }])
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(true);

    const project = await nativePickProject();
    expect(project).toEqual({ name: 'deck.json', content: '{}' });
    expect(invoke).toHaveBeenCalledWith('pick_project_file', undefined);

    expect(await nativePickImages()).toHaveLength(1);
    expect(await readLaunchProject()).toBeNull();
    await expect(nativeSaveProject('a', 'b')).resolves.toBe(true);
    expect(invoke).toHaveBeenLastCalledWith('save_project_file', {
      defaultName: 'a',
      content: 'b',
    });
  });

  it('sends notifications after permission is granted', async () => {
    withTauri();
    isPermissionGranted.mockResolvedValue(true);

    await nativeNotify('Hello', 'World');
    expect(sendNotification).toHaveBeenCalledWith({
      title: 'Hello',
      body: 'World',
    });
    expect(requestPermission).not.toHaveBeenCalled();
  });

  it('requests permission when not yet granted', async () => {
    withTauri();
    isPermissionGranted.mockResolvedValue(false);
    requestPermission.mockResolvedValue('granted');

    await nativeNotify('Hi', 'There');
    expect(requestPermission).toHaveBeenCalled();
    expect(sendNotification).toHaveBeenCalled();
  });

  it('skips notification when permission denied', async () => {
    withTauri();
    isPermissionGranted.mockResolvedValue(false);
    requestPermission.mockResolvedValue('denied');

    await nativeNotify('Hi', 'There');
    expect(sendNotification).not.toHaveBeenCalled();
  });
});
