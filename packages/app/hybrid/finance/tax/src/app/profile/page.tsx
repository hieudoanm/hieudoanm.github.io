'use client';

import { type FC } from 'react';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { useData } from '@/providers/DataProvider';

const ProfilePage: FC = () => {
  const { user } = useData();

  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Ho So</h1>
          <p className="text-base-content/50 text-sm">
            Quan ly thong tin ca nhan
          </p>
        </div>

        <div className="card bg-base-200 border-base-300 border p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-content flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
              {user?.name?.charAt(0) ?? 'U'}
            </div>
            <div>
              <h2 className="text-lg font-medium">
                {user?.name ?? 'Nguoi dung'}
              </h2>
              <p className="text-base-content/50 text-sm">
                {user?.email ?? ''}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border-base-300 space-y-3 border p-4">
          <h3 className="font-medium">Thong tin</h3>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Ten</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered w-full"
              value={user?.name ?? ''}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Email</span>
            </label>
            <input
              type="email"
              className="input input-sm input-bordered w-full"
              value={user?.email ?? ''}
              readOnly
            />
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default ProfilePage;
