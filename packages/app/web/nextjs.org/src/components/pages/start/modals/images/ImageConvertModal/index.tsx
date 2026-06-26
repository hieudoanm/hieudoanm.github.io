'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'heic-to-jpg'
  | 'webp-to-jpg'
  | 'webp-to-png'
  | 'jpg-to-webp'
  | 'jpg-to-png'
  | 'png-to-webp'
  | 'png-to-jpg'
  | 'png-to-svg';

const TAB_LABELS: Record<Tab, string> = {
  'heic-to-jpg': 'HEIC to JPG',
  'webp-to-jpg': 'WebP to JPG',
  'webp-to-png': 'WebP to PNG',
  'jpg-to-webp': 'JPG to WebP',
  'jpg-to-png': 'JPG to PNG',
  'png-to-webp': 'PNG to WebP',
  'png-to-jpg': 'PNG to JPG',
  'png-to-svg': 'PNG to SVG',
};

const FORMAT_MAP: Record<string, string> = {
  'heic-to-jpg': 'image/jpeg',
  'webp-to-jpg': 'image/jpeg',
  'webp-to-png': 'image/png',
  'jpg-to-webp': 'image/webp',
  'jpg-to-png': 'image/png',
  'png-to-webp': 'image/webp',
  'png-to-jpg': 'image/jpeg',
};

const EXT_MAP: Record<string, string> = {
  'heic-to-jpg': '.jpg',
  'webp-to-jpg': '.jpg',
  'webp-to-png': '.png',
  'jpg-to-webp': '.webp',
  'jpg-to-png': '.png',
  'png-to-webp': '.webp',
  'png-to-jpg': '.jpg',
};

const ACCEPT_MAP: Record<string, string> = {
  'heic-to-jpg': '.heic,.heif',
  'webp-to-jpg': '.webp',
  'webp-to-png': '.webp',
  'jpg-to-webp': '.jpg,.jpeg',
  'jpg-to-png': '.jpg,.jpeg',
  'png-to-webp': '.png',
  'png-to-jpg': '.png',
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const ImageConvertModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('heic-to-jpg');
  const [loading, setLoading] = useState(false);

  const convert = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      try {
        if (tab === 'heic-to-jpg' || tab === 'png-to-svg') {
          // Will be handled by CLI-notice below
          return;
        }
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const i = new Image();
          i.onload = () => res(i);
          i.onerror = rej;
          i.src = URL.createObjectURL(file);
        });
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob)
            downloadBlob(blob, file.name.replace(/\.[^.]+$/, EXT_MAP[tab]));
          setLoading(false);
        }, FORMAT_MAP[tab]);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    [tab]
  );

  return (
    <ModalWrapper onClose={onClose} title="Image Convert" size="max-w-lg">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {tab === 'heic-to-jpg' || tab === 'png-to-svg' ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              {tab === 'heic-to-jpg'
                ? 'Convert HEIC images (iPhone) to JPG format.'
                : 'Convert PNG images to SVG (vector) format.'}
            </p>
            <div className="bg-base-200 rounded p-4">
              <p className="mb-2 text-xs font-bold">CLI Command:</p>
              <pre className="text-sm">
                {tab === 'heic-to-jpg'
                  ? 'hieudoanm image convert input.heic output.jpg'
                  : 'hieudoanm image convert input.png output.svg'}
              </pre>
            </div>
            <p className="text-base-content/60 text-xs">
              {tab === 'heic-to-jpg'
                ? 'HEIC conversion requires libheif or ImageMagick on your system.'
                : 'PNG to SVG conversion requires vector tracing tools like potrace.'}
            </p>
          </div>
        ) : (
          <>
            <input
              type="file"
              accept={ACCEPT_MAP[tab]}
              className="file-input file-input-bordered"
              onChange={convert}
            />
            {loading && <span className="loading loading-spinner" />}
            <p className="text-base-content/60 text-xs">
              Convert to {EXT_MAP[tab].replace('.', '').toUpperCase()} format.
            </p>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
