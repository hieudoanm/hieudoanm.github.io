import type { FC } from 'react';

import { AspectRatioSelect } from './AspectRatioSelect';
import { FileNameInput } from './FileNameInput';
import { FontSelect } from './FontSelect';
import { InstagramInput } from './InstagramInput';

export const Toolbar: FC<{
  ratio: string;
  onRatioChange: (v: string) => void;
  fontFamily: string;
  onFontChange: (v: string) => void;
  instagramUsername: string;
  onInstagramUsernameChange: (v: string) => void;
  fileName: string;
  onFileNameChange: (v: string) => void;
}> = ({
  ratio,
  onRatioChange,
  fontFamily,
  onFontChange,
  instagramUsername,
  onInstagramUsernameChange,
  fileName,
  onFileNameChange,
}) => (
  <div className="mb-6 flex items-start justify-center gap-6">
    <AspectRatioSelect value={ratio} onChange={onRatioChange} />
    <FontSelect value={fontFamily} onChange={onFontChange} />
    <InstagramInput
      value={instagramUsername}
      onChange={onInstagramUsernameChange}
    />
    <FileNameInput value={fileName} onChange={onFileNameChange} />
  </div>
);

Toolbar.displayName = 'Toolbar';
