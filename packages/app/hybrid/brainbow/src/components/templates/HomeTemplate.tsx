'use client';

import { useRef, type ChangeEvent, type FC } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export interface HomeTemplateProps {
  onOpenDemo: () => void;
  onImportFiles: (files: File[]) => void;
}

export const HomeTemplate: FC<HomeTemplateProps> = ({
  onOpenDemo,
  onImportFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      onImportFiles(files);
    }
    event.target.value = '';
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <FiImage className="text-primary text-5xl" />
          <h1>Brainbow</h1>
        </div>
        <p className="text-base-content/70 max-w-md">
          An all-in-one Brainbow microscopy viewer, annotator, and analysis
          toolkit. Import a multi-channel image or open the demo dataset.
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="info">TIFF</Badge>
          <Badge variant="success">PNG</Badge>
          <Badge variant="warning">JPEG</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="primary" size="lg" onClick={onOpenDemo}>
          Open demo dataset
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => inputRef.current?.click()}>
          <FiUpload className="mr-2" />
          Import image
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          data-testid="file-input"
          onChange={handleChange}
        />
      </div>
    </main>
  );
};
