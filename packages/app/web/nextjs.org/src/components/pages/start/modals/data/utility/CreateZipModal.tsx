'use client';

import { FC, useState, useCallback, useRef } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

interface FileEntry {
  file: File;
  name: string;
}

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

async function createZipBlob(entries: FileEntry[]): Promise<Blob> {
  const localHeaders: Uint8Array[] = [];
  const centralEntries: Uint8Array[] = [];
  let offset = 0;

  for (const { file, name } of entries) {
    const data = new Uint8Array(await file.arrayBuffer());
    const nameBytes = new TextEncoder().encode(name);
    const crc = crc32(data);
    const compSize = data.length;
    const uncompSize = data.length;

    // Local file header
    const lh = new ArrayBuffer(30 + nameBytes.length);
    const lv = new DataView(lh);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, compSize, true);
    lv.setUint32(22, uncompSize, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    const lhBytes = new Uint8Array(lh);
    lhBytes.set(nameBytes, 30);
    localHeaders.push(lhBytes, data);

    // Central directory entry
    const ce = new ArrayBuffer(46 + nameBytes.length);
    const cv = new DataView(ce);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, compSize, true);
    cv.setUint32(24, uncompSize, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint16(38, 0, true);
    cv.setUint32(42, offset, true);
    const ceBytes = new Uint8Array(ce);
    ceBytes.set(nameBytes, 46);
    centralEntries.push(ceBytes);

    offset += 30 + nameBytes.length + data.length;
  }

  // End of central directory
  const cdOffset = localHeaders.reduce((s, b) => s + b.length, 0);
  const cdSize = centralEntries.reduce((s, b) => s + b.length, 0);
  const eocd = new ArrayBuffer(22);
  const ev = new DataView(eocd);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, cdOffset, true);
  ev.setUint16(20, 0, true);
  const eocdBytes = new Uint8Array(eocd);

  const parts = [...localHeaders, ...centralEntries, eocdBytes];
  const total = parts.reduce((s, b) => s + b.length, 0);
  const result = new Uint8Array(total);
  let pos = 0;
  for (const p of parts) {
    result.set(p, pos);
    pos += p.length;
  }
  return new Blob([result], { type: 'application/zip' });
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export const CreateZipModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [zipName, setZipName] = useState('archive.zip');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files || []);
      setFiles((prev) => [
        ...prev,
        ...newFiles.map((f) => ({ file: f, name: f.name })),
      ]);
      if (inputRef.current) inputRef.current.value = '';
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const createZip = useCallback(async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const blob = await createZipBlob(files);
      downloadBlob(blob, zipName);
    } catch (err) {
      alert(
        'Failed to create ZIP: ' +
          (err instanceof Error ? err.message : 'unknown error')
      );
    }
    setLoading(false);
  }, [files, zipName]);

  return (
    <ModalWrapper onClose={onClose} title="Create ZIP" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          ref={inputRef}
          type="file"
          multiple
          className="file-input file-input-bordered"
          onChange={handleAddFiles}
        />

        <label className="flex items-center gap-2 text-sm">
          <span>Archive name:</span>
          <input
            type="text"
            className="input input-bordered input-sm flex-1 font-mono text-xs"
            value={zipName}
            onChange={(e) => setZipName(e.target.value)}
          />
        </label>

        {files.length > 0 && (
          <div className="bg-base-200 max-h-40 overflow-auto rounded p-2">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 text-xs">
                <span className="truncate font-mono">{f.name}</span>
                <span className="text-base-content/40">
                  {(f.file.size / 1024).toFixed(1)} KB
                </span>
                <button
                  className="btn btn-ghost btn-xs text-error"
                  onClick={() => removeFile(i)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn btn-primary btn-sm"
          disabled={files.length === 0 || loading}
          onClick={createZip}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            `Create ZIP (${files.length} files)`
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};
CreateZipModal.displayName = 'CreateZipModal';
