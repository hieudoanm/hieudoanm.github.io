import { FC, useCallback, useEffect, useState } from 'react';
import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';

import { Tab } from './types';
import {
  dataUrlFromMime,
  extractBase64,
  isImageMime,
  sniffMime,
} from './utils/base64';

export const Base64Modal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('decode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  useEffect(() => {
    setInput('');
    setOutput('');
    setError('');
    setPreviewUrl(null);
    setFileName('');
  }, [tab]);

  const readFileAsBase64 = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setInput(result);
    };
    reader.onerror = () => setError('Failed to read file');
    reader.readAsDataURL(file);
  }, []);

  const handleDecode = useCallback(() => {
    setError('');
    setPreviewUrl(null);
    if (!input.trim()) return;
    const b64 = extractBase64(input);
    try {
      const decoded = atob(b64);
      setOutput(decoded);
      const mime =
        sniffMime(decoded.slice(0, 32)) ??
        (input.includes('base64,')
          ? input.split(';')[0].split(':')[1] || null
          : null);
      if (mime && isImageMime(mime)) setPreviewUrl(dataUrlFromMime(b64, mime));
    } catch {
      setError('Invalid Base64 input');
      setOutput('');
    }
  }, [input]);

  const handleEncode = useCallback(() => {
    setError('');
    setPreviewUrl(null);
    if (!input.trim()) return;
    try {
      setOutput(btoa(input));
    } catch {
      setError('Invalid input — check for non-Latin1 characters');
      setOutput('');
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      alert('Failed to copy');
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const b64 = extractBase64(input);
    const raw = atob(b64);
    const mime = sniffMime(raw.slice(0, 32));
    const ext = mime?.split('/')[1] ?? 'bin';
    const url = dataUrlFromMime(b64, mime ?? 'application/octet-stream');
    const a = document.createElement('a');
    a.href = url;
    a.download = `decoded.${ext}`;
    a.click();
  }, [output, input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (tab === 'decode') handleDecode();
      else handleEncode();
    }
  };

  return (
    <FullScreen
      onClose={onClose}
      title="Base64"
      subtitle="Decode / Encode"

      footerNote="Cmd+Enter to run · Drop a file to encode">
      <div className="border-base-300 flex justify-center border-b">
        {(['decode', 'encode'] as Tab[]).map((t) => (
          <button
            key={t}
            className={`flex-1 border-b-2 px-3 py-2 text-sm transition-colors ${
              tab === t
                ? 'border-primary text-primary'
                : 'text-base-content/40 border-transparent'
            }`}
            onClick={() => setTab(t)}>
            {t === 'decode' ? 'Decode' : 'Encode'}
          </button>
        ))}
      </div>
      {tab === 'encode' && (
        <Dropzone accept="*/*" onFile={readFileAsBase64} className="mt-4" />
      )}
      <textarea
        className="textarea textarea-bordered mt-3 h-28 w-full font-mono text-xs"
        placeholder={
          tab === 'decode'
            ? 'Paste Base64 or data URL…'
            : 'Type text to encode…'
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={tab === 'decode' ? handleDecode : handleEncode}
        disabled={!input.trim()}
        className="btn btn-primary btn-sm mt-2 w-full font-mono tracking-widest">
        {tab === 'decode' ? 'Decode' : 'Encode'}
      </button>
      {error && (
        <p className="text-base-content/60 mt-2 text-center text-xs">{error}</p>
      )}
      {output && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              Output
              <span className="ml-2 normal-case">
                ({new Blob([output]).size.toLocaleString()} B)
              </span>
            </span>
            <div className="flex gap-1">
              <button
                onClick={handleCopy}
                className="btn btn-ghost btn-xs font-mono tracking-widest">
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="btn btn-ghost btn-xs font-mono tracking-widest">
                Download
              </button>
            </div>
          </div>
          {previewUrl ? (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-xl object-contain shadow-inner"
              />
            </div>
          ) : (
            <div className="bg-base-200 max-h-40 overflow-auto rounded-xl p-3">
              <pre className="font-mono text-xs break-all whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </div>
      )}
    </FullScreen>
  );
};
Base64Modal.displayName = 'Base64Modal';
