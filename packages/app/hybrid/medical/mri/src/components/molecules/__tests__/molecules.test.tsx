import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';

import { ArtifactList } from '@/components/molecules/ArtifactList';
import { EventTimeline } from '@/components/molecules/EventTimeline';
import { LiveRunPanel } from '@/components/molecules/LiveRunPanel';
import { RunLog } from '@/components/molecules/RunLog';
import { RigourBadge, StatusBadge } from '@/components/molecules/StatusBadge';
import {
  EVENT_LOG,
  EVENT_RUN_STATUS,
  subscribe,
  useRunLog,
} from '@/lib/ipc/events';
import type { PipelineEvent } from '@/lib/contract/types';

const listen = jest.fn();

jest.mock('@tauri-apps/api/event', () => ({
  listen: (...args: unknown[]) => listen(...args),
}));

const artifact = (name: string, kind: string) => ({
  path: `/project/runs/r_1/${name}`,
  name,
  kind,
  sizeBytes: 1024,
});

describe('Event subscription', () => {
  beforeEach(() => {
    listen.mockReset();
    listen.mockResolvedValue(() => undefined);
  });

  test('subscribes to the named Rust event', async () => {
    const stop = jest.fn();
    listen.mockResolvedValue(stop);
    const unlisten = await subscribe<string>(EVENT_LOG, () => undefined);
    expect(listen).toHaveBeenCalledWith(EVENT_LOG, expect.any(Function));
    unlisten();
  });

  test('swallows a malformed payload instead of breaking the screen', async () => {
    await subscribe<string>('workbench://log', () => {
      throw new Error('bad payload');
    });
    const handler = listen.mock.calls[0][1] as (event: {
      payload: string;
    }) => void;
    expect(() => handler({ payload: 'x' })).not.toThrow();
  });

  test('delivers only the lines of the requested run', async () => {
    const onLine = jest.fn();
    renderHook(() => useRunLog('r_1', onLine));
    await waitFor(() => expect(listen).toHaveBeenCalled());
    const handler = listen.mock.calls[0][1] as (event: {
      payload: { runId: string; line: string };
    }) => void;
    handler({ payload: { runId: 'r_2', line: 'other run' } });
    expect(onLine).not.toHaveBeenCalled();
    handler({ payload: { runId: 'r_1', line: 'train 10%' } });
    expect(onLine).toHaveBeenCalledWith(
      expect.objectContaining({ line: 'train 10%' })
    );
  });

  test('does not subscribe without a run', async () => {
    renderHook(() => useRunLog(undefined, jest.fn()));
    expect(listen).not.toHaveBeenCalled();
  });

  test('stops listening when the screen unmounts', async () => {
    const stop = jest.fn();
    listen.mockResolvedValue(stop);
    const { unmount } = renderHook(() => useRunLog('r_1', jest.fn()));
    await waitFor(() => expect(listen).toHaveBeenCalled());
    await act(async () => {
      unmount();
    });
    expect(stop).toHaveBeenCalled();
  });

  test('listens to run status changes', async () => {
    const onStatus = jest.fn();
    renderHook(() => {
      const { useRunStatus } =
        jest.requireActual<typeof import('@/lib/ipc/events')>(
          '@/lib/ipc/events'
        );
      return useRunStatus(onStatus);
    });
    await waitFor(() =>
      expect(listen).toHaveBeenCalledWith(
        EVENT_RUN_STATUS,
        expect.any(Function)
      )
    );
  });
});

describe('Run status badges', () => {
  test('never labels an incomplete run as complete', () => {
    render(
      <>
        <StatusBadge status="running" />
        <StatusBadge status="failed" />
        <StatusBadge status="unsupported" />
        <RigourBadge status="unknown" />
        <RigourBadge status="warn" />
      </>
    );
    expect(screen.getByText('running')).toBeInTheDocument();
    expect(screen.getByText('failed')).toBeInTheDocument();
    expect(screen.getByText('unsupported')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
    expect(screen.getByText('warn')).toBeInTheDocument();
  });
});

describe('Event timeline', () => {
  test('shows each stage with its duration when present', () => {
    const events: PipelineEvent[] = [
      { type: 'stage_start', timestamp: '2026-10-05T10:00:00', stage: 'train' },
      {
        type: 'stage_end',
        timestamp: '2026-10-05T10:30:00',
        stage: 'train',
        status: 'ok',
      },
      {
        type: 'error',
        timestamp: '2026-10-05T10:30:01',
        stage: 'eval',
        message: 'missing b=0 volume',
      },
    ];
    render(<EventTimeline events={events} />);
    expect(screen.getAllByText('train')).toHaveLength(2);
    expect(screen.getByText('ok')).toBeInTheDocument();
    expect(screen.getByText(/missing b=0 volume|error/)).toBeInTheDocument();
  });

  test('renders progress, metric and unknown event shapes verbatim', () => {
    const events = [
      {
        type: 'progress',
        timestamp: '2026-10-05T10:00:01',
        epoch: 3,
        loss: 0.21,
        fold: 1,
        seed: 42,
      },
      {
        type: 'metric',
        timestamp: '2026-10-05T10:00:02',
        name: 'auc',
        value: 0.81,
      },
      {
        type: 'heartbeat',
        timestamp: '2026-10-05T10:00:03',
        note: 'kept as-is',
      },
    ] as unknown as PipelineEvent[];
    render(<EventTimeline events={events} />);
    expect(
      screen.getByText('epoch 3 · loss 0.21 · fold 1 · seed 42')
    ).toBeInTheDocument();
    expect(screen.getByText('auc = 0.81')).toBeInTheDocument();
    expect(screen.getByText('note kept as-is')).toBeInTheDocument();
  });

  test('says how many older events were dropped', () => {
    const events = Array.from({ length: 405 }, (_, index) => ({
      type: 'stage_start',
      timestamp: `2026-10-05T10:00:${String(index % 60).padStart(2, '0')}`,
      stage: `stage-${index}`,
    })) as unknown as PipelineEvent[];
    render(<EventTimeline events={events} />);
    expect(
      screen.getByText('Showing the last 400 of 405 events.')
    ).toBeInTheDocument();
  });

  test('says there is nothing to show for an empty run', () => {
    render(<EventTimeline events={[]} />);
    expect(screen.getByText('This run wrote no events.')).toBeInTheDocument();
  });
});

describe('Run log', () => {
  const lines = Array.from({ length: 520 }, (_, index) => ({
    line: `line ${index}`,
    stream: 'stdout' as const,
    atMs: index,
  }));

  test('keeps the most recent lines when a run is chatty', () => {
    render(<RunLog lines={lines} />);
    expect(screen.getByText(/line 519/)).toBeInTheDocument();
    expect(screen.queryByText(/line 0$/)).not.toBeInTheDocument();
  });

  test('marks stderr so a warning is not read as normal output', () => {
    render(
      <RunLog
        lines={[
          { line: 'warning: low b-value count', stream: 'stderr', atMs: 1 },
        ]}
      />
    );
    expect(screen.getByText(/warning: low b-value count/)).toBeInTheDocument();
  });

  test('states that no output was captured yet', () => {
    render(<RunLog lines={[]} />);
    expect(screen.getByText('No output yet.')).toBeInTheDocument();
  });
});

describe('Artifact list', () => {
  test('lists each artifact with its size', () => {
    render(
      <ArtifactList
        artifacts={[
          artifact('events.jsonl', 'text'),
          artifact('pelvis_0.png', 'image'),
        ]}
      />
    );
    expect(screen.getByText('events.jsonl')).toBeInTheDocument();
    expect(screen.getAllByText('1.0 KB')).toHaveLength(2);
  });

  test('says the run wrote nothing', () => {
    render(<ArtifactList artifacts={[]} />);
    expect(
      screen.getByText('This run wrote no artifacts.')
    ).toBeInTheDocument();
  });
});

describe('Live run panel', () => {
  beforeEach(() => {
    listen.mockReset();
    listen.mockResolvedValue(() => undefined);
  });

  const run = (status: string) =>
    ({
      runId: 'r_1',
      path: '/p/r_1',
      status,
      nMetrics: 0,
      problems: [],
    }) as never;

  test('streams log lines while the run is going', async () => {
    const { rerender } = render(<LiveRunPanel run={run('running')} />);
    expect(screen.getByText('No output yet.')).toBeInTheDocument();
    const handler = await waitFor(() => {
      const call = listen.mock.calls.at(-1);
      if (!call) throw new Error('the panel has not subscribed yet');
      return call[1] as (event: { payload: unknown }) => void;
    });
    await act(async () => {
      handler({
        payload: {
          runId: 'r_1',
          line: 'epoch 1 loss 0.42',
          stream: 'stdout',
          atMs: 1,
        },
      });
    });
    expect(screen.getByText(/epoch 1 loss 0\.42/)).toBeInTheDocument();
    rerender(<LiveRunPanel run={run('completed')} />);
  });

  test('points a finished run at its own page instead of streaming', () => {
    render(<LiveRunPanel run={run('failed')} />);
    expect(screen.getByText(/This run is failed/)).toBeInTheDocument();
  });
});
