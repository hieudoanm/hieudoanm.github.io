'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  compressPDF,
  rotatePDF,
  addWatermark,
  downloadBlob,
} from '../utils/pdf';
import { RedactTab } from './RedactTab';

type Tab = 'compress' | 'rotate' | 'watermark' | 'redact';

export const PdfEditModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('compress');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [watermarkText, setWatermarkText] = useState('');

  const formatBytes = (b: number) =>
    b > 1_000_000
      ? `${(b / 1_000_000).toFixed(1)} MB`
      : b > 1_000
        ? `${(b / 1_000).toFixed(1)} KB`
        : `${b} B`;

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setOriginalSize(file.size);
    try {
      const bytes = await compressPDF(file);
      setCompressedSize(bytes.length);
      downloadBlob(bytes, 'compressed.pdf');
    } finally {
      setLoading(false);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await rotatePDF(file, angle);
      downloadBlob(bytes, 'rotated.pdf');
    } finally {
      setLoading(false);
    }
  };

  const handleWatermark = async () => {
    if (!file || !watermarkText) return;
    setLoading(true);
    try {
      const bytes = await addWatermark(file, watermarkText);
      downloadBlob(bytes, 'watermarked.pdf');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="PDF Edit"
      size={tab === 'redact' ? 'max-w-5xl' : 'max-w-md'}
      fullHeight={tab === 'redact'}>
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'compress' ? 'tab-active' : ''}`}
          onClick={() => setTab('compress')}>
          Compress
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'rotate' ? 'tab-active' : ''}`}
          onClick={() => setTab('rotate')}>
          Rotate
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'watermark' ? 'tab-active' : ''}`}
          onClick={() => setTab('watermark')}>
          Watermark
        </button>
        <button
          role="tab"
          className={`tab flex-1 ${tab === 'redact' ? 'tab-active' : ''}`}
          onClick={() => setTab('redact')}>
          Redact
        </button>
      </div>

      {tab === 'compress' && (
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".pdf"
            className="file-input file-input-bordered"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={handleCompress}>
            {loading ? 'Compressing...' : 'Compress'}
          </button>
          {compressedSize > 0 && (
            <div className="bg-base-200 rounded p-3 text-sm">
              <p>Original: {formatBytes(originalSize)}</p>
              <p>Compressed: {formatBytes(compressedSize)}</p>
              <p>
                Ratio: {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                reduction
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'rotate' && (
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".pdf"
            className="file-input file-input-bordered"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <label className="flex flex-col gap-1">
            <span className="text-sm">Angle:</span>
            <select
              className="select select-bordered"
              value={angle}
              onChange={(e) =>
                setAngle(Number(e.target.value) as 90 | 180 | 270)
              }>
              <option value={90}>90° Clockwise</option>
              <option value={180}>180°</option>
              <option value={270}>270° Clockwise (90° Counter)</option>
            </select>
          </label>
          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={handleRotate}>
            {loading ? 'Rotating...' : 'Rotate'}
          </button>
        </div>
      )}

      {tab === 'watermark' && (
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".pdf"
            className="file-input file-input-bordered"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <label className="flex flex-col gap-1">
            <span className="text-sm">Watermark text:</span>
            <input
              type="text"
              className="input input-bordered"
              placeholder="DRAFT"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary"
            disabled={!file || !watermarkText || loading}
            onClick={handleWatermark}>
            {loading ? 'Adding...' : 'Add Watermark'}
          </button>
        </div>
      )}

      {tab === 'redact' && <RedactTab onClose={onClose} />}
    </ModalWrapper>
  );
};
PdfEditModal.displayName = 'PdfEditModal';
