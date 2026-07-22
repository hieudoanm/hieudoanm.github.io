export interface DatabaseConnection {
  id: string;
  name: string;
  filePath: string;
  size: number;
  readOnly: boolean;
  lastConnected: number;
  createdAt: number;
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  rowCount: number;
  indexes: IndexSchema[];
}

export interface ColumnSchema {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  defaultValue?: string;
  foreignKey?: { table: string; column: string };
}

export interface IndexSchema {
  name: string;
  columns: string[];
  unique: boolean;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTime: number;
}

export interface QueryHistory {
  id: string;
  connectionId: string;
  sql: string;
  executionTime: number;
  rowCount: number;
  success: boolean;
  timestamp: number;
}

export interface Bookmark {
  id: string;
  connectionId: string;
  name: string;
  sql: string;
  folder?: string;
  createdAt: number;
}

export interface Settings {
  theme: string;
  defaultPort: number;
  editorFontSize: number;
  queryTimeout: number;
}
