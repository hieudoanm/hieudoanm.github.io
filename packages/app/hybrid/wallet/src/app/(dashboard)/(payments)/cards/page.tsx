'use client';

import { CardDetail, CardItem, TransactionItem } from '@/components/atoms';
import Skeleton, {
  SkeletonCard,
  SkeletonText,
} from '@/components/atoms/Skeleton';
import { DashboardTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency } from '@/utils/format';
import { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const CardsPage = () => {
  const { cards, transactions, updateCard, loading } = useData();
  const { showToast } = useToast();
  const [selectedCard, setSelectedCard] = useState('');

  console.log('[CardsPage] render', { loading, count: cards.length });

  const activeId = selectedCard || cards[0]?.id;
  const activeCard = cards.find((c) => c.id === activeId);

  const cardTransactions = useMemo(() => {
    if (!activeCard) return [];
    return transactions
      .filter((t) => t.type === 'expense')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [activeCard, transactions]);

  const totalSpent = useMemo(
    () => cards.reduce((sum, c) => sum + (c.spentThisMonth ?? 0), 0),
    [cards]
  );
  const totalLimit = useMemo(
    () => cards.reduce((sum, c) => sum + (c.spendingLimit ?? 0), 0),
    [cards]
  );
  const activeCards = cards.filter((c) => !c.frozen).length;
  const frozenCards = cards.filter((c) => c.frozen).length;

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/5" />
            <SkeletonText className="w-1/4" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-24" />
            ))}
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 min-w-[280px] rounded-xl" />
            ))}
          </div>
          <SkeletonCard className="h-64" />
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cards</h1>
            <p className="text-base-content/60">Manage your cards</p>
          </div>
          <button className="btn btn-primary btn-sm gap-1">
            <FiPlus /> Add Card
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Cards</div>
            <div className="stat-value text-2xl">{cards.length}</div>
            <div className="stat-desc">
              {activeCards} active, {frozenCards} frozen
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Spent</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalSpent)}
            </div>
            <div className="stat-desc">this month</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Limit</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalLimit)}
            </div>
            <div className="stat-desc">across all cards</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Remaining</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalLimit - totalSpent)}
            </div>
            <div className="stat-desc">available credit</div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Your Cards</h2>
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
        </div>

        {activeCard && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
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
            </div>

            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="card bg-base-200 shadow-md">
                <div className="card-body gap-3">
                  <h3 className="card-title text-sm">Recent Transactions</h3>
                  {cardTransactions.length === 0 ? (
                    <p className="text-base-content/60 py-4 text-center text-sm">
                      No recent transactions
                    </p>
                  ) : (
                    <div className="divide-base-300 flex flex-col divide-y">
                      {cardTransactions.map((t) => (
                        <TransactionItem key={t.id} transaction={t} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default CardsPage;
