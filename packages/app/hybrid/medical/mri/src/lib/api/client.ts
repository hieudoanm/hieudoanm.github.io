import type {
  CompareCompatibility,
  Dataset,
  DatasetDetail,
  ImportSummary,
  ProtocolReport,
  ProtocolRow,
  ProvenanceRecord,
  QcReport,
  SeriesMetadata,
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
};
