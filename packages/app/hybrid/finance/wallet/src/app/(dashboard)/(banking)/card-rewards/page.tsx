'use client';

import { useMemo } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency } from '@/utils/format';
import Skeleton, {
  SkeletonCard,
  SkeletonText,
} from '@/components/atoms/Skeleton';
import { FiGift } from 'react-icons/fi';

const tierColors: Record<string, string> = {
  standard: 'badge-neutral',
  gold: 'badge-warning',
  platinum: 'badge-accent',
  black: 'badge-primary',
};

const catalog = [
  { id: '1', name: 'Flight Voucher', points: 5000, icon: '✈️' },
  { id: '2', name: 'Hotel Stay', points: 8000, icon: '🏨' },
  { id: '3', name: 'Gift Card', points: 2000, icon: '🎁' },
  { id: '4', name: 'Statement Credit', points: 1000, icon: '💳' },
  { id: '5', name: 'Shopping Voucher', points: 3000, icon: '🛒' },
  { id: '6', name: 'Cashback', points: 10000, icon: '💰' },
];

const tierBenefits = [
  { tier: 'Standard', earn: '1x', benefits: ['Basic rewards'] },
  { tier: 'Gold', earn: '2x', benefits: ['Lounge access', '2x earn rate'] },
  {
    tier: 'Platinum',
    earn: '3x',
    benefits: ['Lounge access', '3x earn rate', 'Concierge'],
  },
  {
    tier: 'Black',
    earn: '5x',
    benefits: [
      'Lounge access',
      '5x earn rate',
      'Concierge',
      'Priority service',
    ],
  },
];

const CardRewardsPage = () => {
  const { cardRewards, cards, loading } = useData();
  const { showToast } = useToast();

  console.log('[CardRewardsPage] render', {
    loading,
    count: cardRewards.length,
  });

  const totalPoints = useMemo(
    () => cardRewards.reduce((s, r) => s + r.points, 0),
    [cardRewards]
  );
  const totalCashbackYtd = useMemo(
    () => cardRewards.reduce((s, r) => s + r.cashbackYtd, 0),
    [cardRewards]
  );
  const bestTier = useMemo(() => {
    const order = ['black', 'platinum', 'gold', 'standard'];
    for (const t of order) {
      if (cardRewards.some((r) => r.tier === t)) return t;
    }
    return 'standard';
  }, [cardRewards]);

  const getCardName = (cardId: string) =>
    cards.find((c) => c.id === cardId)?.name ?? 'Card';

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <SkeletonText className="h-7 w-1/5" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="h-48" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <FiGift /> Card Rewards
          </h1>
          <p className="text-base-content/60">Earn and redeem rewards</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Points</div>
            <div className="stat-value text-2xl">
              {totalPoints.toLocaleString()}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Cashback YTD</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalCashbackYtd)}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Active Cards</div>
            <div className="stat-value text-2xl">{cardRewards.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Best Tier</div>
            <div className="stat-value text-2xl capitalize">{bestTier}</div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Your Card Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {cardRewards.map((reward) => (
              <div key={reward.id} className="card bg-base-200 shadow-md">
                <div className="card-body gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-sm">
                      {getCardName(reward.cardId)}
                    </h3>
                    <span
                      className={`badge badge-sm ${tierColors[reward.tier]}`}>
                      {reward.tier}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-base-300 rounded-lg p-2">
                      <p className="text-base-content/60 text-xs">Earn Rate</p>
                      <p className="font-bold">{reward.earnRate}x</p>
                    </div>
                    <div className="bg-base-300 rounded-lg p-2">
                      <p className="text-base-content/60 text-xs">This Month</p>
                      <p className="font-bold">
                        {formatCurrency(reward.cashbackThisMonth)}
                      </p>
                    </div>
                    <div className="bg-base-300 rounded-lg p-2">
                      <p className="text-base-content/60 text-xs">YTD</p>
                      <p className="font-bold">
                        {formatCurrency(reward.cashbackYtd)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 flex items-center justify-between rounded-lg p-3">
                    <span className="text-primary text-sm">Total Points</span>
                    <span className="text-primary text-lg font-bold">
                      {reward.points.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Redeem Points</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {catalog.map((item) => (
              <div key={item.id} className="card bg-base-200 shadow-sm">
                <div className="card-body items-center gap-2 p-4 text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-base-content/60 text-xs">
                    {item.points.toLocaleString()} pts
                  </p>
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() =>
                      showToast(
                        `${item.name} redeem request submitted`,
                        'success'
                      )
                    }>
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Tier Benefits</h2>
          <div className="overflow-x-auto">
            <table className="table-zebra table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Earn Rate</th>
                  <th>Benefits</th>
                </tr>
              </thead>
              <tbody>
                {tierBenefits.map((t) => (
                  <tr key={t.tier}>
                    <td className="font-medium capitalize">{t.tier}</td>
                    <td>{t.earn}</td>
                    <td>{t.benefits.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default CardRewardsPage;
