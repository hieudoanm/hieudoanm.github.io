'use client';

import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { UserCard } from '@/components/atoms';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import ProfileForm from '@/components/organisms/ProfileForm';
import { useData } from '@/providers/DataProvider';
import { FiSettings } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, logout, loading } = useData();

  console.log('[ProfilePage] render', { loading, userId: user?.id });

  if (loading || !user) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/5" />
            <SkeletonText className="w-1/4" />
          </div>
          <SkeletonCard className="h-36" />
          <SkeletonCard className="h-48" />
          <Skeleton className="rounded-btn h-12 w-full" />
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-base-content/60">Manage your account</p>
          </div>
          <Link href="/settings" className="btn btn-neutral btn-sm gap-2">
            <FiSettings /> Settings
          </Link>
        </div>

        <UserCard user={user} />
        <ProfileForm />

        <button className="btn btn-error w-full" onClick={logout}>
          Sign Out
        </button>
      </div>
    </DashboardTemplate>
  );
};

export default ProfilePage;
