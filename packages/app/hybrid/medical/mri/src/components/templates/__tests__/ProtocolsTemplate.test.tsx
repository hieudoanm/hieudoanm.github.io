import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  ProtocolsTemplate,
  ProtocolReportView,
} from '@/components/templates/ProtocolsTemplate';
import type { MriApi } from '@/lib/api/client';
import type { Dataset, ProtocolReport, ProtocolRow } from '@/lib/api/types';

const dataset: Dataset = {
  id: 'dataset://a',
  name: 'Study A',
  description: '',
  sourcePath: '/tmp/a',
  path: '/tmp/a',
  createdAt: 1,
  updatedAt: 1,
};

const protocol: ProtocolRow = {
  id: 'protocol://p1',
  name: 'Brain MRI Research Protocol',
  definitionJson: '{"name":"Brain MRI Research Protocol","required":["T1"]}',
  createdAt: 1,
};

const report: ProtocolReport = {
  protocolName: 'Brain MRI Research Protocol',
  satisfied: ['T1'],
  missing: ['FLAIR'],
  violations: [
    {
      contrast: 'T1',
      constraint: 'max_voxel_mm <= 1.5',
      detail: 'largest voxel dimension is 2.00mm',
    },
  ],
  passed: false,
};

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    listProtocols: jest.fn().mockResolvedValue([protocol]),
    listDatasets: jest.fn().mockResolvedValue([dataset]),
    createProtocol: jest.fn().mockResolvedValue(protocol),
    deleteProtocol: jest.fn().mockResolvedValue(undefined),
    validateDataset: jest.fn().mockResolvedValue(report),
    ...overrides,
  }) as unknown as MriApi;

describe('ProtocolsTemplate', () => {
  it('lists saved protocols and datasets', async () => {
    render(<ProtocolsTemplate api={createApi()} />);
    await waitFor(() => {
      expect(
        screen.getByText('Brain MRI Research Protocol')
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId('validate-dataset')).toBeInTheDocument();
  });

  it('creates a protocol from the form', async () => {
    const api = createApi();
    render(<ProtocolsTemplate api={api} />);
    await waitFor(() => screen.getByTestId('protocol-name'));
    fireEvent.change(screen.getByTestId('protocol-name'), {
      target: { value: 'My Protocol' },
    });
    fireEvent.change(screen.getByTestId('protocol-max-voxel'), {
      target: { value: '1.5' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create protocol/i }));
    await waitFor(() => {
      expect(api.createProtocol).toHaveBeenCalledWith(
        expect.stringContaining('"name":"My Protocol"')
      );
    });
    expect(api.createProtocol).toHaveBeenCalledWith(
      expect.stringContaining('"maxVoxelMm":1.5')
    );
  });

  it('selects a dataset through the dropdown', async () => {
    const api = createApi();
    render(<ProtocolsTemplate api={api} />);
    await waitFor(() => screen.getByTestId('validate-dataset'));
    fireEvent.change(screen.getByTestId('validate-dataset'), {
      target: { value: 'dataset://a' },
    });
    expect(
      (screen.getByTestId('validate-dataset') as HTMLSelectElement).value
    ).toBe('dataset://a');
  });

  it('validates a dataset and shows the report', async () => {
    const api = createApi();
    render(<ProtocolsTemplate api={api} initialDatasetId="dataset://a" />);
    await waitFor(() => {
      expect(
        (screen.getByTestId('validate-dataset') as HTMLSelectElement).value
      ).toBe('dataset://a');
    });
    fireEvent.click(screen.getByRole('button', { name: /validate/i }));
    await waitFor(() => {
      expect(screen.getByTestId('protocol-report')).toBeInTheDocument();
    });
    expect(screen.getByText(/Missing: FLAIR/)).toBeInTheDocument();
    expect(screen.getByText(/largest voxel dimension/)).toBeInTheDocument();
  });

  it('deletes a protocol', async () => {
    const api = createApi();
    render(<ProtocolsTemplate api={api} />);
    await waitFor(() => screen.getByText('Brain MRI Research Protocol'));
    fireEvent.click(screen.getByRole('button', { name: '' }));
    await waitFor(() => {
      expect(api.deleteProtocol).toHaveBeenCalledWith('protocol://p1');
    });
  });

  it('surfaces backend errors', async () => {
    render(
      <ProtocolsTemplate
        api={createApi({
          listProtocols: jest.fn().mockRejectedValue(new Error('nope')),
        })}
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('nope');
    });
  });

  it('reports create failures', async () => {
    const api = createApi({
      createProtocol: jest.fn().mockRejectedValue(new Error('invalid json')),
    });
    render(<ProtocolsTemplate api={api} />);
    await waitFor(() => screen.getByTestId('protocol-name'));
    fireEvent.change(screen.getByTestId('protocol-name'), {
      target: { value: 'Broken' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create protocol/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('invalid json');
    });
  });

  it('reports delete failures', async () => {
    const api = createApi({
      deleteProtocol: jest
        .fn()
        .mockRejectedValue(new Error('still referenced')),
    });
    render(<ProtocolsTemplate api={api} />);
    await waitFor(() => screen.getByText('Brain MRI Research Protocol'));
    fireEvent.click(screen.getByRole('button', { name: '' }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('still referenced');
    });
  });

  it('reports validation failures', async () => {
    const api = createApi({
      validateDataset: jest
        .fn()
        .mockRejectedValue(new Error('unknown protocol')),
    });
    render(<ProtocolsTemplate api={api} initialDatasetId="dataset://a" />);
    await waitFor(() => {
      expect(
        (screen.getByTestId('validate-dataset') as HTMLSelectElement).value
      ).toBe('dataset://a');
    });
    fireEvent.click(screen.getByRole('button', { name: /validate/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('unknown protocol');
    });
  });

  it('omits constraints without a T1 voxel limit', async () => {
    const api = createApi();
    render(<ProtocolsTemplate api={api} />);
    await waitFor(() => screen.getByTestId('protocol-name'));
    fireEvent.change(screen.getByTestId('protocol-name'), {
      target: { value: 'Simple' },
    });
    fireEvent.change(screen.getByTestId('protocol-required'), {
      target: { value: 'DWI' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create protocol/i }));
    await waitFor(() => {
      expect(api.createProtocol).toHaveBeenCalledWith(
        expect.stringContaining('"constraints":{}')
      );
    });
  });

  it('shows the empty protocol state', async () => {
    render(
      <ProtocolsTemplate
        api={createApi({ listProtocols: jest.fn().mockResolvedValue([]) })}
      />
    );
    await waitFor(() => {
      expect(screen.getByText('No protocols yet.')).toBeInTheDocument();
    });
  });

  it('keeps validation disabled without a dataset or protocols', async () => {
    render(
      <ProtocolsTemplate
        api={createApi({
          listProtocols: jest.fn().mockResolvedValue([]),
          listDatasets: jest.fn().mockResolvedValue([]),
        })}
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /validate/i })).toBeDisabled();
    });
  });
});

describe('ProtocolReportView', () => {
  it('marks passing protocols as success', () => {
    render(
      <ProtocolReportView
        report={{ ...report, missing: [], violations: [], passed: true }}
      />
    );
    expect(screen.getByText('passed')).toBeInTheDocument();
  });
});
