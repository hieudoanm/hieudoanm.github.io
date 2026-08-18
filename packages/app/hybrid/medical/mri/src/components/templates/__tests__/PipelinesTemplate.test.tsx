import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PipelinesTemplate } from '@/components/templates/PipelinesTemplate';
import type { MriApi } from '@/lib/api/client';
import type { PipelineRow } from '@/lib/api/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

const pipeline: PipelineRow = {
  id: 'pipeline://p1',
  name: 'Convert DICOM',
  version: 2,
  definitionJson:
    '{"name":"Convert DICOM","steps":[{"id":"convert","tool":"dcm2niix","args":["-z","y"]}]}',
  createdAt: 1,
};

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    listPipelines: jest.fn().mockResolvedValue([pipeline]),
    listDatasets: jest.fn().mockResolvedValue([]),
    createPipeline: jest.fn().mockResolvedValue(pipeline),
    deletePipeline: jest.fn().mockResolvedValue(undefined),
    runPipeline: jest.fn().mockResolvedValue({
      id: 'job://1',
      kind: 'pipeline',
      status: 'queued',
      progress: 0,
      attempts: 0,
      logsJson: '[]',
      inputsJson: '{}',
      outputsJson: '[]',
      error: null,
      createdAt: 1,
      startedAt: null,
      finishedAt: null,
    }),
    listJobs: jest.fn().mockResolvedValue([]),
    cancelJob: jest.fn(),
    retryJob: jest.fn(),
    ...overrides,
  }) as unknown as MriApi;

describe('PipelinesTemplate', () => {
  it('lists saved pipelines with their versions', async () => {
    render(<PipelinesTemplate api={createApi()} />);
    await screen.findByText('Convert DICOM');
    expect(screen.getByText('v2')).toBeInTheDocument();
  });

  it('shows an empty state without pipelines', async () => {
    render(
      <PipelinesTemplate
        api={createApi({ listPipelines: jest.fn().mockResolvedValue([]) })}
      />
    );
    await screen.findByText('No pipelines yet.');
  });

  it('creates a pipeline from the form', async () => {
    const createPipeline = jest.fn().mockResolvedValue(pipeline);
    render(<PipelinesTemplate api={createApi({ createPipeline })} />);
    await screen.findByTestId('pipeline-form');
    fireEvent.change(screen.getByTestId('pipeline-name'), {
      target: { value: 'My pipeline' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save pipeline/i }));
    await waitFor(() => {
      expect(createPipeline).toHaveBeenCalledWith(
        expect.stringContaining('"name":"My pipeline"')
      );
    });
  });

  it('rejects invalid steps JSON without calling the backend', async () => {
    const createPipeline = jest.fn();
    render(<PipelinesTemplate api={createApi({ createPipeline })} />);
    await screen.findByTestId('pipeline-form');
    fireEvent.change(screen.getByTestId('pipeline-steps'), {
      target: { value: 'not json' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save pipeline/i }));
    await waitFor(() => {
      expect(screen.getByText('Steps must be valid JSON.')).toBeInTheDocument();
    });
    expect(createPipeline).not.toHaveBeenCalled();
  });

  it('runs a pipeline against the selected dataset', async () => {
    const runPipeline = jest.fn().mockResolvedValue(undefined);
    render(
      <PipelinesTemplate
        api={createApi({
          runPipeline,
          listDatasets: jest.fn().mockResolvedValue([
            {
              id: 'dataset://1',
              name: 'Study A',
              description: '',
              sourcePath: '',
              path: '',
              createdAt: 1,
              updatedAt: 1,
            },
          ]),
        })}
      />
    );
    await screen.findByTestId(`pipeline-run-${pipeline.id}`);
    fireEvent.change(screen.getByTestId('run-dataset'), {
      target: { value: 'dataset://1' },
    });
    fireEvent.click(screen.getByTestId(`pipeline-run-${pipeline.id}`));
    await waitFor(() => {
      expect(runPipeline).toHaveBeenCalledWith('pipeline://p1', 'dataset://1');
    });
  });

  it('deletes a pipeline', async () => {
    const deletePipeline = jest.fn().mockResolvedValue(undefined);
    render(<PipelinesTemplate api={createApi({ deletePipeline })} />);
    await screen.findByTestId(`pipeline-delete-${pipeline.id}`);
    fireEvent.click(screen.getByTestId(`pipeline-delete-${pipeline.id}`));
    await waitFor(() => {
      expect(deletePipeline).toHaveBeenCalledWith('pipeline://p1');
    });
  });

  it('reports backend errors', async () => {
    render(
      <PipelinesTemplate
        api={createApi({
          runPipeline: jest.fn().mockRejectedValue(new Error('run boom')),
        })}
      />
    );
    await screen.findByTestId(`pipeline-run-${pipeline.id}`);
    fireEvent.click(screen.getByTestId(`pipeline-run-${pipeline.id}`));
    await waitFor(() => {
      expect(screen.getByText('run boom')).toBeInTheDocument();
    });
  });
});
