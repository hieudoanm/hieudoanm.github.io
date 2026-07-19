import {
  EnvironmentVariable,
  RequestCollection,
  RequestConfig,
  StoredCookie,
} from '@/types/api-client';
import {
  Monitor,
  intervalMsForMinutes,
  newMonitor,
  removeMonitor,
  toggleMonitor,
  updateMonitor,
} from '@/lib/monitor';
import {
  DataRow,
  RunSummary,
  parseDataRows,
  runCollection,
  runDataDriven,
} from '@/lib/runner';
import { ExecuteOptions, executeRequest } from '@/lib/http';
import { FormFiles } from '@/lib/body';
import { ResponseMeta } from '@/types/api-client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface RunProgress {
  done: number;
  total: number;
  entryName: string;
}

export const useRunner = (
  collections: RequestCollection[],
  env: EnvironmentVariable[],
  cookies: StoredCookie[]
) => {
  const [collectionId, setCollectionId] = useState<string>(
    () => collections[0]?.id ?? ''
  );
  const [delayMs, setDelayMs] = useState(0);
  const [continueOnFailure, setContinueOnFailure] = useState(true);
  const [dataType, setDataType] = useState<'none' | 'csv' | 'json'>('none');
  const [dataText, setDataText] = useState('');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<RunProgress | null>(null);
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  const execute = useCallback(
    (
      config: RequestConfig,
      envVars: EnvironmentVariable[],
      executeOptions: ExecuteOptions
    ): Promise<ResponseMeta> => executeRequest(config, envVars, executeOptions),
    []
  );

  const rows = useMemo<DataRow[]>(
    () => (dataType === 'none' ? [] : parseDataRows(dataText, dataType)),
    [dataType, dataText]
  );

  const selectedCollection = useMemo(
    () =>
      collections.find((collection) => collection.id === collectionId) ?? null,
    [collections, collectionId]
  );

  const run = useCallback(async (): Promise<void> => {
    if (!selectedCollection) {
      setRunError('Select a collection to run');
      return;
    }
    if (dataType !== 'none' && rows.length === 0) {
      setRunError('Data file has no rows');
      return;
    }
    setRunning(true);
    setRunError(null);
    setProgress({ done: 0, total: 1, entryName: '' });
    try {
      const options = {
        delayMs,
        continueOnFailure,
        env,
        cookies,
        onProgress: (done: number, total: number, entryName: string): void =>
          setProgress({ done, total, entryName }),
      };
      const result =
        dataType === 'none'
          ? await runCollection(selectedCollection, options, execute)
          : await runDataDriven(selectedCollection, rows, options, execute);
      setSummary(result);
    } catch (err) {
      setRunError(err instanceof Error ? err.message : 'Run failed');
    } finally {
      setRunning(false);
      setProgress(null);
    }
  }, [
    selectedCollection,
    dataType,
    rows,
    delayMs,
    continueOnFailure,
    env,
    cookies,
    execute,
  ]);

  const addMonitor = useCallback(
    (name: string, minutes: number): void => {
      if (!selectedCollection) return;
      setMonitors((prev) => [
        ...prev,
        newMonitor(
          name.trim() || `${selectedCollection.name} check`,
          selectedCollection.id,
          intervalMsForMinutes(minutes)
        ),
      ]);
    },
    [selectedCollection]
  );

  const onToggleMonitor = useCallback((id: string): void => {
    setMonitors((prev) => toggleMonitor(prev, id));
  }, []);

  const onRemoveMonitor = useCallback((id: string): void => {
    setMonitors((prev) => removeMonitor(prev, id));
  }, []);

  const collectionsRef = useRef(collections);
  collectionsRef.current = collections;
  const envRef = useRef(env);
  envRef.current = env;
  const cookiesRef = useRef(cookies);
  cookiesRef.current = cookies;
  const executeRef = useRef(execute);
  executeRef.current = execute;

  useEffect(() => {
    const timers: Array<ReturnType<typeof setInterval>> = [];
    for (const monitor of monitors) {
      if (!monitor.running) continue;
      timers.push(
        setInterval(() => {
          const collection = collectionsRef.current.find(
            (item) => item.id === monitor.collectionId
          );
          if (!collection) return;
          void runCollection(
            collection,
            {
              continueOnFailure: true,
              env: envRef.current,
              cookies: cookiesRef.current,
            },
            executeRef.current
          ).then((result) => {
            setMonitors((prev) =>
              updateMonitor(prev, monitor.id, {
                lastRunAt: Date.now(),
                lastResult: result,
              })
            );
          });
        }, monitor.intervalMs)
      );
    }
    return () => timers.forEach((timer) => clearInterval(timer));
  }, [monitors]);

  return {
    collectionId,
    setCollectionId,
    delayMs,
    setDelayMs,
    continueOnFailure,
    setContinueOnFailure,
    dataType,
    setDataType,
    dataText,
    setDataText,
    rows,
    running,
    progress,
    summary,
    runError,
    monitors,
    selectedCollection,
    run,
    addMonitor,
    onToggleMonitor,
    onRemoveMonitor,
  };
};

export type UseRunner = ReturnType<typeof useRunner>;
