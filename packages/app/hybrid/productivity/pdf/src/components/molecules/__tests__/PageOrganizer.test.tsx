import { render, screen, fireEvent } from '@testing-library/react';
import { PageOrganizer } from '@/components/molecules/PageOrganizer';
import type { PDFDocument, PDFPage } from '@/types';

const page = (n: number, overrides: Partial<PDFPage> = {}): PDFPage => ({
  id: `p${n}`,
  documentId: 'doc-1',
  pageNumber: n,
  width: 595,
  height: 842,
  rotation: 0,
  textBlocks: [],
  images: [],
  labels: `Page ${n}`,
  ...overrides,
});

const otherDoc = (
  id: string,
  title: string,
  pages: PDFPage[]
): PDFDocument => ({
  id,
  title,
  filename: `${id}.pdf`,
  author: 'Author',
  pageCount: pages.length,
  fileSize: 1024,
  createdAt: 1000,
  updatedAt: 1000,
  lastOpenedAt: 1000,
  thumbnailColor: '#000000',
  pages,
});

const dataTransfer = (value: string) => ({
  setData: jest.fn(),
  effectAllowed: 'move',
  getData: jest.fn(() => value),
});

const renderOrganizer = (
  pages: PDFPage[] = [page(1), page(2)],
  otherDocuments: PDFDocument[] = []
) => {
  const handlers = {
    onSelect: jest.fn(),
    onReorder: jest.fn(),
    onLabelChange: jest.fn(),
    onRotate: jest.fn(),
    onDuplicate: jest.fn(),
    onDelete: jest.fn(),
    onExtract: jest.fn(),
    onSplit: jest.fn(),
    onMerge: jest.fn(),
    onToggleCropMode: jest.fn(),
    onApplyCrop: jest.fn(),
    onClearCrop: jest.fn(),
  };
  const utils = render(
    <PageOrganizer
      pages={pages}
      currentPage={1}
      cropMode={false}
      otherDocuments={otherDocuments}
      {...handlers}
    />
  );
  return { ...utils, handlers };
};

const liByText = (container: HTMLElement, text: string): Element | null => {
  const items = Array.from(container.querySelectorAll('li[draggable]'));
  return (
    items.find((li) => li.textContent?.includes(text)) ??
    items.find((li) => li.textContent === text) ??
    null
  );
};

describe('PageOrganizer molecule', () => {
  it('reorders pages when a page is dropped on another', () => {
    const { container, handlers } = renderOrganizer();
    fireEvent.dragStart(liByText(container, 'Page 1')!, {
      dataTransfer: dataTransfer('0'),
    });
    fireEvent.drop(liByText(container, 'Page 2')!, {
      dataTransfer: dataTransfer('0'),
    });
    expect(handlers.onReorder).toHaveBeenCalledWith(0, 1);
  });

  it('ignores a page drop with invalid drag data', () => {
    const { container, handlers } = renderOrganizer();
    fireEvent.drop(liByText(container, 'Page 1')!, {
      dataTransfer: dataTransfer('not-a-number'),
    });
    expect(handlers.onReorder).not.toHaveBeenCalled();
  });

  it('adds multiple documents to the merge list', () => {
    const { handlers } = renderOrganizer(
      [page(1)],
      [otherDoc('a', 'Doc A', [page(1)]), otherDoc('b', 'Doc B', [page(2)])]
    );
    const addButtons = screen.getAllByText('Add');
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
    expect(screen.getByText('Apply Merge (3 pages)')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Apply Merge (3 pages)'));
    expect(handlers.onMerge).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ labels: 'Page 1' }),
        expect.objectContaining({ pageNumber: 1 }),
        expect.objectContaining({ pageNumber: 2 }),
      ])
    );
  });

  it('reorders merged pages by dragging and dropping', () => {
    const { container, handlers } = renderOrganizer(
      [page(1, { labels: 'A' })],
      [otherDoc('a', 'Doc A', [page(2, { labels: 'B' })])]
    );
    fireEvent.click(screen.getByText('Add'));
    fireEvent.dragStart(liByText(container, 'B')!, {
      dataTransfer: dataTransfer('1'),
    });
    fireEvent.drop(liByText(container, 'A')!, {
      dataTransfer: dataTransfer('1'),
    });
    fireEvent.click(screen.getByText('Apply Merge (2 pages)'));
    const merged = handlers.onMerge.mock.calls[0][0] as PDFPage[];
    expect(merged.map((p) => p.labels)).toEqual(['B', 'A']);
  });

  it('ignores a merge drop with invalid drag data', () => {
    const { container, handlers } = renderOrganizer(
      [page(1, { labels: 'A' })],
      [otherDoc('a', 'Doc A', [page(2, { labels: 'B' })])]
    );
    fireEvent.click(screen.getByText('Add'));
    fireEvent.drop(liByText(container, 'A')!, {
      dataTransfer: dataTransfer('oops'),
    });
    fireEvent.click(screen.getByText('Apply Merge (2 pages)'));
    const merged = handlers.onMerge.mock.calls[0][0] as PDFPage[];
    expect(merged.map((p) => p.labels)).toEqual(['A', 'B']);
  });

  it('highlights the current page and the page being dragged', () => {
    const { container } = renderOrganizer();
    const page1 = liByText(container, 'Page 1')!;
    const page2 = liByText(container, 'Page 2')!;
    expect(page1.className).toContain('border-primary');
    expect(page2.className).not.toContain('border-primary');
    fireEvent.dragStart(page2, { dataTransfer: dataTransfer('1') });
    expect(page2.className).toContain('opacity-50');
  });

  it('shows the page label for merged pages', () => {
    const { container } = renderOrganizer(
      [page(1, { labels: '' })],
      [otherDoc('a', 'Doc A', [page(2, { labels: 'Cover' })])]
    );
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Cover')).toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll('li[draggable]')).some(
        (li) => li.textContent === 'Page 1'
      )
    ).toBe(true);
  });

  it('confirms deleting a page', () => {
    const { handlers } = renderOrganizer();
    fireEvent.click(screen.getByLabelText('Delete page 1'));
    expect(
      screen.getByRole('dialog', { name: 'Delete page confirmation' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    expect(handlers.onDelete).toHaveBeenCalledWith(1);
  });

  it('cancels deleting a page', () => {
    const { handlers } = renderOrganizer();
    fireEvent.click(screen.getByLabelText('Delete page 1'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(handlers.onDelete).not.toHaveBeenCalled();
  });
});
