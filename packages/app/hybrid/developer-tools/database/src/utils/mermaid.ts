import type {
  ErColumn,
  ErEdge,
  ErModel,
  ErTable,
  LayoutOptions,
} from '@/utils/er';
import { buildErSvg, layoutErModel } from '@/utils/er';

export interface MermaidField {
  type: string;
  name: string;
  primaryKey: boolean;
  foreignKey: boolean;
}

export interface MermaidEntity {
  name: string;
  fields: MermaidField[];
}

export interface MermaidRelation {
  from: string;
  to: string;
  label: string;
}

export interface MermaidModel {
  entities: MermaidEntity[];
  relations: MermaidRelation[];
}

const RELATION_RE =
  /^([A-Za-z0-9_]+)\s*([|o}{]{1,2})\s*--\s*([|o}{]{1,2})\s*([A-Za-z0-9_]+)\s*(?::\s*(.+?))?\s*$/;

const ENTITY_BLOCK_RE = /^([A-Za-z0-9_]+)\s*\{\s*$/;

const INLINE_BLOCK_RE = /^([A-Za-z0-9_]+)\s*\{\s*(.*?)\s*\}$/;

const FIELD_RE = /^(\S+)\s+(?:"([^"]+)"|(\S+))(?:\s+(.*))?$/;

const ANNOTATION_RE = /^[A-Z][A-Z]*(?:,[A-Z]+)*$/;

export const parseMermaidField = (line: string): MermaidField | null => {
  const m = FIELD_RE.exec(line);
  if (!m) return null;
  const name = m[2] ?? m[3] ?? '';
  const annotations = m[4] ?? '';
  return {
    type: m[1],
    name,
    primaryKey: /\bPK\b/.test(annotations),
    foreignKey: /\bFK\b/.test(annotations),
  };
};

export const parseInlineFields = (text: string): MermaidField[] => {
  const tokens = text.split(/\s+/).filter(Boolean);
  const fields: MermaidField[] = [];
  let i = 0;
  while (i + 1 < tokens.length) {
    const type = tokens[i];
    const name = tokens[i + 1];
    const annotations: string[] = [];
    i += 2;
    while (i < tokens.length && ANNOTATION_RE.test(tokens[i])) {
      annotations.push(tokens[i]);
      i += 1;
    }
    const ann = annotations.join(' ');
    fields.push({
      type,
      name,
      primaryKey: /\bPK\b/.test(ann),
      foreignKey: /\bFK\b/.test(ann),
    });
  }
  return fields;
};

export const parseErDiagram = (source: string): MermaidModel => {
  const entities: MermaidEntity[] = [];
  const relations: MermaidRelation[] = [];
  const lines = source.split(/\r?\n/);
  let current: MermaidEntity | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('%%')) continue;
    if (current) {
      if (line === '}') {
        entities.push(current);
        current = null;
        continue;
      }
      const field = parseMermaidField(line);
      if (field) current.fields.push(field);
      continue;
    }
    const block = ENTITY_BLOCK_RE.exec(line);
    if (block) {
      current = { name: block[1], fields: [] };
      continue;
    }
    const inline = INLINE_BLOCK_RE.exec(line);
    if (inline) {
      entities.push({ name: inline[1], fields: parseInlineFields(inline[2]) });
      continue;
    }
    const rel = RELATION_RE.exec(line);
    if (rel) {
      relations.push({
        from: rel[1],
        to: rel[4],
        label: (rel[5] ?? '').replace(/^"|"$/g, ''),
      });
    }
  }
  return { entities, relations };
};

export const modelToErModel = (model: MermaidModel): ErModel => {
  const tables: ErTable[] = model.entities.map((e) => {
    const columns: ErColumn[] = e.fields.map((f) => ({
      name: f.name,
      primaryKey: f.primaryKey,
    }));
    return { name: e.name, columns, x: 0, y: 0 };
  });
  const edges: ErEdge[] = model.relations
    .filter((r) => r.from !== r.to)
    .map((r) => ({ from: r.from, fromColumn: 'id', to: r.to, toColumn: 'id' }));
  return { tables, edges };
};

export interface MermaidSvgResult {
  svg: string;
  width: number;
  height: number;
}

export const renderErDiagram = (
  source: string,
  opts?: LayoutOptions
): MermaidSvgResult | null => {
  const model = parseErDiagram(source);
  if (model.entities.length === 0) return null;
  const er = modelToErModel(model);
  const laidOut = layoutErModel(er, opts);
  return buildErSvg(laidOut, opts);
};
