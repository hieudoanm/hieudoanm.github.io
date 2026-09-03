'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  SVGDocument,
  SVGShape,
  SVGLayer,
  SVGSymbol,
  SVGSettings,
  SVGGradient,
  HistoryEntry,
} from '@/types';
import { db } from '@/lib/db';
import {
  seedDatabase,
  createDocument,
  createDocumentFromTemplate,
} from '@/data/seed';
import { SVG_TEMPLATES } from '@/data/models';
import { generateId } from '@/utils/format';

interface DataContextType {
  documents: SVGDocument[];
  symbols: SVGSymbol[];
  settings: SVGSettings;
  history: HistoryEntry[];
  currentDocument: SVGDocument | null;
  isLoading: boolean;
  createNewDocument: (
    title: string,
    width: number,
    height: number
  ) => Promise<SVGDocument>;
  createFromTemplate: (templateId: string) => Promise<SVGDocument>;
  deleteDocument: (id: string) => Promise<void>;
  renameDocument: (id: string, title: string) => Promise<void>;
  setCurrentDocument: (doc: SVGDocument | null) => void;
  updateDocument: (doc: SVGDocument) => Promise<void>;
  addShape: (documentId: string, shape: SVGShape) => Promise<void>;
  updateShape: (documentId: string, shape: SVGShape) => Promise<void>;
  removeShape: (documentId: string, shapeId: string) => Promise<void>;
  moveShape: (
    documentId: string,
    shapeId: string,
    x: number,
    y: number
  ) => Promise<void>;
  resizeShape: (
    documentId: string,
    shapeId: string,
    width: number,
    height: number
  ) => Promise<void>;
  duplicateShape: (documentId: string, shapeId: string) => Promise<void>;
  updateLayers: (documentId: string, layers: SVGLayer[]) => Promise<void>;
  addLayer: (documentId: string, name: string) => Promise<void>;
  removeLayer: (documentId: string, layerId: string) => Promise<void>;
  renameLayer: (
    documentId: string,
    layerId: string,
    name: string
  ) => Promise<void>;
  toggleLayerVisibility: (documentId: string, layerId: string) => Promise<void>;
  toggleLayerLock: (documentId: string, layerId: string) => Promise<void>;
  addSymbol: (symbol: SVGSymbol) => Promise<void>;
  updateSymbol: (symbol: SVGSymbol) => Promise<void>;
  removeSymbol: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<SVGSettings>) => Promise<void>;
  addGradient: (documentId: string, gradient: SVGGradient) => Promise<void>;
  updateGradient: (documentId: string, gradient: SVGGradient) => Promise<void>;
  removeGradient: (documentId: string, gradientId: string) => Promise<void>;
  saveHistory: (documentId: string, label: string) => Promise<void>;
  undo: (documentId: string) => Promise<void>;
  redo: (documentId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [documents, setDocuments] = useState<SVGDocument[]>([]);
  const [symbols, setSymbols] = useState<SVGSymbol[]>([]);
  const [settings, setSettings] = useState<SVGSettings>({
    theme: 'svg-light',
    gridSize: 20,
    snapToGrid: true,
    showGrid: true,
    showRulers: true,
    exportFormat: 'svg',
    exportScale: 2,
  });
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [redoStack, setRedoStack] = useState<
    Record<string, { shapes: SVGShape[]; layers: SVGLayer[] }[]>
  >({});
  const [currentDocument, setCurrentDocument] = useState<SVGDocument | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await seedDatabase();
    const [docs, syms, sett] = await Promise.all([
      db.documents.getAll(),
      db.symbols.getAll(),
      db.settings.get(),
    ]);
    setDocuments(docs.sort((a, b) => b.updatedAt - a.updatedAt));
    setSymbols(syms);
    setSettings(sett);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const createNewDocument = useCallback(
    async (
      title: string,
      width: number,
      height: number
    ): Promise<SVGDocument> => {
      const doc = await createDocument(title, width, height);
      setDocuments((prev) => [doc, ...prev]);
      return doc;
    },
    []
  );

  const createFromTemplate = useCallback(
    async (templateId: string): Promise<SVGDocument> => {
      const doc = await createDocumentFromTemplate(templateId, SVG_TEMPLATES);
      setDocuments((prev) => [doc, ...prev]);
      return doc;
    },
    []
  );

  const deleteDocument = useCallback(async (id: string) => {
    await db.documents.delete(id);
    await db.history.deleteByDocument(id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setHistory((prev) => prev.filter((h) => h.documentId !== id));
    setRedoStack((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const renameDocument = useCallback(async (id: string, title: string) => {
    const doc = await db.documents.get(id);
    if (doc) {
      const updated = { ...doc, title, updatedAt: Date.now() };
      await db.documents.put(updated);
      setDocuments((prev) => prev.map((d) => (d.id === id ? updated : d)));
    }
  }, []);

  const updateDocument = useCallback(async (doc: SVGDocument) => {
    const updated = { ...doc, updatedAt: Date.now() };
    await db.documents.put(updated);
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? updated : d)));
  }, []);

  const saveHistory = useCallback(async (documentId: string, label: string) => {
    const doc = await db.documents.get(documentId);
    if (doc) {
      const entry: HistoryEntry = {
        id: generateId(),
        documentId,
        shapes: JSON.parse(JSON.stringify(doc.shapes)),
        layers: JSON.parse(JSON.stringify(doc.layers)),
        timestamp: Date.now(),
        label,
      };
      await db.history.put(entry);
      setHistory((prev) => [...prev, entry]);
      setRedoStack((prev) => ({ ...prev, [documentId]: [] }));
    }
  }, []);

  const addShape = useCallback(
    async (documentId: string, shape: SVGShape) => {
      await saveHistory(documentId, 'add shape');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          shapes: [...doc.shapes, shape],
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const updateShape = useCallback(
    async (documentId: string, shape: SVGShape) => {
      await saveHistory(documentId, 'update shape');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          shapes: doc.shapes.map((s) => (s.id === shape.id ? shape : s)),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const removeShape = useCallback(
    async (documentId: string, shapeId: string) => {
      await saveHistory(documentId, 'remove shape');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          shapes: doc.shapes.filter((s) => s.id !== shapeId),
          layers: doc.layers.map((l) => ({
            ...l,
            shapeIds: l.shapeIds.filter((id) => id !== shapeId),
          })),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const moveShape = useCallback(
    async (documentId: string, shapeId: string, x: number, y: number) => {
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          shapes: doc.shapes.map((s) =>
            s.id === shapeId ? { ...s, x, y } : s
          ),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [currentDocument?.id]
  );

  const resizeShape = useCallback(
    async (
      documentId: string,
      shapeId: string,
      width: number,
      height: number
    ) => {
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          shapes: doc.shapes.map((s) =>
            s.id === shapeId ? { ...s, width, height } : s
          ),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [currentDocument?.id]
  );

  const duplicateShape = useCallback(
    async (documentId: string, shapeId: string) => {
      await saveHistory(documentId, 'duplicate shape');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const shape = doc.shapes.find((s) => s.id === shapeId);
        if (shape) {
          const newShape: SVGShape = {
            ...shape,
            id: generateId(),
            name: `${shape.name} (Copy)`,
            x: shape.x + 20,
            y: shape.y + 20,
          };
          const updated = {
            ...doc,
            shapes: [...doc.shapes, newShape],
            updatedAt: Date.now(),
          };
          await db.documents.put(updated);
          setDocuments((prev) =>
            prev.map((d) => (d.id === documentId ? updated : d))
          );
          if (currentDocument?.id === documentId) {
            setCurrentDocument(updated);
          }
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const updateLayers = useCallback(
    async (documentId: string, layers: SVGLayer[]) => {
      await saveHistory(documentId, 'update layers');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = { ...doc, layers, updatedAt: Date.now() };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const addLayer = useCallback(
    async (documentId: string, name: string) => {
      await saveHistory(documentId, 'add layer');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const newLayer: SVGLayer = {
          id: generateId(),
          name,
          visible: true,
          locked: false,
          shapeIds: [],
          blending: 'normal',
        };
        const updated = {
          ...doc,
          layers: [...doc.layers, newLayer],
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [currentDocument?.id]
  );

  const removeLayer = useCallback(
    async (documentId: string, layerId: string) => {
      await saveHistory(documentId, 'remove layer');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const layer = doc.layers.find((l) => l.id === layerId);
        const updated = {
          ...doc,
          layers: doc.layers.filter((l) => l.id !== layerId),
          shapes: doc.shapes.filter((s) => !layer?.shapeIds.includes(s.id)),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const renameLayer = useCallback(
    async (documentId: string, layerId: string, name: string) => {
      await saveHistory(documentId, 'rename layer');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          layers: doc.layers.map((l) =>
            l.id === layerId ? { ...l, name } : l
          ),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const toggleLayerVisibility = useCallback(
    async (documentId: string, layerId: string) => {
      await saveHistory(documentId, 'toggle layer visibility');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          layers: doc.layers.map((l) =>
            l.id === layerId ? { ...l, visible: !l.visible } : l
          ),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const toggleLayerLock = useCallback(
    async (documentId: string, layerId: string) => {
      await saveHistory(documentId, 'toggle layer lock');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          layers: doc.layers.map((l) =>
            l.id === layerId ? { ...l, locked: !l.locked } : l
          ),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const addSymbol = useCallback(async (symbol: SVGSymbol) => {
    await db.symbols.put(symbol);
    setSymbols((prev) => [...prev, symbol]);
  }, []);

  const removeSymbol = useCallback(async (id: string) => {
    await db.symbols.delete(id);
    setSymbols((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const updateSymbol = useCallback(async (symbol: SVGSymbol) => {
    await db.symbols.put(symbol);
    setSymbols((prev) => prev.map((s) => (s.id === symbol.id ? symbol : s)));
  }, []);

  const updateSettings = useCallback(async (partial: Partial<SVGSettings>) => {
    const current = await db.settings.get();
    const updated = { ...current, ...partial };
    await db.settings.put(updated);
    setSettings(updated);
  }, []);

  const addGradient = useCallback(
    async (documentId: string, gradient: SVGGradient) => {
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          gradients: [...doc.gradients, gradient],
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [currentDocument?.id]
  );

  const removeGradient = useCallback(
    async (documentId: string, gradientId: string) => {
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          gradients: doc.gradients.filter((g) => g.id !== gradientId),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [currentDocument?.id]
  );

  const updateGradient = useCallback(
    async (documentId: string, gradient: SVGGradient) => {
      await saveHistory(documentId, 'update gradient');
      const doc = await db.documents.get(documentId);
      if (doc) {
        const updated = {
          ...doc,
          gradients: doc.gradients.map((g) =>
            g.id === gradient.id ? gradient : g
          ),
          updatedAt: Date.now(),
        };
        await db.documents.put(updated);
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? updated : d))
        );
        if (currentDocument?.id === documentId) {
          setCurrentDocument(updated);
        }
      }
    },
    [saveHistory, currentDocument?.id]
  );

  const undo = useCallback(
    async (documentId: string) => {
      const entries = await db.history.getByDocument(documentId);
      const sorted = entries.sort((a, b) => b.timestamp - a.timestamp);
      const entry = sorted[0];
      if (!entry) return;
      const doc = await db.documents.get(documentId);
      if (!doc) return;
      setRedoStack((prev) => ({
        ...prev,
        [documentId]: [
          ...(prev[documentId] ?? []),
          {
            shapes: JSON.parse(JSON.stringify(doc.shapes)),
            layers: JSON.parse(JSON.stringify(doc.layers)),
          },
        ],
      }));
      await db.history.delete(entry.id);
      setHistory((prev) => prev.filter((h) => h.id !== entry.id));
      const updated = {
        ...doc,
        shapes: entry.shapes,
        layers: entry.layers,
        updatedAt: Date.now(),
      };
      await db.documents.put(updated);
      setDocuments((prev) =>
        prev.map((d) => (d.id === documentId ? updated : d))
      );
      if (currentDocument?.id === documentId) {
        setCurrentDocument(updated);
      }
    },
    [currentDocument?.id]
  );

  const redo = useCallback(
    async (documentId: string) => {
      const stack = redoStack[documentId] ?? [];
      const next = stack[stack.length - 1];
      if (!next) return;
      const doc = await db.documents.get(documentId);
      if (!doc) return;
      const entry: HistoryEntry = {
        id: generateId(),
        documentId,
        shapes: JSON.parse(JSON.stringify(doc.shapes)),
        layers: JSON.parse(JSON.stringify(doc.layers)),
        timestamp: Date.now(),
        label: 'redo',
      };
      await db.history.put(entry);
      setHistory((prev) => [...prev, entry]);
      const updated = {
        ...doc,
        shapes: JSON.parse(JSON.stringify(next.shapes)),
        layers: JSON.parse(JSON.stringify(next.layers)),
        updatedAt: Date.now(),
      };
      await db.documents.put(updated);
      setDocuments((prev) =>
        prev.map((d) => (d.id === documentId ? updated : d))
      );
      if (currentDocument?.id === documentId) {
        setCurrentDocument(updated);
      }
      setRedoStack((prev) => ({
        ...prev,
        [documentId]: prev[documentId]?.slice(0, -1) ?? [],
      }));
    },
    [redoStack, currentDocument?.id]
  );

  return (
    <DataContext.Provider
      value={{
        documents,
        symbols,
        settings,
        history,
        currentDocument,
        isLoading,
        createNewDocument,
        createFromTemplate,
        deleteDocument,
        renameDocument,
        setCurrentDocument,
        updateDocument,
        addShape,
        updateShape,
        removeShape,
        moveShape,
        resizeShape,
        duplicateShape,
        updateLayers,
        addLayer,
        removeLayer,
        renameLayer,
        toggleLayerVisibility,
        toggleLayerLock,
        addSymbol,
        updateSymbol,
        removeSymbol,
        updateSettings,
        addGradient,
        updateGradient,
        removeGradient,
        saveHistory,
        undo,
        redo,
        refreshData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
