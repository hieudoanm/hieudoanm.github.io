'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiUser, FiFile, FiSettings } from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';

const ProfilePage: FC = () => {
  const { documents } = useData();

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="btn btn-ghost btn-sm btn-circle">
            <FiArrowLeft className="size-4" />
          </Link>
          <h1 className="text-base-content text-2xl font-bold">Profile</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-base-content mb-4 text-lg font-semibold">
              User Information
            </h2>
            <div className="flex items-center gap-4">
              <div className="bg-primary flex size-16 items-center justify-center rounded-full">
                <FiUser className="text-primary-content size-8" />
              </div>
              <div>
                <p className="text-base-content text-lg font-medium">
                  Demo User
                </p>
                <p className="text-base-content/60 text-sm">demo@example.com</p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-base-content mb-4 text-lg font-semibold">
              Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-lg p-4 text-center">
                <FiFile className="text-primary mx-auto mb-2 size-6" />
                <p className="text-base-content text-2xl font-bold">
                  {documents.length}
                </p>
                <p className="text-base-content/60 text-xs">Documents</p>
              </div>
              <div className="bg-base-200 rounded-lg p-4 text-center">
                <FiSettings className="text-secondary mx-auto mb-2 size-6" />
                <p className="text-base-content text-2xl font-bold">
                  {documents.reduce((sum, d) => sum + d.pageCount, 0)}
                </p>
                <p className="text-base-content/60 text-xs">Total Pages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile: FC = () => (
  <Providers>
    <ProfilePage />
  </Providers>
);

export default Profile;
