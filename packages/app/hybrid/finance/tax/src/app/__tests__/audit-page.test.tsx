import { render, screen } from '@testing-library/react';
import AuditPage from '../business/audit/page';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/business/audit'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('AuditPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
      audits: [],
      loading: false,
    });
    render(<AuditPage />);
    expect(screen.getByText('Chua co kiem toan nao')).toBeTruthy();
  });

  it('renders audits list with data', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
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
    });
    render(<AuditPage />);
    expect(screen.getByText('Kiem Toan Thue')).toBeTruthy();
  });
});
