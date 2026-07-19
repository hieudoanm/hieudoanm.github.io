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
  PDFDocument,
  Annotation,
  Bookmark,
  FormField,
  Stamp,
  Settings,
} from '@/types';
import { db } from '@/lib/db';
import { seedDatabase, generateId } from '@/data/seed';

interface DataContextType {
  documents: PDFDocument[];
  annotations: Annotation[];
  bookmarks: Bookmark[];
  formFields: FormField[];
  stamps: Stamp[];
  settings: Settings;
  isLoading: boolean;

  getDocument: (id: string) => Promise<PDFDocument | undefined>;
  createDocument: (doc: PDFDocument) => Promise<void>;
  updateDocument: (doc: PDFDocument) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  renameDocument: (id: string, title: string) => Promise<void>;
  openDocument: (id: string) => Promise<void>;

  getAnnotationsByDocument: (documentId: string) => Promise<Annotation[]>;
  addAnnotation: (
    ann: Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Annotation>;
  updateAnnotation: (ann: Annotation) => Promise<void>;
  deleteAnnotation: (id: string) => Promise<void>;

  getBookmarksByDocument: (documentId: string) => Promise<Bookmark[]>;
  addBookmark: (bm: Omit<Bookmark, 'id' | 'createdAt'>) => Promise<Bookmark>;
  deleteBookmark: (id: string) => Promise<void>;

  addFormField: (field: Omit<FormField, 'id'>) => Promise<FormField>;
  updateFormField: (field: FormField) => Promise<void>;

  addStamp: (stamp: Omit<Stamp, 'id' | 'createdAt'>) => Promise<Stamp>;
  deleteStamp: (id: string) => Promise<void>;

  updateSettings: (partial: Partial<Settings>) => Promise<void>;
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
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [settings, setSettings] = useState<Settings>({
    id: 'default',
    theme: 'night',
    defaultZoom: 100,
    pageLayout: 'continuous',
    annotationDefaults: { color: '#facc15', strokeWidth: 2 },
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await seedDatabase();
    const [docs, anns, bms, ffs, stps, sett] = await Promise.all([
      db.documents.getAll(),
      db.annotations.getAll(),
      db.bookmarks.getAll(),
      db.formFields.getAll(),
      db.stamps.getAll(),
      db.settings.get(),
    ]);
    setDocuments(docs.sort((a, b) => b.lastOpenedAt - a.lastOpenedAt));
    setAnnotations(anns);
    setBookmarks(bms);
    setFormFields(ffs);
    setStamps(stps);
    setSettings(sett);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const getDocument = useCallback(async (id: string) => {
    return db.documents.get(id);
  }, []);

  const createDocument = useCallback(async (doc: PDFDocument) => {
    await db.documents.put(doc);
    setDocuments((prev) => [doc, ...prev]);
  }, []);

  const updateDocument = useCallback(async (doc: PDFDocument) => {
    await db.documents.put(doc);
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? doc : d)));
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    await db.documents.delete(id);
    await db.annotations.deleteByDocument(id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setAnnotations((prev) => prev.filter((a) => a.documentId !== id));
  }, []);

  const renameDocument = useCallback(async (id: string, title: string) => {
    const doc = await db.documents.get(id);
    if (doc) {
      const updated = { ...doc, title, updatedAt: Date.now() };
      await db.documents.put(updated);
      setDocuments((prev) => prev.map((d) => (d.id === id ? updated : d)));
    }
  }, []);

  const openDocument = useCallback(async (id: string) => {
    const doc = await db.documents.get(id);
    if (doc) {
      const updated = { ...doc, lastOpenedAt: Date.now() };
      await db.documents.put(updated);
      setDocuments((prev) => prev.map((d) => (d.id === id ? updated : d)));
    }
  }, []);

  const getAnnotationsByDocument = useCallback(
    async (documentId: string): Promise<Annotation[]> => {
      return db.annotations.getByDocument(documentId);
    },
    []
  );

  const addAnnotation = useCallback(
    async (
      ann: Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Annotation> => {
      const newAnn: Annotation = {
        ...ann,
        id: generateId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.annotations.put(newAnn);
      setAnnotations((prev) => [...prev, newAnn]);
      return newAnn;
    },
    []
  );

  const updateAnnotation = useCallback(async (ann: Annotation) => {
    const updated = { ...ann, updatedAt: Date.now() };
    await db.annotations.put(updated);
    setAnnotations((prev) => prev.map((a) => (a.id === ann.id ? updated : a)));
  }, []);

  const deleteAnnotation = useCallback(async (id: string) => {
    await db.annotations.delete(id);
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const getBookmarksByDocument = useCallback(
    async (documentId: string): Promise<Bookmark[]> => {
      return db.bookmarks.getByDocument(documentId);
    },
    []
  );

  const addBookmark = useCallback(
    async (bm: Omit<Bookmark, 'id' | 'createdAt'>): Promise<Bookmark> => {
      const newBm: Bookmark = {
        ...bm,
        id: generateId(),
        createdAt: Date.now(),
      };
      await db.bookmarks.put(newBm);
      setBookmarks((prev) => [...prev, newBm]);
      return newBm;
    },
    []
  );

  const deleteBookmark = useCallback(async (id: string) => {
    await db.bookmarks.delete(id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const addFormField = useCallback(
    async (field: Omit<FormField, 'id'>): Promise<FormField> => {
      const newField: FormField = { ...field, id: generateId() };
      await db.formFields.put(newField);
      setFormFields((prev) => [...prev, newField]);
      return newField;
    },
    []
  );

  const updateFormField = useCallback(async (field: FormField) => {
    await db.formFields.put(field);
    setFormFields((prev) => prev.map((f) => (f.id === field.id ? field : f)));
  }, []);

  const addStamp = useCallback(
    async (stamp: Omit<Stamp, 'id' | 'createdAt'>): Promise<Stamp> => {
      const newStamp: Stamp = {
        ...stamp,
        id: generateId(),
        createdAt: Date.now(),
      };
      await db.stamps.put(newStamp);
      setStamps((prev) => [...prev, newStamp]);
      return newStamp;
    },
    []
  );

  const deleteStamp = useCallback(async (id: string) => {
    await db.stamps.delete(id);
    setStamps((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const updateSettings = useCallback(async (partial: Partial<Settings>) => {
    const current = await db.settings.get();
    const updated = { ...current, ...partial };
    await db.settings.put(updated);
    setSettings(updated);
  }, []);

  return (
    <DataContext.Provider
      value={{
        documents,
        annotations,
        bookmarks,
        formFields,
        stamps,
        settings,
        isLoading,
        getDocument,
        createDocument,
        updateDocument,
        deleteDocument,
        renameDocument,
        openDocument,
        getAnnotationsByDocument,
        addAnnotation,
        updateAnnotation,
        deleteAnnotation,
        getBookmarksByDocument,
        addBookmark,
        deleteBookmark,
        addFormField,
        updateFormField,
        addStamp,
        deleteStamp,
        updateSettings,
        refreshData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
