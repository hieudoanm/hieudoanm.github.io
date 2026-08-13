import { render, screen, fireEvent, act, within } from '@testing-library/react';
import EditPage from '@/app/pdf/edit/page';

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

jest.mock('@/data/models', () => ({
  generateId: jest.fn(() => 'gen'),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');
const { useToast } = jest.requireMock('@/providers/ToastProvider');
const getSearchParams = jest.requireMock('next/navigation').useSearchParams;
const { generateId } = jest.requireMock('@/data/models');

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

const getDocument = jest.fn().mockResolvedValue(doc);
const updateDocument = jest.fn().mockResolvedValue(doc);
const addStamp = jest.fn().mockResolvedValue(undefined);
const createDocument = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  get.mockReturnValue('doc1');
  getSearchParams.mockReturnValue({ get });
  generateId.mockReturnValue('gen');
  getDocument.mockResolvedValue(doc);
  updateDocument.mockResolvedValue(doc);
  addStamp.mockResolvedValue(undefined);
  createDocument.mockResolvedValue(undefined);
  useData.mockReturnValue({
    getDocument,
    updateDocument,
    addStamp,
    createDocument,
    documents: [],
  });
  useToast.mockReturnValue({ addToast });
});

describe('PDF editor page', () => {
  it('renders the editor with the default text tool', async () => {
    render(<EditPage />);
    expect(
      await screen.findByRole('heading', { name: 'Annual Report - Editor' })
    ).toBeInTheDocument();
    expect(screen.getByText('Tool: text')).toBeInTheDocument();
    expect(getDocument).toHaveBeenCalledWith('doc1');
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('switches between text, image, watermark and stamp tools', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Image' }));
    expect(screen.getByText('Tool: image')).toBeInTheDocument();
    expect(
      screen.getByText('Click an image on the page to select and edit it.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Watermark' }));
    expect(screen.getByText('Tool: watermark')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Stamp' }));
    expect(screen.getByText('Tool: stamp')).toBeInTheDocument();
    for (const preset of ['Approved', 'Rejected', 'Draft', 'Confidential']) {
      expect(screen.getByRole('button', { name: preset })).toBeInTheDocument();
    }
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    expect(screen.getByText('Tool: page')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete page 1' })
    ).toBeInTheDocument();
  });

  it('adds a text box with the configured font', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.change(screen.getByDisplayValue(12), {
      target: { value: '16' },
    });
    const panel = screen.getByText('Add Text Box').closest('div')!;
    const panelButtons = within(panel).getAllByRole('button');
    fireEvent.click(panelButtons[0]);
    fireEvent.click(panelButtons[1]);
    fireEvent.change(screen.getByDisplayValue('#1a1a1a'), {
      target: { value: '#123456' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Text Box' }));
    });
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'doc1',
        pages: expect.arrayContaining([
          expect.objectContaining({
            pageNumber: 1,
            textBlocks: expect.arrayContaining([
              expect.objectContaining({
                id: 'text-new-gen',
                content: 'New text box',
                fontSize: 16,
                bold: true,
                italic: true,
                color: '#123456',
              }),
            ]),
          }),
        ]),
      })
    );
    expect(addToast).toHaveBeenCalledWith('Text box added', 'success');
  });

  it('edits an existing text block inline', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByText('Text block 1'));
    const textarea = screen.getByDisplayValue('Text block 1');
    fireEvent.change(textarea, { target: { value: 'Updated copy' } });
    const row = textarea.parentElement!;
    await act(async () => {
      fireEvent.click(within(row).getAllByRole('button')[0]);
    });
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            textBlocks: expect.arrayContaining([
              expect.objectContaining({ id: 'tb-1', content: 'Updated copy' }),
            ]),
          }),
        ]),
      })
    );
    expect(addToast).toHaveBeenCalledWith('Text updated', 'success');
    expect(screen.queryByDisplayValue('Updated copy')).not.toBeInTheDocument();
  });

  it('cancels an inline text edit', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByText('Text block 1'));
    const textarea = screen.getByDisplayValue('Text block 1');
    const row = textarea.parentElement!;
    fireEvent.click(within(row).getAllByRole('button')[1]);
    expect(updateDocument).not.toHaveBeenCalled();
    expect(screen.getByText('Text block 1')).toBeInTheDocument();
  });

  it('applies a stamp preset', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Stamp' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Approved' }));
    });
    expect(addStamp).toHaveBeenCalledWith({
      documentId: 'doc1',
      pageNumber: 1,
      preset: 'Approved',
      text: 'APPROVED',
      color: '#10b981',
      x: 200,
      y: 350,
      width: 180,
      height: 60,
      rotation: -15,
    });
    expect(addToast).toHaveBeenCalledWith('Stamp "Approved" added', 'success');
  });

  it('previews the watermark with live text, opacity and rotation', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Watermark' }));
    const preview = screen.getByText('CONFIDENTIAL');
    expect(preview).toHaveStyle({ transform: 'rotate(-45deg)' });
    fireEvent.change(screen.getByDisplayValue('CONFIDENTIAL'), {
      target: { value: 'TOP SECRET' },
    });
    expect(screen.getByText('TOP SECRET')).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue(0.3), {
      target: { value: '0.8' },
    });
    expect(screen.getByText('Opacity: 0.8')).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue(-45), {
      target: { value: '30' },
    });
    expect(screen.getByText('Rotation: 30°')).toBeInTheDocument();
  });

  it('navigates pages with the footer buttons', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    const prev = screen.getByRole('button', { name: 'Prev' });
    const next = screen.getByRole('button', { name: 'Next' });
    expect(prev).toBeDisabled();
    fireEvent.click(next);
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    fireEvent.click(next);
    expect(screen.getByText('Page 3 of 3')).toBeInTheDocument();
    expect(next).toBeDisabled();
    fireEvent.click(prev);
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('stays on the loading screen when no id is provided', () => {
    get.mockReturnValue(null);
    render(<EditPage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
    expect(getDocument).not.toHaveBeenCalled();
  });

  it('renders bold and italic text blocks', async () => {
    const styledPage = {
      ...makePage(1),
      textBlocks: [{ ...makePage(1).textBlocks[0], bold: true, italic: true }],
    };
    getDocument.mockResolvedValue({
      ...doc,
      pages: [styledPage, makePage(2), makePage(3)],
    });
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    expect(screen.getByText('Text block 1')).toHaveStyle({
      fontWeight: 'bold',
      fontStyle: 'italic',
    });
  });

  it('adds an image block to the current page', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Image' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Image' }));
    });
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'doc1',
        pages: expect.arrayContaining([
          expect.objectContaining({
            pageNumber: 1,
            images: expect.arrayContaining([
              expect.objectContaining({
                id: 'image-new-gen',
                label: 'image-1',
                width: 160,
                height: 120,
              }),
            ]),
          }),
        ]),
      })
    );
    expect(addToast).toHaveBeenCalledWith('Image added', 'success');
  });

  it('updates image opacity and rotation via the controls', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Image' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Image' }));
    });
    await act(async () => {
      fireEvent.change(screen.getByRole('slider', { name: 'Image opacity' }), {
        target: { value: '0.5' },
      });
    });
    expect(updateDocument).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            images: expect.arrayContaining([
              expect.objectContaining({ id: 'image-new-gen', opacity: 0.5 }),
            ]),
          }),
        ]),
      })
    );
    await act(async () => {
      fireEvent.change(screen.getByRole('slider', { name: 'Image rotation' }), {
        target: { value: '30' },
      });
    });
    expect(updateDocument).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            images: expect.arrayContaining([
              expect.objectContaining({ id: 'image-new-gen', rotation: 30 }),
            ]),
          }),
        ]),
      })
    );
  });

  it('deletes a selected image', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Image' }));
    fireEvent.click(screen.getByText('photo'));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete Image' }));
    });
    expect(updateDocument).toHaveBeenCalled();
    const call = updateDocument.mock.calls.at(-1)![0];
    const page1 = call.pages.find(
      (p: { pageNumber: number }) => p.pageNumber === 1
    );
    expect(page1.images.map((i: { id: string }) => i.id)).not.toContain(
      'img-1'
    );
    expect(addToast).toHaveBeenCalledWith('Image deleted', 'success');
  });

  it('resizes a selected image via the drag handle', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Image' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Image' }));
    });
    const handles = screen.getAllByLabelText('Resize image');
    await act(async () => {
      fireEvent.mouseDown(handles[0], { clientX: 0, clientY: 0 });
    });
    const canvas = screen.getByText('image-1').closest('div')!.parentElement!;
    await act(async () => {
      fireEvent.mouseMove(canvas, { clientX: 60, clientY: 40 });
    });
    await act(async () => {
      fireEvent.mouseUp(canvas, { clientX: 60, clientY: 40 });
    });
    expect(updateDocument).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            images: expect.arrayContaining([
              expect.objectContaining({ id: 'image-new-gen', width: 220 }),
            ]),
          }),
        ]),
      })
    );
  });

  it('applies a text watermark to the current page', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Watermark' }));
    fireEvent.change(screen.getByDisplayValue('CONFIDENTIAL'), {
      target: { value: 'DRAFT COPY' },
    });
    fireEvent.change(screen.getByDisplayValue(0.3), {
      target: { value: '0.6' },
    });
    fireEvent.change(screen.getByDisplayValue(-45), {
      target: { value: '15' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Apply Watermark' }));
    });
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            pageNumber: 1,
            watermark: expect.objectContaining({
              type: 'text',
              text: 'DRAFT COPY',
              opacity: 0.6,
              rotation: 15,
              pageRange: '1',
            }),
          }),
        ]),
      })
    );
    expect(addToast).toHaveBeenCalledWith('Watermark applied', 'success');
  });

  it('applies the watermark to all pages when checked', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Watermark' }));
    fireEvent.click(screen.getByRole('checkbox'));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Apply Watermark' }));
    });
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            pageNumber: 1,
            watermark: expect.objectContaining({ pageRange: 'all' }),
          }),
          expect.objectContaining({
            pageNumber: 2,
            watermark: expect.objectContaining({ pageRange: 'all' }),
          }),
          expect.objectContaining({
            pageNumber: 3,
            watermark: expect.objectContaining({ pageRange: 'all' }),
          }),
        ]),
      })
    );
  });

  it('applies an image watermark', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Watermark' }));
    fireEvent.click(screen.getByRole('button', { name: 'Image watermark' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Apply Watermark' }));
    });
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({
            pageNumber: 1,
            watermark: expect.objectContaining({
              type: 'image',
              color: '#3b82f6',
            }),
          }),
        ]),
      })
    );
  });

  it('reorders pages via thumbnail drag-and-drop', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    const row = (n: number) =>
      screen
        .getByRole('button', { name: `Page ${n}` })
        .closest('li') as HTMLElement;
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => '0'),
      effectAllowed: 'move',
    } as unknown as DataTransfer;
    await act(async () => {
      fireEvent.dragStart(row(1), { dataTransfer });
      fireEvent.drop(row(3), { dataTransfer });
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pages.map((p: { id: string }) => p.id)).toEqual([
      'page-2',
      'page-3',
      'page-1',
    ]);
    expect(call.pages.map((p: { pageNumber: number }) => p.pageNumber)).toEqual(
      [1, 2, 3]
    );
  });

  it('deletes a page with confirmation', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete page 2' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pageCount).toBe(2);
    expect(call.pages.map((p: { id: string }) => p.id)).toEqual([
      'page-1',
      'page-3',
    ]);
    expect(addToast).toHaveBeenCalledWith('Page deleted', 'success');
  });

  it('cancels page deletion from the confirmation dialog', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete page 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(updateDocument).not.toHaveBeenCalled();
  });

  it('rotates an individual page', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Rotate page 1 right' })
      );
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pages[0].rotation).toBe(90);
  });

  it('duplicates a page', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Duplicate page 1' }));
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pageCount).toBe(4);
    expect(call.pages.map((p: { pageNumber: number }) => p.pageNumber)).toEqual(
      [1, 2, 3, 4]
    );
    expect(call.pages[1].id).toBe('page-gen');
    expect(addToast).toHaveBeenCalledWith('Page duplicated', 'success');
  });

  it('extracts pages by range into a new document', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    fireEvent.change(screen.getByLabelText('Extract page range'), {
      target: { value: '2-3' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^Extract$/ }));
    });
    expect(createDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Annual Report (extracted)',
        pageCount: 2,
        pages: expect.arrayContaining([
          expect.objectContaining({ id: 'page-2', pageNumber: 1 }),
          expect.objectContaining({ id: 'page-3', pageNumber: 2 }),
        ]),
      })
    );
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pageCount).toBe(1);
    expect(call.pages[0].id).toBe('page-1');
    expect(addToast).toHaveBeenCalledWith('Extracted 2 page(s)', 'success');
  });

  it('splits the document into two documents', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    fireEvent.change(screen.getByLabelText('Split after page'), {
      target: { value: '2' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^Split$/ }));
    });
    expect(createDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Annual Report (part 2)',
        pageCount: 1,
        pages: [expect.objectContaining({ id: 'page-3', pageNumber: 1 })],
      })
    );
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pageCount).toBe(2);
    expect(call.pages.map((p: { id: string }) => p.id)).toEqual([
      'page-1',
      'page-2',
    ]);
  });

  it('updates page labels', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Label page 1'), {
        target: { value: 'Cover' },
      });
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pages[0].labels).toBe('Cover');
  });

  it('crops the current page with the visual crop box', async () => {
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^Crop$/ }));
    });
    expect(screen.getByLabelText('Crop box')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^Apply$/ }));
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pages[0].crop).toEqual({
      x: 100,
      y: 100,
      width: 300,
      height: 400,
    });
    expect(addToast).toHaveBeenCalledWith('Crop applied', 'success');
  });

  it('clears a crop from the current page', async () => {
    const cropped = {
      ...doc,
      pages: doc.pages.map((p, i) =>
        i === 0 ? { ...p, crop: { x: 10, y: 10, width: 200, height: 300 } } : p
      ),
    };
    getDocument.mockResolvedValue(cropped);
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^Clear$/ }));
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pages[0].crop).toBeUndefined();
    expect(addToast).toHaveBeenCalledWith('Crop removed', 'success');
  });

  it('merges pages from another document', async () => {
    const other = {
      ...doc,
      id: 'doc2',
      title: 'Other Doc',
      pages: [makePage(10), makePage(11)],
    };
    useData.mockReturnValue({
      getDocument,
      updateDocument,
      addStamp,
      createDocument,
      documents: [other],
    });
    render(<EditPage />);
    await screen.findByRole('heading', { name: 'Annual Report - Editor' });
    fireEvent.click(screen.getByRole('button', { name: 'Page' }));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    });
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Apply Merge (5 pages)' })
      );
    });
    const call = updateDocument.mock.calls.at(-1)![0];
    expect(call.pageCount).toBe(5);
    expect(call.pages.map((p: { id: string }) => p.id)).toEqual([
      'page-1',
      'page-2',
      'page-3',
      'page-10',
      'page-11',
    ]);
    expect(addToast).toHaveBeenCalledWith('Pages merged', 'success');
  });
});
