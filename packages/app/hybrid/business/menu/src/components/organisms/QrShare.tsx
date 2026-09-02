'use client';

import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { FiCopy, FiExternalLink, FiLink } from 'react-icons/fi';
import type { Restaurant } from '@/types/menu';
import { itemsForRestaurant, makeCustomerUrl } from '@/lib/menu';
import type { MenuStore } from '@/components/organisms/types';
import { qrDataUrl } from '@/lib/qr';

interface QrShareProps {
  restaurant: Restaurant;
  store: MenuStore;
}

const QrShare: FC<QrShareProps> = ({ restaurant, store }) => {
  const [url, setUrl] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const items = itemsForRestaurant(store.state, restaurant.id);

  useEffect(() => {
    const relative = makeCustomerUrl(restaurant, items);
    const next = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}${relative}`;
    setUrl(next);
    qrDataUrl(next, 320).then(setDataUrl).catch(() => setDataUrl(''));
  }, [restaurant, items]);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dataUrl}
          alt="QR code linking to this restaurant menu"
          className="h-64 w-64 rounded-xl bg-white p-2"
        />
      ) : (
        <div className="flex h-64 w-64 items-center justify-center rounded-xl bg-base-200 text-base-content/40">
          Generating…
        </div>
      )}
      <div className="flex w-full max-w-96 flex-col gap-3">
        <h3 className="text-xl font-bold">Share the menu</h3>
        <p className="text-base-content/70">
          Print this QR code or send the link. Guests scan it with their phone
          camera to open your menu and place an order.
        </p>
        <div className="flex items-center gap-2">
          <FiLink className="shrink-0 text-primary" />
          <span className="truncate break-all text-sm text-base-content/80">
            {url || makeCustomerUrl(restaurant, items)}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={handleCopy}>
            <FiCopy className="mr-1" />
            {copied ? 'Copied!' : 'Copy link'}
          </button>
          {url && (
            <a
              className="btn btn-outline btn-sm"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="mr-1" />
              Open menu
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export { QrShare, type QrShareProps };