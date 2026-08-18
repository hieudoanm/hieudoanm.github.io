import {
  isTauri,
  nativeNotify,
  nativePickImages,
  nativePickProject,
  nativeSaveProject,
  readLaunchProject,
} from '@/lib/native';

const { invoke } = jest.requireMock('@tauri-apps/api/core') as {
  invoke: jest.Mock;
};
const notification = jest.requireMock('@tauri-apps/plugin-notification') as {
  isPermissionGranted: jest.Mock;
  requestPermission: jest.Mock;
  sendNotification: jest.Mock;
};

jest.mock('@tauri-apps/api/core', () => ({
  invoke: jest.fn(),
}));

jest.mock('@tauri-apps/plugin-notification', () => ({
  isPermissionGranted: jest.fn(),
  requestPermission: jest.fn(),
  sendNotification: jest.fn(),
}));

const setTauri = (tauri: boolean): void => {
  if (tauri) {
    (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = {};
  } else {
    delete (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__;
  }
};

describe('isTauri', () => {
  afterEach(() => setTauri(false));

  it('detects the Tauri runtime', () => {
    expect(isTauri()).toBe(false);
    setTauri(true);
    expect(isTauri()).toBe(true);
  });
});

describe('native bridge commands', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setTauri(false);
  });

  it('falls back to null when not in Tauri', async () => {
    await expect(nativePickProject()).resolves.toBeNull();
    await expect(readLaunchProject()).resolves.toBeNull();
  });

  it('falls back to an empty array when not in Tauri', async () => {
    await expect(nativePickImages()).resolves.toEqual([]);
  });

  it('returns false when not in Tauri', async () => {
    await expect(nativeSaveProject('a', 'b')).resolves.toBe(false);
  });

  it('invokes pick_project_file', async () => {
    setTauri(true);
    invoke.mockResolvedValue({ name: 'demo.brainbow', content: '{}' });
    await expect(nativePickProject()).resolves.toEqual({
      name: 'demo.brainbow',
      content: '{}',
    });
    expect(invoke).toHaveBeenCalledWith('pick_project_file', undefined);
  });

  it('invokes pick_image_files', async () => {
    setTauri(true);
    invoke.mockResolvedValue([{ name: 'a.tif', data: 'abc' }]);
    await expect(nativePickImages()).resolves.toEqual([
      { name: 'a.tif', data: 'abc' },
    ]);
    expect(invoke).toHaveBeenCalledWith('pick_image_files', undefined);
  });

  it('invokes save_project_file with the bundle content', async () => {
    setTauri(true);
    invoke.mockResolvedValue(true);
    await expect(nativeSaveProject('demo', '{}')).resolves.toBe(true);
    expect(invoke).toHaveBeenCalledWith('save_project_file', {
      defaultName: 'demo',
      content: '{}',
    });
  });

  it('invokes read_launch_project', async () => {
    setTauri(true);
    invoke.mockResolvedValue({ name: 'launch', content: '{}' });
    await expect(readLaunchProject()).resolves.toEqual({
      name: 'launch',
      content: '{}',
    });
  });
});

describe('nativeNotify', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setTauri(false);
  });

  it('does nothing when not in Tauri', async () => {
    await nativeNotify('title', 'body');
    expect(notification.isPermissionGranted).not.toHaveBeenCalled();
  });

  it('sends a notification when permission is already granted', async () => {
    setTauri(true);
    notification.isPermissionGranted.mockResolvedValue(true);
    await nativeNotify('Done', 'Finished');
    expect(notification.sendNotification).toHaveBeenCalledWith({
      title: 'Done',
      body: 'Finished',
    });
  });

  it('requests permission when not yet granted', async () => {
    setTauri(true);
    notification.isPermissionGranted.mockResolvedValue(false);
    notification.requestPermission.mockResolvedValue('granted');
    await nativeNotify('Done', 'Finished');
    expect(notification.requestPermission).toHaveBeenCalled();
    expect(notification.sendNotification).toHaveBeenCalledTimes(1);
  });

  it('skips sending when permission is denied', async () => {
    setTauri(true);
    notification.isPermissionGranted.mockResolvedValue(false);
    notification.requestPermission.mockResolvedValue('denied');
    await nativeNotify('Done', 'Finished');
    expect(notification.sendNotification).not.toHaveBeenCalled();
  });
});
