'use client';

import { type FC } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FileDropzone } from '@/components/atoms/FileDropzone';
import type { GeneratedIcon } from '@/types';

interface IconGeneratorProps {
  icons: GeneratedIcon[];
  processing: boolean;
  error: string | null;
  sourceName: string | null;
  onUseEditor: () => void;
  onFile: (file: File) => void;
  onDownloadSingle: (icon: GeneratedIcon) => void;
  onDownloadAll: () => void;
}

export const IconGenerator: FC<IconGeneratorProps> = ({
  icons,
  processing,
  error,
  sourceName,
  onUseEditor,
  onFile,
  onDownloadSingle,
  onDownloadAll,
}) => (
  <div className="bg-base-100 flex h-full flex-col gap-6 overflow-y-auto p-6">
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Icon Generation Source
        </span>
        <button
          type="button"
          onClick={onUseEditor}
          disabled={processing}
          className="btn btn-outline btn-xs">
          {processing ? 'Rendering…' : 'Use current editor SVG'}
        </button>
      </div>
      <FileDropzone
        accept="image/svg+xml,.svg"
        onFile={onFile}
        disabled={processing}
        label={processing ? 'Generating...' : 'Drop SVG or Click to Upload'}
      />
    </div>
    {error && (
      <div className="alert alert-error py-2 text-sm">
        <span>{error}</span>
      </div>
    )}
    {icons.length > 0 && (
      <div className="flex flex-col gap-4">
        <div className="border-base-300 flex items-center justify-between border-b pb-2">
          <div>
            <h4 className="font-normal">Generated Icons</h4>
            <p className="text-base-content/40 text-[10px]">
              Source: {sourceName}
            </p>
          </div>
          <button
            type="button"
            onClick={onDownloadAll}
            className="btn btn-primary btn-sm">
            <FiDownload className="size-3" />
            Download ZIP (All Sizes)
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {icons.map((icon) => (
            <button
              key={icon.size}
              type="button"
              onClick={() => onDownloadSingle(icon)}
              className="bg-base-200 hover:bg-base-300 border-base-300 group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all">
              <img
                src={icon.dataUrl}
                alt={`${icon.size}x${icon.size}`}
                loading="lazy"
                className="h-12 w-12 object-contain"
              />
              <span className="text-[10px] font-normal">{icon.size}px</span>
              <span className="text-primary text-[9px] opacity-0 transition-opacity group-hover:opacity-100">
                Download ↓
              </span>
            </button>
          ))}
        </div>
      </div>
    )}
    {icons.length === 0 && !processing && (
      <div className="flex flex-1 flex-col items-center justify-center text-center opacity-30">
        <p className="text-sm italic">No icons generated yet.</p>
      </div>
    )}
  </div>
);
