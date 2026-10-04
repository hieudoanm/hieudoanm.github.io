import { render, screen, waitFor } from '@testing-library/react';

import { RunsTemplate } from '@/components/templates/RunsTemplate';
import { listRuns } from '@/lib/ipc/api';

jest.mock('@/lib/ipc/api', () => ({
  listRuns: jest.fn(),
  readRun: jest.fn(),
  cancelRun: jest.fn(),
  getSettings: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/runs',
}));

const mockedListRuns = jest.mocked(listRuns);

const runs = [
  {
    runId: 'r_20261005_120000_1',
    path: '/project/runs/r_20261005_120000_1',
    name: 'baseline',
    status: 'completed' as const,
    nMetrics: 5,
    modelType: 'logistic_regression',
    startedAt: '2026-10-05T10:00:00Z',
    problems: [],
  },
  {
    runId: 'r_20261006_090000_2',
    path: '/project/runs/r_20261006_090000_2',
    name: 'candidate',
    status: 'failed' as const,
    nMetrics: 0,
    modelType: 'resnet18',
    startedAt: '2026-10-06T09:00:00Z',
    problems: [
      { kind: 'error', message: 'stage train failed', blocking: true },
    ],
  },
];

describe('Runs screen', () => {
  beforeEach(() => {
    mockedListRuns.mockReset();
    window.history.replaceState(null, '', '/runs');
  });

  test('lists the runs the project contains', async () => {
    mockedListRuns.mockResolvedValue(runs);
    render(<RunsTemplate />);
    expect(await screen.findByText('baseline')).toBeInTheDocument();
    expect(screen.getByText('candidate')).toBeInTheDocument();
    expect(screen.getByText('2 of 2 runs')).toBeInTheDocument();
  });

  test('filters by status and keeps the filter in the URL', async () => {
    mockedListRuns.mockResolvedValue(runs);
    render(<RunsTemplate />);
    const select = await screen.findByRole('combobox', { name: /status/i });
    await waitFor(() => expect(select).toBeInTheDocument());
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(select, { target: { value: 'failed' } });
    expect(await screen.findByText('1 of 2 runs')).toBeInTheDocument();
    expect(window.location.search).toContain('filters');
  });

  test('explains an empty list instead of showing a blank table', async () => {
    mockedListRuns.mockResolvedValue([]);
    render(<RunsTemplate />);
    expect(await screen.findByText('0 of 0 runs')).toBeInTheDocument();
    expect(
      screen.getByText('No run matches these filters.')
    ).toBeInTheDocument();
  });

  test('shows a readable error when the project is not configured', async () => {
    mockedListRuns.mockRejectedValue(new Error('No project folder selected.'));
    render(<RunsTemplate />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No project folder selected.'
    );
  });
});
