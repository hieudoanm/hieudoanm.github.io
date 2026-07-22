'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { CardItem, CardDetail } from '@/components/atoms';
import { cards } from '@/data/mock';

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const activeCard = cards.find((c) => c.id === selectedCard);

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
              selected={selectedCard === card.id}
              onSelect={setSelectedCard}
            />
          ))}
        </div>

        {activeCard && <CardDetail card={activeCard} />}
      </div>
    </DashboardTemplate>
  );
}
