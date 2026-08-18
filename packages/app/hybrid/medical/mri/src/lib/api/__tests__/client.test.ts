import {
  api,
  DESKTOP_REQUIRED_MESSAGE,
  isDesktopRuntime,
} from '@/lib/api/client';

type InvokeMock = jest.Mock;

const setInvoke = (invoke: InvokeMock | undefined): void => {
  (window as unknown as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__ =
    invoke ? { invoke } : undefined;
};

describe('isDesktopRuntime', () => {
  afterEach(() => setInvoke(undefined));

  it('is false without tauri internals', () => {
    expect(isDesktopRuntime()).toBe(false);
  });

  it('is true when the tauri invoke bridge exists', () => {
    setInvoke(jest.fn());
    expect(isDesktopRuntime()).toBe(true);
  });
});

describe('api commands', () => {
  let invoke: InvokeMock;

  beforeEach(() => {
    invoke = jest.fn().mockResolvedValue([]);
    setInvoke(invoke);
  });

  afterEach(() => setInvoke(undefined));

  it('pickScanFiles invokes with no args', async () => {
    await api.pickScanFiles();
    expect(invoke).toHaveBeenCalledWith('pick_scan_files', undefined);
  });

  it('importFiles passes paths and name', async () => {
    await api.importFiles(['/tmp/a.nii'], 'My dataset');
    expect(invoke).toHaveBeenCalledWith('import_files', {
      paths: ['/tmp/a.nii'],
      name: 'My dataset',
    });
  });

  it('listDatasets passes the query', async () => {
    await api.listDatasets('brain');
    expect(invoke).toHaveBeenCalledWith('list_datasets', { query: 'brain' });
  });

  it('getDatasetDetail passes the dataset id', async () => {
    await api.getDatasetDetail('dataset://abc');
    expect(invoke).toHaveBeenCalledWith('get_dataset_detail', {
      datasetId: 'dataset://abc',
    });
  });

  it('deleteDataset passes the dataset id', async () => {
    await api.deleteDataset('dataset://abc');
    expect(invoke).toHaveBeenCalledWith('delete_dataset', {
      datasetId: 'dataset://abc',
    });
  });

  it('getSeriesMetadata passes the series id', async () => {
    await api.getSeriesMetadata('series://a/b');
    expect(invoke).toHaveBeenCalledWith('get_series_metadata', {
      seriesId: 'series://a/b',
    });
  });

  it('getProvenance passes the dataset id', async () => {
    await api.getProvenance('dataset://abc');
    expect(invoke).toHaveBeenCalledWith('get_provenance', {
      datasetId: 'dataset://abc',
    });
  });

  it('readSlice requests raw binary slices', async () => {
    const buffer = new ArrayBuffer(8);
    invoke.mockResolvedValue(buffer);
    await expect(api.readSlice('series://a/b', 3)).resolves.toBe(buffer);
    expect(invoke).toHaveBeenCalledWith('read_slice', {
      seriesId: 'series://a/b',
      index: 3,
    });
  });

  it('getStudyAnalysis passes dataset and study ids', async () => {
    await api.getStudyAnalysis('dataset://abc', '1.2.3');
    expect(invoke).toHaveBeenCalledWith('get_study_analysis', {
      datasetId: 'dataset://abc',
      studyUid: '1.2.3',
    });
  });

  it('listProtocols invokes with no args', async () => {
    await api.listProtocols();
    expect(invoke).toHaveBeenCalledWith('list_protocols', undefined);
  });

  it('createProtocol passes the definition JSON', async () => {
    await api.createProtocol('{"name":"p"}');
    expect(invoke).toHaveBeenCalledWith('create_protocol', {
      definitionJson: '{"name":"p"}',
    });
  });

  it('deleteProtocol passes the protocol id', async () => {
    await api.deleteProtocol('protocol://p');
    expect(invoke).toHaveBeenCalledWith('delete_protocol', {
      protocolId: 'protocol://p',
    });
  });

  it('validateDataset passes dataset and protocol ids', async () => {
    await api.validateDataset('dataset://abc', 'protocol://p');
    expect(invoke).toHaveBeenCalledWith('validate_dataset', {
      datasetId: 'dataset://abc',
      protocolId: 'protocol://p',
    });
  });

  it('runQc passes the series id', async () => {
    await api.runQc('series://a/b');
    expect(invoke).toHaveBeenCalledWith('run_qc', { seriesId: 'series://a/b' });
  });

  it('compareCompatibility passes both series ids', async () => {
    await api.compareCompatibility('series://a', 'series://b');
    expect(invoke).toHaveBeenCalledWith('compare_compatibility', {
      leftSeriesId: 'series://a',
      rightSeriesId: 'series://b',
    });
  });

  it('createPipeline passes the definition JSON', async () => {
    await api.createPipeline('{"name":"p","steps":[]}');
    expect(invoke).toHaveBeenCalledWith('create_pipeline', {
      definitionJson: '{"name":"p","steps":[]}',
    });
  });

  it('listPipelines invokes with no args', async () => {
    await api.listPipelines();
    expect(invoke).toHaveBeenCalledWith('list_pipelines', undefined);
  });

  it('deletePipeline passes the pipeline id', async () => {
    await api.deletePipeline('pipeline://p');
    expect(invoke).toHaveBeenCalledWith('delete_pipeline', {
      pipelineId: 'pipeline://p',
    });
  });

  it('runPipeline passes pipeline and optional dataset ids', async () => {
    await api.runPipeline('pipeline://p', 'dataset://d');
    expect(invoke).toHaveBeenCalledWith('run_pipeline', {
      pipelineId: 'pipeline://p',
      datasetId: 'dataset://d',
    });
    await api.runPipeline('pipeline://p');
    expect(invoke).toHaveBeenCalledWith('run_pipeline', {
      pipelineId: 'pipeline://p',
      datasetId: null,
    });
  });

  it('listJobs invokes with no args', async () => {
    await api.listJobs();
    expect(invoke).toHaveBeenCalledWith('list_jobs', undefined);
  });

  it('getJob passes the job id', async () => {
    await api.getJob('job://j');
    expect(invoke).toHaveBeenCalledWith('get_job', { jobId: 'job://j' });
  });

  it('cancelJob and retryJob pass the job id', async () => {
    await api.cancelJob('job://j');
    expect(invoke).toHaveBeenCalledWith('cancel_job', { jobId: 'job://j' });
    await api.retryJob('job://j');
    expect(invoke).toHaveBeenCalledWith('retry_job', { jobId: 'job://j' });
  });

  it('registerModel passes the definition JSON', async () => {
    await api.registerModel('{"name":"m","version":"1"}');
    expect(invoke).toHaveBeenCalledWith('register_model', {
      definitionJson: '{"name":"m","version":"1"}',
    });
  });

  it('listModels invokes with no args', async () => {
    await api.listModels();
    expect(invoke).toHaveBeenCalledWith('list_models', undefined);
  });

  it('deleteModel passes the model id', async () => {
    await api.deleteModel('model://m');
    expect(invoke).toHaveBeenCalledWith('delete_model', {
      modelId: 'model://m',
    });
  });

  it('isRuntimeAvailable passes the runtime name', async () => {
    invoke.mockResolvedValue(true);
    await expect(api.isRuntimeAvailable('python')).resolves.toBe(true);
    expect(invoke).toHaveBeenCalledWith('is_runtime_available', {
      runtime: 'python',
    });
  });

  it('runModel passes optional dataset and input references', async () => {
    await api.runModel('model://m', 'dataset://d', 'series://1/s1');
    expect(invoke).toHaveBeenCalledWith('run_model', {
      modelId: 'model://m',
      datasetId: 'dataset://d',
      inputRef: 'series://1/s1',
    });
    await api.runModel('model://m');
    expect(invoke).toHaveBeenCalledWith('run_model', {
      modelId: 'model://m',
      datasetId: null,
      inputRef: null,
    });
  });

  it('addDicomwebServer passes name, url and auth header', async () => {
    await api.addDicomwebServer('PACS', 'http://pacs.local', 'Bearer t');
    expect(invoke).toHaveBeenCalledWith('add_dicomweb_server', {
      name: 'PACS',
      url: 'http://pacs.local',
      authHeader: 'Bearer t',
    });
  });

  it('qidoStudies passes the server, patient name and optional limit', async () => {
    await api.qidoStudies('server://p', 'DOE', 25);
    expect(invoke).toHaveBeenCalledWith('qido_studies', {
      serverId: 'server://p',
      patientName: 'DOE',
      limit: 25,
    });
    await api.qidoStudies('server://p', '');
    expect(invoke).toHaveBeenCalledWith('qido_studies', {
      serverId: 'server://p',
      patientName: '',
      limit: null,
    });
  });

  it('wadoImportSeries and stowExportDataset pass their ids', async () => {
    await api.wadoImportSeries('server://p', '1.2.3', '4.5.6');
    expect(invoke).toHaveBeenCalledWith('wado_import_series', {
      serverId: 'server://p',
      studyUid: '1.2.3',
      seriesUid: '4.5.6',
    });
    await api.stowExportDataset('server://p', 'dataset://d');
    expect(invoke).toHaveBeenCalledWith('stow_export_dataset', {
      serverId: 'server://p',
      datasetId: 'dataset://d',
    });
  });

  it('rejects with a helpful message outside the desktop runtime', async () => {
    setInvoke(undefined);
    await expect(api.listDatasets('')).rejects.toThrow(
      DESKTOP_REQUIRED_MESSAGE
    );
  });
});
