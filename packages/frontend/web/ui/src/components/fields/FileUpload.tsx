import { FC } from 'react';

export const FileUpload: FC<{ id: string; name: string }> = ({
  id = '',
  name = '',
}) => {
  return (
    <label className="flex cursor-pointer items-center justify-center rounded border border-neutral-800 bg-neutral-900 px-8 py-4 text-neutral-300 hover:border-neutral-800 hover:bg-neutral-700">
      <input id={id} name={name} className="hidden"></input>
      <span>Upload file(s)</span>
    </label>
  );
};
