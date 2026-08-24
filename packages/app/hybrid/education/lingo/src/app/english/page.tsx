'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { LanguagesEnglish } from '@/components/features/english';
import { NextPage } from 'next';

const EnglishPage: NextPage = () => (
  <ToolTemplate title="Dictionary">
    <LanguagesEnglish />
  </ToolTemplate>
);

export default EnglishPage;
