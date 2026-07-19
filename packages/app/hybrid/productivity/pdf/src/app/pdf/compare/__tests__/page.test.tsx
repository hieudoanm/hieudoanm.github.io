import { render, screen, fireEvent, act } from '@testing-library/react';
import ComparePage from '@/app/pdf/compare/page';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get })),
}));

const get = jest.fn(() => 'doc1' as string | null);

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');

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

const docA = makeDoc('doc1', 'Document A', 6);
const docB = makeDoc('doc2', 'Document B', 3);

const documents = [docA, docB];
const getDocument = jest.fn(async (id: string) =>
  documents.find((d) => d.id === id)
);

beforeEach(() => {
  jest.clearAllMocks();
  get.mockReturnValue('doc1');
  useData.mockReturnValue({ documents, getDocument });
});

describe('Compare page', () => {
  it('shows the compare placeholder and then the selected document', async () => {
    render(<ComparePage />);
    expect(await screen.findByText('Compare PDFs')).toBeInTheDocument();
    expect(screen.getByText('Document A')).toBeInTheDocument();
    expect(
      screen.getByText('Select a document to compare')
    ).toBeInTheDocument();
    expect(screen.getByText('+1 more pages')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'doc2' },
      });
    });
    expect(await screen.findByText('Document B')).toBeInTheDocument();
    expect(screen.getAllByText('Page 3')).toHaveLength(2);
    expect(
      screen.queryByText('Select a document to compare')
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '' },
      });
    });
    expect(
      screen.getByText('Select a document to compare')
    ).toBeInTheDocument();
  });

  it('stays on the loading screen when no id is provided', () => {
    get.mockReturnValue(null);
    render(<ComparePage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
    expect(getDocument).not.toHaveBeenCalled();
  });
});
