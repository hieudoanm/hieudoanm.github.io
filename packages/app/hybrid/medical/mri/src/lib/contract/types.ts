/**
 * Types for the pipeline contract. These mirror the Rust DTOs in
 * `src-tauri/src/domain`, which mirror `pipeline/src/pipeline/core`. The
 * pipeline is the source of truth; this file is the generated-by-hand copy the
 * workbench validates against at runtime with zod.
 */

export type RunStatus =
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'incomplete'
  | 'unsupported';

export type ProblemKind =
  | 'manifest_unreadable'
  | 'schema_unsupported'
  | 'config_unreadable'
  | 'metrics_unreadable'
  | 'incomplete_run';

export interface RunProblem {
  kind: ProblemKind | string;
  message: string;
  blocking: boolean;
}

export interface RunManifest {
  schemaVersion?: string | null;
  gitCommit?: string | null;
  gitBranch?: string | null;
  configHash?: string | null;
  dataHash?: string | null;
  seeds?: number | null;
  device?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  pythonVersion?: string | null;
  libraryVersions?: Record<string, unknown>;
}

export interface RunConfigView {
  schemaVersion?: string | null;
  dataset?: string | null;
  dataPath?: string | null;
  nFolds?: number | null;
  lockBoxFraction?: number | null;
  seed?: number | null;
  stratifyBy?: string | null;
  modelType?: string | null;
  imageType?: string | null;
  learningRate?: number | null;
  batchSize?: number | null;
  maxEpochs?: number | null;
  device?: string | null;
  outputDir?: string | null;
  logLevel?: string | null;
}

export interface PipelineConfig {
  schema_version?: string;
  data?: {
    dataset?: string;
    data_path?: string;
    participants_tsv?: string | null;
    lesion_mask_path?: string | null;
    t1_path?: string | null;
  };
  split?: {
    n_folds?: number;
    lock_box_fraction?: number;
    seed?: number;
    stratify_by?: string;
  };
  model?: {
    model_type?: string;
    image_type?: string;
    learning_rate?: number;
    batch_size?: number;
    max_epochs?: number;
    early_stopping_patience?: number;
    class_weight?: boolean;
    calibration?: boolean;
  };
  run?: {
    run_id?: string | null;
    output_dir?: string;
    device?: string;
    log_level?: string;
    cache_stages?: boolean;
  };
}

export interface MetricRow {
  name: string;
  value?: number | null;
  ciLower?: number | null;
  ciUpper?: number | null;
  ciLevel?: number | null;
  seed?: number | null;
  fold?: number | null;
}

export interface CalibrationRow {
  brierScore?: number | null;
  ece?: number | null;
  probTrue?: number[];
  probPred?: number[];
}

export interface ConfusionRow {
  trueNegatives?: number | null;
  falsePositives?: number | null;
  falseNegatives?: number | null;
  truePositives?: number | null;
  sensitivity?: number | null;
  specificity?: number | null;
}

export interface MetricsDocument {
  metrics: MetricRow[];
  calibration?: CalibrationRow | null;
  confusion?: ConfusionRow | null;
}

export interface ArtifactEntry {
  path: string;
  name: string;
  kind: string;
  sizeBytes: number;
}

export interface RunSummary {
  runId: string;
  path: string;
  name?: string | null;
  status: RunStatus;
  schemaVersion?: string | null;
  dataset?: string | null;
  modelType?: string | null;
  imageType?: string | null;
  seed?: number | null;
  device?: string | null;
  gitCommit?: string | null;
  startedAt?: string | null;
  endedAt?: string | null;
  durationSeconds?: number | null;
  nMetrics: number;
  lastEventAt?: string | null;
  problems: RunProblem[];
}

export interface RunDetail {
  summary: RunSummary;
  manifest?: RunManifest | null;
  config?: RunConfigView | null;
  events: PipelineEvent[];
  metrics?: MetricsDocument | null;
  artifacts: ArtifactEntry[];
  predictionsNote?: string | null;
}

export type PipelineEvent =
  | {
      type: 'stage_start';
      timestamp?: string | null;
      stage: string;
      runId?: string | null;
    }
  | {
      type: 'progress';
      timestamp?: string | null;
      stage: string;
      seed?: number | null;
      fold?: number | null;
      epoch?: number | null;
      loss?: number | null;
    }
  | {
      type: 'metric';
      timestamp?: string | null;
      stage: string;
      name: string;
      value: number;
      fold?: number | null;
    }
  | {
      type: 'stage_end';
      timestamp?: string | null;
      stage: string;
      status: string;
    }
  | { type: 'error'; timestamp?: string | null; stage: string; error: string }
  | { type: string; [key: string]: unknown };

export interface CohortRow {
  participantId: string;
  session?: string | null;
  outcome?: number | null;
  outcomeLabel?: string | null;
  values: Record<string, string>;
}

export interface CohortFlag {
  participantId: string;
  kind: string;
  message: string;
}

export interface ReasonCount {
  reason: string;
  count: number;
}

export interface OutcomeCount {
  value: string;
  count: number;
}

export interface CohortReport {
  sourcePath: string;
  columns: string[];
  rows: CohortRow[];
  rowCount: number;
  uniqueParticipants: number;
  duplicateParticipants: number;
  usableParticipants: number;
  excludedReasons: ReasonCount[];
  outcomeColumn?: string | null;
  outcomeDistribution: OutcomeCount[];
  flags: CohortFlag[];
}

export interface CvFold {
  index: number;
  trainParticipants: string[];
  validationParticipants: string[];
}

export interface SplitsDocument {
  lockBoxParticipants: string[];
  remainingParticipants: string[];
  nFolds?: number | null;
  lockBoxFraction?: number | null;
  seed?: number | null;
  stratifyBy?: string | null;
  folds: CvFold[];
}

export interface LockBoxAccess {
  accessNumber?: number | null;
  timestamp?: string | null;
  runId?: string | null;
  purpose?: string | null;
  modelName?: string | null;
}

export interface LockBoxLog {
  accessCount: number;
  accesses: LockBoxAccess[];
}

export interface RigourCheck {
  id: string;
  title: string;
  status: 'pass' | 'fail' | 'warn' | 'unknown';
  detail: string;
  evidence?: string | null;
}

export interface RigourReport {
  checks: RigourCheck[];
  splits?: SplitsDocument | null;
  lockBox?: LockBoxLog | null;
  lockBoxBudget?: number | null;
  protocolPath: string;
  protocolAvailable: boolean;
}

export interface DependencyStatus {
  name: string;
  installed: boolean;
}

export interface DoctorReport {
  ok: boolean;
  command: string;
  exitCode?: number | null;
  rawOutput: string;
  pythonVersion?: string | null;
  platform?: string | null;
  availableDevices: string[];
  recommendedDevice?: string | null;
  dataPath?: string | null;
  dataPathExists: boolean;
  requiredDependencies: DependencyStatus[];
  optionalDependencies: DependencyStatus[];
  /** `null` until the CLI's help output has been read. */
  canLaunch?: boolean | null;
  availableCommands?: string[];
}

export interface Settings {
  projectRoot?: string | null;
  runsDir: string;
  configDir: string;
  cohortPath: string;
  splitsPath: string;
  lockBoxLogPath: string;
  protocolPath: string;
  imagingDir: string;
  derivedDir: string;
  pythonEnv: string;
  lockBoxBudget?: number | null;
  remoteUrl?: string | null;
}

export interface Overview {
  configured: boolean;
  setupHint?: string | null;
  projectRoot?: string | null;
  runsDir: string;
  pythonEnv: string;
  runCount: number;
  completedCount: number;
  failedCount: number;
  runningCount: number;
  unsupportedCount: number;
  latestRun?: RunSummary | null;
  cohortParticipants?: number | null;
  cohortExcluded?: number | null;
}

export interface ConfigFile {
  path: string;
  name: string;
  config?: RunConfigView | null;
  /** The config exactly as written, including fields this build does not show. */
  raw?: PipelineConfig | null;
}

export interface ParticipantAsset {
  participantId: string;
  path: string;
  name: string;
  role: 'scan' | 'mask' | 'atlas' | 'image';
  sizeBytes: number;
}

export interface TextFile {
  path: string;
  name: string;
  text: string;
}

export interface LaunchOutcome {
  runId: string;
  status: 'queued' | 'running';
  command: string;
  configPath: string;
}

export interface ActiveRunInfo {
  runId: string;
  command: string;
  configPath: string;
  device: string;
  status: string;
  pid: number;
  startedAtMs: number;
  finishedAtMs?: number | null;
  exitCode?: number | null;
}

export interface QueuedRunInfo {
  runId: string;
  command: string;
  configPath: string;
  device: string;
  requestedAtMs: number;
}

export interface LauncherStatus {
  active?: ActiveRunInfo | null;
  queued: QueuedRunInfo[];
}

export interface LogPayload {
  runId: string;
  stream: 'stdout' | 'stderr';
  line: string;
  atMs: number;
}

export interface RunStatusPayload {
  runId: string;
  status: string;
  exitCode?: number | null;
  atMs: number;
}
