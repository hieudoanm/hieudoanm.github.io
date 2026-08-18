import { useRef, useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import type { QueryHistory } from '@/types';
import type { ResultTab } from '@/types/sqlite';
import type { TableDesign } from '@/utils/schema';

export interface DbPageState {
  fileInputRef: RefObject<HTMLInputElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  sql: string;
  setSql: Dispatch<SetStateAction<string>>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarWidth: number;
  setSidebarWidth: Dispatch<SetStateAction<number>>;
  expandedTables: Record<string, boolean>;
  setExpandedTables: Dispatch<SetStateAction<Record<string, boolean>>>;
  sortCol: number | null;
  setSortCol: Dispatch<SetStateAction<number | null>>;
  sortDir: 1 | -1;
  setSortDir: Dispatch<SetStateAction<1 | -1>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  colFilters: Record<number, string>;
  setColFilters: Dispatch<SetStateAction<Record<number, string>>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  showExport: boolean;
  setShowExport: Dispatch<SetStateAction<boolean>>;
  showImport: boolean;
  setShowImport: Dispatch<SetStateAction<boolean>>;
  designerOpen: boolean;
  setDesignerOpen: Dispatch<SetStateAction<boolean>>;
  designingTable: string | null;
  setDesigningTable: Dispatch<SetStateAction<string | null>>;
  design: TableDesign | null;
  setDesign: Dispatch<SetStateAction<TableDesign | null>>;
  showViz: boolean;
  setShowViz: Dispatch<SetStateAction<boolean>>;
  tabs: ResultTab[];
  setTabs: Dispatch<SetStateAction<ResultTab[]>>;
  activeTabId: string | null;
  setActiveTabId: Dispatch<SetStateAction<string | null>>;
  history: QueryHistory[];
  setHistory: Dispatch<SetStateAction<QueryHistory[]>>;
  panel: 'history' | 'bookmarks' | null;
  setPanel: Dispatch<SetStateAction<'history' | 'bookmarks' | null>>;
  extraFolders: string[];
  setExtraFolders: Dispatch<SetStateAction<string[]>>;
  bookmarkOpen: boolean;
  setBookmarkOpen: Dispatch<SetStateAction<boolean>>;
  bmName: string;
  setBmName: Dispatch<SetStateAction<string>>;
  bmFolder: string;
  setBmFolder: Dispatch<SetStateAction<string>>;
  bmNewFolder: string;
  setBmNewFolder: Dispatch<SetStateAction<string>>;
}

export const useDbPageState = (): DbPageState => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [sql, setSql] = useState('SELECT * FROM customers LIMIT 10');
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= 640
  );
  const [sidebarWidth, setSidebarWidth] = useState(224);
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>(
    {}
  );
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [colFilters, setColFilters] = useState<Record<number, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [designerOpen, setDesignerOpen] = useState(false);
  const [designingTable, setDesigningTable] = useState<string | null>(null);
  const [design, setDesign] = useState<TableDesign | null>(null);
  const [showViz, setShowViz] = useState(false);
  const [tabs, setTabs] = useState<ResultTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [history, setHistory] = useState<QueryHistory[]>([]);
  const [panel, setPanel] = useState<'history' | 'bookmarks' | null>(null);
  const [extraFolders, setExtraFolders] = useState<string[]>([]);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [bmName, setBmName] = useState('');
  const [bmFolder, setBmFolder] = useState('');
  const [bmNewFolder, setBmNewFolder] = useState('');

  return {
    fileInputRef,
    searchInputRef,
    sql,
    setSql,
    sidebarOpen,
    setSidebarOpen,
    sidebarWidth,
    setSidebarWidth,
    expandedTables,
    setExpandedTables,
    sortCol,
    setSortCol,
    sortDir,
    setSortDir,
    page,
    setPage,
    search,
    setSearch,
    colFilters,
    setColFilters,
    isDragging,
    setIsDragging,
    showExport,
    setShowExport,
    showImport,
    setShowImport,
    designerOpen,
    setDesignerOpen,
    designingTable,
    setDesigningTable,
    design,
    setDesign,
    showViz,
    setShowViz,
    tabs,
    setTabs,
    activeTabId,
    setActiveTabId,
    history,
    setHistory,
    panel,
    setPanel,
    extraFolders,
    setExtraFolders,
    bookmarkOpen,
    setBookmarkOpen,
    bmName,
    setBmName,
    bmFolder,
    setBmFolder,
    bmNewFolder,
    setBmNewFolder,
  };
};
