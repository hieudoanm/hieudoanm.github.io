import type {
  CompareCompatibility,
  Dataset,
  DatasetDetail,
  DicomwebServer,
  ImportSummary,
  JobRecord,
  ModelRecord,
  PipelineRow,
  ProtocolReport,
  ProtocolRow,
  ProvenanceRecord,
  QcReport,
  QidoSeries,
  QidoStudy,
  SeriesMetadata,
  StowResult,
  StudyAnalysis,
} from './types';

type InvokeFn = <T>(
  command: string,
  args?: Record<string, unknown>
) => Promise<T>;

interface TauriInternals {
  invoke?: InvokeFn;
}

export const DESKTOP_REQUIRED_MESSAGE =
  'The MRI workspace requires the desktop runtime. Download the app to import and browse studies.';

const getInvoke = (): InvokeFn | null => {
  if (typeof window === 'undefined') return null;
  const internals = (
    window as unknown as { __TAURI_INTERNALS__?: TauriInternals }
  ).__TAURI_INTERNALS__;
  return internals?.invoke ?? null;
};

export const isDesktopRuntime = (): boolean => getInvoke() !== null;

async function call<T>(
  command: string,
  args?: Record<string, unknown>
): Promise<T> {
  const invoke = getInvoke();
  if (!invoke) {
    throw new Error(DESKTOP_REQUIRED_MESSAGE);
  }
  return invoke<T>(command, args);
}

export interface MriApi {
  pickScanFiles(): Promise<string[]>;
  importFiles(paths: string[], name: string): Promise<ImportSummary>;
  listDatasets(query: string): Promise<Dataset[]>;
  getDatasetDetail(datasetId: string): Promise<DatasetDetail>;
  deleteDataset(datasetId: string): Promise<void>;
  getSeriesMetadata(seriesId: string): Promise<SeriesMetadata>;
  getProvenance(datasetId: string): Promise<ProvenanceRecord[]>;
  readSlice(seriesId: string, index: number): Promise<ArrayBuffer>;
  getStudyAnalysis(datasetId: string, studyUid: string): Promise<StudyAnalysis>;
  listProtocols(): Promise<ProtocolRow[]>;
  createProtocol(definitionJson: string): Promise<ProtocolRow>;
  deleteProtocol(protocolId: string): Promise<void>;
  validateDataset(
    datasetId: string,
    protocolId: string
  ): Promise<ProtocolReport>;
  runQc(seriesId: string): Promise<QcReport>;
  compareCompatibility(
    leftSeriesId: string,
    rightSeriesId: string
  ): Promise<CompareCompatibility>;
  createPipeline(definitionJson: string): Promise<PipelineRow>;
  listPipelines(): Promise<PipelineRow[]>;
  deletePipeline(pipelineId: string): Promise<void>;
  runPipeline(pipelineId: string, datasetId?: string): Promise<JobRecord>;
  listJobs(): Promise<JobRecord[]>;
  getJob(jobId: string): Promise<JobRecord>;
  cancelJob(jobId: string): Promise<void>;
  retryJob(jobId: string): Promise<JobRecord>;
  registerModel(definitionJson: string): Promise<ModelRecord>;
  listModels(): Promise<ModelRecord[]>;
  deleteModel(modelId: string): Promise<void>;
  isRuntimeAvailable(runtime: string): Promise<boolean>;
  runModel(
    modelId: string,
    datasetId?: string,
    inputRef?: string
  ): Promise<JobRecord>;
  addDicomwebServer(
    name: string,
    url: string,
    authHeader: string
  ): Promise<DicomwebServer>;
  listDicomwebServers(): Promise<DicomwebServer[]>;
  deleteDicomwebServer(serverId: string): Promise<void>;
  qidoStudies(
    serverId: string,
    patientName: string,
    limit?: number
  ): Promise<QidoStudy[]>;
  qidoSeries(serverId: string, studyUid: string): Promise<QidoSeries[]>;
  wadoImportSeries(
    serverId: string,
    studyUid: string,
    seriesUid: string
  ): Promise<ImportSummary>;
  stowExportDataset(serverId: string, datasetId: string): Promise<StowResult>;
}

export const api: MriApi = {
  pickScanFiles: () => call<string[]>('pick_scan_files'),
  importFiles: (paths, name) =>
    call<ImportSummary>('import_files', { paths, name }),
  listDatasets: (query) => call<Dataset[]>('list_datasets', { query }),
  getDatasetDetail: (datasetId) =>
    call<DatasetDetail>('get_dataset_detail', { datasetId }),
  deleteDataset: (datasetId) => call<void>('delete_dataset', { datasetId }),
  getSeriesMetadata: (seriesId) =>
    call<SeriesMetadata>('get_series_metadata', { seriesId }),
  getProvenance: (datasetId) =>
    call<ProvenanceRecord[]>('get_provenance', { datasetId }),
  readSlice: (seriesId, index) =>
    call<ArrayBuffer>('read_slice', { seriesId, index }),
  getStudyAnalysis: (datasetId, studyUid) =>
    call<StudyAnalysis>('get_study_analysis', { datasetId, studyUid }),
  listProtocols: () => call<ProtocolRow[]>('list_protocols'),
  createProtocol: (definitionJson) =>
    call<ProtocolRow>('create_protocol', { definitionJson }),
  deleteProtocol: (protocolId) => call<void>('delete_protocol', { protocolId }),
  validateDataset: (datasetId, protocolId) =>
    call<ProtocolReport>('validate_dataset', { datasetId, protocolId }),
  runQc: (seriesId) => call<QcReport>('run_qc', { seriesId }),
  compareCompatibility: (leftSeriesId, rightSeriesId) =>
    call<CompareCompatibility>('compare_compatibility', {
      leftSeriesId,
      rightSeriesId,
    }),
  createPipeline: (definitionJson) =>
    call<PipelineRow>('create_pipeline', { definitionJson }),
  listPipelines: () => call<PipelineRow[]>('list_pipelines'),
  deletePipeline: (pipelineId) => call<void>('delete_pipeline', { pipelineId }),
  runPipeline: (pipelineId, datasetId) =>
    call<JobRecord>('run_pipeline', {
      pipelineId,
      datasetId: datasetId ?? null,
    }),
  listJobs: () => call<JobRecord[]>('list_jobs'),
  getJob: (jobId) => call<JobRecord>('get_job', { jobId }),
  cancelJob: (jobId) => call<void>('cancel_job', { jobId }),
  retryJob: (jobId) => call<JobRecord>('retry_job', { jobId }),
  registerModel: (definitionJson) =>
    call<ModelRecord>('register_model', { definitionJson }),
  listModels: () => call<ModelRecord[]>('list_models'),
  deleteModel: (modelId) => call<void>('delete_model', { modelId }),
  isRuntimeAvailable: (runtime) =>
    call<boolean>('is_runtime_available', { runtime }),
  runModel: (modelId, datasetId, inputRef) =>
    call<JobRecord>('run_model', {
      modelId,
      datasetId: datasetId ?? null,
      inputRef: inputRef ?? null,
    }),
  addDicomwebServer: (name, url, authHeader) =>
    call<DicomwebServer>('add_dicomweb_server', {
      name,
      url,
      authHeader,
    }),
  listDicomwebServers: () => call<DicomwebServer[]>('list_dicomweb_servers'),
  deleteDicomwebServer: (serverId) =>
    call<void>('delete_dicomweb_server', { serverId }),
  qidoStudies: (serverId, patientName, limit) =>
    call<QidoStudy[]>('qido_studies', {
      serverId,
      patientName,
      limit: limit ?? null,
    }),
  qidoSeries: (serverId, studyUid) =>
    call<QidoSeries[]>('qido_series', { serverId, studyUid }),
  wadoImportSeries: (serverId, studyUid, seriesUid) =>
    call<ImportSummary>('wado_import_series', {
      serverId,
      studyUid,
      seriesUid,
    }),
  stowExportDataset: (serverId, datasetId) =>
    call<StowResult>('stow_export_dataset', { serverId, datasetId }),
};
