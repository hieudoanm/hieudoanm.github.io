'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import type { TaxSubmission } from '@/types';

const NewSubmissionPage: FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { companies, addSubmission } = useData();

  const [companyId, setCompanyId] = useState('');
  const [taxType, setTaxType] = useState<'PIT' | 'CIT' | 'VAT' | 'FCT'>('PIT');
  const [period, setPeriod] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!companyId || !period || !deadline) {
      showToast('Vui long dien day du thong tin', 'error');
      return;
    }

    const company = companies.find((c) => c.id === companyId);
    if (!company) return;

    const now = new Date().toISOString();
    const submission: TaxSubmission = {
      id: `sub-${Date.now()}`,
      companyId,
      companyName: company.name,
      taxType,
      period,
      status: 'draft',
      deadline,
      totalTaxAmount: 0,
      documents: [],
      notes: notes || undefined,
      createdAt: now,
      updatedAt: now,
    };

    await addSubmission(submission);
    showToast('Da tao khai bao moi', 'success');
    router.push(`/business/submission?id=${submission.id}`);
  };

  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <div>
          <h1>Tao Khai Bao Moi</h1>
          <p className="text-base-content/50 text-sm">
            Tao khai bao thue doanh nghiep
          </p>
        </div>

        <div className="rounded-box border-base-300 bg-base-200 space-y-4 border p-4">
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Doanh nghiep</span>
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}>
              <option value="">Chon doanh nghiep</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Loai thue</span>
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={taxType}
              onChange={(e) =>
                setTaxType(e.target.value as 'PIT' | 'CIT' | 'VAT' | 'FCT')
              }>
              <option value="PIT">Thue thu nhap ca nhan (PIT)</option>
              <option value="CIT">Thue thu nhap doanh nghiep (CIT)</option>
              <option value="VAT">Thue gia tri gia tang (VAT)</option>
              <option value="FCT">Thue nha thau (FCT)</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Ky ke khai</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered w-full"
              placeholder="VD: 2025-12, 2025-Q4, 2025"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Han nop</span>
            </label>
            <input
              type="date"
              className="input input-sm input-bordered w-full"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Ghi chu</span>
            </label>
            <textarea
              className="textarea textarea-bordered textarea-sm w-full"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary btn-sm w-full"
            onClick={handleSubmit}>
            Tao khai bao
          </button>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default NewSubmissionPage;
