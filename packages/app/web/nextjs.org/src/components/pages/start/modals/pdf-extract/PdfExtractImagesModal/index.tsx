'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { extractImages } from '../../pdf-misc/utils/pdf';

export const PdfExtractImagesModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleExtractImages = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const blobs = await extractImages(file);
      const urls = blobs.map((b) => URL.createObjectURL(b));
      setImagePreviews((prev) => {
        prev.forEach((u) => URL.revokeObjectURL(u));
        return urls;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="Extract Images"
      size="max-w-3xl"
      fullHeight>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          className="file-input file-input-bordered"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setImagePreviews((prev) => {
              prev.forEach((u) => URL.revokeObjectURL(u));
              return [];
            });
          }}
        />

        {file && (
          <>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={handleExtractImages}>
              {loading ? 'Extracting...' : 'Extract Images (as page snapshots)'}
            </button>
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {imagePreviews.map((url, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <img
                      src={url}
                      alt={`Page ${i + 1}`}
                      className="rounded border"
                    />
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `page_${i + 1}.png`;
                        a.click();
                      }}>
                      Download Page {i + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
PdfExtractImagesModal.displayName = 'PdfExtractImagesModal';
