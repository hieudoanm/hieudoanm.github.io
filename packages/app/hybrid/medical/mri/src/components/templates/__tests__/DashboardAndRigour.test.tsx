import { render, screen } from '@testing-library/react';

import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { RigourTemplate } from '@/components/templates/RigourTemplate';
import { getOverview, readRigour } from '@/lib/ipc/api';

jest.mock('@/lib/ipc/api', () => ({
  getOverview: jest.fn(),
  readRigour: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

const overview = {
  configured: true,
  runsDir: '/project/runs',
  pythonEnv: 'uv',
  runCount: 4,
  completedCount: 3,
  failedCount: 1,
  runningCount: 0,
  unsupportedCount: 0,
  cohortParticipants: 120,
  cohortExcluded: 3,
  latestRun: {
    runId: 'r_20261005_120000_1',
    path: '/project/runs/r_20261005_120000_1',
    name: 'baseline',
    status: 'completed' as const,
    nMetrics: 5,
    modelType: 'logistic_regression',
    startedAt: '2026-10-05T10:00:00Z',
    problems: [],
  },
};

describe('Dashboard screen', () => {
  beforeEach(() => {
    jest.mocked(getOverview).mockReset();
  });

  test('states the project and run counts', async () => {
    jest.mocked(getOverview).mockResolvedValue(overview);
    render(<DashboardTemplate />);
    expect(await screen.findByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Unsupported')).toBeInTheDocument();
    expect(screen.getByText('baseline')).toBeInTheDocument();
    expect(screen.getByText('/project/runs')).toBeInTheDocument();
    expect(screen.getByText(/120 participants/)).toBeInTheDocument();
  });

  test('sends the researcher to settings when no project is chosen', async () => {
    jest.mocked(getOverview).mockResolvedValue({
      ...overview,
      configured: false,
      projectRoot: null,
      latestRun: null,
      runCount: 0,
      completedCount: 0,
    });
    render(<DashboardTemplate />);
    expect(
      await screen.findByText('No project folder is selected yet.')
    ).toBeInTheDocument();
    expect(screen.getByText('No runs yet')).toBeInTheDocument();
  });

  test('shows the failure message when the backend cannot be reached', async () => {
    jest
      .mocked(getOverview)
      .mockRejectedValue(new Error('get_overview needs the desktop app.'));
    render(<DashboardTemplate />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'needs the desktop app'
    );
  });
});

describe('Rigour screen', () => {
  beforeEach(() => {
    jest.mocked(readRigour).mockReset();
  });

  test('lists checks with their status', async () => {
    jest.mocked(readRigour).mockResolvedValue({
      checks: [
        {
          id: 'no_overlap',
          title: 'No participant in two folds',
          status: 'pass',
          detail: '4 folds, no overlap',
        },
        {
          id: 'lock_box',
          title: 'Lock-box access budget',
          status: 'warn',
          detail: '1 of 1 used',
        },
      ],
      splits: null,
      lockBox: {
        accessCount: 1,
        accesses: [{ accessNumber: 1, runId: 'r_1', purpose: 'final test' }],
      },
      lockBoxBudget: 1,
      protocolPath: '/project/protocol.md',
      protocolAvailable: true,
    });
    render(<RigourTemplate />);
    expect(
      await screen.findByText('No participant in two folds')
    ).toBeInTheDocument();
    expect(screen.getByText('Lock-box access budget')).toBeInTheDocument();
    expect(
      screen.getByText('1 access record(s) · budget 1')
    ).toBeInTheDocument();
  });

  test('never presents a missing protocol as a pass', async () => {
    jest.mocked(readRigour).mockResolvedValue({
      checks: [
        {
          id: 'protocol',
          title: 'Analysis protocol recorded',
          status: 'unknown',
          detail: 'no protocol file',
        },
      ],
      splits: null,
      lockBox: null,
      protocolPath: '/project/protocol.md',
      protocolAvailable: false,
    });
    render(<RigourTemplate />);
    expect(
      await screen.findByText('No analysis protocol in the project')
    ).toBeInTheDocument();
    expect(
      screen.getByText('No lock-box access log found.')
    ).toBeInTheDocument();
  });
});
