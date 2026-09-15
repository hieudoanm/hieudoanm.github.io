'use client';

import { FC } from 'react';
import Editor from '@/components/csv/organisms/Editor';

const CsvPage: FC = () => (
  <main className="bg-base-100 flex flex-col">
    <Editor />
  </main>
);

export default CsvPage;
