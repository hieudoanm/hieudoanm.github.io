'use client';

import { useState } from 'react';
import { SettingsPage } from '@hieudoanm.github.io/components/routes/settings';

const SettingsAppPage = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('nothing');
  const [dateTimeFormat, setDateTimeFormat] = useState('24h');
  const [timezone, setTimezone] = useState('UTC');

  return (
    <SettingsPage
      language={language}
      theme={theme}
      dateTimeFormat={dateTimeFormat}
      timezone={timezone}
      onLanguageChange={setLanguage}
      onThemeChange={setTheme}
      onDateTimeFormatChange={setDateTimeFormat}
      onTimezoneChange={setTimezone}
    />
  );
};

export default SettingsAppPage;
