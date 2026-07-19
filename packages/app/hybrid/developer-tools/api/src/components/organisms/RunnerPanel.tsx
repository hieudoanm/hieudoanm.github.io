'use client';

import { useRunner } from '@/hooks/useRunner';
import { summaryToHtml, summaryToJson } from '@/lib/runner';
import { downloadFile, readTextFile } from '@/lib/request-file';
import { formatRelativeTime, statusColor } from '@/lib/format';
import {
  EnvironmentVariable,
  RequestCollection,
  StoredCookie,
} from '@/types/api-client';
import { type ChangeEvent, type FC, useState } from 'react';
import { FiDownload, FiPlay, FiRefreshCcw, FiTrash2 } from 'react-icons/fi';

interface RunnerPanelProps {
  collections: RequestCollection[];
  env: EnvironmentVariable[];
  cookies: StoredCookie[];
}

export const RunnerPanel: FC<RunnerPanelProps> = ({
  collections,
  env,
  cookies,
}) => {
  const runner = useRunner(collections, env, cookies);
  const [monitorName, setMonitorName] = useState('');
  const [monitorMinutes, setMonitorMinutes] = useState(5);

  const onDataFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    const type = file.name.toLowerCase().endsWith('.csv') ? 'csv' : 'json';
    runner.setDataType(type);
    void readTextFile(file)
      .then(runner.setDataText)
      .catch(() => runner.setDataText(''));
    event.target.value = '';
  };

  const exportJson = (): void => {
    if (runner.summary) {
      downloadFile(
        summaryToJson(runner.summary),
        `run-${runner.summary.id}.json`,
        'application/json'
      );
    }
  };

  const exportHtml = (): void => {
    if (runner.summary) {
      downloadFile(
        summaryToHtml(runner.summary),
        `run-${runner.summary.id}.html`,
        'text/html'
      );
    }
  };

  const addMonitor = (): void => {
    runner.addMonitor(monitorName, monitorMinutes);
    setMonitorName('');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="border-base-300 flex flex-col gap-2 rounded-lg border p-2">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          Run collection
        </span>
        <select
          value={runner.collectionId}
          onChange={(e) => runner.setCollectionId(e.target.value)}
          aria-label="Run collection"
          className="select select-bordered select-xs">
          <option value="" disabled>
            Select a collection
          </option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={runner.delayMs}
            onChange={(e) => runner.setDelayMs(Number(e.target.value))}
            aria-label="Delay between requests (ms)"
            placeholder="Delay (ms)"
            className="input input-bordered input-xs w-28"
          />
          <label className="flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={runner.continueOnFailure}
              onChange={(e) => runner.setContinueOnFailure(e.target.checked)}
              aria-label="Continue on failure"
              className="checkbox checkbox-xs"
            />
            Continue on failure
          </label>
        </div>
        <select
          value={runner.dataType}
          onChange={(e) =>
            runner.setDataType(e.target.value as 'none' | 'csv' | 'json')
          }
          aria-label="Data source"
          className="select select-bordered select-xs">
          <option value="none">No data (single run)</option>
          <option value="csv">CSV data (iterate rows)</option>
          <option value="json">JSON data (iterate rows)</option>
        </select>
        {runner.dataType !== 'none' && (
          <div className="flex flex-col gap-1">
            <label className="btn btn-ghost btn-xs w-fit gap-1">
              <FiDownload className="size-3" />
              <span>Load data file</span>
              <input
                type="file"
                accept=".csv,.json,application/json,text/csv"
                onChange={onDataFile}
                aria-label="Load data file"
                className="hidden"
              />
            </label>
            <textarea
              value={runner.dataText}
              onChange={(e) => runner.setDataText(e.target.value)}
              placeholder={`Paste ${runner.dataType} rows here`}
              aria-label="Data rows"
              rows={3}
              className="textarea textarea-bordered textarea-xs"
            />
            <span className="text-base-content/40 text-xs">
              {runner.rows.length} rows
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => void runner.run()}
          disabled={runner.running}
          className="btn btn-primary btn-xs w-fit gap-1">
          <FiPlay className="size-3" />
          <span>{runner.running ? 'Running…' : 'Run'}</span>
        </button>
        {runner.running && runner.progress && (
          <progress
            value={runner.progress.done}
            max={runner.progress.total}
            aria-label="Run progress"
            className="progress progress-primary progress-xs">
            {runner.progress.entryName}
          </progress>
        )}
        {runner.progress && (
          <span className="text-xs">{runner.progress.entryName}</span>
        )}
        {runner.runError && (
          <div role="alert" className="alert alert-error py-1 text-xs">
            <span>{runner.runError}</span>
          </div>
        )}
      </div>

      {runner.summary && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-neutral badge-sm">
              {runner.summary.passed}/{runner.summary.totalRequests} passed
            </span>
            <span className="badge badge-warning badge-sm">
              {runner.summary.failed} failed
            </span>
            <span className="badge badge-success badge-sm">
              {runner.summary.testPassed} tests passed
            </span>
            <span className="badge badge-error badge-sm">
              {runner.summary.testFailed} tests failed
            </span>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={exportJson}
              aria-label="Export JSON report"
              className="btn btn-ghost btn-xs gap-1">
              <FiDownload className="size-3" />
              JSON
            </button>
            <button
              type="button"
              onClick={exportHtml}
              aria-label="Export HTML report"
              className="btn btn-ghost btn-xs gap-1">
              <FiDownload className="size-3" />
              HTML
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            <table className="table-xs table">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Iteration</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Tests</th>
                </tr>
              </thead>
              <tbody>
                {runner.summary.results.map((result, index) => (
                  <tr key={`${result.entryId}-${result.iteration}-${index}`}>
                    <td className="max-w-40 truncate text-xs">
                      {result.group ? `${result.group} / ` : ''}
                      {result.entryName}
                    </td>
                    <td className="text-xs">{result.iteration + 1}</td>
                    <td>
                      {result.ok ? (
                        <span
                          className={`badge ${statusColor(result.statusCode ?? 0)} badge-xs`}>
                          {result.statusCode}
                        </span>
                      ) : (
                        <span className="badge badge-error badge-xs">FAIL</span>
                      )}
                    </td>
                    <td className="text-xs">{result.timeMs} ms</td>
                    <td className="text-xs">
                      {result.testFailed > 0 ? (
                        <span className="text-error">
                          {result.testPassed}/
                          {result.testPassed + result.testFailed} passed
                        </span>
                      ) : (
                        <span className="text-success">
                          {result.testPassed} passed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="border-base-300 flex flex-col gap-2 rounded-lg border p-2">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          Scheduled monitors (mock)
        </span>
        <div className="flex gap-1">
          <input
            type="text"
            value={monitorName}
            onChange={(e) => setMonitorName(e.target.value)}
            placeholder="Monitor name"
            aria-label="Monitor name"
            className="input input-bordered input-xs flex-1"
          />
          <input
            type="number"
            min={1}
            value={monitorMinutes}
            onChange={(e) => setMonitorMinutes(Number(e.target.value))}
            aria-label="Monitor interval (minutes)"
            className="input input-bordered input-xs w-20"
          />
          <button
            type="button"
            onClick={addMonitor}
            disabled={!runner.selectedCollection}
            className="btn btn-ghost btn-xs gap-1">
            <FiRefreshCcw className="size-3" />
            Add
          </button>
        </div>
        {runner.monitors.length === 0 && (
          <p className="text-base-content/40 text-xs">
            No monitors. Runs the selected collection on an interval (mock).
          </p>
        )}
        <ul className="flex flex-col gap-1">
          {runner.monitors.map((monitor) => (
            <li key={monitor.id} className="flex items-center gap-2 text-xs">
              <span className="flex-1 truncate">{monitor.name}</span>
              <span className="badge badge-outline badge-xs">
                {Math.round(monitor.intervalMs / 60000)}m
              </span>
              <span
                className={`badge badge-xs ${
                  monitor.running ? 'badge-success' : 'badge-neutral'
                }`}>
                {monitor.running ? 'Running' : 'Stopped'}
              </span>
              {monitor.lastRunAt && (
                <span className="text-base-content/40">
                  {formatRelativeTime(monitor.lastRunAt)}
                </span>
              )}
              {monitor.lastResult && (
                <span
                  className={
                    monitor.lastResult.failed > 0
                      ? 'text-error'
                      : 'text-success'
                  }>
                  {monitor.lastResult.passed}/{monitor.lastResult.totalRequests}
                </span>
              )}
              <button
                type="button"
                onClick={() => runner.onToggleMonitor(monitor.id)}
                aria-label={`Toggle monitor ${monitor.name}`}
                className="btn btn-ghost btn-xs">
                {monitor.running ? 'Stop' : 'Start'}
              </button>
              <button
                type="button"
                onClick={() => runner.onRemoveMonitor(monitor.id)}
                aria-label={`Remove monitor ${monitor.name}`}
                className="btn btn-ghost btn-xs">
                <FiTrash2 className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

RunnerPanel.displayName = 'RunnerPanel';
