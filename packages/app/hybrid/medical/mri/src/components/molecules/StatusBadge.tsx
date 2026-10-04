import type { RunStatus } from '@/lib/contract/types';
import { Badge, type BadgeTone } from '@/components/atoms/Badge';

const TONES: Record<RunStatus, BadgeTone> = {
  completed: 'success',
  running: 'info',
  failed: 'error',
  cancelled: 'warning',
  incomplete: 'warning',
  unsupported: 'error',
};

const LABELS: Record<RunStatus, string> = {
  completed: 'completed',
  running: 'running',
  failed: 'failed',
  cancelled: 'cancelled',
  incomplete: 'incomplete',
  unsupported: 'unsupported',
};

export const StatusBadge = ({ status }: { status: RunStatus }) => (
  <Badge tone={TONES[status] ?? 'neutral'}>{LABELS[status] ?? status}</Badge>
);

export const RigourBadge = ({
  status,
}: {
  status: 'pass' | 'fail' | 'warn' | 'unknown';
}) => {
  const tone: BadgeTone =
    status === 'pass'
      ? 'success'
      : status === 'fail'
        ? 'error'
        : status === 'warn'
          ? 'warning'
          : 'neutral';
  return <Badge tone={tone}>{status}</Badge>;
};
