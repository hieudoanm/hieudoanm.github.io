import { ComponentsTemplate } from '@hieudoanm.github.io/components/templates/shared/ComponentsTemplate';
import type { FC } from 'react';
import { useState } from 'react';

export const DaisyUIThemes: FC = () => {
  const [theme, setTheme] = useState('luxury');
  return <ComponentsTemplate theme={theme} onThemeChange={setTheme} />;
};

DaisyUIThemes.displayName = 'DaisyUIThemes';
