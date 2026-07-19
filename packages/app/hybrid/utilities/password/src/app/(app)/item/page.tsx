'use client';

import { type FC, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import {
  copyToClipboard,
  clearClipboardAfter,
  formatRelativeTime,
  maskPassword,
} from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import {
  FiArrowLeft,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiStar,
  FiEdit2,
  FiFilePlus,
  FiShare2,
} from 'react-icons/fi';
import { VaultItemForm } from '@/components/molecules/VaultItemForm';
import { TotpDisplay } from '@/components/organisms/TotpDisplay';
import { ShareItemModal } from '@/components/molecules/ShareItemModal';
import { AccessLogCard } from '@/components/molecules/AccessLogCard';
import type { ShareRecipient, VaultItem } from '@/types';

const ItemContent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const {
    items,
    updateItem,
    trashItem,
    duplicateItem,
    toggleFavorite,
    touchItem,
    settings,
    isLoading,
    shareItem,
    revokeShare,
    logAccess,
  } = useData();
  const { addToast } = useToast();
  const item = items.find((i) => i.id === id);
  const [showPassword, setShowPassword] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (!item && !isLoading && items.length > 0) router.push('/');
  }, [item, isLoading, items, router]);

  useEffect(() => {
    if (item) {
      void touchItem(item.id);
      void logAccess(item.id, 'view');
    }
  }, [item?.id, touchItem, logAccess]);

  if (!item)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-base-content/50">Item not found</p>
      </div>
    );

  const handleCopy = async (text: string, label: string) => {
    await copyToClipboard(text);
    clearClipboardAfter(settings.clipboardClear);
    void logAccess(item.id, 'copy', label);
    addToast(`${label} copied`, 'success');
  };

  const handleSaveEdit = async (
    data: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    await updateItem(item.id, data);
    void logAccess(item.id, 'edit');
    setShowEdit(false);
    addToast('Item updated', 'success');
  };

  const handleShare = async (recipient: ShareRecipient) => {
    await shareItem(item.id, recipient);
    addToast(`Shared with ${recipient.email}`, 'success');
  };

  const handleRevoke = async (email: string) => {
    await revokeShare(item.id, email);
    addToast(`Revoked access for ${email}`, 'info');
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
        <h1 className="flex-1 text-lg font-bold">{item.title}</h1>
        <button
          type="button"
          onClick={() => toggleFavorite(item.id)}
          className="btn btn-ghost btn-circle">
          <FiStar
            className={`size-5 ${item.favorite ? 'fill-warning text-warning' : ''}`}
          />
        </button>
        <button
          type="button"
          onClick={() => setShowEdit(true)}
          className="btn btn-ghost btn-circle"
          aria-label="Edit">
          <FiEdit2 className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Share"
          onClick={() => setShowShare(true)}
          className="btn btn-ghost btn-circle">
          <FiShare2 className="size-5" />
        </button>
        <button
          type="button"
          onClick={async () => {
            const copy = await duplicateItem(item.id);
            if (copy) {
              router.push(`/item?id=${copy.id}`);
              addToast('Item duplicated', 'success');
            }
          }}
          className="btn btn-ghost btn-circle"
          aria-label="Duplicate">
          <FiFilePlus className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            trashItem(item.id);
            router.push('/');
            addToast('Moved to trash', 'info');
          }}
          className="btn btn-ghost btn-circle text-error">
          <FiTrash2 className="size-5" />
        </button>
      </header>
      <main className="mx-auto max-w-2xl space-y-4 p-6">
        {item.username && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">Username</label>
            <div className="flex items-center gap-2">
              <span className="flex-1 font-mono">{item.username}</span>
              <button
                type="button"
                onClick={() => handleCopy(item.username!, 'Username')}
                className="btn btn-ghost btn-xs">
                <FiCopy className="size-3" /> Copy
              </button>
            </div>
          </div>
        )}
        {item.password && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">Password</label>
            <div className="flex items-center gap-2">
              <span className="flex-1 font-mono">
                {showPassword ? item.password : maskPassword(item.password)}
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-ghost btn-xs">
                {showPassword ? (
                  <FiEyeOff className="size-3" />
                ) : (
                  <FiEye className="size-3" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCopy(item.password!, 'Password')}
                className="btn btn-ghost btn-xs">
                <FiCopy className="size-3" /> Copy
              </button>
            </div>
          </div>
        )}
        {item.url && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">URL</label>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary text-sm">
              {item.url}
            </a>
          </div>
        )}
        {item.totpSecret && (
          <TotpDisplay
            secret={item.totpSecret}
            account={item.username ?? item.title}
            issuer={item.title}
          />
        )}
        {item.cardNumber && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">Card Number</label>
            <div className="flex items-center gap-2">
              <span className="flex-1 font-mono">
                {showPassword ? item.cardNumber : maskPassword(item.cardNumber)}
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-ghost btn-xs">
                {showPassword ? (
                  <FiEyeOff className="size-3" />
                ) : (
                  <FiEye className="size-3" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCopy(item.cardNumber!, 'Card')}
                className="btn btn-ghost btn-xs">
                <FiCopy className="size-3" /> Copy
              </button>
            </div>
            {item.cardholder && (
              <p className="mt-1 text-sm">{item.cardholder}</p>
            )}
            {item.expiry && (
              <p className="text-xs opacity-50">Expires: {item.expiry}</p>
            )}
          </div>
        )}
        {item.notes && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">Notes</label>
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {item.notes}
            </pre>
          </div>
        )}
        {item.customFields && item.customFields.length > 0 && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">
              Custom fields
            </label>
            {item.customFields.map((field, idx) => (
              <div
                key={`${field.key}-${idx}`}
                className="border-base-300 flex items-center justify-between gap-2 border-b py-1 last:border-b-0">
                <span className="text-base-content/70 text-sm">
                  {field.key}
                </span>
                <span className="flex-1 text-right font-mono text-sm">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="text-base-content/30 text-xs">
          Created {formatRelativeTime(item.createdAt)} · Updated{' '}
          {formatRelativeTime(item.updatedAt)}
        </div>
        <div className="flex gap-2">
          {item.tags.map((t) => (
            <span key={t} className="badge badge-sm">
              {t}
            </span>
          ))}
        </div>
        <AccessLogCard entries={item.accessLog ?? []} />
      </main>
      {showShare && (
        <ShareItemModal
          item={item}
          onShare={handleShare}
          onRevoke={handleRevoke}
          onClose={() => setShowShare(false)}
        />
      )}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card max-h-[90vh] w-full max-w-md overflow-y-auto shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Edit Item</h2>
              <VaultItemForm
                initial={item}
                submitLabel="Save"
                onCancel={() => setShowEdit(false)}
                onSubmit={handleSaveEdit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ItemPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <ItemContent />
    </Suspense>
  </Providers>
);
export default ItemPage;
