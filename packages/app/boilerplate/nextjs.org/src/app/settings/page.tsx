'use client';

import { SettingsTemplate } from '@/components/templates/SettingsTemplate';
import { NextPage } from 'next';
import { useState } from 'react';

const SettingsPage: NextPage = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [dateTimeFormat, setDateTimeFormat] = useState('24h');
  const [timezone, setTimezone] = useState('UTC');

  return (
    <SettingsTemplate
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

export default SettingsPage;
