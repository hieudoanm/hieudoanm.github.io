import { render, screen, fireEvent, act, within } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');
const { useToast } = jest.requireMock('@/providers/ToastProvider');

const makePage = (n: number) => ({
  id: `p${n}`,
  documentId: 'doc1',
  pageNumber: n,
  width: 595,
  height: 842,
  rotation: 0,
  textBlocks: [],
  images: [],
  labels: `Page ${n}`,
});

const makeDoc = (
  id: string,
  title: string,
  filename: string,
  lastOpenedAt: number
) => ({
  id,
  title,
  filename,
  author: 'You',
  pageCount: 2,
  fileSize: 2048,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastOpenedAt,
  thumbnailColor: '#3b82f6',
  pages: [makePage(1), makePage(2)],
});

const docs = [
  makeDoc('doc1', 'Annual Report', 'report.pdf', 3000),
  makeDoc('doc2', 'Invoice', 'invoice.pdf', 2000),
];

const createDocument = jest.fn().mockResolvedValue(undefined);
const deleteDocument = jest.fn().mockResolvedValue(undefined);
const renameDocument = jest.fn().mockResolvedValue(undefined);
const openDocument = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();
const push = jest.fn();
const useRouter = jest.requireMock('next/navigation').useRouter;

beforeEach(() => {
  jest.clearAllMocks();
  useRouter.mockReturnValue({ push });
  useData.mockReturnValue({
    documents: docs,
    isLoading: false,
    deleteDocument,
    renameDocument,
    openDocument,
    createDocument,
  });
  useToast.mockReturnValue({ addToast });
});

describe('Home page', () => {
  it('shows a loading spinner while documents load', () => {
    useData.mockReturnValue({
      documents: [],
      isLoading: true,
      deleteDocument,
      renameDocument,
      openDocument,
      createDocument,
    });
    render(<Home />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });

  it('renders documents in grid mode, filters and toggles list view', async () => {
    render(<Home />);
    expect(screen.getByText('PDF Library')).toBeInTheDocument();
    expect(screen.getByText('All Documents (2)')).toBeInTheDocument();
    expect(screen.getByText('Recent Documents')).toBeInTheDocument();
    expect(screen.getAllByText('Annual Report')).toHaveLength(2);

    fireEvent.change(screen.getByPlaceholderText('Search documents...'), {
      target: { value: 'invo' },
    });
    expect(screen.getByText('All Documents (1)')).toBeInTheDocument();
    expect(screen.queryByText('Annual Report')).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search documents...'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Toggle view mode' }));
    expect(screen.getByText('All Documents (2)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle view mode' }));
    expect(screen.getByText('All Documents (2)')).toBeInTheDocument();
  });

  it('shows the empty state when there are no documents', () => {
    useData.mockReturnValue({
      documents: [],
      isLoading: false,
      deleteDocument,
      renameDocument,
      openDocument,
      createDocument,
    });
    render(<Home />);
    expect(screen.getByText('No documents found')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: /Upload your first PDF/ })
    );
  });

  it('triggers the file picker via the Upload PDF button', () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: 'Upload PDF' }));
  });

  it('ignores a file input event without files', async () => {
    render(<Home />);
    await act(async () => {
      fireEvent.change(document.querySelector('input[type="file"]')!, {
        target: { files: null },
      });
    });
    expect(createDocument).not.toHaveBeenCalled();
  });

  it('opens a document by clicking a grid card', async () => {
    render(<Home />);
    await act(async () => {
      fireEvent.click(document.querySelectorAll('.group')[0]);
    });
    expect(openDocument).toHaveBeenCalledWith('doc1');
    expect(push).toHaveBeenCalledWith('/pdf?id=doc1');
  });

  it('renames via Enter, cancels via Escape and the X button', async () => {
    render(<Home />);
    const card = document.querySelectorAll('.group')[0];
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[0]);
    });
    const input = screen.getByDisplayValue('Annual Report');
    fireEvent.change(input, { target: { value: 'Enter Rename' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await act(async () => {});
    expect(renameDocument).toHaveBeenCalledWith('doc1', 'Enter Rename');

    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[0]);
    });
    const input2 = screen.getByDisplayValue('Annual Report');
    fireEvent.keyDown(input2, { key: 'Escape' });
    expect(screen.queryByDisplayValue('Annual Report')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[0]);
    });
    fireEvent.click(within(card as HTMLElement).getAllByRole('button')[1]);
    expect(screen.queryByDisplayValue('Annual Report')).not.toBeInTheDocument();
  });

  it('skips renaming when the title is empty', async () => {
    render(<Home />);
    const card = document.querySelectorAll('.group')[0];
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[0]);
    });
    const input = screen.getByDisplayValue('Annual Report');
    fireEvent.change(input, { target: { value: '   ' } });
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[0]);
    });
    expect(renameDocument).not.toHaveBeenCalled();
  });

  it('cancels a delete from the confirm state', async () => {
    render(<Home />);
    const card = document.querySelectorAll('.group')[0];
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[1]);
    });
    fireEvent.click(within(card as HTMLElement).getAllByRole('button')[2]);
    expect(deleteDocument).not.toHaveBeenCalled();
  });

  it('supports rename and delete in list view', async () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle view mode' }));
    const title = screen.getAllByText('Invoice')[1];
    const row = title.closest('div')!.parentElement!;

    await act(async () => {
      fireEvent.click(title);
    });
    expect(openDocument).toHaveBeenCalledWith('doc2');
    expect(push).toHaveBeenCalledWith('/pdf?id=doc2');

    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[0]);
    });
    const input = screen.getByDisplayValue('Invoice');
    fireEvent.change(input, { target: { value: 'List Rename' } });
    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[0]);
    });
    expect(renameDocument).toHaveBeenCalledWith('doc2', 'List Rename');

    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[0]);
    });
    fireEvent.keyDown(screen.getByDisplayValue('Invoice'), { key: 'Escape' });
    expect(screen.queryByDisplayValue('Invoice')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[1]);
    });
    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[1]);
    });
    expect(deleteDocument).toHaveBeenCalledWith('doc2');
    expect(addToast).toHaveBeenCalledWith('Document deleted', 'success');
  });

  it('uploads files and creates documents', async () => {
    render(<Home />);
    const file = new File(['x'], 'quarterly.pdf', { type: 'application/pdf' });
    await act(async () => {
      fireEvent.change(document.querySelector('input[type="file"]')!, {
        target: { files: [file] },
      });
    });
    expect(createDocument).toHaveBeenCalledTimes(1);
    expect(createDocument).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'quarterly', filename: 'quarterly.pdf' })
    );
    expect(addToast).toHaveBeenCalledWith('Uploaded quarterly.pdf', 'success');
  });

  it('renames a document via the edit button', async () => {
    render(<Home />);
    const card = document.querySelectorAll('.group')[0];
    const buttons = within(card as HTMLElement).getAllByRole('button');
    await act(async () => {
      fireEvent.click(buttons[0]);
    });
    const input = screen.getByDisplayValue('Annual Report');
    fireEvent.change(input, { target: { value: 'Renamed Doc' } });
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[0]);
    });
    expect(renameDocument).toHaveBeenCalledWith('doc1', 'Renamed Doc');
    expect(addToast).toHaveBeenCalledWith('Renamed successfully', 'success');
  });

  it('deletes a document after confirming', async () => {
    render(<Home />);
    const card = document.querySelectorAll('.group')[0];
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[1]);
    });
    await act(async () => {
      fireEvent.click(within(card as HTMLElement).getAllByRole('button')[1]);
    });
    expect(deleteDocument).toHaveBeenCalledWith('doc1');
    expect(addToast).toHaveBeenCalledWith('Document deleted', 'success');
  });

  it('renames via the keyboard in list view', async () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle view mode' }));
    const title = screen.getAllByText('Invoice')[1];
    const row = title.closest('div')!.parentElement!;
    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[0]);
    });
    const input = screen.getByDisplayValue('Invoice');
    fireEvent.keyDown(input, { key: 'a' });
    fireEvent.keyDown(input, { key: 'Enter' });
    await act(async () => {});
    expect(renameDocument).toHaveBeenCalledWith('doc2', 'Invoice');
  });

  it('opens a recent document', async () => {
    render(<Home />);
    await act(async () => {
      fireEvent.click(screen.getAllByText('Annual Report')[0]);
    });
    expect(openDocument).toHaveBeenCalledWith('doc1');
    expect(push).toHaveBeenCalledWith('/pdf?id=doc1');
  });
});
