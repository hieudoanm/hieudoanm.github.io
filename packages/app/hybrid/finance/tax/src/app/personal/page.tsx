'use client';

import { type FC } from 'react';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { useData } from '@/providers/DataProvider';
import Link from 'next/link';

const PersonalDashboardPage: FC = () => {
  const { user } = useData();

  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Ca Nhan</h1>
          <p className="text-base-content/50 text-sm">
            Xin chao, {user?.name ?? 'Ban'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Link
            href="/personal/calculator"
            className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors">
            <div className="card-body p-4">
              <h2 className="card-title text-lg">Tinh Thue</h2>
              <p className="text-base-content/50 text-sm">
                Tinh thue thu nhap ca nhan Viet Nam (PIT)
              </p>
              <div className="mt-2 text-xs opacity-70">
                Gross → Net | Net → Gross | 7 bracket thue tien trien
              </div>
            </div>
          </Link>

          <div className="card bg-base-200 border-base-300 border p-4 opacity-50">
            <h2 className="text-lg font-medium">Lich su tinh thue</h2>
            <p className="text-base-content/50 mt-2 text-sm">Sap ra mat</p>
          </div>

          <div className="card bg-base-200 border-base-300 border p-4 opacity-50">
            <h2 className="text-lg font-medium">Xuat bao cao</h2>
            <p className="text-base-content/50 mt-2 text-sm">
              CSV, PDF cho ket qua tinh thue
            </p>
          </div>

          <div className="card bg-base-200 border-base-300 border p-4 opacity-50">
            <h2 className="text-lg font-medium">Muc thue theo nam</h2>
            <p className="text-base-content/50 mt-2 text-sm">
              Tong hop thue theo thang/nam
            </p>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default PersonalDashboardPage;
