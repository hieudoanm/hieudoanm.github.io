import { type FC } from 'react';
import { LuFile, LuFolderOpen } from 'react-icons/lu';

interface WelcomeScreenProps {
  onOpenFolder: () => void;
  onOpenFileDialog: () => void;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({
  onOpenFolder,
  onOpenFileDialog,
}) => (
  <div className="flex flex-1 items-center justify-center">
    <div className="text-center">
      <p className="mb-2 text-lg font-semibold">Code</p>
      <p className="text-base-content/40 text-sm">
        Open a folder or file to start editing
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={onOpenFolder}
          className="btn btn-primary flex items-center gap-1">
          <LuFolderOpen className="h-4 w-4" />
          Open Folder
        </button>
        <button
          onClick={onOpenFileDialog}
          className="btn btn-outline btn-primary flex items-center gap-1">
          <LuFile className="h-4 w-4" />
          Open File
        </button>
      </div>
    </div>
  </div>
);
