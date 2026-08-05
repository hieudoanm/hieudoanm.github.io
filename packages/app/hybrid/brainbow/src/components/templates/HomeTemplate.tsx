'use client';

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FC,
} from 'react';
import { FiCamera, FiFile, FiImage, FiUpload } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { isTauri } from '@/lib/native';

export interface HomeTemplateProps {
  onOpenDemo: () => void;
  onImportFiles: (files: File[]) => void;
  onNativeImport?: () => void;
  onOpenProject?: () => void;
  onOpenProjectFiles?: (files: File[]) => void;
}

const SUPPORTED_IMAGE_ACCEPT =
  'image/png,image/jpeg,image/webp,image/tiff,image/tif,.tif,.tiff';

const filesFromTransfer = (event: DragEvent<HTMLDivElement>): File[] =>
  Array.from(event.dataTransfer.files);

export const HomeTemplate: FC<HomeTemplateProps> = ({
  onOpenDemo,
  onImportFiles,
  onNativeImport,
  onOpenProject,
  onOpenProjectFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      onImportFiles(files);
    }
    event.target.value = '';
  };

  const handleProjectChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      onOpenProjectFiles?.(files);
    }
    event.target.value = '';
  };

  const handleImport = (): void => {
    if (onNativeImport) {
      onNativeImport();
    } else {
      inputRef.current?.click();
    }
  };

  const handleOpenProject = (): void => {
    if (onOpenProject && isTauri()) {
      onOpenProject();
    } else {
      projectInputRef.current?.click();
    }
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
        <Button variant="outline" size="lg" onClick={handleImport}>
          <FiUpload className="mr-2" />
          Import image
        </Button>
        <Button variant="outline" size="lg" onClick={handleOpenProject}>
          <FiFile className="mr-2" />
          Open project
        </Button>
        <div className="md:hidden">
          <Button
            variant="outline"
            size="lg"
            onClick={() => cameraRef.current?.click()}>
            <FiCamera className="mr-2" />
            Capture
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={SUPPORTED_IMAGE_ACCEPT}
          multiple
          className="hidden"
          data-testid="file-input"
          onChange={handleChange}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          data-testid="camera-input"
          onChange={handleChange}
        />
        <input
          ref={projectInputRef}
          type="file"
          accept=".brainbow,application/json"
          className="hidden"
          data-testid="project-input"
          onChange={handleProjectChange}
        />
      </div>

      {dragging ? (
        <p className="text-primary" data-testid="drop-hint">
          Drop images to import
        </p>
      ) : null}
    </main>
  );
};
