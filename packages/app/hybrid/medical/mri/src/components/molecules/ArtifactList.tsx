import type { ArtifactEntry } from '@/lib/contract/types';
import { formatBytes } from '@/lib/format/numbers';
import { readTextFile } from '@/lib/ipc/api';

/** Artifacts live inside the project; Rust decides what may be read. */
export const ArtifactList = ({ artifacts }: { artifacts: ArtifactEntry[] }) => {
  if (artifacts.length === 0) {
    return (
      <p className="text-base-content/70 text-sm">
        This run wrote no artifacts.
      </p>
    );
  }
  return (
    <ul className="divide-base-200 divide-y text-sm">
      {artifacts.map((artifact) => (
        <li
          key={artifact.path}
          className="flex items-center justify-between gap-4 py-2">
          <span className="min-w-0">
            <span className="block truncate font-mono text-xs">
              {artifact.name}
            </span>
            <span className="text-base-content/60 text-xs">
              {artifact.kind}
            </span>
          </span>
          <span className="text-base-content/60 shrink-0 text-xs">
            {formatBytes(artifact.sizeBytes)}
          </span>
          <TextArtifactButton path={artifact.path} />
        </li>
      ))}
    </ul>
  );
};

const TEXT_SUFFIXES = [
  '.json',
  '.jsonl',
  '.yaml',
  '.yml',
  '.csv',
  '.txt',
  '.md',
];

const TextArtifactButton = ({ path }: { path: string }) => {
  if (!TEXT_SUFFIXES.some((suffix) => path.toLowerCase().endsWith(suffix)))
    return null;
  return (
    <button
      type="button"
      className="btn btn-ghost btn-xs"
      onClick={async () => {
        const file = await readTextFile(path);
        const blob = new Blob([file.text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = file.name;
        anchor.click();
        URL.revokeObjectURL(url);
      }}>
      Download
    </button>
  );
};
