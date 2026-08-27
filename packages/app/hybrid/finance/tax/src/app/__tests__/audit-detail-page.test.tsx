import { render, screen } from '@testing-library/react';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), back: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/business/audit'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams('id=audit-1')),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn().mockReturnValue({
    user: { id: '1', name: 'Hieu' },
    audits: [
      {
        id: 'audit-1',
        submissionId: 's1',
        companyId: 'c1',
        companyName: 'TechViet',
        auditType: 'automated',
        status: 'completed',
        findings: [],
        checks: [],
        auditor: 'System',
        startDate: '2026-01-20',
        riskScore: 35,
        notes: '',
        createdAt: '2026-01-20',
        updatedAt: '2026-01-20',
      },
    ],
    loading: false,
  }),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import AuditsPage from '../business/audit/page';

describe('AuditsPage (detail view)', () => {
  it('renders audit detail', () => {
    render(<AuditsPage />);
    expect(screen.getByText('TechViet')).toBeTruthy();
  });

  it('shows not found when audit missing', () => {
    const { useData } = require('@/providers/DataProvider');
    const { useSearchParams } = require('next/navigation');
    useData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
      audits: [],
      loading: false,
    });
    useSearchParams.mockReturnValue(new URLSearchParams('id=nonexistent'));
    render(<AuditsPage />);
    expect(screen.getByText('Khong tim thay kiem toan')).toBeTruthy();
    expect(screen.getByText('Quay lai')).toBeTruthy();
  });
});
