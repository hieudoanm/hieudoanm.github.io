import type {
  ActiveRunInfo,
  CohortReport,
  ConfigFile,
  DoctorReport,
  LaunchOutcome,
  LauncherStatus,
  LogPayload,
  Overview,
  ParticipantAsset,
  PipelineConfig,
  RigourReport,
  RunDetail,
  RunStatusPayload,
  RunSummary,
  Settings,
  TextFile,
} from '@/lib/contract/types';
import { invokeCommand, isTauri } from './client';

/**
 * One function per Tauri command in `src-tauri/src/commands`. Screens depend on
 * this module, never on the command names themselves.
 */
export const getSettings = (): Promise<Settings> =>
  invokeCommand('get_settings');

export const updateSettings = (settings: Settings): Promise<Settings> =>
  invokeCommand('update_settings', { settings });

export const pickProjectFolder = (): Promise<string | null> =>
  invokeCommand('pick_project_folder');

export const checkSetup = (): Promise<DoctorReport> =>
  invokeCommand('check_setup');

export const getOverview = (): Promise<Overview> =>
  invokeCommand('get_overview');

export const listRuns = (): Promise<RunSummary[]> => invokeCommand('list_runs');

export const listRunStatuses = (): Promise<Record<string, string>> =>
  invokeCommand('list_run_statuses');

export const readRun = (runId: string): Promise<RunDetail> =>
  invokeCommand('read_run', { runId });

export const readTextFile = (path: string): Promise<TextFile> =>
  invokeCommand('read_text_file', { path });

export const listConfigs = (): Promise<ConfigFile[]> =>
  invokeCommand('list_configs');

export const readCohort = (): Promise<CohortReport> =>
  invokeCommand('read_cohort');

export const readRigour = (): Promise<RigourReport> =>
  invokeCommand('read_rigour');

export const listParticipantAssets = (
  participantId: string
): Promise<ParticipantAsset[]> =>
  invokeCommand('list_participant_assets', { participantId });

export const launchRun = (
  config: PipelineConfig,
  device?: string,
  runId?: string
) => invokeCommand<LaunchOutcome>('launch_run', { config, device, runId });

export const cancelRun = (runId: string): Promise<void> =>
  invokeCommand('cancel_run', { runId });

export const getLauncherStatus = (): Promise<LauncherStatus> =>
  invokeCommand('launcher_status');

/** True when the UI can talk to Rust; used to explain the empty states. */
export const backendAvailable = isTauri;

export type { ActiveRunInfo, LogPayload, RunStatusPayload };
