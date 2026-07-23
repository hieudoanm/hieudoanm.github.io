'use client';

import { DashboardTemplate } from '@/components/templates';
import { UserCard } from '@/components/atoms';
import ProfileForm from '@/components/organisms/ProfileForm';
import SettingsSection from '@/components/organisms/SettingsSection';
import { useData } from '@/providers/DataProvider';

const ProfilePage = () => {
  const { user, logout, loading } = useData();

  console.log('[ProfilePage] render', { loading, userId: user?.id });

  if (loading || !user) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-base-content/60">Manage your account</p>
        </div>

        <UserCard user={user} />
        <ProfileForm />
        <SettingsSection />

        <button className="btn btn-error w-full" onClick={logout}>
          Sign Out
        </button>
      </div>
    </DashboardTemplate>
  );
};

export default ProfilePage;
