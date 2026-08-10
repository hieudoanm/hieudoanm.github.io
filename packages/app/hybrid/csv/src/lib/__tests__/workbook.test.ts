import {
  addActiveColumn,
  addActiveRow,
  addSheet,
  columnWidth,
  createSheet,
  createWorkbook,
  deleteActiveColumn,
  deleteActiveRow,
  getActiveSheet,
  removeSheet,
  renameSheet,
  rowHeight,
  setActiveCell,
  setActiveCellComment,
  setActiveColumnWidth,
  setActiveFreeze,
  setActiveRowHeight,
  setActiveSheet,
  setActiveSheetGrid,
  sortActiveSheet,
} from '@/lib/workbook';

describe('workbook', () => {
  it('creates a workbook with a default sheet', () => {
    const workbook = createWorkbook();
    expect(workbook.sheets).toHaveLength(1);
    expect(workbook.activeSheetId).toBe(workbook.sheets[0].id);
    expect(getActiveSheet(workbook).grid).toHaveLength(10);
  });

  it('returns the active sheet by id', () => {
    const a = createSheet('A', 1, 1);
    const b = createSheet('B', 2, 2);
    const workbook = { sheets: [a, b], activeSheetId: b.id };
    expect(getActiveSheet(workbook)).toBe(b);
  });

  it('updates a cell immutably', () => {
    const workbook = createWorkbook();
    const next = setActiveCell(workbook, 1, 1, 'x');
    expect(getActiveSheet(next).grid[1][1]).toBe('x');
    expect(getActiveSheet(workbook).grid[1][1]).toBe('');
  });

  it('adds and deletes rows and columns', () => {
    let workbook = setActiveCell(createWorkbook(), 0, 0, 'keep');
    workbook = addActiveRow(workbook);
    expect(getActiveSheet(workbook).grid).toHaveLength(11);
    workbook = deleteActiveRow(workbook, 10);
    expect(getActiveSheet(workbook).grid).toHaveLength(10);
    workbook = addActiveColumn(workbook);
    expect(getActiveSheet(workbook).grid[0]).toHaveLength(6);
    workbook = deleteActiveColumn(workbook, 5);
    expect(getActiveSheet(workbook).grid[0]).toHaveLength(5);
    expect(getActiveSheet(workbook).grid[0][0]).toBe('keep');
  });

  it('keeps a single row or column intact on delete', () => {
    const workbook = setActiveSheetGrid(createWorkbook(), [['a']]);
    expect(deleteActiveRow(workbook, 0)).toEqual(workbook);
    expect(deleteActiveColumn(workbook, 0)).toEqual(workbook);
  });

  it('replaces the active sheet grid', () => {
    const workbook = setActiveSheetGrid(createWorkbook(), [['x']]);
    expect(getActiveSheet(workbook).grid).toEqual([['x']]);
  });

  it('sorts rows by a column in both directions', () => {
    let workbook = setActiveSheetGrid(createWorkbook(), [['b'], ['a'], ['c']]);
    workbook = sortActiveSheet(workbook, 0, 'asc');
    expect(getActiveSheet(workbook).grid.map((r) => r[0])).toEqual([
      'a',
      'b',
      'c',
    ]);
    workbook = sortActiveSheet(workbook, 0, 'desc');
    expect(getActiveSheet(workbook).grid.map((r) => r[0])).toEqual([
      'c',
      'b',
      'a',
    ]);
  });

  it('keeps empty cells at the bottom when sorting', () => {
    let workbook = setActiveSheetGrid(createWorkbook(), [
      ['b'],
      [''],
      ['a'],
      [''],
    ]);
    workbook = sortActiveSheet(workbook, 0, 'asc');
    expect(getActiveSheet(workbook).grid.map((r) => r[0])).toEqual([
      'a',
      'b',
      '',
      '',
    ]);
    workbook = sortActiveSheet(workbook, 0, 'desc');
    expect(getActiveSheet(workbook).grid.map((r) => r[0])).toEqual([
      'b',
      'a',
      '',
      '',
    ]);
  });

  it('resizes columns and rows with defaults as fallback', () => {
    const workbook = createWorkbook();
    expect(columnWidth(getActiveSheet(workbook), 3)).toBe(128);
    expect(rowHeight(getActiveSheet(workbook), 3)).toBe(28);
    const resized = setActiveColumnWidth(workbook, 2, 200);
    expect(columnWidth(getActiveSheet(resized), 2)).toBe(200);
    const tall = setActiveRowHeight(workbook, 1, 40);
    expect(rowHeight(getActiveSheet(tall), 1)).toBe(40);
  });

  it('freezes rows and columns', () => {
    const workbook = setActiveFreeze(createWorkbook(), 1, 1);
    const sheet = getActiveSheet(workbook);
    expect(sheet.frozenRows).toBe(1);
    expect(sheet.frozenCols).toBe(1);
  });

  it('adds and removes cell comments', () => {
    let workbook = setActiveCellComment(createWorkbook(), 0, 0, 'note');
    expect(getActiveSheet(workbook).comments['0:0']).toBe('note');
    workbook = setActiveCellComment(workbook, 0, 0, '');
    expect(getActiveSheet(workbook).comments['0:0']).toBeUndefined();
  });

  it('adds, removes, renames and switches sheets', () => {
    let workbook = createWorkbook();
    const first = workbook.sheets[0];
    workbook = addSheet(workbook);
    expect(workbook.sheets).toHaveLength(2);
    const second = workbook.sheets[1];
    expect(workbook.activeSheetId).toBe(second.id);

    workbook = setActiveSheet(workbook, first.id);
    expect(workbook.activeSheetId).toBe(first.id);
    workbook = renameSheet(workbook, second.id, 'Data');
    expect(workbook.sheets[1].name).toBe('Data');

    workbook = removeSheet(workbook, second.id);
    expect(workbook.sheets).toHaveLength(1);
    expect(workbook.activeSheetId).toBe(first.id);
  });

  it('keeps at least one sheet', () => {
    const workbook = createWorkbook();
    expect(removeSheet(workbook, workbook.sheets[0].id)).toBe(workbook);
  });
});
