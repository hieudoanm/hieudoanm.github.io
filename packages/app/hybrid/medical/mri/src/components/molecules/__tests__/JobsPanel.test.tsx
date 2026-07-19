import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { JobsPanel } from '@/components/molecules/JobsPanel';
import type { MriApi } from '@/lib/api/client';
import type { JobRecord } from '@/lib/api/types';

const job = (overrides: Partial<JobRecord> = {}): JobRecord => ({
  id: 'job://1',
  kind: 'pipeline',
  status: 'completed',
  progress: 1,
  attempts: 0,
  logsJson: JSON.stringify([
    { timestamp: 1, message: 'step 1/2: convert (dcm2niix)' },
  ]),
  inputsJson: '{}',
  outputsJson: JSON.stringify(['convert: ok']),
  error: null,
  createdAt: 1,
  startedAt: 1,
  finishedAt: 2,
  ...overrides,
});

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    listJobs: jest.fn().mockResolvedValue([job()]),
    cancelJob: jest.fn().mockResolvedValue(undefined),
    retryJob: jest.fn().mockResolvedValue(job({ status: 'queued' })),
    ...overrides,
  }) as unknown as MriApi;

describe('JobsPanel', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders job rows with status badges', async () => {
    render(<JobsPanel api={createApi()} />);
    await waitFor(() => {
      expect(screen.getByTestId('job-row')).toBeInTheDocument();
    });
    expect(screen.getByText('completed')).toBeInTheDocument();
    expect(screen.getByText('pipeline')).toBeInTheDocument();
  });

  it('shows an empty state without jobs', async () => {
    render(
      <JobsPanel
        api={createApi({ listJobs: jest.fn().mockResolvedValue([]) })}
      />
    );
    await waitFor(() => {
      expect(screen.getByText('No jobs yet.')).toBeInTheDocument();
    });
  });

  it('expands a job to reveal logs and outputs', async () => {
    render(<JobsPanel api={createApi()} />);
    await screen.findByTestId('job-row');
    fireEvent.click(screen.getByTestId(`job-toggle-job://1`));
    const detail = screen.getByTestId(`job-detail-job://1`);
    expect(detail).toHaveTextContent('convert (dcm2niix)');
    expect(detail).toHaveTextContent('convert: ok');
  });

  it('cancels a running job', async () => {
    const cancelJob = jest.fn().mockResolvedValue(undefined);
    render(
      <JobsPanel
        api={createApi({
          listJobs: jest.fn().mockResolvedValue([job({ status: 'running' })]),
          cancelJob,
        })}
      />
    );
    await screen.findByTestId('job-cancel-job://1');
    fireEvent.click(screen.getByTestId('job-cancel-job://1'));
    await waitFor(() => {
      expect(cancelJob).toHaveBeenCalledWith('job://1');
    });
  });

  it('retries a failed job and surfaces its error', async () => {
    const retryJob = jest.fn().mockResolvedValue(undefined);
    render(
      <JobsPanel
        api={createApi({
          listJobs: jest
            .fn()
            .mockResolvedValue([
              job({ status: 'failed', error: 'step convert failed' }),
            ]),
          retryJob,
        })}
      />
    );
    await screen.findByTestId('job-retry-job://1');
    expect(screen.getByText('step convert failed')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('job-retry-job://1'));
    await waitFor(() => {
      expect(retryJob).toHaveBeenCalledWith('job://1');
    });
  });

  it('reports polling errors from the backend', async () => {
    render(
      <JobsPanel
        api={createApi({
          listJobs: jest.fn().mockRejectedValue(new Error('poll boom')),
        })}
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('poll boom');
    });
  });

  it('renders malformed log payloads without crashing', async () => {
    render(
      <JobsPanel
        api={createApi({
          listJobs: jest
            .fn()
            .mockResolvedValue([
              job({ logsJson: 'not json', outputsJson: '{"a":1}' }),
            ]),
        })}
      />
    );
    await screen.findByTestId('job-row');
    fireEvent.click(screen.getByTestId(`job-toggle-job://1`));
    expect(screen.getByTestId(`job-detail-job://1`)).toHaveTextContent(
      'No log output.'
    );
  });

  it('refreshes the job list on demand', async () => {
    const listJobs = jest.fn().mockResolvedValue([]);
    render(<JobsPanel api={createApi({ listJobs })} />);
    await screen.findByText('No jobs yet.');
    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));
    await waitFor(() => {
      expect(listJobs).toHaveBeenCalledTimes(2);
    });
  });

  it('reports cancel failures from the backend', async () => {
    render(
      <JobsPanel
        api={createApi({
          listJobs: jest.fn().mockResolvedValue([job({ status: 'running' })]),
          cancelJob: jest.fn().mockRejectedValue(new Error('cancel boom')),
        })}
      />
    );
    await screen.findByTestId('job-cancel-job://1');
    fireEvent.click(screen.getByTestId('job-cancel-job://1'));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('cancel boom');
    });
  });

  it('reports retry failures from the backend', async () => {
    render(
      <JobsPanel
        api={createApi({
          listJobs: jest.fn().mockResolvedValue([job({ status: 'failed' })]),
          retryJob: jest.fn().mockRejectedValue(new Error('retry boom')),
        })}
      />
    );
    await screen.findByTestId('job-retry-job://1');
    fireEvent.click(screen.getByTestId('job-retry-job://1'));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('retry boom');
    });
  });
});
