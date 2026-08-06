import { render, screen, fireEvent, act, within } from '@testing-library/react';
import MergePage from '@/app/pdf/merge/page';

const get = jest.fn(() => 'doc1' as string | null);

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get })),
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

const makeDoc = (id: string, title: string, pageCount: number) => ({
  id,
  title,
  filename: `${title}.pdf`,
  author: 'You',
  pageCount,
  fileSize: 2048,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastOpenedAt: Date.now(),
  thumbnailColor: '#3b82f6',
  pages: Array.from({ length: pageCount }, (_, i) => makePage(i + 1)),
});

const doc1 = makeDoc('doc1', 'Primary', 3);
const doc2 = makeDoc('doc2', 'Secondary', 2);
const doc3 = makeDoc('doc3', 'Tertiary', 5);

const documents = [doc1, doc2, doc3];
const getDocument = jest.fn(async (id: string) =>
  documents.find((d) => d.id === id)
);
const addToast = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  get.mockReturnValue('doc1');
  useData.mockReturnValue({ documents, getDocument });
  useToast.mockReturnValue({ addToast });
});

describe('Merge & Split page', () => {
  it('merges the selected documents', async () => {
    render(<MergePage />);
    expect(await screen.findByText('Merge & Split')).toBeInTheDocument();
    expect(screen.getByText('Selected Documents (1)')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Secondary'));
    expect(screen.getByText('Selected Documents (2)')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Merge 2 Documents' })
      );
    });
    expect(addToast).toHaveBeenCalledWith('Merging 2 documents...', 'info');
  });

  it('reorders and removes selected documents', async () => {
    render(<MergePage />);
    await screen.findByText('Merge & Split');
    fireEvent.click(screen.getByText('Secondary'));
    fireEvent.click(screen.getByText('Tertiary'));
    expect(screen.getByText('Selected Documents (3)')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: '' })[1]);
    fireEvent.click(screen.getAllByRole('button', { name: '' })[2]);
    fireEvent.click(screen.getAllByRole('button', { name: '' })[3]);
    expect(screen.getByText('Selected Documents (2)')).toBeInTheDocument();
  });

  it('splits by page range and switches back to merge', async () => {
    render(<MergePage />);
    await screen.findByText('Merge & Split');
    fireEvent.click(screen.getByRole('button', { name: 'Split by Range' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Extract Pages' }));
    });
    expect(addToast).toHaveBeenCalledWith('Please enter a page range', 'error');

    fireEvent.change(screen.getByPlaceholderText('1-5, 8, 12-15'), {
      target: { value: '1-3' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Extract Pages' }));
    });
    expect(addToast).toHaveBeenCalledWith('Splitting by range: 1-3', 'info');

    fireEvent.click(screen.getByRole('button', { name: 'Merge PDFs' }));
    expect(screen.getByText('Selected Documents (1)')).toBeInTheDocument();
  });

  it('stays on the loading screen when there is no document id', () => {
    get.mockReturnValue(null);
    render(<MergePage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
    expect(getDocument).not.toHaveBeenCalled();
  });

  it('renders even when the current document is missing from the library', async () => {
    getDocument.mockResolvedValue(doc1);
    useData.mockReturnValue({ documents: [doc2, doc3], getDocument });
    render(<MergePage />);
    expect(await screen.findByText('Merge & Split')).toBeInTheDocument();
    expect(screen.getByText('Selected Documents (1)')).toBeInTheDocument();
  });

  it('moves selected documents up and down', async () => {
    render(<MergePage />);
    await screen.findByText('Merge & Split');
    fireEvent.click(screen.getByText('Secondary'));
    fireEvent.click(screen.getByText('Tertiary'));
    expect(screen.getByText('Selected Documents (3)')).toBeInTheDocument();

    const titles = () => {
      const panel = screen.getByText('Selected Documents (3)').parentElement!;
      return Array.from(panel.querySelectorAll('.flex-1')).map(
        (el) => el.textContent
      );
    };
    expect(titles()).toEqual(['Primary', 'Secondary', 'Tertiary']);

    const primaryRow = screen.getByText('Primary').parentElement!;
    fireEvent.click(within(primaryRow).getAllByRole('button')[1]);
    expect(titles()).toEqual(['Secondary', 'Primary', 'Tertiary']);

    const tertiaryRow = screen.getByText('Tertiary').parentElement!;
    fireEvent.click(within(tertiaryRow).getAllByRole('button')[0]);
    expect(titles()).toEqual(['Secondary', 'Tertiary', 'Primary']);
  });
});
