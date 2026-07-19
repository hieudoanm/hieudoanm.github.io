'use client';

import { type FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { AuditList } from '@/components/organisms/AuditList';
import { AuditDetail } from '@/components/organisms/AuditDetail';
import { useData } from '@/providers/DataProvider';

const AuditsPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { audits } = useData();

  if (id) {
    const audit = audits.find((a) => a.id === id);

    if (!audit) {
      return (
        <DashboardTemplate>
          <div className="py-12 text-center">
            <p className="text-base-content/50">Khong tim thay kiem toan</p>
            <button
              className="btn btn-primary btn-sm mt-4"
              onClick={() => router.push('/business/audit')}>
              Quay lai
            </button>
          </div>
        </DashboardTemplate>
      );
    }

    return (
      <DashboardTemplate>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => router.back()}>
              ←
            </button>
            <div>
              <h1>Chi Tiet Kiem Toan</h1>
              <p className="text-base-content/50 text-sm">{audit.id}</p>
            </div>
          </div>
          <AuditDetail audit={audit} />
        </div>
      </DashboardTemplate>
    );
  }

  const sorted = [...audits].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Kiem Toan Thue</h1>
          <p className="text-base-content/50 text-sm">
            Quan ly kiem toan va kiem tra doanh nghiep
          </p>
        </div>
        <AuditList audits={sorted} />
      </div>
    </DashboardTemplate>
  );
};

export default AuditsPage;
