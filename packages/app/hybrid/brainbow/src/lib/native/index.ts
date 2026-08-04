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
