'use client';

import { ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { listRuns, readRun } from '@/lib/ipc/api';
import { runLabel } from '@/lib/analysis/metrics-table';
import { useResource } from '@/lib/ui/use-resource';

/** Loads the newest runs that produced artifacts, then hands them to the viewer. */
export const ViewerPageTemplate = () => {
  const panels = useResource(async () => {
    const runs = await listRuns();
    const withArtifacts = runs
      .filter((run) => run.status === 'completed')
      .slice(0, 4);
    const details = await Promise.all(
      withArtifacts.map((run) => readRun(run.runId))
    );
    return details.map((detail) => ({
      runId: detail.summary.runId,
      label: runLabel(detail.summary),
      artifacts: detail.artifacts,
    }));
  }, []);

  if (panels.loading) return <Loading />;
  if (panels.error) return <ErrorNote message={panels.error} />;
  return <ViewerTemplate panels={panels.data ?? []} />;
};
