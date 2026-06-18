import { FC, useState, useCallback, useRef, useEffect } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'decode' | 'encode';

function extractBase64(str: string) {
  const trimmed = str.trim();
  const commaIdx = trimmed.indexOf('base64,');
  if (commaIdx !== -1) return trimmed.slice(commaIdx + 7);
  const spaceIdx = trimmed.indexOf(' ');
  if (spaceIdx === -1) return trimmed;
  return trimmed.split(/\s+/)[0];
}

function isImageMime(mime: string) {
  return /^image\/(png|jpe?g|gif|webp|svg\+xml|bmp|avif)$/.test(mime);
}

function sniffMime(raw: string): string | null {
  if (raw.startsWith('\u0089PNG')) return 'image/png';
  if (raw.startsWith('\u00ff\u00d8\u00ff')) return 'image/jpeg';
  if (raw.startsWith('GIF87a') || raw.startsWith('GIF89a')) return 'image/gif';
  if (raw.startsWith('RIFF') && raw.includes('WEBP')) return 'image/webp';
  if (raw.startsWith('<svg') || raw.startsWith('<?xml')) return 'image/svg+xml';
  if (raw.startsWith('BM')) return 'image/bmp';
  return null;
}

function dataUrlFromMime(b64: string, mime: string) {
  return `data:${mime};base64,${b64}`;
}

export const Base64Modal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('decode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      readFileAsBase64(file);
    },
    [readFileAsBase64]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      readFileAsBase64(file);
    },
    [readFileAsBase64]
  );

  const handleDecode = useCallback(() => {
    setError('');
    setPreviewUrl(null);
    if (!input.trim()) return;
    let b64 = extractBase64(input);
    try {
      const decoded = atob(b64);
      setOutput(decoded);

      const mime =
        sniffMime(decoded.slice(0, 32)) ??
        (input.includes('base64,')
          ? input.split(';')[0].split(':')[1] || null
          : null);

      if (mime && isImageMime(mime)) {
        setPreviewUrl(dataUrlFromMime(b64, mime));
      }
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
    <ModalWrapper
      onClose={onClose}
      title="Base64"
      subtitle="Decode / Encode"
      size="max-w-lg"
      footerNote="Cmd+Enter to run · Drop a file to encode">
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="tabs tabs-boxed justify-center">
        {(['decode', 'encode'] as Tab[]).map((t) => (
          <button
            key={t}
            className={`tab flex-1 ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {t === 'decode' ? 'Decode' : 'Encode'}
          </button>
        ))}
      </div>

      {tab === 'encode' && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={`border-base-300 mt-4 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-4 transition-colors ${
            dragging ? 'border-primary bg-primary/5' : ''
          }`}
          onClick={() => fileRef.current?.click()}>
          <p className="text-base-content/40 text-center font-mono text-[11px] tracking-widest uppercase">
            {fileName ? `📎 ${fileName}` : 'Click or drop a file to encode'}
          </p>
        </div>
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

      {error && <p className="text-error mt-2 text-center text-xs">{error}</p>}

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
    </ModalWrapper>
  );
};
