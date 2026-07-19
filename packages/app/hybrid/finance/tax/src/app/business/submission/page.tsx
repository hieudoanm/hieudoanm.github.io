'use client';

import { type FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { SubmissionList } from '@/components/organisms/SubmissionList';
import { SubmissionDetail } from '@/components/organisms/SubmissionDetail';
import { useData } from '@/providers/DataProvider';

const SubmissionsPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { submissions } = useData();

  if (id) {
    const submission = submissions.find((s) => s.id === id);

    if (!submission) {
      return (
        <DashboardTemplate>
          <div className="py-12 text-center">
            <p className="text-base-content/50">Khong tim thay khai bao</p>
            <button
              className="btn btn-primary btn-sm mt-4"
              onClick={() => router.push('/business/submission')}>
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
              <h1>Chi Tiet Khai Bao</h1>
              <p className="text-base-content/50 text-sm">{submission.id}</p>
            </div>
          </div>
          <SubmissionDetail submission={submission} />
        </div>
      </DashboardTemplate>
    );
  }

  const sorted = [...submissions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Khai Bao Thue</h1>
          <p className="text-base-content/50 text-sm">
            Quan ly cac khai bao thue doanh nghiep
          </p>
        </div>
        <SubmissionList submissions={sorted} />
      </div>
    </DashboardTemplate>
  );
};

export default SubmissionsPage;
