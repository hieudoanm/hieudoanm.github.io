import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import type {
  SVGDocument,
  SVGShape,
  SVGLayer,
  SVGSymbol,
  SVGSettings,
  SVGGradient,
  HistoryEntry,
} from '@/types';

jest.mock('@/lib/db', () => ({
  db: {
    documents: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    symbols: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    settings: { get: jest.fn(), put: jest.fn() },
    history: {
      getAll: jest.fn(),
      getByDocument: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      deleteByDocument: jest.fn(),
    },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  createDocument: jest.fn(),
  createDocumentFromTemplate: jest.fn(),
}));

jest.mock('@/utils/format', () => ({
  generateId: jest.fn(() => 'generated-id'),
}));

const { db } = jest.requireMock('@/lib/db');
const { seedDatabase, createDocument, createDocumentFromTemplate } =
  jest.requireMock('@/data/seed');

const shape = (id: string, overrides: Partial<SVGShape> = {}): SVGShape => ({
  id,
  type: 'rect',
  name: `Shape ${id}`,
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  rotation: 0,
  fill: { type: 'solid', color: '#3b82f6', opacity: 1 },
  stroke: {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round',
    join: 'round',
  },
  opacity: 1,
  locked: false,
  visible: true,
  ...overrides,
});

const layer = (id: string, overrides: Partial<SVGLayer> = {}): SVGLayer => ({
  id,
  name: `Layer ${id}`,
  visible: true,
  locked: false,
  shapeIds: ['s1'],
  blending: 'normal',
  ...overrides,
});

const doc = (
  id: string,
  overrides: Partial<SVGDocument> = {}
): SVGDocument => ({
  id,
  title: `Doc ${id}`,
  width: 100,
  height: 100,
  shapes: [shape('s1')],
  layers: [layer('l1')],
  symbols: [],
  gradients: [],
  createdAt: 1000,
  updatedAt: 1000,
  ...overrides,
});

const symbol = (id: string, overrides: Partial<SVGSymbol> = {}): SVGSymbol => ({
  id,
  name: `Symbol ${id}`,
  shapes: [],
  width: 10,
  height: 10,
  createdAt: 1000,
  ...overrides,
});

const settings: SVGSettings = {
  theme: 'nothing',
  gridSize: 20,
  snapToGrid: true,
  showGrid: true,
  showRulers: true,
  exportFormat: 'svg',
  exportScale: 2,
};

const gradient: SVGGradient = {
  id: 'g1',
  type: 'linear',
  stops: [],
};

const historyEntry: HistoryEntry = {
  id: 'h1',
  documentId: 'doc-1',
  shapes: [shape('s9')],
  layers: [layer('l9')],
  timestamp: 2000,
  label: 'edit',
};

const Consumer = () => {
  const data = useData();
  return (
    <div>
      <span data-testid="doc-count">{data.documents.length}</span>
      <span data-testid="first-title">{data.documents[0]?.title}</span>
      <span data-testid="shape-count">{data.documents[0]?.shapes.length}</span>
      <span data-testid="shape-name">{data.documents[0]?.shapes[0]?.name}</span>
      <span data-testid="shape-x">{data.documents[0]?.shapes[0]?.x}</span>
      <span data-testid="shape-width">
        {data.documents[0]?.shapes[0]?.width}
      </span>
      <span data-testid="layer-count">{data.documents[0]?.layers.length}</span>
      <span data-testid="layer-name">{data.documents[0]?.layers[0]?.name}</span>
      <span data-testid="layer-visible">
        {String(data.documents[0]?.layers[0]?.visible)}
      </span>
      <span data-testid="layer-locked">
        {String(data.documents[0]?.layers[0]?.locked)}
      </span>
      <span data-testid="gradient-count">
        {data.documents[0]?.gradients.length}
      </span>
      <span data-testid="gradient-stop">
        {data.documents[0]?.gradients[0]?.stops[0]?.color}
      </span>
      <span data-testid="symbol-count">{data.symbols.length}</span>
      <span data-testid="history-count">{data.history.length}</span>
      <span data-testid="theme">{data.settings.theme}</span>
      <span data-testid="current-title">{data.currentDocument?.title}</span>
      <span data-testid="is-loading">{String(data.isLoading)}</span>
      <button onClick={() => data.createNewDocument('New', 200, 100)}>
        create-new
      </button>
      <button onClick={() => data.createFromTemplate('tpl-logo')}>
        create-template
      </button>
      <button onClick={() => data.deleteDocument('doc-1')}>delete-doc</button>
      <button onClick={() => data.renameDocument('doc-1', 'Renamed')}>
        rename-doc
      </button>
      <button onClick={() => data.setCurrentDocument(doc('doc-1'))}>
        set-current
      </button>
      <button
        onClick={() => data.updateDocument(doc('doc-1', { title: 'Updated' }))}>
        update-doc
      </button>
      <button onClick={() => data.addShape('doc-1', shape('s2'))}>
        add-shape
      </button>
      <button
        onClick={() =>
          data.updateShape('doc-1', shape('s1', { name: 'Renamed Shape' }))
        }>
        update-shape
      </button>
      <button onClick={() => data.removeShape('doc-1', 's1')}>
        remove-shape
      </button>
      <button onClick={() => data.moveShape('doc-1', 's1', 42, 7)}>
        move-shape
      </button>
      <button onClick={() => data.resizeShape('doc-1', 's1', 50, 25)}>
        resize-shape
      </button>
      <button onClick={() => data.duplicateShape('doc-1', 's1')}>
        duplicate-shape
      </button>
      <button onClick={() => data.updateLayers('doc-1', [layer('l2')])}>
        update-layers
      </button>
      <button onClick={() => data.addLayer('doc-1', 'New Layer')}>
        add-layer
      </button>
      <button onClick={() => data.removeLayer('doc-1', 'l1')}>
        remove-layer
      </button>
      <button onClick={() => data.renameLayer('doc-1', 'l1', 'Renamed Layer')}>
        rename-layer
      </button>
      <button onClick={() => data.toggleLayerVisibility('doc-1', 'l1')}>
        toggle-vis
      </button>
      <button onClick={() => data.toggleLayerLock('doc-1', 'l1')}>
        toggle-lock
      </button>
      <button onClick={() => data.addSymbol(symbol('sym-2'))}>
        add-symbol
      </button>
      <button onClick={() => data.removeSymbol('sym-1')}>remove-symbol</button>
      <button
        onClick={() =>
          data.updateSymbol({ ...symbol('sym-1'), name: 'Renamed' })
        }>
        update-symbol
      </button>
      <button onClick={() => data.updateSettings({ theme: 'dark' })}>
        update-settings
      </button>
      <button onClick={() => data.addGradient('doc-1', gradient)}>
        add-gradient
      </button>
      <button
        onClick={() =>
          data.updateGradient('doc-1', {
            ...gradient,
            stops: [{ color: '#ff0000', offset: 0, opacity: 1 }],
          })
        }>
        update-gradient
      </button>
      <button onClick={() => data.removeGradient('doc-1', 'g1')}>
        remove-gradient
      </button>
      <button onClick={() => data.saveHistory('doc-1', 'added shape')}>
        save-history
      </button>
      <button onClick={() => data.undo('doc-1')}>undo</button>
      <button onClick={() => data.redo('doc-1')}>redo</button>
      <button onClick={() => data.undo('empty')}>undo-empty</button>
      <button onClick={() => data.undo('missing')}>undo-missing</button>
      <button onClick={() => data.redo('empty')}>redo-empty</button>
      <button onClick={() => data.redo('missing')}>redo-missing</button>
      <button onClick={() => data.refreshData()}>refresh</button>
      <button onClick={() => data.renameDocument('missing', 'X')}>
        rename-missing
      </button>
      <button onClick={() => data.addShape('missing', shape('s3'))}>
        add-shape-missing
      </button>
      <button onClick={() => data.updateShape('missing', shape('s3'))}>
        update-shape-missing
      </button>
      <button onClick={() => data.removeShape('missing', 's1')}>
        remove-shape-missing
      </button>
      <button onClick={() => data.moveShape('missing', 's1', 1, 1)}>
        move-shape-missing
      </button>
      <button onClick={() => data.resizeShape('missing', 's1', 1, 1)}>
        resize-shape-missing
      </button>
      <button onClick={() => data.duplicateShape('doc-1', 'nope')}>
        duplicate-shape-missing
      </button>
      <button onClick={() => data.duplicateShape('missing', 's1')}>
        duplicate-doc-missing
      </button>
      <button onClick={() => data.updateLayers('missing', [])}>
        update-layers-missing
      </button>
      <button onClick={() => data.addLayer('missing', 'X')}>
        add-layer-missing
      </button>
      <button onClick={() => data.removeLayer('missing', 'l1')}>
        remove-layer-missing
      </button>
      <button onClick={() => data.renameLayer('missing', 'l1', 'X')}>
        rename-layer-missing
      </button>
      <button onClick={() => data.toggleLayerVisibility('missing', 'l1')}>
        toggle-vis-missing
      </button>
      <button onClick={() => data.toggleLayerLock('missing', 'l1')}>
        toggle-lock-missing
      </button>
      <button onClick={() => data.addGradient('missing', gradient)}>
        add-gradient-missing
      </button>
      <button onClick={() => data.removeGradient('missing', 'g1')}>
        remove-gradient-missing
      </button>
      <button onClick={() => data.saveHistory('missing', 'x')}>
        save-history-missing
      </button>
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
  db.documents.getAll.mockResolvedValue([doc('doc-1')]);
  db.symbols.getAll.mockResolvedValue([symbol('sym-1')]);
  db.settings.get.mockResolvedValue(settings);
  db.history.getAll.mockResolvedValue([]);
  db.documents.get.mockImplementation((id: string) =>
    id === 'missing'
      ? Promise.resolve(undefined)
      : Promise.resolve(doc('doc-1'))
  );
  db.history.getByDocument.mockImplementation((id: string) =>
    id === 'empty' ? Promise.resolve([]) : Promise.resolve([historyEntry])
  );
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
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    expect(seedDatabase).toHaveBeenCalled();
    expect(screen.getByTestId('shape-count').textContent).toBe('1');
    expect(screen.getByTestId('symbol-count').textContent).toBe('1');
    expect(screen.getByTestId('theme').textContent).toBe('nothing');
    expect(screen.getByTestId('is-loading').textContent).toBe('false');
  });

  it('creates a new document', async () => {
    createDocument.mockResolvedValue(doc('new'));
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('create-new'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    expect(createDocument).toHaveBeenCalledWith('New', 200, 100);
  });

  it('creates a document from a template', async () => {
    createDocumentFromTemplate.mockResolvedValue(doc('tpl'));
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('create-template'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
    expect(createDocumentFromTemplate).toHaveBeenCalledWith(
      'tpl-logo',
      expect.any(Array)
    );
  });

  it('deletes a document and its history', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('delete-doc'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('0')
    );
    expect(db.documents.delete).toHaveBeenCalledWith('doc-1');
    expect(db.history.deleteByDocument).toHaveBeenCalledWith('doc-1');
  });

  it('renames a document', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('rename-doc'));
    await waitFor(() =>
      expect(screen.getByTestId('first-title').textContent).toBe('Renamed')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Renamed' })
    );
  });

  it('updates a document', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('update-doc'));
    await waitFor(() =>
      expect(screen.getByTestId('first-title').textContent).toBe('Updated')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Updated' })
    );
  });

  it('sets the current document', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('set-current'));
    expect(screen.getByTestId('current-title').textContent).toBe('Doc doc-1');
  });

  it('adds a shape', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('2')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({
        shapes: expect.arrayContaining([expect.objectContaining({ id: 's2' })]),
      })
    );
  });

  it('updates a shape', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('update-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-name').textContent).toBe('Renamed Shape')
    );
  });

  it('removes a shape', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('remove-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('0')
    );
  });

  it('moves a shape', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('move-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-x').textContent).toBe('42')
    );
  });

  it('resizes a shape', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('resize-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-width').textContent).toBe('50')
    );
  });

  it('duplicates a shape', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('duplicate-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('2')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({
        shapes: expect.arrayContaining([
          expect.objectContaining({
            id: 'generated-id',
            name: 'Shape s1 (Copy)',
          }),
        ]),
      })
    );
  });

  it('updates layers', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('update-layers'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-name').textContent).toBe('Layer l2')
    );
  });

  it('adds a layer', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-layer'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-count').textContent).toBe('2')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({
        layers: expect.arrayContaining([
          expect.objectContaining({ id: 'generated-id', name: 'New Layer' }),
        ]),
      })
    );
  });

  it('removes a layer and its shapes', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('remove-layer'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-count').textContent).toBe('0')
    );
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('0')
    );
  });

  it('renames a layer', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('rename-layer'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-name').textContent).toBe('Renamed Layer')
    );
  });

  it('toggles layer visibility', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('toggle-vis'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-visible').textContent).toBe('false')
    );
  });

  it('toggles layer lock', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('toggle-lock'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-locked').textContent).toBe('true')
    );
  });

  it('adds and removes a symbol', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('symbol-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-symbol'));
    await waitFor(() =>
      expect(screen.getByTestId('symbol-count').textContent).toBe('2')
    );
    expect(db.symbols.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'sym-2' })
    );
    fireEvent.click(screen.getByText('remove-symbol'));
    await waitFor(() =>
      expect(screen.getByTestId('symbol-count').textContent).toBe('1')
    );
    expect(db.symbols.delete).toHaveBeenCalledWith('sym-1');
  });

  it('updates a symbol', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('symbol-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('update-symbol'));
    await waitFor(() =>
      expect(db.symbols.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'sym-1', name: 'Renamed' })
      )
    );
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

  it('adds and removes a gradient', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('gradient-count').textContent).toBe('0')
    );
    fireEvent.click(screen.getByText('add-gradient'));
    await waitFor(() =>
      expect(screen.getByTestId('gradient-count').textContent).toBe('1')
    );
    db.documents.get.mockImplementation((id: string) =>
      Promise.resolve({
        ...doc('doc-1'),
        gradients: [{ ...gradient, stops: [] }],
      })
    );
    fireEvent.click(screen.getByText('update-gradient'));
    await waitFor(() =>
      expect(screen.getByTestId('gradient-stop').textContent).toBe('#ff0000')
    );
    fireEvent.click(screen.getByText('remove-gradient'));
    await waitFor(() =>
      expect(screen.getByTestId('gradient-count').textContent).toBe('0')
    );
  });

  it('saves history', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('save-history'));
    await waitFor(() =>
      expect(screen.getByTestId('history-count').textContent).toBe('1')
    );
    expect(db.history.put).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'added shape', documentId: 'doc-1' })
    );
  });

  it('undoes and redoes from history', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('set-current'));
    fireEvent.click(screen.getByText('undo'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-name').textContent).toBe('Shape s9')
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({
        shapes: [expect.objectContaining({ id: 's9' })],
      })
    );
    expect(db.history.delete).toHaveBeenCalledWith('h1');
    fireEvent.click(screen.getByText('redo'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-name').textContent).toBe('Shape s1')
    );
  });

  it('does nothing on undo when there is no history', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('undo-empty'));
    await waitFor(() => {
      expect(db.documents.put).not.toHaveBeenCalled();
    });
  });

  it('refreshes data on demand', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    db.documents.getAll.mockResolvedValue([doc('doc-1'), doc('doc-2')]);
    fireEvent.click(screen.getByText('refresh'));
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );
  });

  it('no-ops when the document does not exist', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('rename-missing'));
    fireEvent.click(screen.getByText('add-shape-missing'));
    fireEvent.click(screen.getByText('update-shape-missing'));
    fireEvent.click(screen.getByText('remove-shape-missing'));
    fireEvent.click(screen.getByText('move-shape-missing'));
    fireEvent.click(screen.getByText('resize-shape-missing'));
    fireEvent.click(screen.getByText('duplicate-shape-missing'));
    fireEvent.click(screen.getByText('duplicate-doc-missing'));
    fireEvent.click(screen.getByText('update-layers-missing'));
    fireEvent.click(screen.getByText('add-layer-missing'));
    fireEvent.click(screen.getByText('remove-layer-missing'));
    fireEvent.click(screen.getByText('rename-layer-missing'));
    fireEvent.click(screen.getByText('toggle-vis-missing'));
    fireEvent.click(screen.getByText('toggle-lock-missing'));
    fireEvent.click(screen.getByText('add-gradient-missing'));
    fireEvent.click(screen.getByText('remove-gradient-missing'));
    fireEvent.click(screen.getByText('save-history-missing'));
    fireEvent.click(screen.getByText('undo-missing'));
    await waitFor(() => {
      expect(db.documents.put).not.toHaveBeenCalled();
      expect(db.history.put).not.toHaveBeenCalled();
    });
  });

  it('updates only the matching document when others exist', async () => {
    const richDoc = doc('doc-1', {
      shapes: [shape('s1'), shape('s2')],
      layers: [layer('l1'), layer('l2')],
    });
    db.documents.getAll.mockResolvedValue([richDoc, doc('doc-2')]);
    db.documents.get.mockImplementation((id: string) =>
      id === 'missing' ? Promise.resolve(undefined) : Promise.resolve(richDoc)
    );
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );

    const click = (label: string) => {
      fireEvent.click(screen.getByText(label));
      return waitFor(() => expect(db.documents.put).toHaveBeenCalled());
    };
    const resetPut = () => db.documents.put.mockClear();

    resetPut();
    fireEvent.click(screen.getByText('set-current'));
    await click('rename-doc');
    await click('update-doc');
    await click('add-shape');
    await click('update-shape');
    await click('remove-shape');
    await click('move-shape');
    await click('resize-shape');
    await click('duplicate-shape');
    await click('update-layers');
    await click('add-layer');
    await click('remove-layer');
    await click('rename-layer');
    await click('toggle-vis');
    await click('toggle-lock');
    await click('add-gradient');
    await click('remove-gradient');
    await waitFor(() => {
      expect(db.documents.put.mock.calls.length).toBeGreaterThan(10);
    });
  });

  it('applies undo and redo to the matching document when others exist', async () => {
    db.documents.getAll.mockResolvedValue([doc('doc-1'), doc('doc-2')]);
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('2')
    );

    fireEvent.click(screen.getByText('undo'));
    fireEvent.click(screen.getByText('set-current'));
    fireEvent.click(screen.getByText('undo'));
    fireEvent.click(screen.getByText('redo'));
    await waitFor(() => {
      expect(db.history.getByDocument).toHaveBeenCalledWith('doc-1');
      expect(db.documents.put).toHaveBeenCalled();
    });
  });

  it('no-ops on redo when there is no redo stack', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('doc-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('redo-empty'));
    fireEvent.click(screen.getByText('redo-missing'));
    fireEvent.click(screen.getByText('redo'));
    await waitFor(() => {
      expect(db.documents.put).not.toHaveBeenCalled();
      expect(db.history.put).not.toHaveBeenCalled();
    });
  });

  it('wires history into mutations: undo removes an added shape and redo restores it', async () => {
    let stored = doc('doc-1');
    db.documents.get.mockImplementation(async () => stored);
    db.documents.put.mockImplementation(async (updated: SVGDocument) => {
      stored = updated;
    });
    const entries: HistoryEntry[] = [];
    db.history.put.mockImplementation(async (entry: HistoryEntry) => {
      entries.push(entry);
    });
    db.history.getByDocument.mockImplementation((id: string) =>
      id === 'doc-1' ? [...entries] : []
    );
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-shape'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('undo'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('redo'));
    await waitFor(() =>
      expect(screen.getByTestId('shape-count').textContent).toBe('2')
    );
  });

  it('wires history into mutations: undo reverts a layer visibility toggle', async () => {
    let stored = doc('doc-1');
    db.documents.get.mockImplementation(async () => stored);
    db.documents.put.mockImplementation(async (updated: SVGDocument) => {
      stored = updated;
    });
    const entries: HistoryEntry[] = [];
    db.history.put.mockImplementation(async (entry: HistoryEntry) => {
      entries.push(entry);
    });
    db.history.getByDocument.mockImplementation((id: string) =>
      id === 'doc-1' ? [...entries] : []
    );
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('layer-visible').textContent).toBe('true')
    );
    fireEvent.click(screen.getByText('toggle-vis'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-visible').textContent).toBe('false')
    );
    fireEvent.click(screen.getByText('undo'));
    await waitFor(() =>
      expect(screen.getByTestId('layer-visible').textContent).toBe('true')
    );
  });
});
