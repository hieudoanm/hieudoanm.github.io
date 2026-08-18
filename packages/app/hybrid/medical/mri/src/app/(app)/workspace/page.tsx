'use client';

import { Suspense, type FC } from 'react';
import { WorkspaceTemplate } from '@/components/templates/WorkspaceTemplate';
import { api } from '@/lib/api/client';

const WorkspacePage: FC = () => (
  <Suspense fallback={<span className="loading loading-spinner loading-lg" />}>
    <WorkspaceTemplate api={api} />
  </Suspense>
);

export default WorkspacePage;
