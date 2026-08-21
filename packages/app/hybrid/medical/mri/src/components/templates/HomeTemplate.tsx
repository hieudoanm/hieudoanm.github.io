'use client';

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FC,
} from 'react';
import { FiActivity, FiUpload } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export interface HomeTemplateProps {
  onImportFiles: (files: File[]) => void;
}

const SUPPORTED_SCAN_ACCEPT = '.dcm,.ima,.nii,.nii.gz';

const filesFromTransfer = (event: DragEvent<HTMLDivElement>): File[] =>
  Array.from(event.dataTransfer.files);

export const HomeTemplate: FC<HomeTemplateProps> = ({ onImportFiles }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      onImportFiles(files);
    }
    event.target.value = '';
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragging(false);
    const files = filesFromTransfer(event);
    if (files.length > 0) {
      onImportFiles(files);
    }
  };

  return (
    <main
      data-testid="drop-zone"
      className="flex min-h-screen flex-col items-center justify-center gap-8 p-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <FiActivity className="text-primary text-5xl" />
          <h1>MRI</h1>
        </div>
        <p className="text-base-content/70 max-w-md">
          An MRI research workspace and orchestration layer. Import a DICOM
          series or NIfTI volume to get started.
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="info">DICOM</Badge>
          <Badge variant="success">NIfTI</Badge>
          <Badge variant="warning">BIDS</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => inputRef.current?.click()}>
          <FiUpload className="mr-2" />
          Import study
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={SUPPORTED_SCAN_ACCEPT}
          multiple
          className="hidden"
          data-testid="file-input"
          onChange={handleChange}
        />
      </div>

      {dragging ? (
        <p className="text-primary" data-testid="drop-hint">
          Drop files to import
        </p>
      ) : null}
    </main>
  );
};
