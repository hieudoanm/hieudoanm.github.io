export interface NativeProjectPayload {
  name: string;
  content: string;
}

export interface NativeImagePayload {
  name: string;
  data: string;
}

const invoke = async <T>(
  command: string,
  args?: Record<string, unknown>
): Promise<T> => {
  const { invoke: call } = await import('@tauri-apps/api/core');
  return call<T>(command, args);
};

export const isTauri = (): boolean =>
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

export const nativePickProject =
  async (): Promise<NativeProjectPayload | null> => {
    if (!isTauri()) return null;
    return invoke<NativeProjectPayload | null>('pick_project_file');
  };

export const nativePickImages = async (): Promise<NativeImagePayload[]> => {
  if (!isTauri()) return [];
  return invoke<NativeImagePayload[]>('pick_image_files');
};

export const nativeSaveProject = async (
  name: string,
  content: string
): Promise<boolean> => {
  if (!isTauri()) return false;
  return invoke<boolean>('save_project_file', {
    defaultName: name,
    content,
  });
};

export const readLaunchProject =
  async (): Promise<NativeProjectPayload | null> => {
    if (!isTauri()) return null;
    return invoke<NativeProjectPayload | null>('read_launch_project');
  };

export const nativeNotify = async (
  title: string,
  body: string
): Promise<void> => {
  if (!isTauri()) return;
  const { isPermissionGranted, requestPermission, sendNotification } =
    await import('@tauri-apps/plugin-notification');
  let granted = await isPermissionGranted();
  if (!granted) {
    granted = (await requestPermission()) === 'granted';
  }
  if (granted) {
    sendNotification({ title, body });
  }
};
