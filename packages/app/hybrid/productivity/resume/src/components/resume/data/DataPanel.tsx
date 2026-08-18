'use client';

import { useRef, useState, type FC } from 'react';
import {
  LuCheck,
  LuClipboard,
  LuFileDown,
  LuFileUp,
  LuRefreshCcw,
} from 'react-icons/lu';
import { EXAMPLE_RESUMES } from '../../../data/examples';
import type { ResumeData } from '../../../types/resume';
import { buildResumeHtml } from '../../../utils/export';
import {
  copyToClipboard,
  dateStamp,
  downloadTextFile,
  parseResumeData,
  resumeFileName,
  serializeResumeJson,
  serializeResumeText,
  serializeResumeYaml,
  stripExtension,
} from '../../../utils/io';

interface DataPanelProps {
  data: ResumeData;
  onImport: (data: ResumeData, fileName?: string) => void;
}

export const DataPanel: FC<DataPanelProps> = ({ data, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [copied, setCopied] = useState('');
  const copyTimerRef = useRef<number | null>(null);

  const notifyCopied = (label: string) => {
    setCopied(label);
    if (copyTimerRef.current !== null)
      window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(''), 1500);
  };

  const exportJson = () => {
    downloadTextFile(
      serializeResumeJson(data),
      `${resumeFileName(data, fileName)}-${dateStamp()}.json`,
      'application/json;charset=utf-8'
    );
  };

  const exportYaml = () => {
    downloadTextFile(
      serializeResumeYaml(data),
      `${resumeFileName(data, fileName)}-${dateStamp()}.yaml`,
      'application/yaml;charset=utf-8'
    );
  };

  const copy = async (text: string, label: string) => {
    try {
      await copyToClipboard(text);
      setError('');
      notifyCopied(label);
    } catch {
      setError('Could not copy to the clipboard.');
    }
  };

  const copyJson = () => void copy(serializeResumeJson(data), 'JSON');
  const copyText = () => void copy(serializeResumeText(data), 'Text');
  const copyHtml = () => {
    const sheet = document.getElementById('resume-sheet');
    if (!sheet) {
      setError('The preview is not available yet.');
      return;
    }
    void copy(buildResumeHtml(sheet, 210, 297), 'HTML');
  };

  const importFile = async (file: File) => {
    try {
      const imported = parseResumeData(await file.text());
      setFileName(stripExtension(file.name));
      setError('');
      onImport(imported, stripExtension(file.name));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed.');
    }
  };

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="border-base-300 rounded-2xl border p-4">
        <h2 className="mb-1 text-sm font-bold">Export</h2>
        <p className="text-base-content/50 mb-3 text-xs">
          Download your resume as a portable data file.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-neutral btn-sm"
            aria-label="Export JSON"
            onClick={exportJson}>
            <LuFileDown />
            JSON
          </button>
          <button
            type="button"
            className="btn btn-neutral btn-sm"
            aria-label="Export YAML"
            onClick={exportYaml}>
            <LuFileDown />
            YAML
          </button>
        </div>
      </div>

      <div className="border-base-300 rounded-2xl border p-4">
        <h2 className="mb-1 text-sm font-bold">Copy</h2>
        <p className="text-base-content/50 mb-3 text-xs">
          Copy your resume to the clipboard for pasting anywhere.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-neutral btn-sm"
            aria-label="Copy JSON"
            onClick={copyJson}>
            <LuClipboard />
            JSON
          </button>
          <button
            type="button"
            className="btn btn-neutral btn-sm"
            aria-label="Copy Text"
            onClick={copyText}>
            <LuClipboard />
            Text
          </button>
          <button
            type="button"
            className="btn btn-neutral btn-sm"
            aria-label="Copy HTML"
            onClick={copyHtml}>
            <LuClipboard />
            HTML
          </button>
        </div>
        {copied && (
          <span className="text-success mt-2 inline-flex items-center gap-1 text-xs">
            <LuCheck />
            {copied} copied
          </span>
        )}
      </div>

      <div className="border-base-300 rounded-2xl border p-4">
        <h2 className="mb-1 text-sm font-bold">Import</h2>
        <p className="text-base-content/50 mb-3 text-xs">
          Load a JSON or YAML file to replace the current resume.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.yaml,.yml,application/json,application/yaml,text/yaml"
          className="hidden"
          data-testid="import-file-input"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void importFile(file);
              event.target.value = '';
            }
          }}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => fileInputRef.current?.click()}>
          <LuFileUp />
          Import
        </button>
      </div>

      <div className="border-base-300 rounded-2xl border p-4">
        <h2 className="mb-1 text-sm font-bold">Examples</h2>
        <p className="text-base-content/50 mb-3 text-xs">
          Start from a ready-made resume.
        </p>
        <div className="flex flex-col gap-2">
          {EXAMPLE_RESUMES.map((example) => (
            <button
              key={example.id}
              type="button"
              className="btn btn-outline btn-sm justify-start"
              onClick={() => {
                setFileName('');
                setError('');
                onImport(example.data);
              }}>
              {example.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="alert alert-error py-2 text-xs">
          <LuRefreshCcw />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

DataPanel.displayName = 'DataPanel';
