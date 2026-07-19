export interface Dataset {
  id: string;
  name: string;
  description: string;
  sourcePath: string;
  path: string;
  createdAt: number;
  updatedAt: number;
}

export interface StudyInfo {
  studyUid: string;
  studyDate: string;
  seriesCount: number;
}

export type SeriesKind = 'dicom' | 'nifti';

export interface SeriesInfo {
  id: string;
  datasetId: string;
  studyUid: string;
  studyDate: string;
  seriesUid: string;
  modality: string;
  seriesDescription: string;
  kind: SeriesKind;
  fileCount: number;
  rows: number;
  columns: number;
  sliceCount: number;
  bitsAllocated: number;
  signedPixels: boolean;
  voxelX: number;
  voxelY: number;
  voxelZ: number;
  sliceThickness: number;
  orientation: string;
  teMs: number;
  trMs: number;
  flipAngle: number;
  fieldStrengthT: number;
  manufacturer: string;
  model: string;
}

export interface NormalizedConcepts {
  modality: string;
  contrast: string | null;
  sequenceFamily: string | null;
  dimensionality: string | null;
  inference: string;
}

export interface SeriesMetadata {
  series: SeriesInfo;
  normalized: NormalizedConcepts;
  originalTags: unknown;
  classification: SequenceCandidate[];
}

/** Classifier output; confidence is always exposed, never authoritative. */
export interface SequenceCandidate {
  sequence: string;
  confidence: number;
  evidence: string[];
}

export interface StudyAnalysis {
  studyUid: string;
  seriesCount: number;
  modalities: string[];
  contrasts: string[];
  orientations: string[];
  voxelSizes: number[][];
  fieldStrengthT: number | null;
  manufacturers: string[];
  models: string[];
  temporalSeries: number;
}

export type QcStatus = 'pass' | 'warn' | 'fail' | 'skipped';

export interface QcCheck {
  id: string;
  status: QcStatus;
  value: number | null;
  detail: string;
}

export interface QcReport {
  seriesId: string;
  datasetId: string;
  checks: QcCheck[];
  software: string;
  generatedAt: number;
}

export interface ProtocolConstraint {
  maxVoxelMm?: number;
  requiredBValues?: number[];
}

export interface ProtocolDefinition {
  name: string;
  required: string[];
  constraints?: Record<string, ProtocolConstraint>;
}

export interface ProtocolRow {
  id: string;
  name: string;
  definitionJson: string;
  createdAt: number;
}

export interface ConstraintViolation {
  contrast: string;
  constraint: string;
  detail: string;
}

export interface ProtocolReport {
  protocolName: string;
  satisfied: string[];
  missing: string[];
  violations: ConstraintViolation[];
  passed: boolean;
}

export interface CompareCompatibility {
  compatible: boolean;
  reasons: string[];
}

export interface DatasetDetail {
  dataset: Dataset;
  studies: StudyInfo[];
  series: SeriesInfo[];
}

export interface ProvenanceRecord {
  id: string;
  datasetId: string;
  activity: string;
  inputsJson: string;
  outputsJson: string;
  parametersJson: string;
  software: string;
  createdAt: number;
}

export interface ImportSummary {
  datasetId: string;
  importedFiles: number;
  skippedFiles: number;
  seriesCount: number;
}

export interface PipelineStep {
  id: string;
  tool: string;
  args: string[];
}

export interface PipelineDefinition {
  name: string;
  steps: PipelineStep[];
}

export interface PipelineRow {
  id: string;
  name: string;
  version: number;
  definitionJson: string;
  createdAt: number;
}

export type JobStatus =
  'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface JobLogEntry {
  timestamp: number;
  message: string;
}

export interface JobRecord {
  id: string;
  kind: string;
  status: JobStatus;
  progress: number;
  attempts: number;
  logsJson: string;
  inputsJson: string;
  outputsJson: string;
  error: string | null;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export type ModelRuntime = 'python' | 'docker';

export interface ModelDefinition {
  name: string;
  version: string;
  task: string;
  runtime: ModelRuntime;
  source: string;
  license?: string;
}

export interface ModelRecord {
  id: string;
  name: string;
  version: string;
  task: string;
  runtime: ModelRuntime;
  source: string;
  license: string;
  inputJson: string;
  outputJson: string;
  createdAt: number;
}

export interface DicomwebServer {
  id: string;
  name: string;
  url: string;
  authHeader: string;
  createdAt: number;
}

export interface QidoStudy {
  studyUid: string;
  patientName: string;
  studyDate: string;
  studyDescription: string;
}

export interface QidoSeries {
  seriesUid: string;
  seriesDescription: string;
  modality: string;
  instanceCount: number;
}

export interface StowResult {
  stored: number;
  failed: number;
}
