import { FC } from 'react';

export const FileUpload: FC<{ id: string; name: string }> = ({
  id = '',
  name = '',
}) => {
  return (
    <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-400 px-8 py-4">
      <input id={id} name={name} className="hidden"></input>
      <span>Upload file(s)</span>
    </label>
  );
};
