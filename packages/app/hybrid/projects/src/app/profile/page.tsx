'use client';

import { type FC } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiUser, FiSave } from 'react-icons/fi';

const ProfileContent: FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-lg font-bold">Profile</h1>
      </header>
      <div className="mx-auto max-w-2xl p-6">
        <div className="card bg-base-200 card-body">
          <h2 className="card-title">User Information</h2>
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-base-300 w-20 rounded-full">
                <FiUser className="size-8" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <input
                type="text"
                defaultValue="User"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="user@example.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => addToast('Profile saved', 'success')}
            className="btn btn-primary mt-4 w-full">
            <FiSave className="size-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage: FC = () => (
  <Providers>
    <ProfileContent />
  </Providers>
);
export default ProfilePage;
