import {
  render,
  screen,
  fireEvent,
  act,
  within,
  waitFor,
} from '@testing-library/react';
import ViewerPage from '@/app/pdf/page';

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

const getSearchParams = jest.requireMock('next/navigation').useSearchParams;

const makePage = (n: number) => ({
  id: `page-${n}`,
  documentId: 'doc1',
  pageNumber: n,
  width: 595,
  height: 842,
  rotation: 0,
  textBlocks: [
    {
      id: `tb-${n}`,
      x: 40,
      y: 60,
      width: 300,
      height: 20,
      content: `Text block ${n}`,
      fontSize: 12,
      fontFamily: 'sans-serif',
      bold: false,
      italic: false,
      color: '#1a1a1a',
    },
  ],
  images: [
    {
      id: `img-${n}`,
      x: 40,
      y: 200,
      width: 100,
      height: 80,
      color: '#3b82f6',
      label: 'photo',
      opacity: 1,
    },
  ],
  labels: `Page ${n}`,
});

const doc = {
  id: 'doc1',
  title: 'Annual Report',
  filename: 'report.pdf',
  author: 'You',
  pageCount: 3,
  fileSize: 2048,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastOpenedAt: Date.now(),
  thumbnailColor: '#3b82f6',
  pages: [makePage(1), makePage(2), makePage(3)],
};

const annotation = {
  id: 'ann1',
  documentId: 'doc1',
  pageNumber: 2,
  type: 'highlight',
  color: '#facc15',
  x: 10,
  y: 10,
  width: 100,
  height: 30,
  content: 'Hi there',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const bookmark = {
  id: 'bm1',
  documentId: 'doc1',
  pageNumber: 2,
  title: 'Chapter 2',
  createdAt: Date.now(),
};

const getDocument = jest.fn().mockResolvedValue(doc);
const openDocument = jest.fn().mockResolvedValue(undefined);
const getAnnotationsByDocument = jest.fn().mockResolvedValue([annotation]);
const getBookmarksByDocument = jest.fn().mockResolvedValue([bookmark]);
const addAnnotation = jest.fn().mockResolvedValue(annotation);
const deleteAnnotation = jest.fn().mockResolvedValue(undefined);
const addBookmark = jest.fn().mockResolvedValue(bookmark);
const deleteBookmark = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  get.mockReturnValue('doc1');
  getSearchParams.mockReturnValue({ get });
  useData.mockReturnValue({
    getDocument,
    openDocument,
    getAnnotationsByDocument,
    getBookmarksByDocument,
    addAnnotation,
    deleteAnnotation,
    addBookmark,
    deleteBookmark,
  });
  useToast.mockReturnValue({ addToast });
  window.print = jest.fn();
});

describe('PDF viewer page', () => {
  it('renders the document with text and image blocks', async () => {
    render(<ViewerPage />);
    expect(
      await screen.findByRole('heading', { name: 'Annual Report' })
    ).toBeInTheDocument();
    expect(screen.getByText('Text block 1')).toBeInTheDocument();
    expect(screen.getByText('photo')).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    expect(openDocument).toHaveBeenCalledWith('doc1');
  });

  it('zooms with buttons and keyboard shortcuts', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByText('125%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(screen.getByText('100%')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: '+', ctrlKey: true });
    expect(screen.getByText('125%')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: '-', ctrlKey: true });
    expect(screen.getByText('100%')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: '0', ctrlKey: true });
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('navigates pages with buttons, arrows and the sidebar', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    const indicator = screen.getByText('1 / 3');
    const prev = indicator.previousElementSibling as HTMLElement;
    const next = indicator.nextElementSibling as HTMLElement;
    fireEvent.click(next);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    const page2Button = Array.from(screen.getAllByRole('button')).find(
      (b) => b.textContent?.trim() === '22'
    );
    fireEvent.click(page2Button!);
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Home' });
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'End' });
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('cycles the fit mode and toggles the sidebar', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    const fitButton = screen.getByRole('button', { name: 'Fit Width' });
    fireEvent.click(fitButton);
    expect(
      screen.getByRole('button', { name: 'Fit Page' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fit Page' }));
    expect(screen.getByRole('button', { name: 'Actual' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Actual' }));
    expect(
      screen.getByRole('button', { name: 'Fit Width' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));
    expect(
      screen.queryByRole('button', { name: 'pages' })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));
    expect(screen.getByRole('button', { name: 'pages' })).toBeInTheDocument();
  });

  it('adds and deletes bookmarks', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'bookmarks' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Add Bookmark/ }));
    });
    expect(addBookmark).toHaveBeenCalledWith({
      documentId: 'doc1',
      pageNumber: 1,
      title: 'Page 1',
    });
    expect(addToast).toHaveBeenCalledWith('Bookmark added', 'success');
    fireEvent.click(screen.getByRole('button', { name: 'Chapter 2' }));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('adds an annotation by clicking the page', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'rectangle' }));
    const swatches = document.querySelectorAll('button.size-4');
    fireEvent.click(swatches[1]);
    expect(swatches[1]).toHaveClass('border-white');
    fireEvent.click(screen.getByRole('button', { name: 'Page 1' }), {
      clientX: 30,
      clientY: 40,
    });
    expect(addAnnotation).toHaveBeenCalledWith({
      documentId: 'doc1',
      pageNumber: 1,
      type: 'rectangle',
      color: '#3b82f6',
      x: 30,
      y: 40,
      width: 100,
      height: 30,
      content: '',
    });
    expect(addToast).toHaveBeenCalledWith('Annotation added', 'success');
  });

  it('lists, navigates and deletes existing annotations', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    const contentButton = screen.getByRole('button', {
      name: 'Hi there (p.2)',
    });
    fireEvent.click(contentButton);
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    const row = contentButton.closest('div')!;
    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[1]);
    });
    expect(deleteAnnotation).toHaveBeenCalledWith('ann1');
  });

  it('opens and closes search with Ctrl+F and the search button', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'f', ctrlKey: true });
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('abc');
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('goes to a page via the dialog', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'g', ctrlKey: true });
    fireEvent.change(screen.getByPlaceholderText('1-3'), {
      target: { value: '2' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('1-3'), {
      key: 'Enter',
    });
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.queryByText('Go to Page')).not.toBeInTheDocument();
  });

  it('keeps the dialog open for an out-of-range page and cancels', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'g', ctrlKey: true });
    fireEvent.change(screen.getByPlaceholderText('1-3'), {
      target: { value: '99' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    });
    expect(screen.getByText('Go to Page')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Go to Page')).not.toBeInTheDocument();
  });

  it('prints with Ctrl+P and the print button', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'p', ctrlKey: true });
    expect(window.print).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Print' }));
    expect(window.print).toHaveBeenCalledTimes(2);
  });

  it('deselects the tool with Escape', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'underline' }));
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'underline' })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('stays on the loading screen when there is no document id', () => {
    get.mockReturnValue(null);
    render(<ViewerPage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
    expect(getDocument).not.toHaveBeenCalled();
  });

  it('stays on the loading screen when the document is missing', async () => {
    getDocument.mockResolvedValue(null);
    render(<ViewerPage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
    await waitFor(() => expect(getDocument).toHaveBeenCalledWith('doc1'));
    expect(openDocument).not.toHaveBeenCalled();
  });

  it('renders bold and italic text blocks with a missing rotation', async () => {
    const styledPage = {
      ...makePage(1),
      rotation: undefined,
      textBlocks: [{ ...makePage(1).textBlocks[0], bold: true, italic: true }],
    };
    getDocument.mockResolvedValue({
      ...doc,
      pages: [styledPage, makePage(2), makePage(3)],
    });
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    expect(screen.getByText('Text block 1')).toHaveStyle({
      fontWeight: 'bold',
      fontStyle: 'italic',
    });
  });

  it('renders annotations of different types and without content', async () => {
    const underline = {
      ...annotation,
      id: 'ann2',
      pageNumber: 1,
      type: 'underline' as const,
      content: 'Underlined',
    };
    const circle = {
      ...annotation,
      id: 'ann3',
      pageNumber: 1,
      type: 'circle' as const,
      color: '#10b981',
      content: '',
    };
    const noContent = {
      ...annotation,
      id: 'ann4',
      pageNumber: 1,
      type: 'highlight' as const,
      content: '',
    };
    getAnnotationsByDocument.mockResolvedValue([underline, circle, noContent]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    expect(screen.getByText('Underlined (p.1)')).toBeInTheDocument();
    expect(screen.getByText('circle (p.1)')).toBeInTheDocument();
    expect(screen.getByText('highlight (p.1)')).toBeInTheDocument();
  });

  it('does nothing when clicking the page without an active tool', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Page 1' }), {
      clientX: 30,
      clientY: 40,
    });
    expect(addAnnotation).not.toHaveBeenCalled();
  });

  it('places a sticky note with default content', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'sticky-note' }));
    fireEvent.click(screen.getByRole('button', { name: 'Page 1' }), {
      clientX: 30,
      clientY: 40,
    });
    expect(addAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'sticky-note', content: 'New note' })
    );
  });

  it('deselects an annotation tool by clicking it again', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    const rect = screen.getByRole('button', { name: 'rectangle' });
    fireEvent.click(rect);
    expect(rect).toHaveClass('btn-primary');
    fireEvent.click(rect);
    expect(rect).not.toHaveClass('btn-primary');
  });

  it('keeps the go-to dialog open for a non-enter key', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'g', ctrlKey: true });
    fireEvent.keyDown(screen.getByPlaceholderText('1-3'), { key: 'a' });
    expect(screen.getByText('Go to Page')).toBeInTheDocument();
  });
});
