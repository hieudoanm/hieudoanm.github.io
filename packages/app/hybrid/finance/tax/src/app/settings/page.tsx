'use client';

import { type FC } from 'react';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';

const SettingsPage: FC = () => {
  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Cai Dat</h1>
          <p className="text-base-content/50 text-sm">Cai dat ung dung</p>
        </div>

        <div className="card bg-base-200 border-base-300 space-y-3 border p-4">
          <h3 className="font-medium">Giao dien</h3>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Chu de</span>
            </label>
            <select
              className="select select-bordered select-sm w-full"
              defaultValue="nothing">
              <option value="nothing">Dark (Default)</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        <div className="card bg-base-200 border-base-300 space-y-3 border p-4">
          <h3 className="font-medium">Du lieu</h3>
          <p className="text-base-content/50 text-sm text-xs">
            Tat ca du lieu duoc luu tru local tren trinh duyet cua ban.
          </p>
        </div>

        <div className="card bg-base-200 border-base-300 space-y-3 border p-4">
          <h3 className="font-medium">Xuat du lieu</h3>
          <button className="btn btn-outline btn-sm w-full">Xuat JSON</button>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default SettingsPage;
