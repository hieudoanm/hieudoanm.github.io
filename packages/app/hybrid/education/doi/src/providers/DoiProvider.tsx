'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Database } from 'sql.js';

import { openDoiDb } from '@/lib/sqlite';
import { buildReport, graph, search } from '@/lib/queries';
import type { DoiReport, GraphEdge, GraphNode, Work } from '@/types/doi';

interface DoiContextType {
  loading: boolean;
  error: string | null;
  db: Database | null;
  query: string;
  top: number;
  graphLimit: number;
  minDegree: number;
  setQuery: (q: string) => void;
  setGraphLimit: (n: number) => void;
  setMinDegree: (n: number) => void;
  report: DoiReport | null;
  searchResults: Work[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  retry: () => void;
}

const DEFAULT_TOP = 10;
const SEARCH_LIMIT = 200;
const GRAPH_LIMIT = 300;

const DoiContext = createContext<DoiContextType | null>(null);

export const useDoi = (): DoiContextType => {
  const ctx = useContext(DoiContext);
  if (!ctx) throw new Error('useDoi must be used within DoiProvider');
  return ctx;
};

export const DoiProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState('');
  const [top, setTop] = useState(DEFAULT_TOP);
  const [graphLimit, setGraphLimit] = useState(GRAPH_LIMIT);
  const [minDegree, setMinDegree] = useState(0);
  const [report, setReport] = useState<DoiReport | null>(null);
  const [searchResults, setSearchResults] = useState<Work[]>([]);
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
  const [graphEdges, setGraphEdges] = useState<GraphEdge[]>([]);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setDb(null);
    openDoiDb()
      .then((instance) => {
        if (active) setDb(instance);
      })
      .catch((e: unknown) => {
        if (active) setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [retryToken]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const initial = new URLSearchParams(window.location.search).get('q') ?? '';
    setQuery(initial);
  }, []);

  const updateQuery = useCallback((q: string) => {
    setQuery(q);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.toString());
  }, []);

  useEffect(() => {
    if (!db) return;
    setReport(buildReport(db, query, top));
    setSearchResults(query ? search(db, query, SEARCH_LIMIT) : []);
    const g = graph(db, query, graphLimit, minDegree);
    setGraphNodes(g.nodes);
    setGraphEdges(g.edges);
  }, [db, query, top, graphLimit, minDegree]);

  const retry = useCallback(() => setRetryToken((n) => n + 1), []);

  return (
    <DoiContext.Provider
      value={{
        loading,
        error,
        db,
        query,
        top,
        graphLimit,
        minDegree,
        setQuery: updateQuery,
        setGraphLimit,
        setMinDegree,
        report,
        searchResults,
        graphNodes,
        graphEdges,
        retry,
      }}>
      {children}
    </DoiContext.Provider>
  );
};
