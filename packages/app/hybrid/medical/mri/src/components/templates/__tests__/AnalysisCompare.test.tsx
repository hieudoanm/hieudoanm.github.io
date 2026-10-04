import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AnalysisTemplate } from '@/components/templates/AnalysisTemplate';
import { CompareTemplate } from '@/components/templates/CompareTemplate';
import { listRuns, readRun } from '@/lib/ipc/api';
import type { RunDetail, RunSummary } from '@/lib/contract/types';

jest.mock('@/lib/ipc/api', () => ({ listRuns: jest.fn(), readRun: jest.fn() }));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/analysis',
}));

const run = (runId: string, name: string, value: number): RunSummary => ({
  runId,
  path: `/project/runs/${runId}`,
  name,
  status: 'completed',
  nMetrics: value > 0 ? 1 : 0,
  problems: [],
});

const detail = (runId: string, name: string, value: number): RunDetail => ({
  summary: run(runId, name, value),
  manifest: null,
  config: null,
  events: [],
  metrics: { metrics: [{ name: 'auc', value }] },
  artifacts: [],
});

const runs = [
  run('r_1', 'baseline', 0.8),
  run('r_2', 'candidate', 0.9),
  run('r_3', 'no-metrics', 0),
];

describe('Analysis screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState(null, '', '/analysis');
    jest.mocked(listRuns).mockResolvedValue(runs);
    jest.mocked(readRun).mockImplementation(async (runId: string) => {
      const match = {
        r_1: detail('r_1', 'baseline', 0.8),
        r_2: detail('r_2', 'candidate', 0.9),
      }[runId];
      if (!match) throw new Error(`Unknown run ${runId}.`);
      return match;
    });
  });

  test('only offers runs that have metrics', async () => {
    render(<AnalysisTemplate />);
    expect(await screen.findByLabelText('baseline')).toBeInTheDocument();
    expect(screen.getByLabelText('candidate')).toBeInTheDocument();
    expect(screen.queryByLabelText('no-metrics')).not.toBeInTheDocument();
  });

  test('compares two selected runs and draws them', async () => {
    render(<AnalysisTemplate />);
    fireEvent.click(await screen.findByLabelText('baseline'));
    fireEvent.click(screen.getByLabelText('candidate'));
    expect(await screen.findByText('0.800')).toBeInTheDocument();
    expect(screen.getByText('0.900')).toBeInTheDocument();
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });

  test('exports the comparison as CSV, SVG and LaTeX', async () => {
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    const createObjectURL = jest.fn(() => 'blob:metrics');
    const revokeObjectURL = jest.fn();
    Object.assign(URL, { createObjectURL, revokeObjectURL });

    render(<AnalysisTemplate />);
    fireEvent.click(await screen.findByLabelText('baseline'));
    fireEvent.click(screen.getByLabelText('candidate'));
    await screen.findByText('Chart');

    for (const name of ['Export CSV', 'Export SVG', 'Export LaTeX']) {
      fireEvent.click(screen.getByRole('button', { name }));
    }
    expect(click).toHaveBeenCalledTimes(3);
    expect(createObjectURL).toHaveBeenCalledTimes(3);
    expect(revokeObjectURL).toHaveBeenCalledTimes(3);

    click.mockRestore();
    delete (URL as unknown as Record<string, unknown>).createObjectURL;
    delete (URL as unknown as Record<string, unknown>).revokeObjectURL;
  });

  test('keeps exports disabled until two runs are chosen', async () => {
    render(<AnalysisTemplate />);
    await screen.findByLabelText('baseline');
    expect(screen.getByRole('button', { name: 'Export CSV' })).toBeDisabled();
  });

  test('compares nothing until a second run is selected', async () => {
    render(<AnalysisTemplate />);
    fireEvent.click(await screen.findByLabelText('baseline'));
    await waitFor(() => expect(readRun).toHaveBeenCalledWith('r_1'));
    expect(screen.queryByText('Chart')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export CSV' })).toBeDisabled();
  });

  test('explains when no run has metrics yet', async () => {
    jest.mocked(listRuns).mockResolvedValue([runs[2]]);
    render(<AnalysisTemplate />);
    expect(
      await screen.findByText('No finished run has metrics yet')
    ).toBeInTheDocument();
  });
});

describe('Compare screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(listRuns).mockResolvedValue(runs);
    jest.mocked(readRun).mockImplementation(async (runId: string) => {
      const match = {
        r_1: detail('r_1', 'baseline', 0.8),
        r_2: detail('r_2', 'candidate', 0.9),
      }[runId];
      if (!match) throw new Error(`Unknown run ${runId}.`);
      return match;
    });
  });

  test('shows the difference between two runs chosen from the URL', async () => {
    window.history.replaceState(null, '', '/compare?a=r_1,r_2');
    render(<CompareTemplate />);
    expect(await screen.findByText('auc')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('0.100')).toBeInTheDocument());
  });

  test('says a comparison needs two runs', async () => {
    jest.mocked(listRuns).mockResolvedValue([runs[0]]);
    window.history.replaceState(null, '', '/compare');
    render(<CompareTemplate />);
    expect(await screen.findByText(/Two runs are needed/)).toBeInTheDocument();
  });

  test('says nothing can be compared when neither run has metrics', async () => {
    window.history.replaceState(null, '', '/compare?a=r_1,r_2');
    jest.mocked(readRun).mockImplementation(async (runId: string) => ({
      ...detail(runId, runId, 0.8),
      metrics: null,
    }));
    render(<CompareTemplate />);
    expect(
      await screen.findByText('Neither run wrote metrics.')
    ).toBeInTheDocument();
  });

  test('reports a run that cannot be read', async () => {
    window.history.replaceState(null, '', '/compare?a=r_1,r_missing');
    render(<CompareTemplate />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unknown run r_missing.'
    );
  });
});
