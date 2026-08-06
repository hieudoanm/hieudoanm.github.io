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
const addToast = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  get.mockReturnValue('doc1');
  useData.mockReturnValue({ getDocument, updateDocument, addStamp });
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
    expect(screen.getByText('Image insertion panel')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Watermark' }));
    expect(screen.getByText('Tool: watermark')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Stamp' }));
    expect(screen.getByText('Tool: stamp')).toBeInTheDocument();
    for (const preset of ['Approved', 'Rejected', 'Draft', 'Confidential']) {
      expect(screen.getByRole('button', { name: preset })).toBeInTheDocument();
    }
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
});
