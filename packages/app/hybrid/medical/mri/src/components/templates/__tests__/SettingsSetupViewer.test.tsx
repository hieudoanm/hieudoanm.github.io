import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SettingsTemplate } from '@/components/templates/SettingsTemplate';
import { SetupTemplate } from '@/components/templates/SetupTemplate';
import { ViewerPageTemplate } from '@/components/templates/ViewerPageTemplate';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import {
  checkSetup,
  getSettings,
  listRuns,
  pickProjectFolder,
  readRun,
  updateSettings,
} from '@/lib/ipc/api';
import type { DoctorReport, RunDetail, Settings } from '@/lib/contract/types';

jest.mock('@/lib/ipc/api', () => ({
  getSettings: jest.fn(),
  updateSettings: jest.fn(),
  pickProjectFolder: jest.fn(),
  checkSetup: jest.fn(),
  listRuns: jest.fn(),
  readRun: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/settings',
}));

const settings: Settings = {
  projectRoot: '/project',
  runsDir: 'runs',
  configDir: 'configs',
  cohortPath: 'data/participants.tsv',
  splitsPath: 'configs/splits.csv',
  lockBoxLogPath: 'configs/lockbox_access.csv',
  protocolPath: 'protocol.md',
  imagingDir: 'data/imaging',
  derivedDir: 'data/derived',
  pythonEnv: 'uv',
  lockBoxBudget: 1,
  remoteUrl: null,
};

const doctor: DoctorReport = {
  ok: false,
  command: 'uv run pipeline setup-check',
  exitCode: 1,
  rawOutput: '',
  pythonVersion: '3.12.1',
  platform: 'darwin',
  availableDevices: ['cpu'],
  recommendedDevice: 'cpu',
  dataPath: '/project/data',
  dataPathExists: true,
  requiredDependencies: [{ name: 'numpy', installed: true }],
  optionalDependencies: [{ name: 'torch', installed: false }],
  canLaunch: true,
  availableCommands: ['doctor', 'run', 'list-runs'],
};

const detail = (runId: string, name: string): RunDetail => ({
  summary: {
    runId,
    path: `/project/runs/${runId}`,
    name,
    status: 'completed',
    nMetrics: 0,
    problems: [],
  },
  manifest: null,
  config: null,
  events: [],
  metrics: null,
  artifacts: [
    {
      path: `/project/runs/${runId}/artifacts/pelvis_0.png`,
      name: 'pelvis_0.png',
      kind: 'image',
      sizeBytes: 2048,
    },
  ],
});

describe('Settings screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(getSettings).mockResolvedValue(settings);
    jest.mocked(updateSettings).mockResolvedValue(settings);
  });

  test('shows the saved project folder and the paths that depend on it', async () => {
    render(<SettingsTemplate />);
    expect(await screen.findByDisplayValue('/project')).toBeInTheDocument();
    expect(screen.getByText('data/participants.tsv')).toBeInTheDocument();
    expect(screen.getByText('configs/splits.csv')).toBeInTheDocument();
    expect(screen.getByText('protocol.md')).toBeInTheDocument();
  });

  test('saves the edited project folder', async () => {
    render(<SettingsTemplate />);
    fireEvent.change(await screen.findByDisplayValue('/project'), {
      target: { value: '/other' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(updateSettings).toHaveBeenCalled());
    expect(jest.mocked(updateSettings).mock.calls[0][0].projectRoot).toBe(
      '/other'
    );
    expect(await screen.findByText('Settings saved.')).toBeInTheDocument();
  });

  test('asks the user to save a folder chosen in the native dialog', async () => {
    jest.mocked(pickProjectFolder).mockResolvedValue('/picked/project');
    render(<SettingsTemplate />);
    await screen.findByDisplayValue('/project');
    fireEvent.click(
      screen.getByRole('button', { name: 'Choose project folder' })
    );
    expect(
      await screen.findByDisplayValue('/picked/project')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Project folder selected. Save to apply it.')
    ).toBeInTheDocument();
    expect(updateSettings).not.toHaveBeenCalled();
  });

  test('shows a rejected path as an error', async () => {
    jest
      .mocked(updateSettings)
      .mockRejectedValue(
        new Error('Path must stay inside the existing project.')
      );
    render(<SettingsTemplate />);
    await screen.findByDisplayValue('/project');
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Path must stay inside'
    );
  });

  test('runs the environment checks and reports what is missing', async () => {
    jest.mocked(checkSetup).mockResolvedValue(doctor);
    render(<SettingsTemplate />);
    await screen.findByDisplayValue('/project');
    fireEvent.click(
      screen.getByRole('button', { name: 'Run environment checks' })
    );
    expect(await screen.findByText('Environment report')).toBeInTheDocument();
    expect(screen.getByText('numpy ✓')).toBeInTheDocument();
    expect(screen.getByText('torch ✕')).toBeInTheDocument();
    expect(screen.getByText('/project/data (found)')).toBeInTheDocument();
  });

  test('offers a launch only when the pipeline lists a run command', async () => {
    jest.mocked(checkSetup).mockResolvedValue({
      ...doctor,
      ok: true,
      canLaunch: false,
      availableCommands: ['doctor', 'list-runs'],
    });
    render(<SetupTemplate />);
    expect(
      await screen.findByText(
        'This pipeline has no `run` command, so a run cannot be started from here yet.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('doctor, list-runs')).toBeInTheDocument();
  });

  test('confirms a launch is available when the pipeline lists a run command', async () => {
    jest.mocked(checkSetup).mockResolvedValue(doctor);
    render(<SetupTemplate />);
    expect(
      await screen.findByText('This build can launch a run.')
    ).toBeInTheDocument();
  });

  test('says nothing can be launched when the CLI lists no command', async () => {
    jest
      .mocked(checkSetup)
      .mockResolvedValue({
        ...doctor,
        canLaunch: false,
        availableCommands: [],
      });
    render(<SetupTemplate />);
    expect(
      await screen.findByText(
        'The CLI did not list any command, so no run can be launched.'
      )
    ).toBeInTheDocument();
  });

  test('shows an environment report without a recorded exit code', async () => {
    jest
      .mocked(checkSetup)
      .mockResolvedValue({
        ...doctor,
        exitCode: null,
        recommendedDevice: null,
        dataPath: null,
        dataPathExists: false,
      });
    render(<SettingsTemplate />);
    await screen.findByDisplayValue('/project');
    fireEvent.click(
      screen.getByRole('button', { name: 'Run environment checks' })
    );
    expect(await screen.findByText(/exit —/)).toBeInTheDocument();
    expect(screen.getByText('— (missing)')).toBeInTheDocument();
  });

  test('reports an environment report with no dependencies at all', async () => {
    jest.mocked(checkSetup).mockResolvedValue({
      ...doctor,
      availableDevices: [],
      requiredDependencies: [],
      optionalDependencies: [],
    });
    render(<SettingsTemplate />);
    await screen.findByDisplayValue('/project');
    fireEvent.click(
      screen.getByRole('button', { name: 'Run environment checks' })
    );
    expect(await screen.findAllByText('—')).not.toHaveLength(0);
  });

  test('leaves the folder empty instead of guessing one', async () => {
    jest
      .mocked(getSettings)
      .mockResolvedValue({ ...settings, projectRoot: null });
    render(<SettingsTemplate />);
    expect(
      await screen.findByPlaceholderText('Not selected')
    ).toBeInTheDocument();
  });
});

describe('Setup screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('never calls an unusable environment ready', async () => {
    jest.mocked(checkSetup).mockResolvedValue(doctor);
    render(<SetupTemplate />);
    expect(
      await screen.findByText('Fix the items below before launching a run')
    ).toBeInTheDocument();
    expect(screen.getByText('uv run pipeline setup-check')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  test('reports a usable environment plainly', async () => {
    jest.mocked(checkSetup).mockResolvedValue({ ...doctor, ok: true });
    render(<SetupTemplate />);
    expect(
      await screen.findByText('Environment looks usable')
    ).toBeInTheDocument();
  });

  test('sends the researcher to settings when checks cannot run', async () => {
    jest
      .mocked(checkSetup)
      .mockRejectedValue(new Error('No project folder selected.'));
    render(<SetupTemplate />);
    expect(
      await screen.findByText('No project folder selected.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open settings' })
    ).toBeInTheDocument();
  });
});

describe('Viewer screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('lists the images a run wrote and where they live', () => {
    render(
      <ViewerTemplate
        panels={[
          {
            runId: 'r_1',
            label: 'baseline',
            artifacts: detail('r_1', 'baseline').artifacts,
          },
        ]}
      />
    );
    expect(screen.getByText('pelvis_0.png · 2.0 KB')).toBeInTheDocument();
    expect(
      screen.getByText('/project/runs/r_1/artifacts/pelvis_0.png')
    ).toBeInTheDocument();
  });

  test('ignores artifacts that are not images', () => {
    render(
      <ViewerTemplate
        panels={[
          {
            runId: 'r_1',
            label: 'baseline',
            artifacts: [
              {
                path: '/project/runs/r_1/events.jsonl',
                name: 'events.jsonl',
                kind: 'text',
                sizeBytes: 10,
              },
            ],
          },
        ]}
      />
    );
    expect(
      screen.getByText('No run has written preview images yet')
    ).toBeInTheDocument();
  });

  test('loads panels for completed runs only', async () => {
    jest.mocked(listRuns).mockResolvedValue([
      {
        runId: 'r_1',
        path: '/p/r_1',
        name: 'done',
        status: 'completed',
        nMetrics: 0,
        problems: [],
      },
      {
        runId: 'r_2',
        path: '/p/r_2',
        name: 'running',
        status: 'running',
        nMetrics: 0,
        problems: [],
      },
    ]);
    jest.mocked(readRun).mockResolvedValue(detail('r_1', 'done'));
    render(<ViewerPageTemplate />);
    expect(
      await screen.findByText('pelvis_0.png · 2.0 KB')
    ).toBeInTheDocument();
    expect(readRun).toHaveBeenCalledTimes(1);
    expect(readRun).toHaveBeenCalledWith('r_1');
  });

  test('reports when runs cannot be listed', async () => {
    jest
      .mocked(listRuns)
      .mockRejectedValue(new Error('No project folder selected.'));
    render(<ViewerPageTemplate />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No project folder selected.'
    );
  });
});
