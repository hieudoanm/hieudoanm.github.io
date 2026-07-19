'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { FiMenu } from 'react-icons/fi';
import type { Restaurant } from '@/types/menu';
import { RestaurantManager } from '@/components/organisms/RestaurantManager';
import { MenuManager } from '@/components/organisms/MenuManager';
import { QrShare } from '@/components/organisms/QrShare';
import type { MenuStore } from '@/components/organisms/types';

interface RestaurantDashboardProps {
  store: MenuStore;
}

type Tab = 'menu' | 'share';

const RestaurantDashboard: FC<RestaurantDashboardProps> = ({ store }) => {
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [tab, setTab] = useState<Tab>('menu');

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4">
      <RestaurantManager
        store={store}
        selected={selected}
        onSelect={(r) => {
          setSelected(r);
          setTab('menu');
        }}
      />
      {selected && (
        <div className="card bg-base-100 shadow">
          <div className="card-body gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-semibold">{selected.name}</h2>
                {selected.description && (
                  <p className="text-base-content/60">{selected.description}</p>
                )}
              </div>
              <div className="tabs tabs-boxed">
                <button
                  className={`tab ${tab === 'menu' ? 'tab-active' : ''}`}
                  onClick={() => setTab('menu')}>
                  <FiMenu className="mr-1" />
                  Menu
                </button>
                <button
                  className={`tab ${tab === 'share' ? 'tab-active' : ''}`}
                  onClick={() => setTab('share')}>
                  <FiMenu className="mr-1 rotate-180" />
                  Share
                </button>
              </div>
            </div>
            {tab === 'menu' ? (
              <MenuManager restaurantId={selected.id} store={store} />
            ) : (
              <QrShare restaurant={selected} store={store} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDashboard;
