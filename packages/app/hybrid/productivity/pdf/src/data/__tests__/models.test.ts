import {
  generateId,
  MOCK_DOCUMENTS,
  MOCK_ANNOTATIONS,
  MOCK_BOOKMARKS,
} from '@/data/models';

describe('generateId', () => {
  it('generates unique ids', () => {
    const a = generateId();
    const b = generateId();
    expect(a).not.toBe(b);
    expect(a).toContain('-');
  });
});

describe('MOCK_DOCUMENTS', () => {
  it('provides eight seeded documents', () => {
    expect(MOCK_DOCUMENTS).toHaveLength(8);
    expect(MOCK_DOCUMENTS.map((d) => d.id)).toEqual([
      'doc-1',
      'doc-2',
      'doc-3',
      'doc-4',
      'doc-5',
      'doc-6',
      'doc-7',
      'doc-8',
    ]);
  });

  it('matches the page count with generated pages', () => {
    for (const doc of MOCK_DOCUMENTS) {
      expect(doc.pages).toHaveLength(doc.pageCount);
      expect(doc.pages[0]).toMatchObject({
        documentId: doc.id,
        pageNumber: 1,
        rotation: 0,
      });
      expect(doc.pages[0].textBlocks.length).toBeGreaterThan(0);
      expect(doc.pages[0].images.length).toBeGreaterThan(0);
    }
  });

  it('includes file metadata for each document', () => {
    for (const doc of MOCK_DOCUMENTS) {
      expect(doc.filename).toMatch(/\.pdf$/);
      expect(doc.fileSize).toBeGreaterThan(0);
      expect(doc.thumbnailColor).toMatch(/^#/);
      expect(doc.createdAt).toBeLessThanOrEqual(Date.now());
    }
  });
});

describe('MOCK_ANNOTATIONS', () => {
  it('provides seeded annotations referencing seeded documents', () => {
    expect(MOCK_ANNOTATIONS).toHaveLength(3);
    const docIds = new Set(MOCK_DOCUMENTS.map((d) => d.id));
    for (const ann of MOCK_ANNOTATIONS) {
      expect(docIds.has(ann.documentId)).toBe(true);
      expect(ann.pageNumber).toBeGreaterThan(0);
      expect(ann.type).toBeTruthy();
    }
  });
});

describe('MOCK_BOOKMARKS', () => {
  it('provides seeded bookmarks referencing seeded documents', () => {
    expect(MOCK_BOOKMARKS).toHaveLength(5);
    const docIds = new Set(MOCK_DOCUMENTS.map((d) => d.id));
    for (const bm of MOCK_BOOKMARKS) {
      expect(docIds.has(bm.documentId)).toBe(true);
      expect(bm.title).toBeTruthy();
      expect(bm.pageNumber).toBeGreaterThan(0);
    }
  });
});
