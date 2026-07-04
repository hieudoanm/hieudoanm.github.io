import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { DOIModal } from '../index';

const mockGetId = jest.fn();
const mockGetWork = jest.fn();

jest.mock('@api/ts', () => ({
  getId: (...args: unknown[]) => mockGetId(...args),
  getWork: (...args: unknown[]) => mockGetWork(...args),
}));

const mockReference = {
  id: '10.1016/j.smrv.2009.04.001',
  authors: [
    { given: 'John', family: 'Smith' },
    { given: 'Jane', family: 'Doe' },
  ],
  title: 'Test Title',
  journal: 'Test Journal',
  volume: '10',
  issue: '2',
  pages: '100-110',
  year: 2020,
  url: 'https://doi.org/10.1016/j.smrv.2009.04.001',
};

const onClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockGetId.mockReturnValue('10.1016/j.smrv.2009.04.001');
  mockGetWork.mockResolvedValue({ reference: mockReference });
});

it('renders title and input', () => {
  render(<DOIModal onClose={onClose} />);
  expect(screen.getByText('DOI Lookup')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('https://doi.org/10.xxxx/...')
  ).toBeInTheDocument();
  expect(screen.getByText('Fetch')).toBeInTheDocument();
});

it('shows empty state message', () => {
  render(<DOIModal onClose={onClose} />);
  expect(screen.getByText(/No references yet/)).toBeInTheDocument();
});

it('shows error for invalid DOI format', async () => {
  mockGetId.mockReturnValue(null);
  render(<DOIModal onClose={onClose} />);
  const fetchBtn = screen.getByText('Fetch');
  fireEvent.click(fetchBtn);

  await waitFor(() => {
    expect(screen.getByText('Invalid DOI format.')).toBeInTheDocument();
  });
});

it('shows error when fetch fails', async () => {
  mockGetWork.mockResolvedValue({ reference: null });

  render(<DOIModal onClose={onClose} />);
  const fetchBtn = screen.getByText('Fetch');
  fireEvent.click(fetchBtn);

  await waitFor(() => {
    expect(
      screen.getByText(
        'Failed to fetch reference. Check the DOI and try again.'
      )
    ).toBeInTheDocument();
  });
});

it('shows loading spinner while fetching', async () => {
  mockGetWork.mockImplementation(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ reference: mockReference }), 1000)
      )
  );

  render(<DOIModal onClose={onClose} />);
  const fetchBtn = screen.getByText('Fetch');
  fireEvent.click(fetchBtn);

  const spinner = document.querySelector('.loading');
  expect(spinner).toBeInTheDocument();
  expect(fetchBtn.closest('button')).toBeDisabled();
});

it('adds reference on successful fetch', async () => {
  render(<DOIModal onClose={onClose} />);

  await act(async () => {
    fireEvent.click(screen.getByText('Fetch'));
  });

  await waitFor(() => {
    expect(screen.getByText(/Smith, J\., Doe, & J\./)).toBeInTheDocument();
  });
});

it('does not add duplicate references', async () => {
  render(<DOIModal onClose={onClose} />);
  const fetchBtn = screen.getByText('Fetch');

  await act(async () => {
    fireEvent.click(fetchBtn);
  });
  await act(async () => {
    fireEvent.click(fetchBtn);
  });

  await waitFor(() => {
    expect(screen.getByText('References (1)')).toBeInTheDocument();
  });
});

it('deletes a reference', async () => {
  render(<DOIModal onClose={onClose} />);
  await act(async () => {
    fireEvent.click(screen.getByText('Fetch'));
  });

  await waitFor(() => {
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Delete'));

  await waitFor(() => {
    expect(screen.getByText(/No references yet/)).toBeInTheDocument();
  });
});

it('switches to table tab', async () => {
  render(<DOIModal onClose={onClose} />);
  await act(async () => {
    fireEvent.click(screen.getByText('Fetch'));
  });

  await waitFor(() => {
    expect(screen.getByText('References (1)')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Table'));
  expect(screen.getByText('Authors')).toBeInTheDocument();
  expect(screen.getByText(/Smith John/)).toBeInTheDocument();
});

it('shows fetch error when getWork throws', async () => {
  mockGetWork.mockRejectedValue(new Error('Network error'));

  render(<DOIModal onClose={onClose} />);
  await act(async () => {
    fireEvent.click(screen.getByText('Fetch'));
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        'Failed to fetch reference. Check the DOI and try again.'
      )
    ).toBeInTheDocument();
  });
});

it('deletes a reference from table tab', async () => {
  render(<DOIModal onClose={onClose} />);
  await act(async () => {
    fireEvent.click(screen.getByText('Fetch'));
  });

  await waitFor(() => {
    expect(screen.getByText('Table')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText('Table'));

  await waitFor(() => {
    expect(screen.getByText('Authors')).toBeInTheDocument();
  });

  const deleteBtns = screen.getAllByText('Delete');
  fireEvent.click(deleteBtns[0]);

  await waitFor(() => {
    expect(screen.getByText(/No references yet/)).toBeInTheDocument();
  });
});

it('calls onClose when close button clicked', () => {
  render(<DOIModal onClose={onClose} />);
  fireEvent.click(screen.getByText('✕'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('updates DOI input on change', () => {
  render(<DOIModal onClose={onClose} />);
  const input = screen.getByPlaceholderText('https://doi.org/10.xxxx/...');
  fireEvent.change(input, {
    target: { value: 'https://doi.org/10.1234/test' },
  });
  expect(input).toHaveValue('https://doi.org/10.1234/test');
});
