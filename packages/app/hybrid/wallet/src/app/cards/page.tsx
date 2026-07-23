'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { CardItem, CardDetail } from '@/components/atoms';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

const CardsPage = () => {
  const { cards, updateCard, loading } = useData();
  const { showToast } = useToast();
  const [selectedCard, setSelectedCard] = useState('');

  console.log('[CardsPage] render', { loading, count: cards.length });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const activeId = selectedCard || cards[0]?.id;
  const activeCard = cards.find((c) => c.id === activeId);

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Cards</h1>
          <p className="text-base-content/60">Manage your cards</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              selected={activeId === card.id}
              onSelect={setSelectedCard}
            />
          ))}
        </div>

        {activeCard && (
          <CardDetail
            card={activeCard}
            onToggleFreeze={async () => {
              const willFreeze = !activeCard.frozen;
              console.log('[CardsPage] toggleFreeze', {
                id: activeCard.id,
                willFreeze,
              });
              await updateCard({ ...activeCard, frozen: willFreeze });
              showToast(
                `${activeCard.name} ${willFreeze ? 'frozen' : 'unfrozen'}`,
                'success'
              );
            }}
          />
        )}
      </div>
    </DashboardTemplate>
  );
};

export default CardsPage;
