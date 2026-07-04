import type { FC } from 'react';

import { AspectRatioSelect } from './AspectRatioSelect';
import { FontSelect } from './FontSelect';
import { InstagramInput } from './InstagramInput';

export const Toolbar: FC<{
  ratio: string;
  onRatioChange: (v: string) => void;
  fontFamily: string;
  onFontChange: (v: string) => void;
  instagramUsername: string;
  onInstagramUsernameChange: (v: string) => void;
}> = ({
  ratio,
  onRatioChange,
  fontFamily,
  onFontChange,
  instagramUsername,
  onInstagramUsernameChange,
}) => (
  <div className="mb-6 flex items-start justify-center gap-6">
    <AspectRatioSelect value={ratio} onChange={onRatioChange} />
    <FontSelect value={fontFamily} onChange={onFontChange} />
    <InstagramInput
      value={instagramUsername}
      onChange={onInstagramUsernameChange}
    />
  </div>
);

Toolbar.displayName = 'Toolbar';
