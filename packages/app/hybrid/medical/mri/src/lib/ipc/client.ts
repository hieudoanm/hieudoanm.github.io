/**
 * Typed boundary to Rust. The web layer never touches the filesystem or spawns
 * processes; every read is a validated command that answers with a domain type.
 */
export const invokeCommand = async <TResult>(
  command: string,
  args?: Record<string, unknown>
): Promise<TResult> => {
  const runtime = await import('@tauri-apps/api/core');
  return runtime.invoke<TResult>(command, args);
};

export const isTauri = (): boolean =>
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

/**
 * Outside the desktop shell (tests, `next build` static export) there is no
 * backend to call. Callers get a readable reason instead of a crash.
 */
export const withoutBackend = (command: string): Error =>
  new Error(
    `${command} needs the desktop app. Open the workbench in the Tauri window, or pick a project folder in Settings.`
  );
