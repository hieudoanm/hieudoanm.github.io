import { useCallback, useEffect, useRef, useState } from 'react';
import type { FileNode, OpenTab } from '../utils/tree';
import {
  SKIP_DIRS,
  mergeChildren,
  removeFromTree,
  sortChildren,
} from '../utils/tree';
import { useErrorModal } from './useErrorModal';
import { createTryCatch } from '../utils/try-catch';

export interface SearchResult {
  path: string;
  line: number;
  text: string;
}

export interface ContextMenuState {
  x: number;
  y: number;
  path: string;
  name: string;
  isDir: boolean;
}

type SidebarState = 'closed' | 'explorer' | 'search';

const INITIAL_WIDTH: number = 320;

export const useCodePage = () => {
  const [root, setRoot] = useState<FileNode | null>(null);
  const [tabs, setTabs] = useState<OpenTab[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [sidebarState, setSidebarState] = useState<SidebarState>('explorer');
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_WIDTH);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [rootPath, setRootPath] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [showFilePrompt, setShowFilePrompt] = useState(false);
  const [theme, setTheme] = useState<'dim' | 'winter'>('dim');
  const [showQuickOpen, setShowQuickOpen] = useState(false);
  const [quickOpenQuery, setQuickOpenQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState<
    SearchResult[]
  >([]);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [showRenamePrompt, setShowRenamePrompt] = useState(false);
  const [renameTarget, setRenameTarget] = useState<string | null>(null);
  const [showDuplicatePrompt, setShowDuplicatePrompt] = useState(false);
  const [duplicateTarget, setDuplicateTarget] = useState<string | null>(null);
  const [showGoToLine, setShowGoToLine] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [showDirPrompt, setShowDirPrompt] = useState(false);
  const [globalSearching, setGlobalSearching] = useState(false);
  const { error, showError, hideError } = useErrorModal();
  const tryCatch = createTryCatch(showError);
  const sidebarWidthRef = useRef(INITIAL_WIDTH);
  const recentTabsRef = useRef<string[]>([]);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTabRef = useRef<(path: string) => void>(
    null as unknown as (path: string) => void
  );
  const activePathRef = useRef(activePath);

  useEffect(() => {
    closeTabRef.current = closeTab;
    activePathRef.current = activePath;
  });
  useEffect(() => {
    activePathRef.current = activePath;
  });

  useEffect(() => {
    sidebarWidthRef.current = sidebarWidth;
  }, [sidebarWidth]);

  const getActiveContent = useCallback(() => {
    return tabs.find((t) => t.path === activePath);
  }, [tabs, activePath]);

  const refreshTree = useCallback(
    async (path: string) => {
      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { readDir } = fs;

      const entries = await tryCatch(() => readDir(path), 'read directory');
      if (!entries) return;

      const rootName = path.split('/').filter(Boolean).pop() || 'root';
      const children: FileNode[] = [];

      for (const entry of entries) {
        if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
        const full = `${path}/${entry.name}`;
        if (entry.isDirectory) {
          children.push({ type: 'dir', name: entry.name, path: full });
        } else {
          children.push({ type: 'file', name: entry.name, path: full });
        }
      }

      sortChildren(children);
      setRoot({ type: 'dir', name: rootName, path, children });
    },
    [tryCatch]
  );

  const loadDirChildren = useCallback(
    async (dirPath: string) => {
      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { readDir } = fs;

      const entries = await tryCatch(() => readDir(dirPath), 'read directory');
      if (!entries) return;

      const children: FileNode[] = [];

      for (const entry of entries) {
        if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
        const full = `${dirPath}/${entry.name}`;
        if (entry.isDirectory) {
          children.push({ type: 'dir', name: entry.name, path: full });
        } else {
          children.push({ type: 'file', name: entry.name, path: full });
        }
      }

      sortChildren(children);
      setRoot((prev) => (prev ? mergeChildren(prev, dirPath, children) : prev));
    },
    [tryCatch]
  );

  const openFolder = useCallback(async () => {
    const dialog = await tryCatch(
      () => import('@tauri-apps/plugin-dialog'),
      'load dialog plugin'
    );
    if (!dialog) return;
    const { open } = dialog;

    const selected = (await tryCatch(
      () =>
        open({ directory: true, multiple: false }) as Promise<string | null>,
      'open folder dialog'
    )) as string | null;
    if (!selected) return;

    setRootPath(selected);
    await refreshTree(selected);
    setTabs([]);
    setActivePath(null);
  }, [tryCatch, refreshTree]);

  const openFileFromTree = useCallback(
    async (path: string) => {
      const existing = tabs.find((t) => t.path === path);
      if (existing) {
        setActivePath(path);
        recentTabsRef.current = [
          path,
          ...recentTabsRef.current.filter((p) => p !== path),
        ];
        return;
      }

      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { readTextFile } = fs;

      const content = await tryCatch(() => readTextFile(path), 'read file');
      if (content === undefined) return;

      setTabs((prev) => [...prev, { path, content, original: content }]);
      setActivePath(path);
      recentTabsRef.current = [
        path,
        ...recentTabsRef.current.filter((p) => p !== path),
      ];
    },
    [tabs, tryCatch]
  );

  const openFileDialog = useCallback(async () => {
    const dialog = await tryCatch(
      () => import('@tauri-apps/plugin-dialog'),
      'load dialog plugin'
    );
    if (!dialog) return;
    const { open } = dialog;

    const selected = (await tryCatch(
      () => open({ multiple: false }) as Promise<string | null>,
      'open file dialog'
    )) as string | null;
    if (!selected) return;

    await openFileFromTree(selected);
  }, [tryCatch, openFileFromTree]);

  const closeTab = useCallback(
    (path: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.path === path);
        const next = prev.filter((t) => t.path !== path);
        if (path === activePath && next.length > 0) {
          const newIdx = Math.min(idx, next.length - 1);
          setActivePath(next[newIdx].path);
        } else if (next.length === 0) {
          setActivePath(null);
        }
        return next;
      });
      recentTabsRef.current = recentTabsRef.current.filter((p) => p !== path);
    },
    [activePath]
  );

  const closeAllTabs = useCallback(() => {
    setTabs([]);
    setActivePath(null);
    recentTabsRef.current = [];
  }, []);

  const handleCreateFile = useCallback(
    async (name: string) => {
      if (!rootPath) return;

      const filePath = `${rootPath}/${name}`;
      const exists = root?.children?.some((c) => c.path === filePath);
      if (exists) {
        showError({ message: `"${name}" already exists` });
        return;
      }

      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { writeTextFile } = fs;

      const ok = await tryCatch.void(
        () => writeTextFile(filePath, ''),
        'create file'
      );
      if (!ok) return;

      setRoot((prev) => {
        if (!prev) return prev;
        const newFile: FileNode = { type: 'file', name, path: filePath };
        const children = [...(prev.children ?? []), newFile];
        sortChildren(children);
        return { ...prev, children };
      });
      await refreshTree(rootPath);
    },
    [rootPath, tryCatch, refreshTree, root, showError]
  );

  const addFile = useCallback(() => {
    setShowFilePrompt(true);
  }, []);

  const deleteFile = useCallback(
    async (path: string) => {
      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { remove } = fs;

      const ok = await tryCatch.void(() => remove(path), 'delete file');
      if (!ok) return;

      closeTab(path);
      setRoot((prev) => (prev ? removeFromTree(prev, path) : prev));
      if (rootPath) await refreshTree(rootPath);
    },
    [rootPath, tryCatch, refreshTree, closeTab]
  );

  const saveFile = useCallback(async () => {
    const tab = tabs.find((t) => t.path === activePath);
    if (!tab || tab.content === tab.original) return;

    const fs = await tryCatch(
      () => import('@tauri-apps/plugin-fs'),
      'load fs plugin'
    );
    if (!fs) return;
    const { writeTextFile } = fs;

    const ok = await tryCatch.void(
      () => writeTextFile(tab.path, tab.content),
      'save file'
    );
    if (!ok) return;

    setTabs((prev) =>
      prev.map((t) =>
        t.path === activePath ? { ...t, original: t.content } : t
      )
    );
  }, [tabs, activePath, tryCatch]);

  const handleChange = useCallback(
    (content: string) => {
      setTabs((prev) =>
        prev.map((t) => (t.path === activePath ? { ...t, content } : t))
      );
    },
    [activePath]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dim' ? 'winter' : 'dim';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const toggleWordWrap = useCallback(() => {
    setWordWrap((prev) => !prev);
  }, []);

  const saveFileAs = useCallback(async () => {
    const active = tabs.find((t) => t.path === activePath);
    if (!active) return;

    const dialog = await tryCatch(
      () => import('@tauri-apps/plugin-dialog'),
      'load dialog plugin'
    );
    if (!dialog) return;
    const { save } = dialog;

    const filePath = (await tryCatch(
      () =>
        save({
          defaultPath: active.path.split('/').pop(),
        }) as Promise<string | null>,
      'save file as dialog'
    )) as string | null;
    if (!filePath) return;

    const fs = await tryCatch(
      () => import('@tauri-apps/plugin-fs'),
      'load fs plugin'
    );
    if (!fs) return;
    const { writeTextFile } = fs;

    const ok = await tryCatch.void(
      () => writeTextFile(filePath, active.content),
      'save file as'
    );
    if (!ok) return;

    setTabs((prev) => [
      ...prev,
      { path: filePath, content: active.content, original: active.content },
    ]);
    setActivePath(filePath);
  }, [tabs, activePath, tryCatch]);

  const handleZoomIn = useCallback(() => {
    setFontSize((prev) => Math.min(prev + 1, 40));
  }, []);

  const handleZoomOut = useCallback(() => {
    setFontSize((prev) => Math.max(prev - 1, 8));
  }, []);

  const handleZoomReset = useCallback(() => {
    setFontSize(13);
  }, []);

  const registerTabAccess = useCallback((path: string) => {
    recentTabsRef.current = [
      path,
      ...recentTabsRef.current.filter((p) => p !== path),
    ];
  }, []);

  const handleRename = useCallback(
    async (newName: string) => {
      if (!renameTarget || !rootPath) return;

      const parts = renameTarget.split('/');
      parts[parts.length - 1] = newName;
      const newPath = parts.join('/');

      if (renameTarget === newPath) {
        setRenameTarget(null);
        setShowRenamePrompt(false);
        return;
      }

      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { rename } = fs;

      const ok = await tryCatch.void(
        () => rename(renameTarget, newPath),
        'rename'
      );
      if (!ok) return;

      setTabs((prev) =>
        prev.map((t) => (t.path === renameTarget ? { ...t, path: newPath } : t))
      );
      if (activePath === renameTarget) setActivePath(newPath);
      setRenameTarget(null);
      setShowRenamePrompt(false);
      if (rootPath) await refreshTree(rootPath);
    },
    [renameTarget, rootPath, tryCatch, refreshTree, activePath]
  );

  const handleGoToLine = useCallback(async (line: number) => {
    setShowGoToLine(false);
  }, []);

  const handleDuplicate = useCallback(
    async (newName: string) => {
      if (!duplicateTarget || !rootPath) return;

      const parts = duplicateTarget.split('/');
      parts[parts.length - 1] = newName;
      const newPath = parts.join('/');

      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { readTextFile, writeTextFile } = fs;

      const content = await tryCatch(
        () => readTextFile(duplicateTarget),
        'read file for duplicate'
      );
      if (content === undefined) return;

      const ok = await tryCatch.void(
        () => writeTextFile(newPath, content),
        'write duplicate'
      );
      if (!ok) return;

      setDuplicateTarget(null);
      setShowDuplicatePrompt(false);
      if (rootPath) await refreshTree(rootPath);
    },
    [duplicateTarget, rootPath, tryCatch, refreshTree]
  );

  const handleCreateDir = useCallback(
    async (name: string) => {
      if (!rootPath) return;

      const dirPath = `${rootPath}/${name}`;

      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { mkdir } = fs;

      const ok = await tryCatch.void(() => mkdir(dirPath), 'create dir');
      if (!ok) return;

      setShowDirPrompt(false);
      if (rootPath) await refreshTree(rootPath);
    },
    [rootPath, tryCatch, refreshTree]
  );

  const openContextMenu = useCallback(
    (e: React.MouseEvent, path: string, name: string, isDir: boolean) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, path, name, isDir });
    },
    []
  );

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const searchFiles = useCallback(
    async (query: string) => {
      if (!query.trim() || !rootPath) {
        setGlobalSearchResults([]);
        return;
      }

      setGlobalSearching(true);

      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) {
        setGlobalSearching(false);
        return;
      }
      const { readTextFile, readDir } = fs;

      const results: SearchResult[] = [];
      const searchLower = query.toLowerCase();

      const walkDir = async (dirPath: string) => {
        const entries = await tryCatch(
          () => readDir(dirPath),
          'read dir for search'
        );
        if (!entries) return;

        for (const entry of entries) {
          if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
          const full = `${dirPath}/${entry.name}`;
          if (entry.isDirectory) {
            await walkDir(full);
          } else {
            const content = await tryCatch(
              () => readTextFile(full),
              'read for search'
            );
            if (content === undefined) continue;
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].toLowerCase().includes(searchLower)) {
                results.push({
                  path: full,
                  line: i + 1,
                  text: lines[i].trim().slice(0, 200),
                });
              }
            }
          }
        }
      };

      await walkDir(rootPath);
      setGlobalSearchResults(results);
      setGlobalSearching(false);
    },
    [rootPath, tryCatch]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'b' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          setSidebarState((v) => (v !== 'closed' ? 'closed' : 'explorer'));
          return;
        }

        if (e.key === 'p' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          setShowQuickOpen(true);
          setQuickOpenQuery('');
          return;
        }

        if (e.key === 'Shift' && e.shiftKey && e.key.toLowerCase() === 'f') {
          e.preventDefault();
          setSidebarState((v) => (v !== 'search' ? 'search' : 'closed'));
          return;
        }

        if (e.key === '=' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          handleZoomIn();
          return;
        }

        if (e.key === '-' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          handleZoomOut();
          return;
        }

        if (e.key === '0' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          handleZoomReset();
          return;
        }

        if (e.key === '/' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          setShowShortcuts((v) => !v);
          return;
        }

        if (e.key === 'w' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          const path = activePathRef.current;
          if (path) closeTabRef.current(path);
          return;
        }

        if (e.key === 's' && e.shiftKey && !e.altKey) {
          e.preventDefault();
          saveFileAs();
          return;
        }

        if (e.key === 'Tab' && e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          const recent = recentTabsRef.current;
          if (recent.length > 1) {
            const next = recent[1];
            const tab = tabs.find((t) => t.path === next);
            if (tab) setActivePath(next);
          }
          return;
        }

        if (e.key === 'g' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          setShowGoToLine(true);
          return;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [tabs]);

  const handleSidebarDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidthRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(
        160,
        Math.min(600, startWidth + e.clientX - startX)
      );
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const startRename = useCallback((path: string) => {
    setRenameTarget(path);
    setShowRenamePrompt(true);
    setContextMenu(null);
  }, []);

  const startDuplicate = useCallback((path: string) => {
    setDuplicateTarget(path);
    setShowDuplicatePrompt(true);
    setContextMenu(null);
  }, []);

  const collectAllFiles = useCallback(async (): Promise<string[]> => {
    if (!rootPath) return [];

    const fs = await tryCatch(
      () => import('@tauri-apps/plugin-fs'),
      'load fs plugin'
    );
    if (!fs) return [];
    const { readDir } = fs;

    const files: string[] = [];

    const walk = async (dirPath: string) => {
      const entries = await tryCatch(() => readDir(dirPath), 'read dir');
      if (!entries) return;
      for (const entry of entries) {
        if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
        const full = `${dirPath}/${entry.name}`;
        if (entry.isDirectory) {
          await walk(full);
        } else {
          files.push(full);
        }
      }
    };

    await walk(rootPath);
    return files;
  }, [rootPath, tryCatch]);

  useEffect(() => {
    if (!showQuickOpen) {
      setQuickOpenQuery('');
    }
  }, [showQuickOpen]);

  useEffect(() => {
    const dirtyTab = tabs.find((t) => t.content !== t.original);
    if (!dirtyTab) return;

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(async () => {
      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { writeTextFile } = fs;

      const ok = await tryCatch.void(
        () => writeTextFile(dirtyTab.path, dirtyTab.content),
        'autosave'
      );
      if (!ok) return;

      setTabs((prev) =>
        prev.map((t) =>
          t.path === dirtyTab.path ? { ...t, original: t.content } : t
        )
      );
    }, 2000);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [tabs, tryCatch]);

  useEffect(() => {
    if (!rootPath) return;

    const interval = setInterval(async () => {
      const fs = await tryCatch(
        () => import('@tauri-apps/plugin-fs'),
        'load fs plugin'
      );
      if (!fs) return;
      const { readDir } = fs;

      const entries = await tryCatch(() => readDir(rootPath), 'watch dir');
      if (!entries) return;

      setRoot((prev) => {
        if (!prev) return prev;
        const existingPaths = new Set((prev.children ?? []).map((c) => c.path));
        let changed = false;

        for (const entry of entries) {
          if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
          const full = `${rootPath}/${entry.name}`;
          if (!existingPaths.has(full)) {
            changed = true;
            break;
          }
        }

        if (changed) {
          refreshTree(rootPath);
        }

        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [rootPath, tryCatch, refreshTree]);

  const activeTab = getActiveContent();
  const dirty = activeTab ? activeTab.content !== activeTab.original : false;
  const dirtyTabs = tabs.map((t) => ({
    path: t.path,
    dirty: t.content !== t.original,
  }));

  return {
    root,
    tabs,
    activePath,
    sidebarState,
    sidebarWidth,
    cursorPos,
    rootPath,
    pendingDelete,
    showFilePrompt,
    theme,
    showQuickOpen,
    quickOpenQuery,
    globalSearchQuery,
    globalSearchResults,
    contextMenu,
    showRenamePrompt,
    renameTarget,
    showDuplicatePrompt,
    duplicateTarget,
    showGoToLine,
    fontSize,
    showShortcuts,
    setShowShortcuts,
    wordWrap,
    showDirPrompt,
    globalSearching,
    error,
    showError,
    hideError,
    tryCatch,
    refreshTree,
    loadDirChildren,
    openFolder,
    openFileFromTree,
    openFileDialog,
    closeTab,
    closeAllTabs,
    handleCreateFile,
    addFile,
    deleteFile,
    saveFile,
    saveFileAs,
    handleChange,
    handleSidebarDragStart,
    setSidebarState,
    setPendingDelete,
    setShowFilePrompt,
    setActivePath,
    setCursorPos,
    activeTab,
    dirty,
    dirtyTabs,
    toggleTheme,
    toggleWordWrap,
    registerTabAccess,
    handleRename,
    handleGoToLine,
    handleDuplicate,
    handleCreateDir,
    openContextMenu,
    closeContextMenu,
    startRename,
    startDuplicate,
    searchFiles,
    collectAllFiles,
    setShowQuickOpen,
    setQuickOpenQuery,
    setGlobalSearchQuery,
    setShowGoToLine,
    setShowDirPrompt,
    setContextMenu,
    setRenameTarget,
    setShowRenamePrompt,
    setDuplicateTarget,
    setShowDuplicatePrompt,
  };
};
