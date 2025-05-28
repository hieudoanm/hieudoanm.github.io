import { FC } from 'react';

export const FileUpload: FC = () => {
  return (
    <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-400 px-8 py-4">
      <input
        type="file"
        id="file"
        name="file-upload"
        className="hidden"></input>
      <span>Upload file(s)</span>
    </label>
  );
};
