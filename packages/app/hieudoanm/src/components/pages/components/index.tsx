import { ComponentsTemplate } from '@hieudoanm.github.io/components/templates/shared/ComponentsTemplate';
import type { FC } from 'react';
import { useState } from 'react';

export const ComponentsPage: FC = () => {
  const [theme, setTheme] = useState('luxury');
  return <ComponentsTemplate theme={theme} onThemeChange={setTheme} />;
};

ComponentsPage.displayName = 'ComponentsPage';
