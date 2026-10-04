'use client';

import { Card } from '@/components/atoms/Card';
import { EmptyState } from '@/components/atoms/EmptyState';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import type { ArtifactEntry } from '@/lib/contract/types';
import { formatBytes } from '@/lib/format/numbers';

const IMAGE_SUFFIXES = ['.png', '.jpg', '.jpeg'];

/**
 * Viewer: images the pipeline already wrote (lesion overlays, mosaics) side by
 * side. It displays files; it does not render volumes, and it never claims to be
 * a diagnostic viewer.
 */
export const ViewerTemplate = ({
  panels,
  onSelect,
}: {
  panels: { runId: string; label: string; artifacts: ArtifactEntry[] }[];
  onSelect?: (runId: string) => void;
}) => {
  const withImages = panels.map((panel) => ({
    ...panel,
    images: panel.artifacts.filter((artifact) =>
      IMAGE_SUFFIXES.some((suffix) =>
        artifact.name.toLowerCase().endsWith(suffix)
      )
    ),
  }));

  return (
    <Screen>
      <PageHeader
        title="Viewer"
        description="Images a run wrote, shown side by side. This is a review aid for produced figures, not a diagnostic viewer."
      />
      {withImages.length === 0 ||
      withImages.every((panel) => panel.images.length === 0) ? (
        <EmptyState
          title="No run has written preview images yet"
          description="When a pipeline run saves PNG or JPEG figures, they appear here for review."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {withImages.map((panel) => (
            <Card
              key={panel.runId}
              title={panel.label}
              description={onSelect ? 'Select a run to focus it.' : undefined}
              actions={
                onSelect ? (
                  <button
                    type="button"
                    className="btn btn-xs"
                    onClick={() => onSelect(panel.runId)}>
                    Focus
                  </button>
                ) : undefined
              }>
              {panel.images.length === 0 ? (
                <p className="text-base-content/70 text-sm">
                  No preview images in this run.
                </p>
              ) : (
                <ul className="space-y-3">
                  {panel.images.map((image) => (
                    <li key={image.path}>
                      <p className="text-base-content/60 font-mono text-xs">
                        {image.name} · {formatBytes(image.sizeBytes)}
                      </p>
                      <p className="text-base-content/60 text-xs">
                        {image.path}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}
    </Screen>
  );
};
