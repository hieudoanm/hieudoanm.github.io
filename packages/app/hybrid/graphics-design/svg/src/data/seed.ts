import type { SVGDocument, SVGSymbol, SVGShape } from '@/types';
import { db } from '@/lib/db';
import {
  LOGO_DOCUMENT,
  ICON_DOCUMENT,
  ILLUSTRATION_DOCUMENT,
  DEMO_SYMBOLS,
} from '@/data/models';

const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const SEED_DOCUMENTS: SVGDocument[] = [
  LOGO_DOCUMENT,
  ICON_DOCUMENT,
  ILLUSTRATION_DOCUMENT,
];

const SEED_SYMBOLS: SVGSymbol[] = DEMO_SYMBOLS;

export const seedDatabase = async (): Promise<void> => {
  const existing = await db.documents.getAll();
  if (existing.length > 0) return;

  for (const doc of SEED_DOCUMENTS) {
    await db.documents.put(doc);
  }
  for (const sym of SEED_SYMBOLS) {
    await db.symbols.put(sym);
  }
};

export const createDocument = async (
  title: string,
  width: number,
  height: number,
  shapes: SVGShape[] = [],
  layers: { id: string; name: string; shapeIds: string[] }[] = []
): Promise<SVGDocument> => {
  const doc: SVGDocument = {
    id: generateId(),
    title,
    width,
    height,
    shapes,
    layers: layers.map((l) => ({
      ...l,
      visible: true,
      locked: false,
      blending: 'normal',
    })),
    symbols: [],
    gradients: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await db.documents.put(doc);
  return doc;
};

export const createDocumentFromTemplate = async (
  templateId: string,
  templates: {
    id: string;
    name: string;
    width: number;
    height: number;
    shapes: SVGShape[];
    layers: { id: string; name: string; shapeIds: string[] }[];
  }[]
): Promise<SVGDocument> => {
  const template = templates.find((t) => t.id === templateId);
  if (!template) throw new Error('Template not found');
  return createDocument(
    `New ${template.name}`,
    template.width,
    template.height,
    template.shapes.map((s) => ({ ...s, id: generateId() })),
    template.layers
  );
};

export { generateId };
