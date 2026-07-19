import { isTauri, nativeNotify } from '../index';

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

  it('no-ops notifications outside tauri', async () => {
    await nativeNotify('Hello', 'World');
    expect(isPermissionGranted).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
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
