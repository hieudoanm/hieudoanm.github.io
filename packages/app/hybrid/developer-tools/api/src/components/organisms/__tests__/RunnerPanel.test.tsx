import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { RunnerPanel } from '@/components/organisms/RunnerPanel';
import { executeRequest, emptyRequest } from '@/lib/http';
import { readTextFile, downloadFile } from '@/lib/request-file';
import { RequestCollection, ResponseMeta } from '@/types/api-client';

jest.mock('@/lib/http', () => ({
  executeRequest: jest.fn(),
  emptyRequest: jest.requireActual('@/lib/http').emptyRequest,
}));

jest.mock('@/lib/request-file', () => ({
  readTextFile: jest.fn(),
  downloadFile: jest.fn(),
}));

const mockExecuteRequest = executeRequest as jest.Mock;
const mockReadTextFile = readTextFile as jest.Mock;
const mockDownloadFile = downloadFile as jest.Mock;

const collections: RequestCollection[] = [
  {
    id: 'c1',
    name: 'Users API',
    groups: [
      {
        id: 'g1',
        name: 'Users',
        entries: [
          {
            id: 'e1',
            name: 'List users',
            request: {
              ...emptyRequest(),
              method: 'GET',
              url: 'https://api.example.com/users',
              params: [],
              headers: [],
              body: '',
              authType: 'none',
              token: '',
              username: '',
              password: '',
            },
          },
        ],
      },
    ],
  },
];

const meta = (overrides: Partial<ResponseMeta> = {}): ResponseMeta => ({
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: {},
  body: '{"ok":true}',
  timeMs: 6,
  sizeBytes: 11,
  ...overrides,
});

const renderPanel = (): void => {
  render(<RunnerPanel collections={collections} env={[]} cookies={[]} />);
};

describe('RunnerPanel', () => {
  beforeEach(() => {
    mockExecuteRequest.mockReset();
    mockReadTextFile.mockReset();
    mockDownloadFile.mockReset();
    URL.createObjectURL = jest.fn(() => 'blob:mock');
    URL.revokeObjectURL = jest.fn();
  });

  it('renders the run form with the collection options', () => {
    renderPanel();
    expect(screen.getByLabelText('Run collection')).toBeInTheDocument();
    expect(screen.getByText('Users API')).toBeInTheDocument();
    expect(screen.getByLabelText('Run collection')).toHaveValue('c1');
  });

  it('runs the collection and shows the summary and results', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    renderPanel();
    fireEvent.click(screen.getByLabelText('Run collection'));
    fireEvent.click(screen.getByText('Run'));

    expect(await screen.findByText('1/1 passed')).toBeInTheDocument();
    expect(screen.getByText('0 failed')).toBeInTheDocument();
    expect(screen.getByText(/List users/)).toBeInTheDocument();
  });

  it('runs data-driven iterations from pasted CSV rows', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    renderPanel();
    fireEvent.change(screen.getByLabelText('Data source'), {
      target: { value: 'csv' },
    });
    fireEvent.change(screen.getByLabelText('Data rows'), {
      target: { value: 'name\nAlice\nBob' },
    });
    expect(screen.getByText('2 rows')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Run'));

    expect(await screen.findByText('2/2 passed')).toBeInTheDocument();
    expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
  });

  it('blocks a run when the selected collection is missing', async () => {
    renderPanel();
    fireEvent.change(screen.getByLabelText('Run collection'), {
      target: { value: 'missing' },
    });
    fireEvent.click(screen.getByText('Run'));

    expect(
      await screen.findByText('Select a collection to run')
    ).toBeInTheDocument();
    expect(mockExecuteRequest).not.toHaveBeenCalled();
  });

  it('exports the run report as JSON and HTML', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    renderPanel();
    fireEvent.click(screen.getByText('Run'));
    await screen.findByText('1/1 passed');

    fireEvent.click(screen.getByLabelText('Export JSON report'));
    expect(mockDownloadFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringMatching(/^run-.*\.json$/),
      'application/json'
    );

    fireEvent.click(screen.getByLabelText('Export HTML report'));
    expect(mockDownloadFile).toHaveBeenLastCalledWith(
      expect.stringContaining('<!doctype html>'),
      expect.stringMatching(/\.html$/),
      'text/html'
    );
  });

  it('adds a monitor and lets it be toggled on and off', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    renderPanel();
    fireEvent.change(screen.getByLabelText('Monitor name'), {
      target: { value: 'Nightly' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Nightly')).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Toggle monitor Nightly'));
    await waitFor(() =>
      expect(screen.getByText('Running')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByLabelText('Toggle monitor Nightly'));
    await waitFor(() =>
      expect(screen.getByText('Stopped')).toBeInTheDocument()
    );
  });

  it('shows a FAIL badge and the failure summary on network errors', async () => {
    mockExecuteRequest.mockRejectedValue(new Error('ECONNREFUSED'));
    renderPanel();
    fireEvent.click(screen.getByText('Run'));

    expect(await screen.findByText('FAIL')).toBeInTheDocument();
    expect(screen.getByText('0/1 passed')).toBeInTheDocument();
    expect(screen.getByText('1 failed')).toBeInTheDocument();
  });

  it('flags requests whose test assertions failed', async () => {
    mockExecuteRequest.mockResolvedValue(
      meta({
        testResults: [
          { id: 't1', name: 'status ok', passed: true },
          { id: 't2', name: 'has id', passed: false },
        ],
      })
    );
    renderPanel();
    fireEvent.click(screen.getByText('Run'));

    expect(await screen.findByText('1/2 passed')).toBeInTheDocument();
    expect(screen.getByText('1 tests failed')).toBeInTheDocument();
  });

  it('shows run progress while a request is in flight', async () => {
    let resolveMeta: (meta: ResponseMeta) => void = () => {};
    mockExecuteRequest.mockReturnValue(
      new Promise<ResponseMeta>((resolve) => {
        resolveMeta = resolve;
      })
    );
    renderPanel();
    fireEvent.click(screen.getByText('Run'));

    expect(
      await screen.findByRole('progressbar', { name: 'Run progress' })
    ).toBeInTheDocument();

    await act(async () => {
      resolveMeta(meta());
    });
    expect(
      screen.queryByRole('progressbar', { name: 'Run progress' })
    ).not.toBeInTheDocument();
  });

  it('uses the collection name as the default monitor name', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Users API check')).toBeInTheDocument();
  });

  it('records a monitor result after its first scheduled run', async () => {
    jest.useFakeTimers();
    mockExecuteRequest.mockResolvedValue(meta());
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    fireEvent.click(screen.getByLabelText('Toggle monitor Users API check'));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(300000);
    });

    expect(screen.getByText('1/1')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('updates run and monitor option inputs', () => {
    renderPanel();
    fireEvent.change(screen.getByLabelText('Delay between requests (ms)'), {
      target: { value: '250' },
    });
    expect(screen.getByLabelText('Delay between requests (ms)')).toHaveValue(
      250
    );
    fireEvent.click(screen.getByLabelText('Continue on failure'));
    expect(screen.getByLabelText('Continue on failure')).not.toBeChecked();
    fireEvent.change(screen.getByLabelText('Monitor interval (minutes)'), {
      target: { value: '10' },
    });
    expect(screen.getByLabelText('Monitor interval (minutes)')).toHaveValue(10);
  });

  it('loads a CSV data file and switches to CSV mode', async () => {
    mockReadTextFile.mockResolvedValue('name\nAlice\nBob');
    renderPanel();
    fireEvent.change(screen.getByLabelText('Data source'), {
      target: { value: 'none' },
    });
    fireEvent.change(screen.getByLabelText('Data source'), {
      target: { value: 'csv' },
    });
    fireEvent.change(screen.getByLabelText('Load data file'), {
      target: { files: [new File(['name\nAlice\nBob'], 'users.csv')] },
    });
    expect(await screen.findByText('2 rows')).toBeInTheDocument();
    expect(screen.getByLabelText('Data source')).toHaveValue('csv');
  });

  it('loads a JSON data file and switches to JSON mode', async () => {
    mockReadTextFile.mockResolvedValue('[{"name":"Alice"}]');
    renderPanel();
    fireEvent.change(screen.getByLabelText('Data source'), {
      target: { value: 'json' },
    });
    fireEvent.change(screen.getByLabelText('Load data file'), {
      target: { files: [new File(['[]'], 'data.json')] },
    });
    expect(await screen.findByText('1 rows')).toBeInTheDocument();
    expect(screen.getByLabelText('Data source')).toHaveValue('json');
  });

  it('clears the data text when the file cannot be read', async () => {
    mockReadTextFile.mockRejectedValue(new Error('bad'));
    renderPanel();
    fireEvent.change(screen.getByLabelText('Data source'), {
      target: { value: 'csv' },
    });
    fireEvent.change(screen.getByLabelText('Load data file'), {
      target: { files: [new File(['x'], 'users.csv')] },
    });
    await waitFor(() =>
      expect(screen.getByLabelText('Data rows')).toHaveValue('')
    );
  });

  it('removes a monitor from the list', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Users API check')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Remove monitor Users API check'));
    expect(screen.queryByText('Users API check')).not.toBeInTheDocument();
  });
});
