'use client';

import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { RateList } from '@/components/molecules';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { FiArrowLeft, FiDollarSign } from 'react-icons/fi';

const RatesPage = () => {
  const { currencyRates, loading } = useData();

  console.log('[RatesPage] render', { loading, rates: currencyRates.length });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-2/5" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/exchange"
              className="btn btn-neutral btn-sm btn-circle">
              <FiArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Exchange Rates</h1>
              <p className="text-base-content/60">
                {currencyRates.length} currencies available
              </p>
            </div>
          </div>
          <Link
            href="/exchange/calculator"
            className="btn btn-neutral btn-sm gap-2">
            <FiDollarSign /> Calculator
          </Link>
        </div>

        <RateList rates={currencyRates} />
      </div>
    </DashboardTemplate>
  );
};

export default RatesPage;
