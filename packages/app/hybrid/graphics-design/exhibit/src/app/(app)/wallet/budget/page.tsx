'use client';

import { DashboardTemplate } from '@/components/wallet/templates';
import { BudgetCategoryCard } from '@/components/wallet/atoms';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/wallet/atoms/Skeleton';
import { BudgetSummary } from '@/components/wallet/molecules';
import { useData } from '@/providers/wallet/DataProvider';

const BudgetPage = () => {
  const { budgetCategories, loading } = useData();

  console.log('[BudgetPage] render', {
    loading,
    count: budgetCategories.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalLimit = budgetCategories.reduce((sum, cat) => sum + cat.limit, 0);

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Budget</h1>
          <p className="text-base-content/60">Track your spending</p>
        </div>

        <BudgetSummary totalSpent={totalSpent} totalLimit={totalLimit} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {budgetCategories.map((cat) => (
            <BudgetCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default BudgetPage;
