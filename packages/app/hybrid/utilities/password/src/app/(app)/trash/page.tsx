'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { formatRelativeTime } from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiRotateCcw, FiTrash2 } from 'react-icons/fi';

const TrashContent: FC = () => {
  const router = useRouter();
  const { trashedItems, restoreItem, deleteItem } = useData();
  const { addToast } = useToast();
  const [purgeId, setPurgeId] = useState<string | null>(null);
  const [confirmPurgeAll, setConfirmPurgeAll] = useState(false);

  const handleRestore = async (id: string): Promise<void> => {
    await restoreItem(id);
    addToast('Item restored', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">Trash</h1>
        <button
          type="button"
          disabled={trashedItems.length === 0}
          onClick={() => setConfirmPurgeAll(true)}
          className="btn btn-error btn-sm">
          <FiTrash2 className="size-4" /> Empty Trash
        </button>
      </header>
      <main className="mx-auto max-w-2xl space-y-3 p-6">
        <p className="text-base-content/50 text-sm">
          Items in trash are permanently deleted after 30 days.
        </p>
        {trashedItems.length === 0 && (
          <p className="text-base-content/50 py-12 text-center">
            Trash is empty
          </p>
        )}
        {trashedItems.map((item) => (
          <div
            key={item.id}
            className="card bg-base-200 card-body flex-row items-center p-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-base-content/50 text-xs">
                Deleted {formatRelativeTime(item.deletedAt as number)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void handleRestore(item.id)}
              className="btn btn-ghost btn-sm">
              <FiRotateCcw className="size-4" /> Restore
            </button>
            <button
              type="button"
              aria-label={`Delete forever ${item.title}`}
              onClick={() => setPurgeId(item.id)}
              className="btn btn-ghost btn-sm text-error">
              <FiTrash2 className="size-4" />
            </button>
          </div>
        ))}
      </main>
      {purgeId && (
        <ConfirmDialog
          title="Delete forever?"
          message="This item will be permanently deleted and cannot be restored."
          onConfirm={async () => {
            await deleteItem(purgeId);
            setPurgeId(null);
            addToast('Item permanently deleted', 'info');
          }}
          onCancel={() => setPurgeId(null)}
        />
      )}
      {confirmPurgeAll && (
        <ConfirmDialog
          title="Empty trash?"
          message={`Permanently delete ${trashedItems.length} item(s)? This cannot be undone.`}
          onConfirm={async () => {
            for (const item of trashedItems) await deleteItem(item.id);
            setConfirmPurgeAll(false);
            addToast('Trash emptied', 'info');
          }}
          onCancel={() => setConfirmPurgeAll(false)}
        />
      )}
    </div>
  );
};

const TrashPage: FC = () => (
  <Providers>
    <TrashContent />
  </Providers>
);
export default TrashPage;
