import { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import type {
  PDFDocument,
  Annotation,
  Bookmark,
  FormField,
  Stamp,
} from '@/types';

jest.mock('@/lib/db', () => ({
  db: {
    documents: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    annotations: {
      getAll: jest.fn(),
      getByDocument: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      deleteByDocument: jest.fn(),
    },
    bookmarks: {
      getAll: jest.fn(),
      getByDocument: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    formFields: {
      getAll: jest.fn(),
      getByDocument: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    stamps: {
      getAll: jest.fn(),
      getByDocument: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    settings: { get: jest.fn(), put: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'gen-id'),
}));

const { db } = jest.requireMock('@/lib/db');
const { seedDatabase } = jest.requireMock('@/data/seed');

const doc = (
  id: string,
  overrides: Partial<PDFDocument> = {}
): PDFDocument => ({
  id,
  title: `Doc ${id}`,
  filename: `${id}.pdf`,
  author: 'Author',
  pageCount: 1,
  fileSize: 1024,
  createdAt: 1000,
  updatedAt: 1000,
  lastOpenedAt: 1000,
  thumbnailColor: '#000000',
  pages: [],
  ...overrides,
});

const ann = (id: string): Annotation => ({
  id,
  documentId: 'doc-1',
  pageNumber: 1,
  type: 'highlight',
  color: '#facc15',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  content: 'note',
  createdAt: 1000,
  updatedAt: 1000,
});

const bm = (id: string): Bookmark => ({
  id,
  documentId: 'doc-1',
  pageNumber: 1,
  title: 'Bookmark',
  createdAt: 1000,
});

const ff = (id: string): FormField => ({
  id,
  documentId: 'doc-1',
  pageNumber: 1,
  type: 'text',
  label: 'Field',
  value: '',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
});

const stamp = (id: string): Stamp => ({
  id,
  documentId: 'doc-1',
  pageNumber: 1,
  preset: 'Approved',
  text: 'APPROVED',
  color: '#10b981',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  rotation: 0,
  createdAt: 1000,
});

const Consumer = () => {
  const data = useData();
  const [fetched, setFetched] = useState('');
  return (
    <div>
      <span data-testid="doc-count">{data.documents.length}</span>
      <span data-testid="ann-count">{data.annotations.length}</span>
      <span data-testid="bm-count">{data.bookmarks.length}</span>
      <span data-testid="ff-count">{data.formFields.length}</span>
      <span data-testid="stamp-count">{data.stamps.length}</span>
      <span data-testid="theme">{data.settings.theme}</span>
      <span data-testid="is-loading">{String(data.isLoading)}</span>
      <span data-testid="first-title">{data.documents[0]?.title}</span>
      <span data-testid="ann-0-content">
        {data.annotations[0]?.content ?? ''}
      </span>
      <span data-testid="ff-0-value">{data.formFields[0]?.value ?? ''}</span>
      <button
        onClick={() =>
          data.getDocument('doc-1').then((d) => setFetched(d?.title ?? 'none'))
        }>
        get-document
      </button>
      <span data-testid="fetched">{fetched}</span>
      <button onClick={() => data.createDocument(doc('new-doc'))}>
        create-document
      </button>
      <button
        onClick={() =>
          data.updateDocument({ ...doc('doc-1'), title: 'Updated' })
        }>
        update-document
      </button>
      <button onClick={() => data.deleteDocument('doc-1')}>
        delete-document
      </button>
      <button onClick={() => data.renameDocument('doc-1', 'Renamed')}>
        rename-document
      </button>
      <button onClick={() => data.renameDocument('missing', 'X')}>
        rename-missing
      </button>
      <button onClick={() => data.openDocument('doc-1')}>open-document</button>
      <button onClick={() => data.openDocument('missing')}>open-missing</button>
      <button
        onClick={() =>
          data.addAnnotation({
            documentId: 'doc-1',
            pageNumber: 1,
            type: 'underline',
            color: '#3b82f6',
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            content: 'new',
          })
        }>
        add-annotation
      </button>
      <button
        onClick={() =>
          data.updateAnnotation({ ...ann('ann-1'), content: 'updated' })
        }>
        update-annotation
      </button>
      <button onClick={() => data.deleteAnnotation('ann-1')}>
        delete-annotation
      </button>
      <button
        onClick={() =>
          data.addBookmark({ documentId: 'doc-1', pageNumber: 2, title: 'New' })
        }>
        add-bookmark
      </button>
      <button onClick={() => data.deleteBookmark('bm-1')}>
        delete-bookmark
      </button>
      <button
        onClick={() =>
          data
            .getAnnotationsByDocument('doc-1')
            .then((list) => setFetched(`ann:${list.length}`))
        }>
        get-annotations
      </button>
      <button
        onClick={() =>
          data
            .getBookmarksByDocument('doc-1')
            .then((list) => setFetched(`bm:${list.length}`))
        }>
        get-bookmarks
      </button>
      <button
        onClick={() =>
          data.addFormField({
            documentId: 'doc-1',
            pageNumber: 1,
            type: 'checkbox',
            label: 'Check',
            value: '',
            x: 0,
            y: 0,
            width: 10,
            height: 10,
          })
        }>
        add-form-field
      </button>
      <button
        onClick={() => data.updateFormField({ ...ff('ff-1'), value: 'x' })}>
        update-form-field
      </button>
      <button
        onClick={() =>
          data.addStamp({
            documentId: 'doc-1',
            pageNumber: 1,
            preset: 'Draft',
            text: 'DRAFT',
            color: '#f59e0b',
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            rotation: 0,
          })
        }>
        add-stamp
      </button>
      <button onClick={() => data.deleteStamp('stamp-1')}>delete-stamp</button>
      <button onClick={() => data.updateSettings({ theme: 'dark' })}>
        update-settings
      </button>
      <button onClick={() => data.refreshData()}>refresh</button>
    </div>
  );
};

const renderProvider = () =>
  render(
    <DataProvider>
      <Consumer />
    </DataProvider>
  );

const seedStore = () => {
  db.documents.getAll.mockResolvedValue([
    doc('doc-1', { lastOpenedAt: 2000 }),
    doc('doc-2'),
  ]);
  db.annotations.getAll.mockResolvedValue([ann('ann-1')]);
  db.bookmarks.getAll.mockResolvedValue([bm('bm-1')]);
  db.formFields.getAll.mockResolvedValue([ff('ff-1')]);
  db.stamps.getAll.mockResolvedValue([stamp('stamp-1')]);
  db.settings.get.mockResolvedValue({
    id: 'default',
    theme: 'nothing',
    defaultZoom: 100,
    pageLayout: 'continuous',
    annotationDefaults: { color: '#facc15', strokeWidth: 2 },
  });
  db.documents.get.mockResolvedValue(doc('doc-1'));
};

describe('DataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedStore();
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used within DataProvider'
    );
    spy.mockRestore();
  });

  it('loads data on mount and seeds the database', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    expect(seedDatabase).toHaveBeenCalled();
    expect(screen.getByTestId('ann-count').textContent).toBe('1');
    expect(screen.getByTestId('bm-count').textContent).toBe('1');
    expect(screen.getByTestId('ff-count').textContent).toBe('1');
    expect(screen.getByTestId('stamp-count').textContent).toBe('1');
    expect(screen.getByTestId('is-loading').textContent).toBe('false');
  });

  it('sorts documents by most recently opened', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('first-title').textContent).toBe('Doc doc-1')
    );
  });

  it('gets a document by id', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('get-document'));
    await waitFor(() =>
      expect(screen.getByTestId('fetched').textContent).toBe('Doc doc-1')
    );
  });

  it('creates and persists a document', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('create-document'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('3')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'new-doc' })
    );
  });

  it('updates a document', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('update-document'));
    await waitFor(() =>
      expect(screen.getByTestId('first-title').textContent).toBe('Updated')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Updated' })
    );
  });

  it('deletes a document and its annotations', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('delete-document'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    expect(db.documents.delete).toHaveBeenCalledWith('doc-1');
    expect(db.annotations.deleteByDocument).toHaveBeenCalledWith('doc-1');
  });

  it('renames a document', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('rename-document'));
    await waitFor(() =>
      expect(screen.getByTestId('first-title').textContent).toBe('Renamed')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'doc-1', title: 'Renamed' })
    );
  });

  it('no-ops renaming a missing document', async () => {
    (db.documents.get as jest.Mock).mockResolvedValueOnce(undefined);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('rename-missing'));
    await waitFor(() =>
      expect(db.documents.get).toHaveBeenCalledWith('missing')
    );
    expect(db.documents.put).not.toHaveBeenCalled();
  });

  it('opens a document and updates lastOpenedAt', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('open-document'));
    await waitFor(() =>
      expect(db.documents.put).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'doc-1',
          lastOpenedAt: expect.any(Number),
        })
      )
    );
  });

  it('no-ops opening a missing document', async () => {
    (db.documents.get as jest.Mock).mockResolvedValueOnce(undefined);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('open-missing'));
    await waitFor(() =>
      expect(db.documents.get).toHaveBeenCalledWith('missing')
    );
    expect(db.documents.put).not.toHaveBeenCalled();
  });

  it('adds and persists an annotation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('ann-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-annotation'));
    await waitFor(() =>
      expect(screen.getByTestId('ann-count').textContent).toBe('2')
    );
    expect(db.annotations.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'gen-id', type: 'underline' })
    );
  });

  it('updates an annotation', async () => {
    db.annotations.getAll.mockResolvedValue([ann('ann-1'), ann('ann-2')]);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('ann-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('update-annotation'));
    await waitFor(() =>
      expect(screen.getByTestId('ann-0-content').textContent).toBe('updated')
    );
    expect(db.annotations.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'ann-1', content: 'updated' })
    );
  });

  it('deletes an annotation', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('ann-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('delete-annotation'));
    await waitFor(() =>
      expect(screen.getByTestId('ann-count').textContent).toBe('0')
    );
    expect(db.annotations.delete).toHaveBeenCalledWith('ann-1');
  });

  it('adds and deletes a bookmark', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('bm-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-bookmark'));
    await waitFor(() =>
      expect(screen.getByTestId('bm-count').textContent).toBe('2')
    );
    expect(db.bookmarks.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'gen-id', title: 'New' })
    );
    fireEvent.click(screen.getByText('delete-bookmark'));
    await waitFor(() =>
      expect(screen.getByTestId('bm-count').textContent).toBe('1')
    );
    expect(db.bookmarks.delete).toHaveBeenCalledWith('bm-1');
  });

  it('adds and updates a form field', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('ff-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-form-field'));
    await waitFor(() =>
      expect(screen.getByTestId('ff-count').textContent).toBe('2')
    );
    expect(db.formFields.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'gen-id', type: 'checkbox' })
    );
    fireEvent.click(screen.getByText('update-form-field'));
    await waitFor(() =>
      expect(screen.getByTestId('ff-0-value').textContent).toBe('x')
    );
    expect(db.formFields.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'ff-1', value: 'x' })
    );
  });

  it('adds and deletes a stamp', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('stamp-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-stamp'));
    await waitFor(() =>
      expect(screen.getByTestId('stamp-count').textContent).toBe('2')
    );
    expect(db.stamps.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'gen-id', preset: 'Draft' })
    );
    fireEvent.click(screen.getByText('delete-stamp'));
    await waitFor(() =>
      expect(screen.getByTestId('stamp-count').textContent).toBe('1')
    );
    expect(db.stamps.delete).toHaveBeenCalledWith('stamp-1');
  });

  it('gets annotations and bookmarks by document', async () => {
    db.annotations.getByDocument.mockResolvedValue([ann('ann-1')]);
    db.bookmarks.getByDocument.mockResolvedValue([bm('bm-1')]);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('get-annotations'));
    await waitFor(() =>
      expect(screen.getByTestId('fetched').textContent).toBe('ann:1')
    );
    expect(db.annotations.getByDocument).toHaveBeenCalledWith('doc-1');
    fireEvent.click(screen.getByText('get-bookmarks'));
    await waitFor(() =>
      expect(screen.getByTestId('fetched').textContent).toBe('bm:1')
    );
    expect(db.bookmarks.getByDocument).toHaveBeenCalledWith('doc-1');
  });

  it('updates settings', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('nothing')
    );
    fireEvent.click(screen.getByText('update-settings'));
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('dark')
    );
    expect(db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'dark' })
    );
  });

  it('refreshes data on demand', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    db.documents.getAll.mockResolvedValue([
      doc('doc-1'),
      doc('doc-2'),
      doc('doc-3'),
    ]);
    fireEvent.click(screen.getByText('refresh'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('3')
    );
  });
});
