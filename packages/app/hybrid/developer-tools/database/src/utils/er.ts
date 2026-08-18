import type { SqliteCell, SqliteDatabase } from '@/types/sqlite';
import { escapeIdentifier, tableNameList } from '@/utils/sqlDump';
import { readTableDesign } from '@/utils/schema';

export interface ErColumn {
  name: string;
  primaryKey: boolean;
}

export interface ErTable {
  name: string;
  columns: ErColumn[];
  x: number;
  y: number;
}

export interface ErEdge {
  from: string;
  fromColumn: string;
  to: string;
  toColumn: string;
}

export interface ErModel {
  tables: ErTable[];
  edges: ErEdge[];
}

export const buildErModel = (instance: SqliteDatabase): ErModel => {
  const tables: ErTable[] = [];
  const edges: ErEdge[] = [];
  for (const name of tableNameList(instance)) {
    const design = readTableDesign(
      (sql) =>
        instance.exec(sql).map((r) => ({
          columns: r.columns,
          values: r.values as SqliteCell[][],
        })),
      name
    );
    tables.push({
      name,
      columns: design.columns.map((c) => ({
        name: c.name,
        primaryKey: c.primaryKey,
      })),
      x: 0,
      y: 0,
    });
    for (const fk of design.foreignKeys) {
      edges.push({
        from: name,
        fromColumn: fk.from,
        to: fk.table,
        toColumn: fk.to || 'id',
      });
    }
  }
  return { tables, edges };
};

export interface LayoutOptions {
  columns: number;
  gapX: number;
  gapY: number;
  tableWidth: number;
  headerHeight: number;
  rowHeight: number;
  padding: number;
}

export const DEFAULT_OPTS: LayoutOptions = {
  columns: 3,
  gapX: 200,
  gapY: 80,
  tableWidth: 220,
  headerHeight: 40,
  rowHeight: 24,
  padding: 40,
};

export const tableHeight = (t: ErTable, opts: LayoutOptions): number =>
  opts.headerHeight + Math.max(1, t.columns.length) * opts.rowHeight + 16;

export const layoutErModel = (
  model: ErModel,
  opts: LayoutOptions = DEFAULT_OPTS
): ErModel => {
  const sorted = [...model.tables].sort((a, b) => a.name.localeCompare(b.name));
  const colWidth = opts.tableWidth + opts.gapX;
  const tables = sorted.map((t, i) => {
    const col = i % opts.columns;
    const row = Math.floor(i / opts.columns);
    const h = tableHeight(t, opts);
    return {
      ...t,
      x: opts.padding + col * colWidth,
      y: opts.padding + row * (opts.gapY + h),
    };
  });
  return { tables, edges: model.edges };
};

export const erBounds = (
  model: ErModel,
  opts: LayoutOptions = DEFAULT_OPTS
): { width: number; height: number } => {
  let maxX = 0;
  let maxY = 0;
  for (const t of model.tables) {
    maxX = Math.max(maxX, t.x + opts.tableWidth);
    maxY = Math.max(maxY, t.y + tableHeight(t, opts));
  }
  return { width: maxX + opts.padding, height: maxY + opts.padding };
};

export const buildErSvg = (
  model: ErModel,
  opts: LayoutOptions = DEFAULT_OPTS
): { svg: string; width: number; height: number } => {
  const { width, height } = erBounds(model, opts);
  const escapeXml = (s: string): string =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const boxes = model.tables
    .map((t) => {
      const h = tableHeight(t, opts);
      const rows = t.columns
        .map(
          (c, ci) =>
            `      <text x="${t.x + 12}" y="${
              t.y + opts.headerHeight + ci * opts.rowHeight + 16
            }" font-size="11" fill="#9ca3af">${
              c.primaryKey ? '&#128273; ' : ''
            }${escapeXml(c.name)}</text>`
        )
        .join('\n');
      return `  <g data-table="${escapeXml(t.name)}">
    <rect x="${t.x}" y="${t.y}" width="${opts.tableWidth}" height="${h}" rx="8" fill="#1e293b" stroke="#334155"/>
    <path d="M ${t.x} ${t.y + opts.headerHeight} L ${
      t.x + opts.tableWidth
    } ${t.y + opts.headerHeight}" stroke="#334155"/>
    <text x="${t.x + 12}" y="${t.y + 26}" font-size="13" font-weight="600" fill="#e2e8f0">${escapeXml(
      t.name
    )}</text>
${rows}
  </g>`;
    })
    .join('\n');
  const links = model.edges
    .map((e) => {
      const from = model.tables.find((t) => t.name === e.from);
      const to = model.tables.find((t) => t.name === e.to);
      if (!from || !to) return '';
      const x1 = from.x + opts.tableWidth;
      const y1 = from.y + opts.headerHeight + 12;
      const x2 = to.x;
      const y2 = to.y + opts.headerHeight + 12;
      const mid = (x1 + x2) / 2;
      return `  <path d="M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="5 3" data-edge="${escapeXml(
        e.from
      )}.${escapeXml(e.to)}"/>`;
    })
    .filter(Boolean)
    .join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="ui-monospace, SFMono-Regular, monospace">
  <rect width="100%" height="100%" fill="#0f172a"/>
${boxes}
${links}
</svg>`;
  return { svg, width, height };
};
