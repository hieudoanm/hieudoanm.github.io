'use client';

import { DashboardTemplate } from '@/components/templates';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import SettingsSection from '@/components/organisms/SettingsSection';
import { useData } from '@/providers/DataProvider';

const SettingsPage = () => {
  const { loading } = useData();

  console.log('[SettingsPage] render', { loading });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/5" />
            <SkeletonText className="w-1/4" />
          </div>
          <SkeletonCard className="h-48" />
          <SkeletonCard className="h-32" />
          <SkeletonCard className="h-48" />
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-base-content/60">Customize your experience</p>
        </div>

        <SettingsSection />
      </div>
    </DashboardTemplate>
  );
};

export default SettingsPage;
