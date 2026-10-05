import { render, screen } from '@testing-library/react';

import { RunDetailTemplate } from '@/components/templates/RunDetailTemplate';
import { readRun } from '@/lib/ipc/api';

jest.mock('@/lib/ipc/api', () => ({
  readRun: jest.fn(),
  cancelRun: jest.fn(),
  readTextFile: jest.fn(),
}));

const detail = {
  summary: {
    runId: 'r_20261005_120000_1',
    path: '/project/runs/r_20261005_120000_1',
    name: 'baseline',
    status: 'completed' as const,
    schemaVersion: '0.1.0',
    dataset: 'arc',
    modelType: 'logistic_regression',
    seed: 42,
    device: 'cpu',
    gitCommit: 'abc123',
    startedAt: '2026-10-05T10:00:00Z',
    endedAt: '2026-10-05T10:30:00Z',
    durationSeconds: 1800,
    nMetrics: 2,
    problems: [],
  },
  manifest: {
    schemaVersion: '0.1.0',
    configHash: 'deadbeef',
    dataHash: 'cafe',
    pythonVersion: '3.12.1',
    libraryVersions: { numpy: '2.1.0' },
  },
  config: { dataset: 'arc', modelType: 'logistic_regression', seed: 42 },
  events: [
    { type: 'stage_start', timestamp: '2026-10-05T10:00:00', stage: 'train' },
    {
      type: 'stage_end',
      timestamp: '2026-10-05T10:30:00',
      stage: 'train',
      status: 'ok',
    },
  ],
  metrics: {
    metrics: [
      {
        name: 'auc',
        value: 0.81,
        ciLower: 0.7,
        ciUpper: 0.9,
        ciLevel: 0.95,
        seed: 42,
        fold: null,
      },
      {
        name: 'accuracy',
        value: 0.75,
        ciLower: null,
        ciUpper: null,
        ciLevel: null,
        seed: 42,
        fold: null,
      },
    ],
  },
  artifacts: [
    {
      path: '/project/runs/r_1/events.jsonl',
      name: 'events.jsonl',
      kind: 'text',
      sizeBytes: 2048,
    },
  ],
};

describe('Run detail screen', () => {
  beforeEach(() => {
    jest.mocked(readRun).mockReset();
  });

  test('shows manifest, config, metrics, events and artifacts', async () => {
    jest.mocked(readRun).mockResolvedValue(detail);
    render(<RunDetailTemplate runId="r_20261005_120000_1" />);
    expect(await screen.findByText('baseline')).toBeInTheDocument();
    expect(screen.getByText('deadbeef')).toBeInTheDocument();
    expect(screen.getByText('2.1.0')).toBeInTheDocument();
    expect(screen.getByText('0.810')).toBeInTheDocument();
    expect(screen.getByText('0.700 – 0.900')).toBeInTheDocument();
    expect(screen.getByText('stage start')).toBeInTheDocument();
    expect(screen.getByText('events.jsonl')).toBeInTheDocument();
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
  });

  test('shows calibration figures and a run without metrics', async () => {
    jest
      .mocked(readRun)
      .mockResolvedValue({
        ...detail,
        metrics: { metrics: [], calibration: { brierScore: 0.14, ece: 0.06 } },
      });
    render(<RunDetailTemplate runId="r_cal" />);
    expect(
      await screen.findByText('This run wrote no metrics.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Calibration: Brier 0.140, ECE 0.060/)
    ).toBeInTheDocument();
    expect(screen.getByText(/^Total /)).toBeInTheDocument();
  });

  test('shows a dash where an interval is missing', async () => {
    jest.mocked(readRun).mockResolvedValue({
      ...detail,
      metrics: {
        metrics: [
          {
            name: 'auc',
            value: null,
            ciLower: null,
            ciUpper: null,
            ciLevel: null,
            seed: null,
            fold: null,
          },
        ],
      },
    });
    render(<RunDetailTemplate runId="r_no_ci" />);
    expect(await screen.findByText('auc')).toBeInTheDocument();
    expect(screen.getAllByText('—').length).toBeGreaterThan(1);
  });

  test('explains an unsupported schema instead of showing partial data', async () => {
    jest.mocked(readRun).mockResolvedValue({
      ...detail,
      summary: {
        ...detail.summary,
        status: 'unsupported',
        schemaVersion: '2.0.0',
        problems: [
          {
            kind: 'schema_unsupported',
            message: 'schema 2.0.0 is not supported',
            blocking: true,
          },
        ],
      },
      manifest: null,
      metrics: null,
      events: [],
      artifacts: [],
    });
    render(<RunDetailTemplate runId="r_future" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('2.0.0');
    expect(
      screen.getByText(/schema 2\.0\.0 is not supported/)
    ).toBeInTheDocument();
  });

  test('offers a way back when the run cannot be read', async () => {
    jest.mocked(readRun).mockRejectedValue(new Error('Unknown run r_missing.'));
    const onBack = jest.fn();
    render(<RunDetailTemplate runId="r_missing" onBack={onBack} />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unknown run r_missing.'
    );
    expect(
      screen.getByRole('button', { name: 'Back to runs' })
    ).toBeInTheDocument();
  });
});
