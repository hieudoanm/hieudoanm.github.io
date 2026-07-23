'use client';

import { type FC, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import {
  copyToClipboard,
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
} from 'react-icons/fi';

const ItemContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { items, updateItem, deleteItem, toggleFavorite, isLoading } =
    useData();
  const { addToast } = useToast();
  const item = items.find((i) => i.id === id);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!item && !isLoading && items.length > 0) router.push('/');
  }, [item, isLoading, items, router]);

  if (!item)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-base-content/50">Item not found</p>
      </div>
    );

  const handleCopy = async (text: string, label: string) => {
    await copyToClipboard(text);
    addToast(`${label} copied`, 'success');
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
          onClick={() => {
            deleteItem(item.id);
            router.push('/');
            addToast('Item deleted', 'info');
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
        {item.cardNumber && (
          <div className="card bg-base-200 card-body p-4">
            <label className="text-base-content/50 text-xs">Card Number</label>
            <div className="flex items-center gap-2">
              <span className="flex-1 font-mono">
                {showPassword ? item.cardNumber : maskPassword(item.cardNumber)}
              </span>
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
      </main>
    </div>
  );
};

const ItemPage: FC = () => (
  <Providers>
    <ItemContent />
  </Providers>
);
export default ItemPage;
