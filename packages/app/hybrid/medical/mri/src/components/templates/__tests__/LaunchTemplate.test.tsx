import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { LaunchTemplate } from '@/components/templates/LaunchTemplate';
import {
  cancelRun,
  getLauncherStatus,
  launchRun,
  listConfigs,
} from '@/lib/ipc/api';

jest.mock('@/lib/ipc/api', () => ({
  listConfigs: jest.fn(),
  getLauncherStatus: jest.fn(),
  launchRun: jest.fn(),
  cancelRun: jest.fn(),
}));

const configs = [
  {
    path: '/project/configs/full.yaml',
    name: 'full.yaml',
    config: {
      schemaVersion: '0.1.0',
      dataset: 'ploras',
      nFolds: 6,
      modelType: 'resnet18',
      device: 'cuda',
    },
    raw: {
      schema_version: '0.1.0',
      split: { n_folds: 6 },
      data: { dataset: 'ploras', participants_tsv: 'data/subjects.tsv' },
      model: { model_type: 'resnet18' },
      run: { device: 'cuda', run_id: 'locked' },
    },
  },
];

describe('Launch screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(listConfigs).mockResolvedValue(configs);
    jest
      .mocked(getLauncherStatus)
      .mockResolvedValue({ active: null, queued: [] });
    jest.mocked(launchRun).mockResolvedValue({
      runId: 'r_20261005_120000_1',
      status: 'running',
      command: 'pipeline run --config ...',
      configPath: 'configs/launched/r_20261005_120000_1.yaml',
    });
  });

  test('builds the form from the pipeline schema', async () => {
    render(<LaunchTemplate />);
    expect(await screen.findByText('N Folds')).toBeInTheDocument();
    expect(screen.getByText('Model Type')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /N Folds/i })).toHaveValue(4);
  });

  test('applies a config file chosen from the project', async () => {
    render(<LaunchTemplate />);
    await screen.findByRole('option', { name: 'full.yaml' });
    const select = screen.getByRole('combobox', { name: /Start from/i });
    fireEvent.change(select, { target: { value: 'full.yaml' } });
    await waitFor(() =>
      expect(screen.getByRole('spinbutton', { name: /N Folds/i })).toHaveValue(
        6
      )
    );
    expect(screen.getByRole('combobox', { name: /Dataset/i })).toHaveValue(
      'ploras'
    );
  });

  test('keeps config fields this build does not display', async () => {
    render(<LaunchTemplate />);
    await screen.findByRole('option', { name: 'full.yaml' });
    fireEvent.change(screen.getByRole('combobox', { name: /Start from/i }), {
      target: { value: 'full.yaml' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Start run/i }));
    await waitFor(() => expect(launchRun).toHaveBeenCalled());
    const config = jest.mocked(launchRun).mock.calls[0][0];
    expect(config.run?.run_id).toBe('locked');
    expect(config.data?.participants_tsv).toBe('data/subjects.tsv');
    expect(config.split?.n_folds).toBe(6);
  });

  test('refuses to start a run with an out-of-range value', async () => {
    render(<LaunchTemplate />);
    const folds = await screen.findByRole('spinbutton', { name: /N Folds/i });
    fireEvent.change(folds, { target: { value: '99' } });
    fireEvent.click(screen.getByRole('button', { name: /Start run/i }));
    expect(await screen.findByText(/must be at most 10/)).toBeInTheDocument();
    expect(launchRun).not.toHaveBeenCalled();
  });

  test('hands a complete config object to Rust', async () => {
    render(<LaunchTemplate />);
    const device = await screen.findByRole('textbox', { name: /Device/i });
    fireEvent.change(device, { target: { value: 'cpu' } });
    fireEvent.click(screen.getByRole('button', { name: /Start run/i }));
    await waitFor(() => expect(launchRun).toHaveBeenCalled());
    const config = jest.mocked(launchRun).mock.calls[0][0];
    expect(config.schema_version).toBe('0.1.0');
    expect(config.run?.device).toBe('cpu');
    expect(config.split?.n_folds).toBe(4);
  });

  test('shows the active run and can cancel it', async () => {
    jest.mocked(getLauncherStatus).mockResolvedValue({
      active: {
        runId: 'r_live',
        command: 'pipeline run --config configs/launched/r_live.yaml',
        configPath: 'configs/launched/r_live.yaml',
        device: 'cpu',
        status: 'running',
        pid: 4321,
        startedAtMs: 1,
        finishedAtMs: null,
        exitCode: null,
      },
      queued: [],
    });
    render(<LaunchTemplate />);
    expect(await screen.findByText(/pid 4321/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(cancelRun).toHaveBeenCalledWith('r_live');
  });

  test('resets the form to pipeline defaults', async () => {
    render(<LaunchTemplate />);
    const folds = await screen.findByRole('spinbutton', { name: /N Folds/i });
    fireEvent.change(folds, { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: /Reset to defaults/i }));
    await waitFor(() =>
      expect(screen.getByRole('spinbutton', { name: /N Folds/i })).toHaveValue(
        4
      )
    );
  });

  test('reports a missing project folder', async () => {
    jest
      .mocked(listConfigs)
      .mockRejectedValue(new Error('No project folder selected.'));
    render(<LaunchTemplate />);
    expect(
      await screen.findByText('No project folder is selected yet.')
    ).toBeInTheDocument();
  });
});
