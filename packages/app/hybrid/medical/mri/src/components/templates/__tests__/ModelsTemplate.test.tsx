import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ModelsTemplate } from '@/components/templates/ModelsTemplate';
import type { MriApi } from '@/lib/api/client';
import type { ModelRecord } from '@/lib/api/types';

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

const model: ModelRecord = {
  id: 'model://m1',
  name: 'brain-seg',
  version: '1.0',
  task: 'segmentation',
  runtime: 'python',
  source: '/models/brain_seg.py',
  license: 'MIT',
  inputJson: '{}',
  outputJson: '{}',
  createdAt: 1,
};

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    listModels: jest.fn().mockResolvedValue([model]),
    listDatasets: jest.fn().mockResolvedValue([]),
    registerModel: jest.fn().mockResolvedValue(model),
    deleteModel: jest.fn().mockResolvedValue(undefined),
    isRuntimeAvailable: jest.fn().mockResolvedValue(true),
    runModel: jest.fn().mockResolvedValue({
      id: 'job://1',
      kind: 'model',
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

describe('ModelsTemplate', () => {
  it('lists registered models with runtime availability badges', async () => {
    render(<ModelsTemplate api={createApi()} />);
    await screen.findByText('brain-seg');
    expect(screen.getByText('v1.0')).toBeInTheDocument();
    expect(screen.getByTestId('runtime-python')).toBeInTheDocument();
    expect(screen.getByTestId('runtime-docker')).toBeInTheDocument();
  });

  it('shows an empty state without models', async () => {
    render(
      <ModelsTemplate
        api={createApi({ listModels: jest.fn().mockResolvedValue([]) })}
      />
    );
    await screen.findByText('No models yet.');
  });

  it('registers a model from the form', async () => {
    const registerModel = jest.fn().mockResolvedValue(model);
    render(<ModelsTemplate api={createApi({ registerModel })} />);
    await screen.findByTestId('model-form');
    fireEvent.change(screen.getByTestId('model-name'), {
      target: { value: 't1-map' },
    });
    fireEvent.change(screen.getByTestId('model-source'), {
      target: { value: '/models/t1_map.py' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register model/i }));
    await waitFor(() => {
      expect(registerModel).toHaveBeenCalledWith(
        expect.stringContaining('"name":"t1-map"')
      );
    });
    const payload = JSON.parse(registerModel.mock.calls[0][0] as string);
    expect(payload.runtime).toBe('python');
    expect(payload.task).toBe('segmentation');
  });

  it('runs a model with the selected dataset and input reference', async () => {
    const runModel = jest.fn().mockResolvedValue(undefined);
    render(<ModelsTemplate api={createApi({ runModel })} />);
    await screen.findByTestId(`model-run-${model.id}`);
    fireEvent.change(screen.getByTestId('run-input-ref'), {
      target: { value: 'series://1/s1' },
    });
    fireEvent.click(screen.getByTestId(`model-run-${model.id}`));
    await waitFor(() => {
      expect(runModel).toHaveBeenCalledWith(
        'model://m1',
        undefined,
        'series://1/s1'
      );
    });
  });

  it('deletes a model', async () => {
    const deleteModel = jest.fn().mockResolvedValue(undefined);
    render(<ModelsTemplate api={createApi({ deleteModel })} />);
    await screen.findByTestId(`model-delete-${model.id}`);
    fireEvent.click(screen.getByTestId(`model-delete-${model.id}`));
    await waitFor(() => {
      expect(deleteModel).toHaveBeenCalledWith('model://m1');
    });
  });

  it('reports backend errors', async () => {
    render(
      <ModelsTemplate
        api={createApi({
          runModel: jest.fn().mockRejectedValue(new Error('run boom')),
        })}
      />
    );
    await screen.findByTestId(`model-run-${model.id}`);
    fireEvent.click(screen.getByTestId(`model-run-${model.id}`));
    await waitFor(() => {
      expect(screen.getByText('run boom')).toBeInTheDocument();
    });
  });

  it('reports load errors from the backend', async () => {
    render(
      <ModelsTemplate
        api={createApi({
          listModels: jest.fn().mockRejectedValue(new Error('load boom')),
        })}
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('load boom');
    });
  });

  it('reports registration errors from the backend', async () => {
    render(
      <ModelsTemplate
        api={createApi({
          registerModel: jest
            .fn()
            .mockRejectedValue(new Error('register boom')),
        })}
      />
    );
    await screen.findByTestId('model-form');
    fireEvent.click(screen.getByRole('button', { name: /register model/i }));
    await waitFor(() => {
      expect(screen.getByText('register boom')).toBeInTheDocument();
    });
  });

  it('reports delete errors from the backend', async () => {
    render(
      <ModelsTemplate
        api={createApi({
          deleteModel: jest.fn().mockRejectedValue(new Error('delete boom')),
        })}
      />
    );
    await screen.findByTestId(`model-delete-${model.id}`);
    fireEvent.click(screen.getByTestId(`model-delete-${model.id}`));
    await waitFor(() => {
      expect(screen.getByText('delete boom')).toBeInTheDocument();
    });
  });

  it('captures task, runtime, and license selections', async () => {
    const registerModel = jest.fn().mockResolvedValue(model);
    render(<ModelsTemplate api={createApi({ registerModel })} />);
    await screen.findByTestId('model-form');
    fireEvent.change(screen.getByTestId('model-name'), {
      target: { value: 'super-res' },
    });
    fireEvent.change(screen.getByTestId('model-task'), {
      target: { value: 'super-resolution' },
    });
    fireEvent.change(screen.getByTestId('model-runtime'), {
      target: { value: 'docker' },
    });
    fireEvent.change(screen.getByTestId('model-source'), {
      target: { value: 'org/super-res:2.0' },
    });
    fireEvent.change(screen.getByTestId('model-license'), {
      target: { value: 'Apache-2.0' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register model/i }));
    await waitFor(() => {
      expect(registerModel).toHaveBeenCalled();
    });
    const payload = JSON.parse(registerModel.mock.calls[0][0] as string);
    expect(payload).toMatchObject({
      task: 'super-resolution',
      runtime: 'docker',
      source: 'org/super-res:2.0',
      license: 'Apache-2.0',
    });
  });
});
