import {
  seedDatabase,
  createDocument,
  createDocumentFromTemplate,
} from '@/data/seed';
import { db } from '@/lib/db';

jest.mock('@/lib/db', () => ({
  db: {
    documents: { getAll: jest.fn(), put: jest.fn() },
    symbols: { put: jest.fn() },
  },
}));

const { documents } = jest.requireMock('@/lib/db').db;

const template = {
  id: 'tpl-logo',
  name: 'Logo',
  width: 400,
  height: 400,
  shapes: [
    {
      id: 'logo-bg',
      type: 'rect' as const,
      name: 'Background',
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      rotation: 0,
      fill: { type: 'solid' as const, color: '#000', opacity: 1 },
      stroke: {
        color: '#000',
        width: 1,
        dashArray: '',
        cap: 'round' as const,
        join: 'round' as const,
      },
      opacity: 1,
      locked: false,
      visible: true,
    },
  ],
  layers: [{ id: 'layer-bg', name: 'Background', shapeIds: ['logo-bg'] }],
};

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds documents and symbols when the store is empty', async () => {
    documents.getAll.mockResolvedValue([]);
    await seedDatabase();
    const { db: mockDb } = jest.requireMock('@/lib/db');
    expect(mockDb.documents.put).toHaveBeenCalledTimes(3);
    expect(mockDb.symbols.put).toHaveBeenCalledTimes(1);
    expect(mockDb.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'doc-logo', title: 'Logo Design' })
    );
  });

  it('returns early when documents already exist', async () => {
    documents.getAll.mockResolvedValue([{ id: 'doc-logo' }]);
    await seedDatabase();
    const { db: mockDb } = jest.requireMock('@/lib/db');
    expect(mockDb.documents.put).not.toHaveBeenCalled();
    expect(mockDb.symbols.put).not.toHaveBeenCalled();
  });
});

describe('createDocument', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('persists a new document with normalized layers', async () => {
    const doc = await createDocument(
      'My Doc',
      200,
      150,
      [],
      [{ id: 'l1', name: 'Layer', shapeIds: [] }]
    );
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My Doc',
        width: 200,
        height: 150,
        shapes: [],
        symbols: [],
        gradients: [],
      })
    );
    expect(doc.layers).toEqual([
      expect.objectContaining({
        id: 'l1',
        visible: true,
        locked: false,
        blending: 'normal',
      }),
    ]);
  });

  it('uses empty defaults for shapes and layers', async () => {
    const doc = await createDocument('My Doc', 200, 150);
    expect(doc.shapes).toEqual([]);
    expect(doc.layers).toEqual([]);
  });
});

describe('createDocumentFromTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a document from a matching template', async () => {
    const doc = await createDocumentFromTemplate('tpl-logo', [template]);
    expect(doc.title).toBe('New Logo');
    expect(doc.width).toBe(400);
    expect(doc.layers).toHaveLength(1);
    expect(db.documents.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: doc.id })
    );
    const putCall = jest.mocked(db.documents.put).mock.calls[0][0];
    expect(putCall.shapes[0].id).not.toBe('logo-bg');
  });

  it('throws when the template is not found', async () => {
    await expect(
      createDocumentFromTemplate('missing', [template])
    ).rejects.toThrow('Template not found');
  });
});
