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
const updateAnnotation = jest.fn().mockResolvedValue(undefined);
const addBookmark = jest.fn().mockResolvedValue(bookmark);
const deleteBookmark = jest.fn().mockResolvedValue(undefined);
const rotatePage = jest.fn().mockResolvedValue(undefined);
const getFormFieldsByDocument = jest.fn().mockResolvedValue([]);
const addFormField = jest.fn().mockImplementation((f) => ({
  ...f,
  id: `field-${Math.random().toString(36).slice(2, 8)}`,
}));
const updateFormField = jest.fn().mockResolvedValue(undefined);
const deleteFormField = jest.fn().mockResolvedValue(undefined);
const createDocument = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  get.mockReturnValue('doc1');
  getSearchParams.mockReturnValue({ get });
  getDocument.mockResolvedValue(doc);
  openDocument.mockResolvedValue(undefined);
  getAnnotationsByDocument.mockResolvedValue([annotation]);
  getBookmarksByDocument.mockResolvedValue([bookmark]);
  addAnnotation.mockResolvedValue(annotation);
  deleteAnnotation.mockResolvedValue(undefined);
  updateAnnotation.mockResolvedValue(undefined);
  addBookmark.mockResolvedValue(bookmark);
  deleteBookmark.mockResolvedValue(undefined);
  rotatePage.mockResolvedValue(undefined);
  getFormFieldsByDocument.mockResolvedValue([]);
  addFormField.mockImplementation((f) => ({
    ...f,
    id: `field-${Math.random().toString(36).slice(2, 8)}`,
  }));
  updateFormField.mockResolvedValue(undefined);
  deleteFormField.mockResolvedValue(undefined);
  createDocument.mockResolvedValue(undefined);
  useData.mockReturnValue({
    getDocument,
    openDocument,
    getAnnotationsByDocument,
    getBookmarksByDocument,
    addAnnotation,
    deleteAnnotation,
    updateAnnotation,
    addBookmark,
    deleteBookmark,
    rotatePage,
    getFormFieldsByDocument,
    addFormField,
    updateFormField,
    deleteFormField,
    createDocument,
  });
  useToast.mockReturnValue({ addToast });
  window.print = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  delete (document as { exitFullscreen?: unknown }).exitFullscreen;
  delete (document as { fullscreenElement?: unknown }).fullscreenElement;
  delete (HTMLElement.prototype as { requestFullscreen?: unknown })
    .requestFullscreen;
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
    const zoomLevel = () => screen.getByLabelText('Zoom level');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(zoomLevel()).toHaveTextContent('125%');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(zoomLevel()).toHaveTextContent('100%');
    fireEvent.keyDown(window, { key: '+', ctrlKey: true });
    expect(zoomLevel()).toHaveTextContent('125%');
    fireEvent.keyDown(window, { key: '-', ctrlKey: true });
    expect(zoomLevel()).toHaveTextContent('100%');
    fireEvent.keyDown(window, { key: '0', ctrlKey: true });
    expect(zoomLevel()).toHaveTextContent('100%');
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
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 30, clientY: 40 });
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
      fireEvent.click(
        within(row).getByRole('button', {
          name: 'Delete highlight annotation',
        })
      );
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

  it('opens the print dialog with Ctrl+P and the print button', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'p', ctrlKey: true });
    expect(
      screen.getByRole('dialog', { name: 'Print dialog' })
    ).toBeInTheDocument();
    expect(window.print).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByRole('dialog', { name: 'Print dialog' })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Print' }));
    expect(
      screen.getByRole('dialog', { name: 'Print dialog' })
    ).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Print copies'), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Print document' }));
    expect(window.print).toHaveBeenCalledTimes(1);
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

  it('stays on the loading skeleton when there is no document id', () => {
    get.mockReturnValue(null);
    render(<ViewerPage />);
    expect(document.querySelectorAll('.skeleton').length).toBeGreaterThan(0);
    expect(getDocument).not.toHaveBeenCalled();
  });

  it('stays on the loading skeleton when the document is missing', async () => {
    getDocument.mockResolvedValue(null);
    render(<ViewerPage />);
    expect(document.querySelectorAll('.skeleton').length).toBeGreaterThan(0);
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
    const strikethrough = {
      ...annotation,
      id: 'ann8',
      pageNumber: 1,
      type: 'strikethrough' as const,
      content: '',
    };
    const sticky = {
      ...annotation,
      id: 'ann9',
      pageNumber: 1,
      type: 'sticky-note' as const,
      color: '#fde047',
      content: 'New note',
    };
    getAnnotationsByDocument.mockResolvedValue([
      underline,
      circle,
      noContent,
      strikethrough,
      sticky,
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    expect(screen.getByText('Underlined (p.1)')).toBeInTheDocument();
    expect(screen.getByText('circle (p.1)')).toBeInTheDocument();
    expect(screen.getByText('highlight (p.1)')).toBeInTheDocument();
    expect(screen.getByText('strikethrough (p.1)')).toBeInTheDocument();
    expect(screen.getByText('New note (p.1)')).toBeInTheDocument();
  });

  it('does nothing when clicking the page without an active tool', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 30, clientY: 40 });
    });
    expect(addAnnotation).not.toHaveBeenCalled();
  });

  it('places a sticky note with default content', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'sticky-note' }));
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 30, clientY: 40 });
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

  it('switches zoom presets with the select', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.change(screen.getByLabelText('Zoom presets'), {
      target: { value: '150' },
    });
    expect(screen.getByLabelText('Zoom level')).toHaveTextContent('150%');
    fireEvent.change(screen.getByLabelText('Zoom presets'), {
      target: { value: '100' },
    });
    expect(screen.getByLabelText('Zoom level')).toHaveTextContent('100%');
  });

  it('zooms with the slider', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.change(screen.getByRole('slider', { name: 'Zoom slider' }), {
      target: { value: '80' },
    });
    expect(screen.getByLabelText('Zoom level')).toHaveTextContent('80%');
  });

  it('toggles continuous scroll mode', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    expect(screen.queryByLabelText('Continuous pages')).toBeNull();
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to continuous scroll' })
    );
    const continuous = screen.getByLabelText('Continuous pages');
    expect(continuous).toBeInTheDocument();
    expect(
      within(continuous).getAllByRole('button', { name: 'Page 1' })
    ).toHaveLength(1);
    expect(
      within(continuous).getAllByRole('button', { name: 'Page 2' })
    ).toHaveLength(1);
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to single scroll' })
    );
    expect(screen.queryByLabelText('Continuous pages')).toBeNull();
  });

  it('rotates the current page', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Rotate page' }));
    expect(rotatePage).toHaveBeenCalledWith('doc1', 1, 90);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rotate page' }));
    expect(rotatePage).toHaveBeenCalledWith('doc1', 2, 90);
  });

  it('scrolls the page list when a page is clicked in continuous mode', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to continuous scroll' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('navigates with the previous button and continuous scroll navigation', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to continuous scroll' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('updates the current page from a scroll event in continuous mode', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to continuous scroll' })
    );
    fireEvent.scroll(screen.getByLabelText('Continuous pages').parentElement!);
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('rotates the page and toasts when the update succeeds', async () => {
    const updatedDoc = {
      ...doc,
      pages: doc.pages.map((p) =>
        p.pageNumber === 1 ? { ...p, rotation: 90 } : p
      ),
    };
    rotatePage.mockResolvedValue(updatedDoc);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Rotate page' }));
    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith('Page rotated', 'success')
    );
  });

  it('highlights search matches and navigates between them', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'f', ctrlKey: true });
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Text block' },
    });
    expect(screen.getByText('1 / 3 matches')).toBeInTheDocument();
    expect(document.querySelectorAll('mark')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Next match' }));
    expect(screen.getByText('2 / 3 matches')).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous match' }));
    expect(screen.getByText('1 / 3 matches')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(screen.queryByText(/matches/)).toBeNull();
  });

  it('enters and exits presentation mode', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    expect(screen.queryByLabelText('Presentation view')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Presentation mode' }));
    const view = screen.getByLabelText('Presentation view');
    expect(view).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(within(view).getByText('2 / 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(within(view).getByText('1 / 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Exit presentation' }));
    await waitFor(() =>
      expect(screen.queryByLabelText('Presentation view')).toBeNull()
    );
  });

  it('exits presentation via Escape and the fullscreenchange event', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Presentation mode' }));
    fireEvent(document, new Event('fullscreenchange'));
    await waitFor(() =>
      expect(screen.queryByLabelText('Presentation view')).toBeNull()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Presentation mode' }));
    await screen.findByLabelText('Presentation view');
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() =>
      expect(screen.queryByLabelText('Presentation view')).toBeNull()
    );
  });

  it('uses the fullscreen API when toggling presentation', async () => {
    const requestFullscreen = jest.fn().mockResolvedValue(undefined);
    (
      HTMLElement.prototype as { requestFullscreen?: unknown }
    ).requestFullscreen = requestFullscreen;
    const exitFullscreen = jest.fn().mockResolvedValue(undefined);
    (document as { exitFullscreen?: unknown }).exitFullscreen = exitFullscreen;
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => ({}),
    });
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Presentation mode' }));
    expect(requestFullscreen).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Exit presentation' }));
    expect(exitFullscreen).toHaveBeenCalled();
  });

  it('renders page watermarks and image sources', async () => {
    const wmPage = {
      ...makePage(1),
      watermark: {
        id: 'wm1',
        documentId: 'doc1',
        type: 'text' as const,
        text: 'SECRET',
        fontSize: 48,
        color: '#9ca3af',
        opacity: 0.5,
        rotation: -30,
        position: 'center' as const,
        pageRange: '1',
      },
      images: [
        {
          ...makePage(1).images[0],
          src: 'data:image/png;base64,abc',
          rotation: 45,
        },
      ],
    };
    getDocument.mockResolvedValue({
      ...doc,
      pages: [wmPage, makePage(2), makePage(3)],
    });
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    expect(screen.getByText('SECRET')).toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      'data:image/png;base64,abc'
    );
  });

  it('shows document properties in the sidebar', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: /properties/i }));
    expect(screen.getByText('File name')).toBeInTheDocument();
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(screen.getByText('Pages')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();
  });

  it('creates an arrow annotation from a drag gesture', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'arrow' }));
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseMove(page, { clientX: 90, clientY: 80 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 90, clientY: 80 });
    });
    expect(addAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'arrow',
        points: [
          { x: 30, y: 40 },
          { x: 90, y: 80 },
        ],
      })
    );
  });

  it('creates a freehand annotation from a drag gesture', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'freehand' }));
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 10, clientY: 10 });
    });
    await act(async () => {
      fireEvent.mouseMove(page, { clientX: 20, clientY: 15 });
    });
    await act(async () => {
      fireEvent.mouseMove(page, { clientX: 30, clientY: 20 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 30, clientY: 20 });
    });
    expect(addAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'freehand',
        x: 10,
        y: 10,
        points: expect.arrayContaining([
          { x: 10, y: 10 },
          { x: 20, y: 15 },
          { x: 30, y: 20 },
        ]),
      })
    );
  });

  it('cancels a draw gesture when leaving the page', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'circle' }));
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseLeave(page);
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 60, clientY: 80 });
    });
    expect(addAnnotation).not.toHaveBeenCalled();
  });

  it('renders freehand, line and arrow annotations in the vector layer', async () => {
    const freehand = {
      ...annotation,
      id: 'ann5',
      pageNumber: 1,
      type: 'freehand' as const,
      content: '',
      points: [
        { x: 10, y: 10 },
        { x: 20, y: 15 },
        { x: 30, y: 20 },
      ],
    };
    const line = {
      ...annotation,
      id: 'ann6',
      pageNumber: 1,
      type: 'line' as const,
      content: '',
      points: [
        { x: 10, y: 30 },
        { x: 50, y: 60 },
      ],
    };
    const arrow = {
      ...annotation,
      id: 'ann7',
      pageNumber: 1,
      type: 'arrow' as const,
      content: '',
      points: [
        { x: 10, y: 80 },
        { x: 60, y: 90 },
      ],
    };
    const bareFreehand = {
      ...annotation,
      id: 'ann10',
      pageNumber: 1,
      type: 'freehand' as const,
      content: '',
      points: undefined,
    };
    const bareLine = {
      ...annotation,
      id: 'ann11',
      pageNumber: 1,
      type: 'line' as const,
      content: '',
      points: undefined,
    };
    getAnnotationsByDocument.mockResolvedValue([
      freehand,
      line,
      arrow,
      bareFreehand,
      bareLine,
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    const layer = await screen.findByTestId('vector-layer');
    expect(layer.querySelectorAll('polyline')).toHaveLength(2);
    expect(layer.querySelectorAll('line')).toHaveLength(3);
  });

  it('previews a highlight while dragging', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'highlight' }));
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
      fireEvent.mouseMove(page, { clientX: 90, clientY: 60 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 90, clientY: 60 });
    });
    expect(addAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'highlight',
        x: 30,
        y: 40,
        width: 60,
        height: 20,
      })
    );
  });

  it('highlights a substring within a text block', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'f', ctrlKey: true });
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'block' },
    });
    expect(screen.getByText('1 / 3 matches')).toBeInTheDocument();
    expect(document.querySelectorAll('mark')).toHaveLength(1);
  });

  it('undoes and redoes an added annotation', async () => {
    addAnnotation.mockImplementation(async (ann) => ({
      ...ann,
      id: 'created1',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }));
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    fireEvent.click(screen.getByRole('button', { name: 'rectangle' }));
    const page = screen.getByRole('button', { name: 'Page 1' });
    await act(async () => {
      fireEvent.mouseDown(page, { clientX: 30, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseUp(page, { clientX: 30, clientY: 40 });
    });
    expect(addAnnotation).toHaveBeenCalled();
    const undo = screen.getByRole('button', { name: 'Undo annotation' });
    expect(undo).toBeEnabled();
    await act(async () => {
      fireEvent.click(undo);
    });
    expect(screen.queryByText('rectangle (p.1)')).not.toBeInTheDocument();
    const redo = screen.getByRole('button', { name: 'Redo annotation' });
    await act(async () => {
      fireEvent.click(redo);
    });
    expect(screen.getByText('rectangle (p.1)')).toBeInTheDocument();
  });

  it('adds a comment thread to an annotation', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    const commentToggle = await screen.findByRole('button', {
      name: 'Comments for highlight annotation',
    });
    fireEvent.click(commentToggle);
    fireEvent.change(
      screen.getByLabelText('Comment input for highlight annotation'),
      { target: { value: 'Looks good' } }
    );
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Add comment to highlight annotation',
        })
      );
    });
    expect(updateAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'ann1',
        comments: [
          expect.objectContaining({ text: 'Looks good', author: 'You' }),
        ],
      })
    );
    expect(screen.getByText(/Looks good/)).toBeInTheDocument();
    fireEvent.change(
      screen.getByLabelText('Comment input for highlight annotation'),
      { target: { value: 'Second note' } }
    );
    await act(async () => {
      fireEvent.keyDown(
        screen.getByLabelText('Comment input for highlight annotation'),
        { key: 'Enter' }
      );
    });
    expect(updateAnnotation).toHaveBeenLastCalledWith(
      expect.objectContaining({
        id: 'ann1',
        comments: [
          expect.objectContaining({ text: 'Looks good' }),
          expect.objectContaining({ text: 'Second note' }),
        ],
      })
    );
  });

  it('adds a form field from the forms tab', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add text field' }));
    });
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
      })
    );
    expect(await screen.findByText('text 1')).toBeInTheDocument();
  });

  it('detects form fields from text blocks', async () => {
    const pageOne = makePage(1);
    getDocument.mockResolvedValue({
      ...doc,
      pages: [
        {
          ...pageOne,
          textBlocks: [
            { ...pageOne.textBlocks[0] },
            {
              id: 'tb-name',
              x: 40,
              y: 100,
              width: 100,
              height: 20,
              content: 'Name:',
              fontSize: 12,
              fontFamily: 'sans-serif',
              bold: false,
              italic: false,
              color: '#1a1a1a',
            },
            {
              id: 'tb-check',
              x: 40,
              y: 140,
              width: 100,
              height: 20,
              content: '[] Agree to terms',
              fontSize: 12,
              fontFamily: 'sans-serif',
              bold: false,
              italic: false,
              color: '#1a1a1a',
            },
          ],
        },
        makePage(2),
        makePage(3),
      ],
    });
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Detect Fields' }));
    });
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'text', label: 'Name', x: 152 })
    );
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'checkbox', label: 'Agree to terms' })
    );
  });

  it('fills a text field and persists the value', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'field-1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Full Name',
        value: '',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    fireEvent.change(await screen.findByLabelText('Full Name'), {
      target: { value: 'Jane' },
    });
    await waitFor(() =>
      expect(updateFormField).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'field-1', value: 'Jane' })
      )
    );
  });

  it('navigates between fields with Tab', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'f1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Field A',
        value: '',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
      {
        id: 'f2',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Field B',
        value: '',
        x: 100,
        y: 140,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await screen.findByLabelText('Field A');
    fireEvent.click(screen.getByLabelText('Field A'));
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(screen.getByLabelText('Field B')).toHaveFocus();
  });

  it('signs a field with a typed signature', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'sig1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'signature',
        label: 'Signature 1',
        value: '',
        x: 100,
        y: 200,
        width: 220,
        height: 80,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await act(async () => {
      fireEvent.click(
        await screen.findByRole('button', { name: 'Re-sign Signature 1' })
      );
    });
    expect(
      screen.getByRole('dialog', { name: 'Signature pad' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'type signature' }));
    fireEvent.change(screen.getByLabelText('Typed signature text'), {
      target: { value: 'Jane Doe' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save Signature' }));
    });
    await waitFor(() =>
      expect(updateFormField).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'sig1', value: 'Jane Doe' })
      )
    );
  });

  it('moves and resizes a selected field', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'field-1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Name',
        value: '',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    const moveHandle = await screen.findByLabelText('Move Name field');
    act(() => {
      fireEvent.mouseDown(moveHandle, { clientX: 10, clientY: 10 });
    });
    act(() => {
      fireEvent.mouseMove(moveHandle, { clientX: 60, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseUp(moveHandle, { clientX: 60, clientY: 40 });
    });
    await waitFor(() =>
      expect(updateFormField).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'field-1', x: 150, y: 130 })
      )
    );
    fireEvent.click(screen.getByLabelText('Name'));
    const resizeHandle = await screen.findByLabelText('Resize Name field');
    act(() => {
      fireEvent.mouseDown(resizeHandle, { clientX: 0, clientY: 0 });
    });
    act(() => {
      fireEvent.mouseMove(resizeHandle, { clientX: 50, clientY: 10 });
    });
    await act(async () => {
      fireEvent.mouseUp(resizeHandle, { clientX: 50, clientY: 10 });
    });
    await waitFor(() =>
      expect(updateFormField).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'field-1', width: 230, height: 34 })
      )
    );
  });

  it('deletes a form field', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'field-1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Name',
        value: '',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await act(async () => {
      fireEvent.click(
        await screen.findByRole('button', { name: 'Delete Name field' })
      );
    });
    expect(deleteFormField).toHaveBeenCalledWith('field-1');
    expect(
      screen.queryByRole('button', { name: 'Delete Name field' })
    ).not.toBeInTheDocument();
  });

  it('exports a filled form as a new document', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'field-1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Name',
        value: 'Jane',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Export Filled Form' })
      );
    });
    expect(createDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Annual Report (filled)',
        filename: 'report-filled.pdf',
      })
    );
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Jane', label: 'Name' })
    );
  });

  it('no-ops next and previous match when there are no matches', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.keyDown(window, { key: 'f', ctrlKey: true });
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next match' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous match' }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('keeps presentation mode while fullscreen is still active', async () => {
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => ({}),
    });
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'Presentation mode' }));
    fireEvent(document, new Event('fullscreenchange'));
    expect(screen.getByLabelText('Presentation view')).toBeInTheDocument();
  });

  it('adds signature, dropdown and radio fields from the forms tab', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Add dropdown field' })
      );
    });
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'dropdown',
        options: ['Option A', 'Option B'],
      })
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add radio field' }));
    });
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'radio', options: ['Yes', 'No'] })
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Signature' }));
    });
    expect(addFormField).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'signature',
        label: 'Signature 3',
        width: 220,
        height: 80,
      })
    );
    expect(
      screen.getByRole('dialog', { name: 'Signature dialog' })
    ).toBeInTheDocument();
  });

  it('updates only the changed field when several fields exist', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'f1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Field A',
        value: '',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
      {
        id: 'f2',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Field B',
        value: '',
        x: 100,
        y: 140,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    fireEvent.change(await screen.findByLabelText('Field A'), {
      target: { value: 'x' },
    });
    await waitFor(() =>
      expect(updateFormField).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'f1', value: 'x' })
      )
    );
    expect(screen.getByLabelText('Field B')).toBeInTheDocument();
  });

  it('keeps other fields in place while dragging a selected field', async () => {
    getFormFieldsByDocument.mockResolvedValue([
      {
        id: 'f1',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Field A',
        value: '',
        x: 100,
        y: 100,
        width: 180,
        height: 24,
      },
      {
        id: 'f2',
        documentId: 'doc1',
        pageNumber: 1,
        type: 'text',
        label: 'Field B',
        value: '',
        x: 100,
        y: 140,
        width: 180,
        height: 24,
      },
    ]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    const moveHandle = await screen.findByLabelText('Move Field A field');
    act(() => {
      fireEvent.mouseDown(moveHandle, { clientX: 0, clientY: 0 });
    });
    act(() => {
      fireEvent.mouseMove(moveHandle, { clientX: 30, clientY: 20 });
    });
    await act(async () => {
      fireEvent.mouseUp(moveHandle, { clientX: 30, clientY: 20 });
    });
    await waitFor(() =>
      expect(updateFormField).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'f1', x: 130, y: 120 })
      )
    );
  });

  it('ignores Tab on the forms tab when there are no fields', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'forms' }));
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'forms' })).toBeInTheDocument();
  });

  it('ignores empty comments, closes the thread and ignores other keys', async () => {
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    const commentToggle = await screen.findByRole('button', {
      name: 'Comments for highlight annotation',
    });
    fireEvent.click(commentToggle);
    const input = screen.getByLabelText(
      'Comment input for highlight annotation'
    );
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Add comment to highlight annotation',
        })
      );
    });
    expect(updateAnnotation).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'a' });
    fireEvent.click(commentToggle);
    expect(
      screen.queryByLabelText('Comment input for highlight annotation')
    ).not.toBeInTheDocument();
  });

  it('updates only the commented annotation in the list', async () => {
    const underline = {
      ...annotation,
      id: 'ann2',
      pageNumber: 1,
      type: 'underline' as const,
    };
    getAnnotationsByDocument.mockResolvedValue([annotation, underline]);
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(screen.getByRole('button', { name: 'annotations' }));
    const toggle = await screen.findByRole('button', {
      name: 'Comments for highlight annotation',
    });
    fireEvent.click(toggle);
    fireEvent.change(
      screen.getByLabelText('Comment input for highlight annotation'),
      { target: { value: 'Note' } }
    );
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Add comment to highlight annotation',
        })
      );
    });
    expect(updateAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'ann1' })
    );
    expect(screen.getByText('Hi there (p.1)')).toBeInTheDocument();
  });

  it('applies a rotation transform to pages in continuous mode', async () => {
    const rotated = { ...makePage(1), rotation: 90 };
    getDocument.mockResolvedValue({
      ...doc,
      pages: [rotated, makePage(2), makePage(3)],
    });
    render(<ViewerPage />);
    await screen.findByRole('heading', { name: 'Annual Report' });
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to continuous scroll' })
    );
    const continuous = screen.getByLabelText('Continuous pages');
    expect(
      continuous.querySelector('div[style*="rotate(90deg)"]')
    ).toBeInTheDocument();
  });
});
