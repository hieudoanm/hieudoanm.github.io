import { render, screen } from '@testing-library/react';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/business'),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn().mockReturnValue({
    user: { id: '1', name: 'Hieu' },
    companies: [{ id: 'c1', name: 'TechViet' }],
    submissions: [
      {
        id: 's1',
        companyId: 'c1',
        companyName: 'TechViet',
        taxType: 'PIT',
        status: 'submitted',
        deadline: '2026-01-30',
        totalTaxAmount: 125000000,
        documents: [],
        createdAt: '2026-01-15',
        updatedAt: '2026-01-20',
      },
      {
        id: 's2',
        companyId: 'c1',
        companyName: 'TechViet',
        taxType: 'VAT',
        status: 'draft',
        deadline: '2026-01-30',
        totalTaxAmount: 350000000,
        documents: [],
        createdAt: '2026-01-10',
        updatedAt: '2026-01-25',
      },
    ],
    audits: [
      {
        id: 'a1',
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
        updatedAt: '2026-01-22',
      },
      {
        id: 'a2',
        submissionId: 's2',
        companyId: 'c1',
        companyName: 'TechViet',
        auditType: 'internal',
        status: 'flagged',
        findings: [],
        checks: [],
        auditor: 'Finance',
        startDate: '2026-01-10',
        riskScore: 85,
        notes: '',
        createdAt: '2026-01-10',
        updatedAt: '2026-01-12',
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

import BusinessDashboard from '../business/page';

describe('BusinessDashboard', () => {
  it('renders with data', () => {
    render(<BusinessDashboard />);
    expect(screen.getByText('Doanh Nghiep')).toBeTruthy();
    expect(screen.getByText('Khai bao gan day')).toBeTruthy();
    expect(screen.getByText('Kiem toan gan day')).toBeTruthy();
    expect(screen.getAllByText('TechViet').length).toBeGreaterThanOrEqual(1);
  });

  it('renders empty state', () => {
    const { useData } = require('@/providers/DataProvider');
    useData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
      companies: [],
      submissions: [],
      audits: [],
      loading: false,
    });
    render(<BusinessDashboard />);
    expect(screen.getByText('Chua co khai bao')).toBeTruthy();
    expect(screen.getByText('Chua co kiem toan')).toBeTruthy();
  });

  it('renders links', () => {
    render(<BusinessDashboard />);
    expect(screen.getAllByText('Xem tat ca').length).toBe(2);
  });
});
