import { invokeCommand, isTauri, withoutBackend } from '@/lib/ipc/client';
import {
  cancelRun,
  getOverview,
  getSettings,
  launchRun,
  readCohort,
  listRuns,
  readRun,
  updateSettings,
} from '@/lib/ipc/api';

const invoke = jest.fn();

jest.mock('@tauri-apps/api/core', () => ({
  invoke: (...args: unknown[]) => invoke(...args),
}));

describe('IPC boundary', () => {
  beforeEach(() => {
    invoke.mockReset();
    invoke.mockResolvedValue(null);
  });

  test('passes the command name and typed payload to Rust', async () => {
    await getSettings();
    expect(invoke).toHaveBeenCalledWith('get_settings', undefined);

    await listRuns();
    expect(invoke).toHaveBeenCalledWith('list_runs', undefined);

    await readRun('r_1');
    expect(invoke).toHaveBeenCalledWith('read_run', { runId: 'r_1' });

    await readCohort();
    expect(invoke).toHaveBeenCalledWith('read_cohort', undefined);
  });

  test('never exposes a raw command to the UI', async () => {
    await invokeCommand<string>('get_settings');
    expect(invoke).toHaveBeenCalledWith('get_settings', undefined);
  });

  test('passes the whole config object when launching', async () => {
    const config = { schema_version: '0.1.0', run: { device: 'cpu' } } as never;
    await launchRun(config);
    expect(invoke).toHaveBeenCalledWith('launch_run', { config });

    await cancelRun('r_1');
    expect(invoke).toHaveBeenCalledWith('cancel_run', { runId: 'r_1' });
  });

  test('sends editable settings as a single object', async () => {
    await updateSettings({ projectRoot: '/p' } as never);
    expect(invoke).toHaveBeenCalledWith('update_settings', {
      settings: { projectRoot: '/p' },
    });
  });

  test('propagates the backend error instead of swallowing it', async () => {
    invoke.mockRejectedValue(new Error('No project folder selected.'));
    await expect(getOverview()).rejects.toThrow('No project folder selected.');
  });

  test('explains what is missing outside the desktop shell', () => {
    expect(withoutBackend('get_overview').message).toContain(
      'needs the desktop app'
    );
  });

  test('detects the desktop runtime from the window', () => {
    expect(isTauri()).toBe(false);
    (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = {};
    expect(isTauri()).toBe(true);
    delete (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__;
  });
});
