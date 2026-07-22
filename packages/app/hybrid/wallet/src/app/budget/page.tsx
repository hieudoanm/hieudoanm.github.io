'use client';

import { DashboardTemplate } from '@/components/templates';
import { BudgetCategoryCard } from '@/components/atoms';
import { BudgetSummary } from '@/components/molecules';
import { budgetCategories } from '@/data/mock';

export default function BudgetPage() {
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
}
